import { createSignal, getListener, getOwner, onCleanup, sharedConfig, startTransition } from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";
import { useNavigate, getIntent } from "../routing.js";
const LocationHeader = "Location";
const PRELOAD_TIMEOUT = 5000;
const CACHE_TIMEOUT = 180000;
let cacheMap = new Map();
// cleanup forward/back cache
if (!isServer) {
    setInterval(() => {
        const now = Date.now();
        for (let [k, v] of cacheMap.entries()) {
            if (!v[3].count && now - v[0] > CACHE_TIMEOUT) {
                cacheMap.delete(k);
            }
        }
    }, 300000);
}
function getCache() {
    if (!isServer)
        return cacheMap;
    const req = getRequestEvent();
    if (!req)
        throw new Error("Cannot find cache context");
    return (req.router || (req.router = {})).cache || (req.router.cache = new Map());
}
export function revalidate(key, force = true) {
    return startTransition(() => {
        const now = Date.now();
        cacheKeyOp(key, entry => {
            force && (entry[0] = 0); //force cache miss
            entry[3][1](now); // retrigger live signals
        });
    });
}
export function cacheKeyOp(key, fn) {
    key && !Array.isArray(key) && (key = [key]);
    for (let k of cacheMap.keys()) {
        if (key === undefined || matchKey(k, key))
            fn(cacheMap.get(k));
    }
}
export function cache(fn, name) {
    // prioritize GET for server functions
    if (fn.GET)
        fn = fn.GET;
    const cachedFn = ((...args) => {
        const cache = getCache();
        const intent = getIntent();
        const owner = getOwner();
        const navigate = owner ? useNavigate() : undefined;
        const now = Date.now();
        const key = name + hashKey(args);
        let cached = cache.get(key);
        let tracking;
        if (isServer) {
            const e = getRequestEvent();
            if (e) {
                const dataOnly = (e.router || (e.router = {})).dataOnly;
                if (dataOnly) {
                    const data = e && (e.router.data || (e.router.data = {}));
                    if (data && key in data)
                        return data[key];
                    if (Array.isArray(dataOnly) && !dataOnly.includes(key)) {
                        data[key] = undefined;
                        return Promise.resolve();
                    }
                }
            }
        }
        if (getListener() && !isServer) {
            tracking = true;
            onCleanup(() => cached[3].count--);
        }
        if (cached &&
            (isServer ||
                intent === "native" ||
                (cached[0] && cached[3].count) ||
                Date.now() - cached[0] < PRELOAD_TIMEOUT)) {
            if (tracking) {
                cached[3].count++;
                cached[3][0](); // track
            }
            if (cached[2] === "preload" && intent !== "preload") {
                cached[0] = now;
            }
            let res = cached[1];
            if (intent !== "preload") {
                res =
                    "then" in (cached[1])
                        ? (cached[1]).then(handleResponse(false), handleResponse(true))
                        : handleResponse(false)(cached[1]);
                !isServer && intent === "navigate" && startTransition(() => cached[3][1](cached[0])); // update version
            }
            return res;
        }
        let res = !isServer && sharedConfig.context && sharedConfig.has(key)
            ? sharedConfig.load(key) // hydrating
            : fn(...args);
        // serialize on server
        if (isServer &&
            sharedConfig.context &&
            sharedConfig.context.async &&
            !sharedConfig.context.noHydrate) {
            const e = getRequestEvent();
            e && e.router.dataOnly && (e.router.data[key] = res);
            (!e || !e.serverOnly) && sharedConfig.context.serialize(key, res);
        }
        if (cached) {
            cached[0] = now;
            cached[1] = res;
            cached[2] = intent;
            !isServer && intent === "navigate" && startTransition(() => cached[3][1](cached[0])); // update version
        }
        else {
            cache.set(key, (cached = [now, res, intent, createSignal(now)]));
            cached[3].count = 0;
        }
        if (tracking) {
            cached[3].count++;
            cached[3][0](); // track
        }
        if (intent !== "preload") {
            res =
                "then" in (res)
                    ? (res).then(handleResponse(false), handleResponse(true))
                    : handleResponse(false)(res);
        }
        return res;
        function handleResponse(error) {
            return async (v) => {
                if (v instanceof Response) {
                    if (v.headers.has("Location")) {
                        if (navigate) {
                            startTransition(() => {
                                let url = v.headers.get(LocationHeader);
                                if (url && url.startsWith("/")) {
                                    navigate(url, {
                                        replace: true
                                    });
                                }
                                else if (!isServer && url) {
                                    window.location.href = url;
                                }
                            });
                        }
                        return;
                    }
                    if (v.customBody)
                        v = await v.customBody();
                }
                if (error)
                    throw v;
                return v;
            };
        }
    });
    cachedFn.keyFor = (...args) => name + hashKey(args);
    cachedFn.key = name;
    return cachedFn;
}
cache.set = (key, value) => {
    const cache = getCache();
    const now = Date.now();
    let cached = cache.get(key);
    if (cached) {
        cached[0] = now;
        cached[1] = value;
        cached[2] = "preload";
    }
    else {
        cache.set(key, (cached = [now, value, , createSignal(now)]));
        cached[3].count = 0;
    }
};
cache.clear = () => getCache().clear();
function matchKey(key, keys) {
    for (let k of keys) {
        if (key.startsWith(k))
            return true;
    }
    return false;
}
// Modified from the amazing Tanstack Query library (MIT)
// https://github.com/TanStack/query/blob/main/packages/query-core/src/utils.ts#L168
export function hashKey(args) {
    return JSON.stringify(args, (_, val) => isPlainObject(val)
        ? Object.keys(val)
            .sort()
            .reduce((result, key) => {
            result[key] = val[key];
            return result;
        }, {})
        : val);
}
function isPlainObject(obj) {
    let proto;
    return (obj != null &&
        typeof obj === "object" &&
        (!(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype));
}

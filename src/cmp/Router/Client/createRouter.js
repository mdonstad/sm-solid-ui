import { createSignal, onCleanup } from "solid-js";
import { createRouterComponent } from "./components.jsx";
function intercept([value, setValue], get, set) {
    return [get ? () => get(value()) : value, set ? (v) => setValue(set(v)) : setValue];
}
function querySelector(selector) {
    if (selector === "#") {
        return null;
    }
    // Guard against selector being an invalid CSS selector
    try {
        return document.querySelector(selector);
    }
    catch (e) {
        return null;
    }
}
export function createRouter(config) {
    let ignore = false;
    const wrap = (value) => (typeof value === "string" ? { value } : value);
    const signal = intercept(createSignal(wrap(config.get()), { equals: (a, b) => a.value === b.value }), undefined, next => {
        !ignore && config.set(next);
        return next;
    });
    config.init &&
        onCleanup(config.init((value = config.get()) => {
            ignore = true;
            signal[1](wrap(value));
            ignore = false;
        }));
    return createRouterComponent({
        signal,
        create: config.create,
        utils: config.utils
    });
}
export function bindEvent(target, type, handler) {
    target.addEventListener(type, handler);
    return () => target.removeEventListener(type, handler);
}
export function scrollToHash(hash, fallbackTop) {
    const el = querySelector(`#${hash}`);
    if (el) {
        el.scrollIntoView();
    }
    else if (fallbackTop) {
        window.scrollTo(0, 0);
    }
}
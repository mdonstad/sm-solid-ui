/*@refresh skip*/
import { getRequestEvent, isServer } from "solid-js/web";
import { children, createMemo, createRoot, mergeProps, on, Show } from "solid-js";
import { createBranches, createRouteContext, createRouterContext, getRouteMatches, RouteContextObj, RouterContextObj } from "../routing.js";
import { createMemoObject, extractSearchParams } from "../utils.js";
export const createRouterComponent = (router) => (props) => {
    const { base } = props;
    const routeDefs = children(() => props.children);
    const branches = createMemo(() => createBranches(props.root ? { component: props.root, load: props.rootLoad, children: routeDefs() } : routeDefs(), props.base || ""));
    const routerState = createRouterContext(router, branches, { base, singleFlight: props.singleFlight });
    router.create && router.create(routerState);
    return (<RouterContextObj.Provider value={routerState}>
      <Routes routerState={routerState} branches={branches()}/>
    </RouterContextObj.Provider>);
};
function Routes(props) {
    const matches = createMemo(() => getRouteMatches(props.branches, props.routerState.location.pathname));
    if (isServer) {
        const e = getRequestEvent();
        if (e && e.router && e.router.dataOnly) {
            dataOnly(e, props.branches);
            return;
        }
        e &&
            ((e.router || (e.router = {})).matches ||
                (e.router.matches = matches().map(({ route, path, params }) => ({
                    path: route.originalPath,
                    pattern: route.pattern,
                    match: path,
                    params,
                    info: route.info
                }))));
    }
    const params = createMemoObject(() => {
        const m = matches();
        const params = {};
        for (let i = 0; i < m.length; i++) {
            Object.assign(params, m[i].params);
        }
        return params;
    });
    const disposers = [];
    let root;
    const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
        let equal = prevMatches && nextMatches.length === prevMatches.length;
        const next = [];
        for (let i = 0, len = nextMatches.length; i < len; i++) {
            const prevMatch = prevMatches && prevMatches[i];
            const nextMatch = nextMatches[i];
            if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
                next[i] = prev[i];
            }
            else {
                equal = false;
                if (disposers[i]) {
                    disposers[i]();
                }
                createRoot(dispose => {
                    disposers[i] = dispose;
                    next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => matches()[i], params);
                });
            }
        }
        disposers.splice(nextMatches.length).forEach(dispose => dispose());
        if (prev && equal) {
            return prev;
        }
        root = next[0];
        return next;
    }));
    return (<Show when={routeStates() && root} keyed>
      {route => <RouteContextObj.Provider value={route}>{route.outlet()}</RouteContextObj.Provider>}
    </Show>);
}
const createOutlet = (child) => {
    return () => (<Show when={child()} keyed>
      {child => <RouteContextObj.Provider value={child}>{child.outlet()}</RouteContextObj.Provider>}
    </Show>);
};
export const Route = (props) => {
    const childRoutes = children(() => props.children);
    return mergeProps(props, {
        get children() {
            return childRoutes();
        }
    });
};
// for data only mode with single flight mutations
function dataOnly(event, branches) {
    const url = new URL(event.request.url);
    const prevMatches = getRouteMatches(branches, new URL(event.router.previousUrl || event.request.url).pathname);
    const matches = getRouteMatches(branches, url.pathname);
    for (let match = 0; match < matches.length; match++) {
        if (!prevMatches[match] || matches[match].route !== prevMatches[match].route)
            event.router.dataOnly = true;
        const { route, params } = matches[match];
        route.load &&
            route.load({
                params,
                location: {
                    pathname: url.pathname,
                    search: url.search,
                    hash: url.hash,
                    query: extractSearchParams(url),
                    state: null,
                    key: ""
                },
                intent: "preload"
            });
    }
}

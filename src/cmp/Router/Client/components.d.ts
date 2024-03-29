import type { Component, JSX } from "solid-js";
import type { MatchFilters, RouteLoadFunc, RouteDefinition, RouterIntegration, RouteSectionProps } from "../types.js";
export type BaseRouterProps = {
    base?: string;
    /**
     * A component that wraps the content of every route.
     */
    root?: Component<RouteSectionProps>;
    rootLoad?: RouteLoadFunc;
    singleFlight?: boolean;
    children?: JSX.Element | RouteDefinition | RouteDefinition[];
};
export declare const createRouterComponent: (router: RouterIntegration) => (props: BaseRouterProps) => JSX.Element;
export type RouteProps<S extends string, T = unknown> = {
    path?: S | S[];
    children?: JSX.Element;
    load?: RouteLoadFunc<T>;
    matchFilters?: MatchFilters<S>;
    component?: Component<RouteSectionProps<T>>;
    info?: Record<string, any>;
};
export declare const Route: <S extends string, T = unknown>(props: RouteProps<S, T>) => JSX.Element;

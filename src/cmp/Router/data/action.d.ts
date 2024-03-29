import { JSX } from "solid-js";
import { Submission } from "../types.js";
export type Action<T extends Array<any>, U> = (T extends [FormData] | [] ? JSX.SerializableAttributeValue : unknown) & ((...vars: T) => Promise<U>) & {
    url: string;
    with<A extends any[], B extends any[]>(this: (this: any, ...args: [...A, ...B]) => Promise<U>, ...args: A): Action<B, U>;
};
export declare const actions: Map<string, Action<any, any>>;
export declare function useSubmissions<T extends Array<any>, U>(fn: Action<T, U>, filter?: (arg: T) => boolean): Submission<T, U>[] & {
    pending: boolean;
};
export declare function useSubmission<T extends Array<any>, U>(fn: Action<T, U>, filter?: (arg: T) => boolean): Submission<T, U>;
export declare function useAction<T extends Array<any>, U>(action: Action<T, U>): (...args: Parameters<Action<T, U>>) => Promise<U>;
export declare function action<T extends Array<any>, U = void>(fn: (...args: T) => Promise<U>, name?: string): Action<T, U>;

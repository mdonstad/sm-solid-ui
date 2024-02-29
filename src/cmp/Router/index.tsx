
//import { useCSRouter } from "./RouterCtx";
import { Component } from "solid-js";
import { createStore } from "solid-js/store";

import { createMemo, createSignal,Show,onMount,lazy,onCleanup,createContext,useContext,createEffect} from "solid-js";
import {routes} from '../../routesSM04.js'
import {bindEvent,ploadm,loadm} from '../../scripts/util.js'
import { useAppConfig } from "../../lib/app";
import Page from '../Page/Page'

let isLoggedIn;
const [pages,setPages] = createStore<Array<Component>>([]);
const [routeUrl, setRouteUrl] = createSignal<string>(window.location.pathname);
const [activeRoute, setActiveRoute] = createSignal(null);
const map = new Map<string,MapR>(routes.map((obj) => [obj.path, obj]));
const mapMod = new Map<string,string>();

const addPage = (pg) => setPages([...pages, pg]);
const getRoute=(url) => map.has(url) ? map.get(url) : null;
const isActive = (r) => r.id === activeRoute()?.id;
const isAuth=(r) => !r?.auth || (r?.auth && isLoggedIn && isLoggedIn());
const findPage = (id) => pages.find((op) => op.id == id);
let _popState=window.history.state;

const addPageToDom = (r:MapR|string) => {
    if (r instanceof String) r=getRoute(r);
    console.log("addPageToDom",r)

    if (r && !isActive(r)){
        if (isAuth(r)){
            if (r?.mod) loadMod(r);
            let id=r.id;
            if (!r.id.startsWith('page-'))
                id=`page-${r.id}`;

            let pageR=findPage(id);
            if (pageR == null) {
                r.id=id;pageR=r;
                setActiveRoute(pageR);
                addPage(pageR);
                return pageR;
            }else
                setActiveRoute(pageR);
            return pageR;
        }
    }else{
        if (r && isActive(r)) return r;
    }
}
const preMod = (r) => {
    if (!isAuth(r)) return;
    if (r?.mod){
       if (!r?.preloaded){
            const mlist=r.mod;
            for(let _=0;_<mlist.length;_++){
                const murl=mlist[_];
                if (!mapMod.has(murl)){
                    ploadm(murl);
                    mapMod.set(murl,"0");
                }
            }
           r.preloaded=true;
       }
    }
}
const loadMod = (r) => {
    if (!r?.modloaded){
        const mlist=r.mod;
        for(let _=0;_<mlist.length;_++){
            const murl=mlist[_];
            if (!mapMod.has(murl)) mapMod.set(murl,'0');
            if (mapMod.has(murl)){
                const s=mapMod.get(murl);
                if (s == "0"){
                    loadm(murl);
                    mapMod.set(murl,"1");
                }
            }
        }
        r.modloaded=true;
        //  r.preloaded=true;
    }
}
const navigateUrl = (url,opt) => {
let popState=_popState || window.history.state;
if (opt?.replace) {console.log("replace,",url); window.history.replaceState(null, null, url);} 
else window.history.pushState(popState, null, url);  
const r=getRoute(url);

setRouteUrl(url);


addPageToDom(r);
}
export const useRouter = () => {
    return {  
        goBack: () => window.history.back(),
        navigate: navigateUrl,
        activeRoute,
        preMod,
        loadMod
    }
};


const Router: Component<{isAuth:boolean}> = (props) => {
    const [appConfig] = useAppConfig();
    isLoggedIn=props.isAuth;

    //createEffect(() => {})
   
    const setPage = (url) => {
        if (!url) url=routeUrl();
        const r=getRoute(url);
        preMod(r);
        let pageR=addPageToDom(r);
        if (pageR) return pageR;
        else{
            if (r && !isAuth(r)){
                const rd=props.rd||'/login';
                navigateUrl(rd);
            }
        }
    }
   
    let destroyPopstateEvent=null;

    const __popstateListener = function (event) {
        const url=window.location.pathname;
        console.log("popstate",event);_popState=event.state; setRouteUrl(url);
        setPage();
    };
    function listen() {
        window.addEventListener('popstate', __popstateListener);
        destroyPopstateEvent=() => window.removeEventListener('popstate',__popstateListener);
         // window.onpopstate = (e) => setTimeout(__popstateListener(e), 0);
    }
  
    const setupRouter=() => { 
        setRouteUrl(window.location.pathname);
        //window.history.replaceState(null, null, window.location.pathname);  
        setPage();
    }
    
    listen();
   
    onMount(()=>{
        setupRouter();
    })
    onCleanup(()=> {if (destroyPopstateEvent) destroyPopstateEvent()});

    return (<div id="cs-router">
         <For each={pages}>{(p) =>{
              const { id, component} = p;
              return(
                <Page name={id}>{component}</Page>
            )
         }}</For>
    </div>);
};

export default Router;


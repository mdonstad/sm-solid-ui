import { createMemo, createSignal,Show,onMount,lazy,onCleanup} from "solid-js";
import type {Component} from "solid-js";
import { useAppConfig } from "../../lib/app";
import Page from '../Page/Page'
import {mergeSearchString} from './utils'
import { createStore } from "solid-js/store";

const [activeRoute, setActiveRoute] = createSignal({});
const activeID=createMemo(() => activeRoute().id);


const [pages,setPages] = createStore<Array<Component>>([]);

interface MapR {id:string,cmp:Component;reqAuth?:boolean;cache?:boolean;active?:boolean;}
const [routeMap, setRouteMap] = createSignal<Map<string,MapR>>();

let divRoot,_popState=window.history.state;
const getPage=(id) => pages.find(p=> p.id == id);

// Handle popstate is for handing broswer back button.
const addPage = (pg) => {
    setPages([...pages, pg]);
    console.log("Add Page",pages)
}
const setPage = (url) => {
    if (!url) return null;
    console.log("setPage",url)

    const curActive=activeRoute();
    if (curActive.path == url) return curActive;
    const map=routeMap();
    const newR=map.has(url) ? map.get(url) : null;
    if (!newR) return null;

    const updatePage = (pg) => {
        setPages([...pages, pg]);
    }

    const removeActivePage = () => {
        const nl=pages.filter(p => p.id !== activeID());
        setPages(nl);
    }
    let pgList=pages,pg=null;
    if (!curActive || curActive.id !== newR.id){
        if (curActive){
            if (!curActive.cache){
                removeActivePage();
            }else{
                curActive.active=false;
                updatePage(curActive);
            }
        }
        pg=getPage(newR.id);
        if (!pg) {
            pg=newR;
            pg.active=true;
            //setActiveRoute(pg);

            addPage(pg);
            console.log("pg added=",{pg})
        }else{
         //   setActiveRoute(pg);
        }
        setActiveRoute(pg);
        //pg.active=true;
    //    console.log("list=",{pgList})
        //updatePages(pgList);
        

    }
    return newR;
}

const __popstateListener = function (event) {
    _popState=event.state;
    setPage(window.location.pathname);
  };
function listen() {
      window.addEventListener('popstate', __popstateListener);
     // window.onpopstate = (e) => setTimeout(__popstateListener(e), 0);
}
function cleanup(){
    window.removeEventListener('popstate',__popstateListener);
}
const init = () => {
    const [appConfig] = useAppConfig();
    const cfg=appConfig();
    const routes=cfg.routes;
    const isF=(o) => o instanceof Function;
    const map = new Map<string,MapR>(routes.map((obj) => [obj.path, {id:obj.id,path:obj.path,cmp: isF(obj.component) ? lazy(obj.component) : lazy(() => Promise.resolve(obj.component)),reqAuth:obj.auth,cache:obj.cache,params:obj.params||{}}]));
    setRouteMap(map);
    return map;
}


export const useNavigate = () => {
    return (url,opt) => {
        const newR=setPage(url);
     //  console.log("navigate()",{newR})
       if (newR){
            let popState=_popState || window.history.state;
            if (opt?.replace){
                window.history.replaceState(popState, null, url);  
            }else {
                window.history.pushState(popState, null, url);  
            }
        }
    }
}
const router = () => {
    const getPage=(n) => root?.querySelector(`div[data-id=page-${n}]`);
    return {
        goBack: () => window.history.back(),
        showPage: () => {

        }
    }
}

import { Component } from "solid-js";
let popState;

const Router: Component<{}> = (props) => {

  console.log("Router()")

  const map=init();
 
    onMount(()=>{
        console.log("router mount")
        listen();
        const u=window.location.pathname;
        const ar=map.has(u) ? map.get(u) : null;
        if (ar){
            if (!ar.reqAuth || (ar.reqAuth && props.isAuth())){
              ar.active=true;
              addPage(ar);
              console.log("pages=",pages)
              //setActiveRoute(ar);
             // updatePages([ar]);
      
            }else{
              if (props.rd){
                     const navigate = useNavigate();
                     let search=mergeSearchString(location.search,props.params||{});
                    navigate(props.rd, { replace: true,search });
              }
            }
        }
    })
    onCleanup(cleanup);

  return (<div ref={divRoot!} id="cs-router">
        <For each={pages}>{(p, i) =>{
              const { id, active, params,cmp} = p;
              console.log(`Creating ${id}, active:${active}`);
            <Page name={id} a={active} params={params}>{cmp}</Page>
         }}</For>
  </div>);
};

export default Router;

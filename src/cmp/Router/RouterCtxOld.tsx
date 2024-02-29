import { createMemo, createSignal,Show,onMount,lazy,onCleanup,createContext,useContext} from "solid-js";
import {routes} from '../../routesSM04.js'
import { createStore } from "solid-js/store";
const RouterContext = createContext();

export function RouterProvider(props) {
    const [activeRoute, setActiveRoute] = createSignal({});
    const [pages,setPages] = createStore<Array<Component>>([]);
    let _popState=window.history.state;
    const map = new Map<string,MapR>(routes.map((obj) => [obj.path, obj]));
    const getRoute=(url) => map.has(url) ? map.get(url) : null;
    const isAuth=(r) => !r?.auth || (r?.auth && props.isAuth());
    const addPage = (pg) => setPages([...pages, pg]);
    const findPage = (id) => pages.find((op) => op.id == id);
    const navigate = (url,opt) => {
        const newR=setPage(url);
        if (newR){
            let popState=_popState || window.history.state;
            if (opt?.replace) window.history.replaceState(popState, null, url);  
            else window.history.pushState(popState, null, url);  
        }
    }
    const routerConfig = [
        activeRoute,
        pages,
        navigate
    ]

    // Check if url is found in route, and if so, add to pages and set active route
    const setPage = (url) => {
        if (!url) return;
        const newR=getRoute(url);
        if (newR){
            //console.log("set page",newR)
            // Check route if authorization/required
            if (isAuth(newR)){
                const id=`page-${newR.id}`;
                let pageR=findPage(id);
                if (pageR == null) {
                    newR.id=id;    
                    pageR=newR;
                    addPage(pageR);
                }
                setActiveRoute(pageR);
                return pageR;
            }else{
                if (props.rd){
                    //const navigate = useNavigate();
                   // let search=mergeSearchString(location.search,props.params||{});
                   navigate(props.rd, { replace: true});
                   //routerCtx[1].
                   //console.log("got rd",{rd,routerConfig})
                }
            }
        }else{
            return;
        }
    }
    const __popstateListener = function (event) {
        _popState=event.state;
        setPage(window.location.pathname);
      };
    function listen() {
          window.addEventListener('popstate', __popstateListener);
    }
    function cleanup(){
        window.removeEventListener('popstate',__popstateListener);
    }
    onMount(()=>{
        listen();
        const u=window.location.pathname;
        console.log("set page",u)
        setPage(u);
    })
    onCleanup(()=>{
        cleanup();
    })
    
    return (
      <RouterContext.Provider value={routerConfig}>
        {props.children}
      </RouterContext.Provider>
    );
  }
  export function useCSRouter() { return useContext(RouterContext); }
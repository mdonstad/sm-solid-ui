
import { Component } from "solid-js";
import { lazy,createSignal } from "solid-js";
import styles from './core.module.css'
import { useAppConfig } from "../lib/app";
let coreRoutes=[];
const [coreRouteMap, setCoreRouteMap] = createSignal([]);
const mapR = () => {
    const routes=coreRoutes;
    const map = new Map(routes.map((obj) => [obj.path, {cmp:obj.component}]));
    setCoreRouteMap(map);
    console.log("map",map);
}
//console.log("core=",coreRoutes)


//const LoginPage=lazy(() => import("../pages/Login"))

const CoreView: Component<{}> = (props) => {
    const [appConfig] = useAppConfig();
    const cfg=appConfig();
    coreRoutes=cfg.routes.filter(t=>t.view === 'core');
    mapR();
  return(<div id="core" class={styles.core}>
  </div>);
};

export default CoreView;
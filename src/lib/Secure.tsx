
import { useAppConfig } from "./app";
import {useNavigate} from '../cmp/Router';
import { Component,onMount } from "solid-js";

const Secure:
 Component<{}> = (p) => {
    const [appConfig] = useAppConfig();
    const cfg=appConfig();
    //console.log("app cfg=",useAppConfig())
    //const [appConfig] = useAppConfig;
    //const cfg=appConfig();
    if (!cfg.auth.isLoggedIn()){
        const navigate = useNavigate();
        navigate("/intro", { replace: true });
    }
  return (<>
  </>);
};

export default Secure;

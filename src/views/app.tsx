

import { Component } from "solid-js";
//import App from './App';
import { lazy } from "solid-js";
import { useAppConfig } from "../lib/app";

//doContent = createMemo(() => !isSplashShown());

const AppView: Component<{}> = ({children}) => {
    const [appConfig] = useAppConfig();
    const cfg=appConfig();
    let IntroPage;
if (!cfg.auth.IsLoggedIn){
    IntroPage=lazy(() => import('../pages/Intro'));
}
  return (<>
        <IntroPage a={true}></IntroPage>
        {children}
  </>);
};
export default AppView;
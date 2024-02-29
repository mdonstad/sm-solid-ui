import type { Component } from 'solid-js';
import { createContext, createSignal,useContext,createMemo,Show,lazy} from 'solid-js';
import styles from './App.module.css';
import MainNav from './cmp/MainNavbar'
import { useAppConfig } from "./lib/app";
import Splash,{splashDone} from './cmp/Splash'
import Router from './cmp/Router/index';

//import { RouterProvider } from "./cmp/Router/RouterCtx";
//import {routes} from './routesSM04.js'
const [isReady, setReady] = createSignal(false);
const App: Component = (props) => {
  const [appConfig,rd] = useAppConfig();
  const cfg=appConfig();
 // console.log("cfg",cfg)
  //doContent = createMemo(() => !isSplashShown());
  const isAuth=() => cfg.auth.isLoggedIn();
  const t=document.createElement('script');t.type="module";t.src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/spinner/spinner.js/+esm";document.body.append(t);
  const t3=document.createElement('script');t3.type="module";t3.src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/icon/icon.js/+esm";document.body.append(t3);
  const t2=document.createElement('script');t2.type="module";t2.src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/shoelace-autoloader.min.js";document.body.append(t2);

  return (
    <>
    <Splash />
    <Show when={splashDone() == true}>
      <Show when={cfg.hasNavBar && isAuth()}>
        <MainNav><span><h3><span>Smart</span>Mixers</h3></span></MainNav>
      </Show>
      <Router isAuth={isAuth} rd="/intro"></Router>
    </Show>
    </>
  );
};

export default App;

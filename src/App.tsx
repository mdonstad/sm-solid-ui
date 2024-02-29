import type { Component } from 'solid-js';
import { createContext, createSignal,useContext,createMemo,Show,lazy} from 'solid-js';
import styles from './App.module.css';
import MainNav from './cmp/MainNavbar'
import { useAppConfig } from "./lib/app";
import Splash,{splashDone} from './cmp/Splash'
import Router from './cmp/Router/index';
import {loadm} from './scripts/util.js'

//import { RouterProvider } from "./cmp/Router/RouterCtx";
//import {routes} from './routesSM04.js'
const [isReady, setReady] = createSignal(false);
const App: Component = (props) => {
  const [appConfig,rd] = useAppConfig();
  const cfg=appConfig(); 
 // console.log("cfg",cfg)
  //doContent = createMemo(() => !isSplashShown());
  const isAuth=() => cfg.auth.isLoggedIn();
  //loadm("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/shoelace-autoloader.min.js");
  loadm("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/card/card.js/+esm");

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

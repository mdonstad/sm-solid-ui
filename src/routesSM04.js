import { render } from "solid-js/web";
//import Page from "./cmp/Page/Page";

import { lazy } from "solid-js";
import IntroCmp from './pages/Intro'
import {preloadCmp} from './cmpLoader'


const HomeCmp=() => import("./pages/Home");
//const IntroCmp=() => import("./pages/Intro/index");
const AboutCmp=() => import("./pages/About");
const LoginCmp=() => import("./pages/Login");
const LoginEmailCmp=() => import("./pages/Login");

export const routes = [
  {
    id:'home',
    path: "/",
    component: lazy(HomeCmp),
    auth:true
},
    {
        id:'about',
        path: "/about",
        component: lazy(AboutCmp),
    },
    {
      id:'intro',
      path: "/intro",
      component: IntroCmp
    },
    {
      id:'login',
      path: "/login",
      component: lazy(LoginCmp),
      onBeforeLoad: () => {
        preloadCmp('sl-input');
      }
    },
    {
      id:'login-email',
      path: "/login/email",
      component: lazy(LoginCmp),
      onBeforeLoad: () => {
        preloadCmp('sl-input');
      }
    }
    
];
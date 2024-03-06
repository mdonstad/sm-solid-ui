import { render } from "solid-js/web";
//import Page from "./cmp/Page/Page";

import { lazy } from "solid-js";
import IntroCmp from './pages/Intro'
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
      component: IntroCmp,
      mod: [{preload:false,url:'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/avatar/avatar/+esm'}],
    },
    {
      id:'login',
      path: "/login",
      component: lazy(LoginCmp),
      mod:['https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/radio-group/radio-group.js/+esm',
      'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/radio-button/radio-button.js/+esm',
      'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/input/input.js/+esm',
      ]
    },
    {
      id:'login-email',
      path: "/login/email",
      component: lazy(LoginCmp),
      mod:[
      'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/input/input.js/+esm'
      ]
    }
    
];
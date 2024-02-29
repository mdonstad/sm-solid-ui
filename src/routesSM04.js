import { render } from "solid-js/web";
//import Page from "./cmp/Page/Page";

import { lazy } from "solid-js";
/*
function PageWrapper({id,cmp,path}) {
    console.log("pageWrapper, path=",path);
    return (
      <Page name={`page-${id}`}>
        {cmp}
      </Page>
    );
}*/
import IntroCmp from './pages/Intro'
const HomeCmp=() => import("./pages/Home");
//const IntroCmp=() => import("./pages/Intro/index");
const AboutCmp=() => import("./pages/About");
const LoginCmp=() => import("./pages/Login");

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
    }
    
];
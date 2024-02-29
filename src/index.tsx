/* @refresh reload */
import { render } from 'solid-js/web';
import { AppConfigProvider } from "./lib/app";
//import Splash from './cmp/Splash'
//import {Router,Route} from './cmp/Router';
import './index.css';
import {createSignal,Show,lazy} from "solid-js"
//import AppView from './views/app';
//import CoreView from './views/core';
import App from './App';
//import Page from './cmp/Page/Page'


const root = document.getElementById('root');
import {loadm} from './scripts/util.js'
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}
loadm("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/spinner/spinner.js/+esm");
loadm("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.14.0/cdn/components/button/button.js/+esm");
render(() => (
  <AppConfigProvider name="Smart Mixers" theme="dark">
      <App></App>
  </AppConfigProvider>
), root!);





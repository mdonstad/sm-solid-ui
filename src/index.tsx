/* @refresh reload */
import { render } from 'solid-js/web';
import { AppConfigProvider } from "./lib/app";
//import Splash from './cmp/Splash'
//import {Router,Route} from './cmp/Router';
import './index.css';
import {createSignal,Show,lazy} from "solid-js"
import App from './App';
//import Page from './cmp/Page/Page'


const root = document.getElementById('root');
import {loadSL} from './scripts/util.js'
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}
const slVersion=document.documentElement?.dataset.shoelaceVersion || '2.14.0';

loadSL(`https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${slVersion}/cdn/components/spinner/spinner.js`,'./assets/shoelace');
loadSL(`https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${slVersion}/cdn/components/button/button.js`);
render(() => (
  <AppConfigProvider name="Smart Mixers" theme="dark" slVersion={slVersion}>
      <App></App>
  </AppConfigProvider>
), root!);





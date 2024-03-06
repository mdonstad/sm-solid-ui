import { Component,onMount } from "solid-js";
import {loadm} from '../../scripts/util.js'

const SLAutoLoader: Component<{ver:string}> = ({ver}) => {
    onMount(()=>{
        window.setTimeout(()=>{
            loadm(`https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@${ver}/cdn/shoelace-autoloader.min.js`);
        },600)
    })
return( 
    <div data-sl-version={ver}></div>
)};
export default SLAutoLoader;
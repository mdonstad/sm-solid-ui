import { Component,onMount } from "solid-js";
import {loadm} from '../../scripts/util.js'

const CmpAutoLoader: Component<{}> = () => {
    onMount(()=>{
        window.setTimeout(()=>{
            loadm(`./cmpLoader.js`);
        },600)
    })
return( 
    <div></div>
)};
export default CmpAutoLoader;
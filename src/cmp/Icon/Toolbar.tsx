import {IToolbar} from './Icon.module.css';
import { Component } from "solid-js";

const Toolbar: Component<{}> = ({children}) => {
  return <div class={IToolbar}>
    {children}
  
</div>
};

export default Toolbar;


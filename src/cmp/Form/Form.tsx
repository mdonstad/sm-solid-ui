
import { Component } from "solid-js";
import styles from './Form.module.css'
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';
import { useAppConfig } from "../../lib/app";
//const [appConfig,rd] = useAppConfig();
//const cfg=appConfig; 
const Form: Component<{id:string,onSubmit:any,children:any}> = ({id,onSubmit,children}) => {
    const [appConfig,funcs] = useAppConfig();
    const cfg=appConfig();
    function submit(e) {
        e.preventDefault();
        const data = serialize(this);
        funcs.saveForm(id,data);
        console.log("f=",id,data);
        onSubmit(e);
    }
return( 
    <form id={id} novalidate onSubmit={submit} class={styles['validity-styles']}>{children}</form>
)};

export default Form;
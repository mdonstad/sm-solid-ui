

import { Component } from "solid-js";
import { eventListener } from "@solid-primitives/event-listener";
import styles from './Login.module.css'
import Form from '../../cmp/Form/Form'
import { createSignal,onMount} from "solid-js";
import { useAppConfig } from "../../lib/app";
const [valid, setValid] = createSignal(false);

const fixNumber = (v:any) => {
    let tmp=v; if (!tmp) return '';
    tmp=tmp.replace(/\D/g,'');
    //const len=tmp.length;
    tmp=tmp.replace(/^(\d{3})/, '$1-');
    tmp=tmp.replace(/^(\d{3})-(\d{3})/, '$1-$2-');
    if (tmp.length > 12) tmp=tmp.substring(0,12);
    return tmp;
}
let phone,el,divInput;

const onInput = (e) => {
    const t=e.target;
    const va=t.value;
    const newVal=fixNumber(va);
    phone=t.value=newVal;
    el=t;
    let isValid;
    if (el) isValid=el.checkValidity();
    setValid(isValid);
    if (isValid) el.blur();

}

const LoginSMS: Component<{}> = (props) => {
    const [appConfig,funcs] = useAppConfig();
    const cfg=appConfig();

    const [loading, setLoading] = createSignal(false);
    const [code, setCode] = createSignal();

    const onSubmit = (e) => {
        e.preventDefault();
        const t=e.target;
        
        //if (el) el.checkValidity();
        setLoading(true);
        window.setTimeout(()=>{
            setLoading(false);
        },3000);
    }
    onMount(()=>{
        window.setTimeout(()=>{
            divInput.focus()
        },400)
    })
    return (
    <Form id="login-phone" onSubmit={onSubmit}>
        <sl-input ref={divInput!} type="tel" name="phone" clearable required help-text="Enter your phone number. Number must be a valid US phone number." size="medium" placeholder="555-555-5555"
    pattern="[1-9]{3}-[1-9]{3}-[0-9]{4}" autocomplete="tel-national"
    use:eventListener={["sl-input", onInput]}
    >
        <sl-icon name="phone" slot="prefix"></sl-icon>
    </sl-input>
    <sl-button type="submit" variant={valid() ? "primary" : "neutral"} disabled={!valid() || loading()} loading={loading()}>Continue</sl-button>
    </Form>);
};

export default LoginSMS;
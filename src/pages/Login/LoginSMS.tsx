

import { Component } from "solid-js";
import { eventListener } from "@solid-primitives/event-listener";
import styles from './Login.module.css'
import { createSignal,onMount} from "solid-js";
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
const onSubmit = (e) => {
    e.preventDefault();
    const t=e.target;
    
    if (el) el.checkValidity();

}
const LoginSMS: Component<{}> = (props) => {
    onMount(()=>{
        window.setTimeout(()=>{
            divInput.focus()
        },300)
    })
    return (<form novalidate onSubmit={onSubmit} class={styles['validity-styles']}>
        <sl-input ref={divInput!} type="tel" name="phone" clearable required help-text="Enter your phone number. Number must be a valid US phone number." size="medium" placeholder="555-555-5555"
    pattern="[1-9]{3}-[1-9]{3}-[0-9]{4}" autocomplete="tel-national"
    use:eventListener={["sl-input", onInput]}
    >
        <sl-icon name="phone" slot="prefix"></sl-icon>
    </sl-input>
    <sl-button type="submit" variant="primary" disabled={!valid()}>Continue</sl-button>
    </form>);
};

export default LoginSMS;
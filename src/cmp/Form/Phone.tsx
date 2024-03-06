import { Component,onMount } from "solid-js";
import styles from './Form.module.css'
import { useAppConfig } from "../../lib/app";
import type { Signal} from 'solid-js';
import { eventListener } from "@solid-primitives/event-listener";
const Phone: Component<{name:string,focus?:boolean,required?:boolean,help?:string,phoneSig:Signal<string>}> = ({name,focus,required,help,phoneSig}) => {
    let phone:string,el,divInput,icon="phone";
    const [setPhone] = phoneSig;
    if (!help) help="Enter a US mobile phone number.";
    if (focus == true){
        onMount(()=>{
            window.setTimeout(()=>{
                divInput.focus()
            },400)
        })
    }
    const fixNumber = (v:any) => {
        let tmp=v; if (!tmp) return '';
        tmp=tmp.replace(/\D/g,'');
        tmp=tmp.replace(/^(\d{3})/, '$1-');
        tmp=tmp.replace(/^(\d{3})-(\d{3})/, '$1-$2-');
        if (tmp.length > 12) tmp=tmp.substring(0,12);
        return tmp;
    }
    const onInput = (e) => {
        const t=e.target;const va=t.value;
        let isValid=true;
        const newVal=fixNumber(va);
        phone=t.value=newVal;
        if (t) {
            isValid=t.checkValidity();
            if (isValid) {t.blur();el=t;setPhone(phone);
            }else setPhone('');
        }
    }
return( 
    <>
    <sl-input ref={divInput!} type="tel" name="phone" size="medium" placeholder="555-555-5555" pattern="[1-9]{3}-[1-9]{3}-[0-9]{4}" use:eventListener={["sl-input", onInput]} autocomplete="tel-national" clearable={true} required={required} help-text={help}>
        <sl-icon name="phone" slot="prefix"></sl-icon>
    </sl-input>
</>)};
export default Phone;
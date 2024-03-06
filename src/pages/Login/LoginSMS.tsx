

import { Component,Show,createSignal } from "solid-js";
import { eventListener } from "@solid-primitives/event-listener";
import styles from './Login.module.css'

import Phone from '../../cmp/Form/Phone'

import { useAppConfig } from "../../lib/app";

const LoginSMS: Component<{}> = () => {
const [phone, setPhone] = createSignal<string>();
const [codeSent, sentCode] = createSignal<boolean>(false);

    console.log("gotCode",codeSent());

    const [appConfig,funcs] = useAppConfig();
    const cfg=appConfig();

    const [loading, setLoading] = createSignal(false);
    const [code, setCode] = createSignal();
    const sendAgain = (e) => {
        e.preventDefault();
        console.log("send again");
    }
    return (
        <Show when={codeSent} fallback={<><h2>Enter the 6 digit code sent to {phone()}</h2><p><a href="#" onClick={(e) => sendAgain(e)}>Didnt receive code? Send code again.</a></p></>}>
            <>
            <h2>Enter your mobile phone to continue.</h2>
            <Phone name="phone" focus={true} required help="Enter your US mobile phone number to login or signup." phoneSig={[phone,setPhone]}></Phone>
            </>
        </Show>
    );
};

export default LoginSMS;
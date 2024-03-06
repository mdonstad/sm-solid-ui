import { Component } from "solid-js";
import { eventListener } from "@solid-primitives/event-listener";

const LoginEmail: Component<{}> = (props) => {
    const [appConfig,funcs] = useAppConfig();
    const cfg=appConfig();

    const [loading, setLoading] = createSignal(false);
    const [code, setCode] = createSignal();
    let email,el,divInput;
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
    <Form id="login-email" onSubmit={onSubmit}>
    <h2>Enter your Email to continue.</h2>
        <sl-input ref={divInput!} type="email" name="email" clearable required help-text="Enter your email to login or signup." size="medium" placeholder="555-555-5555"
    autocomplete="email">
        <sl-icon name="phone" slot="prefix"></sl-icon>
    </sl-input>
    <a href="/login"><small>Use Phone number instead</small></a>
    <sl-button type="submit" variant={valid() ? "primary" : "neutral"} disabled={!valid() || loading()} loading={loading()}>Continue</sl-button>
    </Form>);
};

export default LoginEmail;
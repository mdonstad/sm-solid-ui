
import { Component,createSignal,Show } from "solid-js";
import Header from '../../cmp/Page/Header'
import styles from './Login.module.css'
import CenterWrap from '../../cmp/Misc/CenterWrap'
import pageStyles from '../../cmp/Page/Page.module.css'
import Form from '../../cmp/Form/Form'
import LoginSMS from './LoginSMS'
import Logo from '../../lib/logo'
import { useRouter } from "../../cmp/Router";
const Login: Component<{}> = (props) => {
    const r=useRouter();
    const [valid, setValid] = createSignal(false);
    const [method, setMethod] = createSignal<string>("phone");
    const [loading, setLoading] = createSignal(false);
    const onSubmit = (e) => {
        e.preventDefault();
        const t=e.target;
        setLoading(true);
        window.setTimeout(()=>{
            setLoading(false);
        },3000);
    }
    const clickChange = (e,show) => {
        e.preventDefault();
        usePhone(show);
    }
    return (
    <>
    <Header><Logo></Logo></Header>
    <main>
        <CenterWrap>
            <div class={styles.Login}>
                <Form id="login-user" onSubmit={onSubmit}>
                    <input type="hidden" name="method" value={method()} />
                    <Show when={method() == 'phone'} fallback={
                        <a href="#" onClick={(e) => clickChange(e,true)}><small>Use Mobile phone instead</small></a>
                    }>
                        <div class={styles.LoginSMS}>
                            <LoginSMS></LoginSMS>
                            <a href="#" onClick={(e) => clickChange(e,false)}><small>Use Email address instead</small></a>
                        </div>
                    </Show>
                    <sl-button type="submit" variant={valid() ? "primary" : "neutral"} disabled={!valid() || loading()} loading={loading()}>Continue</sl-button>
                </Form>
            </div>
        </CenterWrap>
    </main>
</>)
};

export default Login;
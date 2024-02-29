
import { Component } from "solid-js";
import Header from '../../cmp/Page/Header'
import LogoText from '../../cmp/Misc/LogoText'
import styles from './Login.module.css'
import pageStyles from '../../cmp/Page/Page.module.css'

import LoginSMS from './LoginSMS'
import {Motion} from "solid-motionone";
//import Page from '../../cmp/Page/Page'

const Login: Component<{}> = (props) => {
    console.log("login",{props})
    return (
    <>
    <Header><LogoText><span>Smart</span>Mixers</LogoText></Header>
    <main>
        <div class={pageStyles.wrap}>
            <div class={styles.Login}>
                <sl-radio-group  size="medium" help-text="Select a login/signup method so we can locate or create a new account." name="slm" value="1">
                        <sl-radio-button class="login-choose-button" value="1">Sign in with Phone</sl-radio-button>
                        <sl-radio-button class="login-choose-button" value="2">Sign in with Email</sl-radio-button>
                </sl-radio-group>
                <div class={styles.LoginSMS}><LoginSMS></LoginSMS></div>
            </div>
        </div>
    </main>
</>)
};

export default Login;
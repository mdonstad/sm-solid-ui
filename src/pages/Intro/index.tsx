
import { Component,Show } from "solid-js";
//import Page from '../../cmp/Page/Page'
import CenterWrap from '../../cmp/Misc/CenterWrap'
import Header from '../../cmp/Page/Header'
import Footer from '../../cmp/Page/Footer'
import styles from './Intro.module.css'
import LogoText from '../../cmp/Misc/LogoText'
import RouteButton from '../../cmp/Button/RouteButton'
import Icon from '../../cmp/Icon/Icon'
import QRScan from './mobile'

import { useRouter } from "../../cmp/Router";
//import { useNavigate } from "../../cmp/Router";
import { useAppConfig } from "../../lib/app";
const Intro: Component<{}> = (props) => {
    const [appConfig] = useAppConfig();
    const cfg=appConfig(); 
    const r=useRouter();
    return(
        <>
            <Header sticky><LogoText ><span>Smart</span>Mixers</LogoText></Header>
            <main>
            <CenterWrap>
                <div class={styles.Heading}><h2>Welcome!</h2>
                <p class={styles.line}>
                Smart Mixers is a new twist to social<br/>and singles mixer events.
                </p>
                </div>
                <div class={styles.Intro}>
                <p><Icon icon="id-card" width="32px" height="32px" color="orange" /><span>Powerful Smart profile technology for better user compatibility matching.</span></p>
                    <p><Icon icon="calendar" width="32px" height="32px" color="lightblue" /><span>Exclusive monthly singles and social events in Southern California.</span></p>
                    <p><Icon icon="circle-check" width="32px" height="32px" color="green" /><span>FREE to Signup!</span></p>
                </div>
                <Show when={!cfg.isMobile}>
                    <QRScan>
                        <small>Scan code with mobile device to get started.</small>
                    </QRScan><br/><br/>
                </Show>
            </CenterWrap>
            </main>
            <Show when={cfg.isMobile}>
                <Footer>
                    <RouteButton href="/login">Continue</RouteButton>
                </Footer>
            </Show>
           

        </>
      )
};

export default Intro;
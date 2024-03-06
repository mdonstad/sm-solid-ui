
import { Component,Show } from "solid-js";
//import Page from '../../cmp/Page/Page'
import CenterWrap from '../../cmp/Misc/CenterWrap'
import Header from '../../cmp/Page/Header'
import Footer from '../../cmp/Page/Footer'
import styles from './Intro.module.css'
import Logo from '../../lib/logo'
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
            <Header sticky><Logo></Logo></Header>
            <main>
            <CenterWrap>
                <div class={styles.Heading}><h2>Welcome!</h2>
                <p class={styles.line}>
                Smart Mixers is a new twist to social<br/>and singles mixer events.
                </p>
                </div>
                <div class={styles.Intro}>
                <p><Icon icon="id-card" color="orange" /><span>Powerful Smart profile technology for better user compatibility matching.</span></p>
                    <p><Icon icon="champagne-glasses" color="#E56E94" /><span>Check profiles and compatibility scores during the events. </span></p>
                    <p><Icon icon="heart" color="red" /><span>Exchange private contact info with others at events with a simple tap.</span></p>
                    <p><Icon icon="calendar" color="lightblue" /><span>Exclusive monthly singles and social events in Southern California.</span></p>
                    <p><Icon icon="circle-check" color="green" /><span>FREE to Signup!</span></p>
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
                    <RouteButton href="/login" full>Continue</RouteButton>
                </Footer>
            </Show>
           

        </>
      )
};

export default Intro;
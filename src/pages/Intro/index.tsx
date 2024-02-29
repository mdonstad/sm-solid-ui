
import { Component } from "solid-js";
//import Page from '../../cmp/Page/Page'
import CenterWrap from '../../cmp/Misc/CenterWrap'
import Header from '../../cmp/Page/Header'
import styles from './Intro.module.css'
import LogoText from '../../cmp/Misc/LogoText'
import { useRouter } from "../../cmp/Router";
//import { useNavigate } from "../../cmp/Router";
const Intro: Component<{}> = (props) => {
    const r=useRouter();
    return(
        <>
            <Header><LogoText><span>Smart</span>Mixers</LogoText></Header>
            <main>
            <CenterWrap>
                <div class={styles.Intro}>
                    <sl-card >
                    <LogoText>Welcome to Smart Mixers!</LogoText>
                    <p>We bring a new and exciting twist to social and
                        singles mixer events.</p>
                    <p> Join now, and create your 
                        smart profile to get started.
                    </p>
                    <sl-button onClick={() => r.navigate('/login',{ replace: true })} variant="primary" size="medium">Continue with Login or Signup</sl-button>
                    </sl-card>
                </div>
            </CenterWrap>
            </main>
        </>
      )
};

export default Intro;
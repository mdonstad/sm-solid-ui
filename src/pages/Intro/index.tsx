
import { Component } from "solid-js";
//import Page from '../../cmp/Page/Page'
import CenterWrap from '../../cmp/Misc/CenterWrap'
import Header from '../../cmp/Page/Header'
import styles from './Intro.module.css'
import LogoText from '../../cmp/Misc/LogoText'
import RouteButton from '../../cmp/Button/RouteButton'
import AvatarTina from '../../cmp/Avatar/Tina'

import { useRouter } from "../../cmp/Router";
//import { useNavigate } from "../../cmp/Router";

const Intro: Component<{}> = (props) => {
    const r=useRouter();
    return(
        <>
            <Header sticky><LogoText><span>Smart</span>Mixers</LogoText></Header>
            <main>
            <CenterWrap>
                <AvatarTina></AvatarTina>
                <div class={styles.Intro}>
                    <p class={styles.Heading}><LogoText>Welcome to <span>Smart</span> Mixers!</LogoText></p>
                    <p>A new and exciting twist to social and
                        singles mixer events.</p>
                    <p>My name is Tina, and I will be your virtual host throughout your journey in
                        meeting new people. Maybe even help you find that special someone, if thats you 
                        are looking for. 
                    </p>
                </div>
                <RouteButton href="/login">Continue with Login or Signup</RouteButton>

            </CenterWrap>
            </main>
        </>
      )
};

export default Intro;
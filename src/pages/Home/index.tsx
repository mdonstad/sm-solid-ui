
import type { Component } from "solid-js";
import {Show} from 'solid-js'
//import Page from '../../cmp/Page/Page'
import {useRouter} from '../../cmp/Router'

import { useAppConfig } from "../../lib/app";
const Home: Component<{}> = (props) => {
  console.log("Loading Home")
  const [appConfig] = useAppConfig();
  const {auth}=appConfig();
  if (!auth.isLoggedIn()) {
    r=useRouter().navigate('/intro',{replace: true});
  }
  else{
    let u=props;
    const p=props.params;
    return(
      <>
        <main>
        <p>Hello World!</p>
        <sl-button onClick={() => navigate('/about')}>About</sl-button>
        </main>
      </>
  )}
};

export default Home;
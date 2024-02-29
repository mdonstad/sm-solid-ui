

import { Component } from "solid-js";
import { useRouter } from "../../cmp/Router";

const index: Component<{}> = (props) => {
    const r = useRouter();

  return (
  <div>
  <main>About Us

  <sl-button onClick={() => r.navigate('/intro')}>Intro</sl-button>
  </main>
  </div>
  );
};

export default index;
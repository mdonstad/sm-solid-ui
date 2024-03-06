import {Motion,Presence} from "solid-motionone";
import {createSignal,Show,onMount} from "solid-js";
//import { useBeforeLeave } from "@solidjs/router";
import { Component } from "solid-js";


const SlideAnim: Component<{type:string,children?:any,show?:any}> = ({type,children,show}) => {
    const [isShown, setShow] = createSignal(show);

  let inFrom,inTo,outFrom,outTo;
  if (type == 'slideIn'){inFrom="100vw"; inTo=0;
    }else if (type == 'slideOut'){outFrom=0; outTo="100vw";
    }
  onMount(()=>{
  })

  return (
    <Presence exitBeforeEnter>
        <Show when={isShown()}>
            <Motion.div style={"position:absolute;height:100vh;width:100vw"}
            animate={{  x: [inFrom,inTo] }}
        transition={{ duration: 0.6,ease: 'ease-in' }}
        exit={{ transition: { direction: 'reverse',duration: 0.3,ease: 'ease-out'}}}>
            {children}
            </Motion.div>
        </Show>
    </Presence>
  )
};

export default SlideAnim;
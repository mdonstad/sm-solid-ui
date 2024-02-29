export {Router} from './Client';
export { Route } from "./Client/components.jsx";

import {useNavigate,useIsRouting,useLocation,useMatch,useParams,useSearchParams,
    useBeforeLeave} from './routing';

export const navigate = (url,opts) => {
    const loc=window.location.pathname;
    if (url == loc) return;
    console.log("URL",{url,loc})
    const nav=useNavigate();
    nav(url, opts);
}
export {useIsRouting,useLocation,useMatch,useParams,useSearchParams,
    useBeforeLeave
} 
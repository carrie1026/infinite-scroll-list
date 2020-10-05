import Loadable from "react-loadable";
import Loading from './components/Loading'

export default [
    {
        component: Loadable({
            loader: () => import('./containers/app/index'),
            loading: Loading
        }),
        path: "/index"
    }
];

import axios from 'axios'

import ReactGA from 'react-ga';
import { conf } from './conf';

export function Analytics() {
    axios.post(conf.endPoint + '/api/analytics/get').then((resp) => {
        if (resp.data.length) {
            ReactGA.initialize(resp.data[0].trackingCode);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    })
}


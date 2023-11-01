import axios from 'axios';
import { getLoginData } from './loginsys';
let d = getLoginData()
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: d.url + '/api/client',
    headers: {
        Authorization: 'Bearer ' + d.key,
        // cookie: 'eeee',
        // "Cache-Control": "no-cache",
        // "Cookie": document.cookie
    },
    withCredentials: true,
  });
export default api;

export const getServers = () => {
    return api.get('/').then(r => r.data.data)
}
export const getServer = (id) => {
    return api.get('/servers/'+id).then(r => r.data.attributes)
}
// window.getServers = getServers
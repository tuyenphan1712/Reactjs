import axios from "axios";

const instance = axios.create({
    baseURL: 'https://buysourcecode-production.up.railway.app/api/v2',
    timeout: 5000,
});

export { instance };
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.sourceuit.tech/api/v2',
    timeout: 5000,
});

export { instance };
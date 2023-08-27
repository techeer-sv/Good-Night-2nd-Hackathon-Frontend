import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

export function callApi(type, path, data = null) {
    switch (type) {
        case "GET":
            return api.get(path);
        case "POST":
            return api.post(path, data);
        case "PUT":
            return api.put(path, data);
        case "DELETE":
            return api.delete(path);
        default:
            console.error("잘못된 호출입니다.");
            break;
    }
}

export default api;

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

function callApi(type, path, data = null) {
    switch (type) {
        case "get":
            return api.get(path);
        case "post":
            return api.post(path, data);
        case "put":
            return api.put(path, data);
        case "delete":
            return api.delete(path);
        default:
            console.error("잘못된 호출입니다.");
            break;
    }
}

export default api;

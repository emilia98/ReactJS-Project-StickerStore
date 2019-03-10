const api = 'http://localhost:8080/tag';
const options = {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: {}
}

class TagService {
    static create(data) {
        options.body = JSON.stringify(data);
        return fetch(api + '/create', options);
    }
}

export default TagService;
const api = 'http://localhost:8080/user';
const options = {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: {}
}

class UserService {
    static listAll() {
        return fetch(api + '/all', { method: 'get'});
    }

    static create(data) {
        options.body = JSON.stringify(data);
        return fetch(api + '/create', options);
    }

    static editGet(id) {
        return fetch(api + '/edit/' + id, { method: 'get'});
    }

    static editPost(data, id) {
        options.body = JSON.stringify(data);
        return fetch(api + '/edit/' + id, options);
    }
    
    static changeStatus(id) {
        return fetch(api + '/status/' + id, { method: 'get'});
    }
}

export default UserService;
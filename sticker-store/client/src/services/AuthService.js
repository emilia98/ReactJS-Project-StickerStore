const api = 'http://localhost:8080/auth';
const options = {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: {}
}

class AuthService {
    static signUp(data) {
        options.body = JSON.stringify(data);
        return fetch(api + '/signup', options);
    }
}

export default AuthService;
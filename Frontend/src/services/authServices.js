import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const login = (rfc, password) => {
    return axios
        .post(API_URL + 'auth/login', { rfc, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

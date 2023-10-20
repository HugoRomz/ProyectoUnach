import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const login = (rfc, password) => {
    return axios
        .post(API_URL + 'auth/login', { rfc, password })
        .then(response => {
            return response.data;
        });
};

export const getPermisos = (rfc) => {
    const token = localStorage.getItem('token');

    return axios.get(API_URL + 'auth/permisos/' + rfc, {
        headers: {
            'Authorization': token
        }
    });
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permisos');
};

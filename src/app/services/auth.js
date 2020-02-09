import api from './api';

const register = async (user) => {
    try {
        const { token } = await api.post('auth/register', user)
        return token;
    } catch (e) {
        return e;
    }
}
const login = async (user) => {
    try {
        const { token } = await api.post('auth/login', user)
        return token;
    } catch (e) {
        return e;
    }
}

export default { login, register };
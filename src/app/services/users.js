import api from './api';

const getUsers = async () => {
    try {
        return await api.get('users')
    } catch (e) {
        return e;
    }
}
const getUsersEntrepreneurs = async () => {
    try {
        return await api.get('users/entrepreneurs')
    } catch (e) {
        return e;
    }
}
const getUserVehicles = async (userId) => {
    try {
        return await api.get(`users/${userId}/vehicles`)
    } catch (e) {
        return e;
    }
}
const getUserWorkers = async (userId) => {
    try {
        return await api.get(`users/${userId}/workers`)
    } catch (e) {
        return e;
    }
}

export default { getUsers, getUserVehicles, getUsersEntrepreneurs, getUserWorkers };
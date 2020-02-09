import api from './api';

const getVehicles = async () => {
    try {
        return await api.get('vehicles')
    } catch (e) {
        return e;
    }
}
const createVehicles = async (vehicle) => {
    try {
        return await api.post('vehicles', vehicle)
    } catch (e) {
        return e;
    }
}

export default { getVehicles, createVehicles };
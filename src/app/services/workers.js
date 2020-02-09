import api from './api';

const getWorkers = async () => {
    try {
        return await api.get('workers')
    } catch (e) {
        return e;
    }
}
const createWorkers = async (worker) => {
    try {
        return await api.post('workers', worker)
    } catch (e) {
        return e;
    }
}
const addWorkerVehicle = async (workerId, vehicleId) => {
    try {
        const body = { vehicleId }
        return await api.post(`workers/${workerId}/vehicles`, body)
    } catch (e) {
        return e;
    }
}
const getWorkersByIdVehicles = async (workerId) => {
    try {
        return await api.get(`workers/${workerId}/vehicles`)
    } catch (e) {
        return e;
    }
}
const getWorkerVehicles = async () => {
    try {
        return await api.get(`workers/vehicles`)
    } catch (e) {
        return e;
    }
}

export default { getWorkers, createWorkers, addWorkerVehicle, getWorkersByIdVehicles, getWorkerVehicles };
import api from './api';

const getWorkerdays = async () => {
    try {
        return await api.get(`workdays`)
    } catch (e) {
        return e;
    }
}


const creatWorkerdayStart = async (body) => {
    try {
        return await api.post(`workdays/startday`, body)
    } catch (e) {
        return e;
    }
}

const creatWorkerdayEnd = async (body) => {
    try {
        const { id } = body;
        delete body.id;
        return await api.post(`workdays/${id}/endday`, body)
    } catch (e) {
        return e;
    }
}

export default { getWorkerdays, creatWorkerdayStart, creatWorkerdayEnd };
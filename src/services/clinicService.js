import axios from '../axios';

const createClinic = async (inputData) => {
    return await axios.post(`/api/create-new-clinic`, inputData);
};

const getAllClinicsService = async () => {
    return await axios.get(`api/get-all-clinics`);
};

export { createClinic, getAllClinicsService };

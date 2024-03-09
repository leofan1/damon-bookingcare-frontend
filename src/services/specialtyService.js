import axios from '../axios';

const createSpcialty = async (inputData) => {
    return await axios.post(`/api/create-new-specialty`, inputData);
};

const getAllSpecialtiesService = async (inputId) => {
    return await axios.get(`/api/get-all-specialties?id=${inputId}`);
};

const deleteSpecialtyService = async (inputId) => {
    return await axios.delete('/api/delete-specialty', {
        data: { id: inputId },
    });
};

export { createSpcialty, getAllSpecialtiesService, deleteSpecialtyService };

import axios from '../axios';

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = async () => {
    return await axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = async (data) => {
    return await axios.post('/api/save-info-doctors', data);
};

const saveBulkScheduleDoctor = async (inputData) => {
    return await axios.post(`/api/bulk-create-schedule`, inputData);
};

const getScheduleDoctorByDate = async (inputDoctorId, inputDate) => {
    return await axios.get(`/api/get-schedule-doctor-by-date?doctorId=${inputDoctorId}&date=${inputDate}`);
};

const getDetailInfoDoctor = async (inputId) => {
    return await axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export {
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getDetailInfoDoctor,
};

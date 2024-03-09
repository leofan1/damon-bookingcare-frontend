import axios from '../axios';

const handleLoginApi = async (userEmail, userPassword) => {
    return await axios.post('/api/login', {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsersService = async () => {
    return await axios.get('/api/get-all-users');
};

const createUserService = async (data) => {
    return await axios.post('/api/create-new-user', data);
};

const deleteUserService = async (userEmail) => {
    return await axios.delete('/api/delete-user', {
        data: { email: userEmail },
    });
};

const getUserByEmailService = async (userEmail) => {
    return await axios.get(`/api/get-user-by-email?email=${userEmail}`);
};

const updateUserService = async (inputData) => {
    return await axios.put('/api/update-user', inputData);
};

const getAllCodeService = async (inputType) => {
    if (!inputType) {
        inputType = 'ALL';
    }
    return await axios.get(`/api/get-allcode?type=${inputType}`);
};

const postPatientBookAppointment = async (data) => {
    return await axios.post('/api/patient-book-appointment', data);
};

export {
    handleLoginApi,
    getAllUsersService,
    createUserService,
    deleteUserService,
    getUserByEmailService,
    updateUserService,
    getAllCodeService,
    postPatientBookAppointment,
};

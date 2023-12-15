import axios from '../utils/axiosCustomize';


const getAllHoKhau = async () => {
    return await axios.get('/api/v1/hokhau');
}

const getAllNhanKhau = async () => {
    return await axios.get('/api/v1/nhankhau');
}

const createNhanKhau = async (data) => {
    return await axios.post('/api/v1/nhankhau', data);
}

const updateNhanKhau = async (data) => {
    return await axios.put('/api/v1/nhankhau', data);
}


const deleteNhanKhau = async (MaSoDinhDanh) => {
    return await axios.delete(`/api/v1/nhankhau/${MaSoDinhDanh}`);
};


export {
    getAllHoKhau,
    getAllNhanKhau,
    createNhanKhau,
    updateNhanKhau,
    deleteNhanKhau
}
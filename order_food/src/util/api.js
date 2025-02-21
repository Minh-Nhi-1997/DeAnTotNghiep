
import axios from './axios.customize';

const createItemApi = (name, price, img, c_id) => {
    const URL_API = "/v1/api/post-item";
    const data = {
        name, price, img, c_id
    }
    return axios.post(URL_API, data)
}

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    }
    return axios.post(URL_API, data)
}

const loginApi = ( email, password, role) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password, role
    }
    return axios.post(URL_API, data)
}

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API)
}
const getProductApi = (c_id) => {
    const URL_API = "/v1/api/product";
    const data = {c_id}
    return axios.post(URL_API, data)
}
const getOneProductApi = (itemId) => {
    const URL_API = "/v1/api/product/"+itemId;
    return axios.get(URL_API)
}
const editItemApi = (itemId, name, price, img, c_id) => {
    const URL_API = "/v1/api/edit-item";
    const data = {
        itemId, name, price, img, c_id
    }
    return axios.put(URL_API, data)
}
const deleteProductApi = ( itemId ) => {
    const URL_API = "/v1/api/delete-item";
    return axios.delete(URL_API, 
        {
            data: {itemId},
            headers: { 'Content-Type': 'application/json', },
        }
    )
}
const editTableApi = (tableId, values) => {
    const {table_name, capacity, notes} = values;
    const URL_API = `/v1/api/edit-table/${tableId}`;
    // console.log(">>> Check URL API:", URL_API); // 🔍 In ra để kiểm tra
    const data = { tableId, table_name, capacity, notes };
    return axios.put(URL_API, data);
};
const deleteTableApi = (id) => {
    return axios.delete(`/v1/api/delete-table/${id}`);
};


const getCategoryApi = () => {
    const URL_API = "/v1/api/category";
    return axios.get(URL_API)
}
const getTableApi = () => {
    const URL_API = "/v1/api/table";
    return axios.get(URL_API)
}

const createTableApi = (table_name, capacity, notes) => {
    const URL_API = "/v1/api/post-table";
    const data = {
        table_name, capacity, notes
    }
    return axios.post(URL_API, data)
}


export {
    createUserApi,loginApi,getUserApi,
    createItemApi, editItemApi,getProductApi, getOneProductApi, getCategoryApi,
    createTableApi,
    getTableApi, deleteProductApi,  editTableApi,deleteTableApi
}
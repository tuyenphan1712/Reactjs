import {instance} from "../../axios/config";
import {useContext} from "react";
import {AppLoadingContext} from "../../context/app-context";

export const getData= async ({pageNumber, pageSize, search} ) => {
    try {

        const res = await instance.get('/products/list', {
            params: {
                pageNumber,
                pageSize,
                search
            }
        });

        // console.log("Cuc getData: ", res.data);

        return res.data;
    } catch(err) {
        console.log('errr', err)
        throw err;
    }
}

export const getDataById = async (id) => {
    try {
        const res = await instance.get(`/products/${id}`);
        console.log("API response:", res.data);
        return res.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const createData = async ({ name, description, slug, categoryId, price }) => {
        try {
            const newData = await instance.post('/products/create', {
                name,
                description,
                slug,
                categoryId,
                price
            })
            console.log('data: ',newData);
            return newData.data;
        } catch(err) {
            console.log('errr', err);
            throw err;
        }

}

export const updateData = async ({id, name, description, price}) => {
    console.log('body', id, name, price);
    try {
        const newData = await instance.put('/products/update', {
            id,
            name,
            description,
            price
        })

        return newData.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const deleteData = async (id) => {
    try{
        const res = await instance.delete(`/products/${id}`);
        console.log("API response:", res.data);
        // return res.data;
    } catch (e) {
        console.log('errr', e);
        throw e;
    }
}


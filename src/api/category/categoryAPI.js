import {instance} from "../../axios/config";

export const getCategories = async ({pageNumber, pageSize, search} ) => {
    try {

        const res = await instance.get('/categories/list', {
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

export const getCategoryById = async (id) => {
    try {
        const res = await instance.get(`/categories/${id}`);
        // console.log("API response:", res.data);
        return res.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const getCategoryBySlug = async (slug) => {
    try {
        const res = await instance.get(`/categories/slug/${slug}`);
        // console.log("API response:", res.data);
        return res.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const checkCategorySlug = async (slug) => {
    try {
        const res = await instance.get(`/categories/check/${slug}`);
        console.log("API response:", res.data);
        return res.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const createCategory = async ({ name, slug }) => {
    try {
        const newData = await instance.post('/categories/create', {
            name,
            slug
        })
        console.log('data: ',newData);
        return newData.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }

}

export const updateCategory = async ({ id, name, slug }) => {
    console.log('body', id, name, slug);
    try {
        const newData = await instance.put('/categories/update', {
            id,
            name,
            slug
        })

        return newData.data;
    } catch(err) {
        console.log('errr', err);
        throw err;
    }
}

export const deleteCategory = async (id) => {
    try{
        const res = await instance.delete(`/categories/${id}`);
        console.log("API response:", res.data);
        // return res.data;
    } catch (e) {
        console.log('errr', e);
        throw e;
    }
}
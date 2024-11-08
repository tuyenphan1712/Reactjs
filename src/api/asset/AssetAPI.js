import {instance} from "../../axios/config";

export const createAssets = async (image) => {
    try {
        const form = new FormData();
        form.append('model', 'product');
        form.append('file', image);
        form.append('createBy', 'bc1bccb6-cd7d-4c48-8b9f-a4c71dd79cdf');

        return instance.post('/assets/create', form);


    } catch (err) {
        console.log(err);
        throw err;
    }

}
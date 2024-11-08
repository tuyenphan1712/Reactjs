

import {useNavigate, useParams} from "react-router-dom";
import {FormInput} from "../../component/form-input";
import {useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/app-context";
import {useUpdateCategory} from "../../api/category/useUpdateCategory";
import {useGetCategoryById} from "../../api/category/useGetCategoryById";
import {useCreateCategory} from "../../api/category/useCreateCategory";


const CategoryDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const {setLoading, setError} = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            name: "",
            slug: ""
        }
    });

    const  {
        data : dataCreateCategory,
        mutate: createCategory,
        error : errorCreateCategory,
        isPending
    } = useCreateCategory();

    const {
        mutate: updateCategory
    } = useUpdateCategory();

    const handleClickSaveProduct = (data) => {
        // await updateData(data);
        if(id === '')
            createCategory(data).then((dataCreateCategory) => {});
        else
            updateCategory(data).then((dataCreateCategory) => {});

        navigate(-1);
    }

    const handleClickCancel = () => {
        navigate(-1);
    }

    const {
        data,
        isFetching
    } = useGetCategoryById(id);

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching])

    useEffect(() => {
        if(data)
            reset(data);
    }, [data]);

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit(handleClickSaveProduct)} className="w-full max-w-lg">
                <FormInput
                    label="Category Name:"
                    type="text"
                    placeholder="category name"
                    register={register("name", {required: "Khong duoc de trong"})}
                    err={errors.name && errors.name.message}
                />

                <FormInput
                    label="Category Slug:"
                    type="text"
                    placeholder="category slug"
                    register={register("slug", {
                        required: "Khong duoc de trong",
                    })}
                    err={errors.price && errors.price.message}
                />

                {/* Updated div for centering buttons */}
                <div className="flex justify-center mt-6">
                    <button className="p-2 bg-blue-600 text-white rounded-md mr-4" type="submit">
                        Create
                    </button>

                    <button className="p-2 bg-green-600 text-white rounded-md mr-4"
                            type="submit">
                        Update
                    </button>

                    <button
                        className="p-2 bg-gray-500 text-white rounded-md"
                        type="button"
                        onClick={handleClickCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export {CategoryDetail}
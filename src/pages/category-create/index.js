import {FormInput} from "../../component/form-input";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useCreateCategory} from "../../api/category/useCreateCategory";
import {convertSlug} from "../../util/convert-to-slug";
import {useEffect, useState} from "react";
import {useCheckCategorySlug} from "../../api/category/useCheckCategorySlug";
import {useUpdateCategory} from "../../api/category/useUpdateCategory";

const CategoryCreate = () => {

    const navigate = useNavigate();
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: {
            id: "",
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

    const name = watch('name');
    const slug = watch('slug');

    useEffect(() => {
        const slug = convertSlug(name);
        setValue('slug', slug);
    }, [name]);

    const [isExists, setIsExists] = useState(false);

    const {
        mutate: checkCategorySlug
    } = useCheckCategorySlug();

    useEffect(() => {
        if(slug) {
            checkCategorySlug(slug)
                .then((data) => {
                    console.log('checkCategorySlug', data);
                    if(data === false) {
                        setIsExists(true);
                    } else {
                        setIsExists(false);
                    }
                });
        }
    }, [checkCategorySlug, slug]);

    const id = watch('id');

    const handleClickSaveProduct = (data) => {
        // console.log('save data', data)
        // console.log('save', errors)

        if(id === '')
            createCategory(data).then((dataCreateCategory) => {});
        else
            updateCategory(data).then((dataCreateCategory) => {});

        navigate(-1);
    }

    const handleClickCancel = () => {
        navigate(-1);
    }

    console.log('isExists', isExists);
    console.log('errors', errors)
    return (
        <div className="p-6">
            <form onSubmit={handleSubmit(handleClickSaveProduct)} className="w-full max-w-lg">

                <FormInput
                    label="Category Id:"
                    type="text"
                    placeholder="category id"
                    register={register("id")}
                />

                <FormInput
                    label="category name:"
                    type="text"
                    placeholder="Category name"
                    register={register("name", {required: "Khong duoc de trong"})}
                    err={errors.name && errors.name.message}
                />

                <FormInput
                    label="Category slug:"
                    type="text"
                    placeholder="category slug"
                    register={register("slug",
                        {
                            required: "Khong duoc de trong",
                            validate: (value) => !isExists || 'slug bi trung lap'
                        })}
                    err={errors.slug && errors.slug.message}
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
    );
}

export {CategoryCreate}
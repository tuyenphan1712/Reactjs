import {FormInput} from "../../component/form-input";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useCreateProduct} from "../../api/product/useCreateProduct";
import {useEffect} from "react";
import {useGetCategories} from "../../api/category/useGetCategories";
import {useCreateAsset} from "../../api/asset/useCreateAsset";

const ProductCreate = () => {

    const navigate = useNavigate();

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            categoryId: "",
            description: "",
            price: 0,
            image: "",
            imageList: []
        }
    });

    const image = watch('image');
    const imageList = watch('imageList') || [];

    const {
        data: dataAsset,
        mutate: createAsset
    } = useCreateAsset();

    useEffect(() => {
        console.log("image: ",image?.[0]);

        if(image?.[0]) {
            createAsset(image?.[0]).then(data => {
                setValue('imageList', [...imageList, data.data]);

            }).catch(error => {
                console.log("create Asset: ",error);
            });
        }

    }, [image])

    console.log("image list: ",imageList);

    const  {
        data : dataCreateProduct,
        mutate,
        error : errorCreateProduct,
        isPending
    } = useCreateProduct();

    const {
        data: dataCategory
    } = useGetCategories( { pageNumber: 0, pageSize: 50 , search: "" } );

    console.log("category data: ", dataCategory);

    const handleClickSaveProduct = async (data) => {
        // await createData(data);
        await mutate(data);
        navigate(-1);

        // console.log("save data: ",data)

    }

    const handleClickCancelProduct = () => {
        navigate(-1);
    }

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit(handleClickSaveProduct)} className="w-full max-w-lg">
                <FormInput
                    label="Product Name:"
                    type="text"
                    placeholder="product name"
                    register={register("name", {required: "Khong duoc de trong"})}
                    err={errors.name && errors.name.message}
                />

                <FormInput
                    label="Product Slug:"
                    type="text"
                    placeholder="product slug"
                    register={register("slug", {required: "Khong duoc de trong"})}
                    err={errors.slug && errors.slug.message}
                />

                <label>Category:</label>
                <select
                    {...register("categoryId")}
                >
                    ({
                    dataCategory?.responses?.map( category => (
                            <option value={category.id}>{category.name}</option>
                        )
                    )
                })
                </select>


                <FormInput
                    label="Description:"
                    type="text"
                    placeholder="product description"
                    register={register("description", {required: "Khong duoc de trong"})}
                    err={errors.description && errors.description.message}
                />

                <FormInput
                    label="Product Price:"
                    type="number"
                    placeholder="product price"
                    register={register("price", {
                        required: "Khong duoc de trong",
                        min: {value: 0, message: "khong duoc nho hon 0"},
                        validate: value => !isNaN(value) || "Phai la so"
                    })}
                    err={errors.price && errors.price.message}
                />


                //upload image
                <input
                    type="file"
                    {...register("image")}
                />


                {imageList.map(item => (
                    <img src={item.url} key={item.id} />
                ))}


                {/* Updated div for centering buttons */}
                <div className="flex justify-center mt-6">
                    <button className="p-2 bg-blue-600 text-white rounded-md mr-4" type="submit">
                        Create
                    </button>
                    <button
                        className="p-2 bg-gray-500 text-white rounded-md"
                        type="button"
                        onClick={handleClickCancelProduct}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export {ProductCreate}
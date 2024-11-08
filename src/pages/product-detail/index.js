import {useNavigate, useParams} from "react-router-dom";
import {FormInput} from "../../component/form-input";
import {useForm} from "react-hook-form";
import {getDataById, updateData} from "../../api/product/productAPI";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/app-context";
import {useGetProductById} from "../../api/product/useGetProductById";
import {useUpdateProduct} from "../../api/product/useUpdateProduct";


const ProductDetail = () => {

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
            price: 0
        }
    });

    const {
        error: errorUpdataProducts,
        isPending,
        mutate: updateProduct
    } = useUpdateProduct();

    const handleClickSaveProduct = (data) => {
            // await updateData(data);
        updateProduct(data)
            .then(() => navigate(-1))
            .catch((error) => {
                setError(error);
            });
    }

    const handleClickCancelProduct = () => {
        navigate(-1);
    }

    const {
        data,
        error,
        isFetching
    } = useGetProductById(id);

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
                    label="Product Name:"
                    type="text"
                    placeholder="product name"
                    register={register("name", {required: "Khong duoc de trong"})}
                    err={errors.name && errors.name.message}
                />

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

                {/* Updated div for centering buttons */}
                <div className="flex justify-center mt-6">
                    <button className="p-2 bg-blue-600 text-white rounded-md mr-4" type="submit">
                        Update
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
)
}

export {ProductDetail}
import {useEffect, useState} from "react";
import {FormInput} from "../../conponent/form-input";
import {instance} from "../../axios/config";
import {v4} from "uuid";
import {useForm} from "react-hook-form";

var rsProd = {
    id: "",
    name: "",
    price: 0
}

const QLProductPages = () => {
    // const [products, setProducts] = useState(rsProd);

    const [productList, setProductList] = useState([]);
    // const [error, setError] = useState({
    //     name : "",
    //     price: ""
    // });

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        getValues

    } = useForm({
        defaultValues: rsProd
    })

    // const checkError = (product) => {
    //     if (product.name === "") {
    //         setError(prev => ({
    //             ...prev,
    //             name: "Khog duoc de trong"
    //         }))
    //         return false;
    //     } else {
    //         setError(prev => ({
    //             ...prev,
    //             name: ""
    //         }))
    //     }
    //     if (product.price < 0) {
    //         setError(prev => ({
    //             ...prev,
    //             price: "Khog duoc be hon 0"
    //         }))
    //         return false;
    //     } else if (isNaN(product.price)) {
    //         setError(prev => ({
    //             ...prev,
    //             price: "Price phai la so!!"
    //         }))
    //         return false;
    //     } else {
    //         setError(prev => ({
    //             ...prev,
    //             price: ""
    //         }))
    //     }
    //     return true;
    // }
    //
    // const handleChangeProductName = (even) => {
    //     setProducts(prev =>({
    //         ...prev,
    //         name: even.target.value
    //     }));
    //     checkError({...products, name: even.target.value});
    // }
    //
    // const handleChangeProductPrice = (even) => {
    //     setProducts(prev =>({
    //         ...prev,
    //         price: even.target.value
    //     }));
    //
    //     checkError({...products, price: even.target.value});
    // }

    const handleClickSaveProduct = (data) => {
        // if (!checkError(products)) return;
        //
        // if(products.id !== "") {
        //     // setProductList((prev) =>
        //     //     prev.map(product => products.id === product.id ? products : product))
        //     updateData(products.id, products);
        //     setProducts(rsProd);
        // }
        // else {
        //     products.id = v4();
        //     createData(products);
        //     setProducts(rsProd);
        // }

        if(data.id !== "")
            updateData(data.id, data)
        else{
            data.id = v4();
            createData(data);
        }


        reset(rsProd);

    }

    const handleClickUpdateProduct = (product) => {
        // setProducts(product);
        // reset(product)
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("id", product.id);
    }

    const handleClickCancelProduct = (product) => {
        // setProducts(rsProd);
        reset(rsProd)
    }

    const handleClickDeleteProduct = (id) => {
        if(window.confirm("you sure delete product")) {
            setProductList(prev =>
            prev.filter(item => item.id !== id))
        }
    }

    const getData = () => {
        instance.get('/product/showall').then(res => {
            setProductList(res.data);
        }).catch(err => console.log(err));
    }

    const createData = (newProduct) => {
        instance.post('/product/create', newProduct)
            .then(res => {
                setProductList(prev => [
                    ...prev,
                    res.data
                ]);
            }).catch(err => console.log(err));
    }

    const updateData = (id, updatedProduct) => {
        instance.put(`/product/update/${id}`, updatedProduct)
            .then(res => {
                setProductList(prev => [
                    ...prev.map(product => product.id === id ? res.data : product)
                ])
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <form onSubmit={handleSubmit(handleClickSaveProduct)}>
                <FormInput
                    label="Product Name:"
                    type="text"
                    placeholder="product name"
                    // value={products.name}
                    // onChange={handleChangeProductName}
                    // err={error.name}
                    {...register("name", { required: "Khong duoc de trong" })}

                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <FormInput
                    label="Product Price:"
                    type="number"
                    placeholder="product price"
                    // value={products.price}
                    // onChange={handleChangeProductPrice}
                    // err={error.price}
                    {...register("price", {
                        required: "Khong duoc de trong" ,
                        min: { value: 0, message: "khong duoc nho hon 0"},
                        validate: value => !isNaN(value) || "Phai la so"
                    })}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                <button
                    className="p-2 bg-blue-600 m-2 text-amber-50 rounded-md"
                    type="submit"
                >
                    {getValues("id") ? "Update" : "Create"}
                </button>

                {
                    getValues("id") &&
                    (
                        <button
                            className="p-2 bg-gray-500 m-2 text-amber-50 rounded-md"
                            type="button"
                            onClick={handleClickCancelProduct}
                        >
                            Cancel
                        </button>
                    )
                }
            </form>

            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Product id</th>
                            <th>Product name</th>
                            <th>Product price</th>
                            <th>Choose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        className="px-1 py-0 bg-orange-600 text-amber-50 rounded-md"
                                        onClick={() => {
                                            handleClickUpdateProduct(product)
                                        }}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="px-1 py-0 ml-1 bg-red-600 text-amber-50 rounded-md"
                                        onClick={() => {
                                            handleClickDeleteProduct(product.id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export {QLProductPages};
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/app-context";
import {Link} from "react-router-dom";
import {ROUNTING_PRODUCT_CREATE, ROUTING_PRODUCT_DETAIL} from "../../router";
import {PaginationOutlined} from "../../component/pagination";
import {FormSearch} from "../../component/form-search";
import {useGetProducts} from "../../api/product/useGetProducts";
import {useDeleteProduct} from "../../api/product/useDeleteProduct";
import {useDebounce} from "../../hooks/useDebounce";

const QLProductPages = () => {
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 3,
        search: ""
    });

    const debouncedPagination = useDebounce(pagination, 500); // debounce pagination here

    const {
        data: productList,
        isFetching
    } = useGetProducts(debouncedPagination); // use debouncedPagination

    const {mutate: deleteProduct} = useDeleteProduct();
    const {setLoading} = useContext(AppContext);

    const handlePageChange = (event, newPage) => {
        setPagination(pre => ({
            ...pre,
            pageNumber: newPage - 1
        }));
    };

    const handleValueSearchChange = (event) => {
        setPagination(pre => ({
            ...pre,
            search: event.target.value
        }));
    }

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure delete?")) {
            deleteProduct(id);
        }
    }

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching, setLoading]);

    const productTBody = productList?.products.map((product, index) => (
        <tr
            key={product.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
        >
            <td className="p-3 border-b">
                <Link to={ROUTING_PRODUCT_DETAIL.replace(":id", product.id)}
                      className="text-blue-500 hover:underline"
                >
                    {product.id}
                </Link>
            </td>
            <td className="p-3 border-b">{product.name}</td>
            <td className="p-3 border-b">{product.description}</td>
            <td className="p-3 border-b">{product.price}</td>
            <td className="p-3 border-b">
                <button
                    className="bg-red-600 text-white rounded-lg hover:bg-red-400 p-1.5"
                    onClick={() => handleDeleteProduct(product.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <button
                className="absolute top-13 right-5 m-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400"
            >
                <Link to={ROUNTING_PRODUCT_CREATE}>
                    Create
                </Link>
            </button>

            <FormSearch
                value={pagination.search}
                onChange={handleValueSearchChange}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b">Product id</th>
                        <th className="p-3 border-b">Product name</th>
                        <th className="p-3 border-b">Product description</th>
                        <th className="p-3 border-b">Product price</th>
                        <th className="p-3 border-b">Choose</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productTBody}
                    </tbody>
                </table>

                <PaginationOutlined numPage={10} page={pagination.pageNumber + 1} onChange={handlePageChange} />
            </div>
        </div>
    )
}

export {QLProductPages};

import {Link} from "react-router-dom";
import {
    ROUTING_CATERORY_CREATE,
    ROUTING_CATERORY_DETAIL,
} from "../../router";
import {FormSearch} from "../../component/form-search";
import {PaginationOutlined} from "../../component/pagination";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/app-context";
import {QK_GET_CATEGORIES, useGetCategories} from "../../api/category/useGetCategories";
import {useDebounce} from "../../hooks/useDebounce";
import {useDeleteCategory} from "../../api/category/useDeleteCategory";
import {useQueryClient} from "@tanstack/react-query";

const CateroryManager = () => {

    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 3,
        search: ""
    });

    const debouncedPagination = useDebounce(pagination, 500); // debounce pagination here

    const {
        data : categoryList,
        error,
        isFetching
    } = useGetCategories(debouncedPagination);

    // const {
    //     data,
    //     error: errorDeleteProduct,
    //     isPending,
    //     mutate: deleteProduct,
    // } = useDeleteProduct();


    const {setLoading} = useContext(AppContext);

    const handlePageChange = (event, newPage) => {
        setPagination(pre => ({
            ...pre,
            pageNumber: newPage-1
        }));
    };

    const handleValueSearchChange = (event) => {
        setPagination(pre => ({
            ...pre,
            search: event.target.value
        }));
    }

    const {mutate: deleteCategory} = useDeleteCategory();

    const queryClient = useQueryClient();

    const handleDeleteCategory = (id) => {

        if(window.confirm("Are you sure delete?"))
            deleteCategory(id).then(() => {
                queryClient.invalidateQueries({queryKey: [QK_GET_CATEGORIES]});
            });

    }

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching, setLoading]);


    const categoryTBody =
        // (<div>xin chao</div>)
        categoryList?.responses.map((category, index) => (
            <tr
                key={category.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
                <td className="p-3 border-b">
                    <Link to={ROUTING_CATERORY_DETAIL.replace(":id", category.id)}
                          className="text-blue-500 hover:underline"
                    >
                        {category.id}
                    </Link>
                </td>
                <td className="p-3 border-b">{category.name}</td>
                <td className="p-3 border-b">{category.slug}</td>
                <td className="p-3 border-b">
                    <button
                        className="bg-red-600 text-white rounded-lg hover:bg-red-400 p-1.5"
                        onClick={() => handleDeleteCategory(category.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

    return(
        <div>

            <button
                className="absolute top-13 right-5 m-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400"
            >
                <Link to={ROUTING_CATERORY_CREATE}>
                    Create
                </Link>
            </button>

            <FormSearch
                value={pagination.search}
                onChange={handleValueSearchChange}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100" >
                    <tr>
                        <th className="p-3 border-b">Caterory id</th>
                        <th className="p-3 border-b">Caterory name</th>
                        <th className="p-3 border-b">Caterory slug</th>
                        <th className="p-3 border-b">Choose</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoryTBody}
                    </tbody>
                </table>

                <PaginationOutlined numPage={10} page={pagination.pageNumber+1} onChange={handlePageChange} />

            </div>

        </div>
    )
}

export {CateroryManager}
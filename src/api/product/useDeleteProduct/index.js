import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteData} from "../productAPI";
import {QK_GET_PRODUCTS} from "../useGetProducts";
import {useContext} from "react";
import {AppContext} from "../../../context/app-context";

const useDeleteProduct = () => {

    const queryClient = useQueryClient();

    const {setError} = useContext(AppContext);

    const {
        data,
        error,
        isPending,
        mutate
    } = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QK_GET_PRODUCTS]});
        },
        onError: (error) => {
            setError(error);
        }
    })

    return {
        data,
        error,
        isPending,
        mutate
    }

}

export { useDeleteProduct }
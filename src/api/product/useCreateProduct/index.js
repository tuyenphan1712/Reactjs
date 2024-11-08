import {useMutation} from "@tanstack/react-query";
import {createData} from "../productAPI";

const useCreateProduct = () => {
    const {mutate, data, isPending, error} = useMutation({
        mutationFn: createData,

    });
    return {
        mutate,
        data,
        error,
        isPending
    }
}

export { useCreateProduct }
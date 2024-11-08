import {useMutation} from "@tanstack/react-query";
import {updateCategory} from "../categoryAPI";


const useUpdateCategory = () => {

    const {
        data,
        error,
        isPending,
        mutateAsync
    } = useMutation({
        mutationFn: updateCategory,

    });

    return {
        mutate: mutateAsync,
        data,
        error,
        isPending
    }

}

export { useUpdateCategory }
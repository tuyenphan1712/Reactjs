import {useMutation} from "@tanstack/react-query";
import {deleteCategory} from "../categoryAPI";


const useDeleteCategory = () => {

    const {
        data,
        isPending,
        mutateAsync
    } = useMutation({
        mutationFn: deleteCategory,
    })

    return {
        data,
        isPending,
        mutate: mutateAsync
    }

}

export { useDeleteCategory }
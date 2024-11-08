import {useMutation, useQuery} from "@tanstack/react-query";
import {checkCategorySlug} from "../categoryAPI";


const useCheckCategorySlug = () => {

    const {
        data,
        error,
        mutateAsync,
        isFetching
    } = useMutation({
        mutationFn: checkCategorySlug,
    })

    return {
        data,
        error,
        isFetching,
        mutate: mutateAsync,
    }

}

export { useCheckCategorySlug }
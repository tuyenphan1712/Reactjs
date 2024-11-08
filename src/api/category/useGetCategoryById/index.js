import {useQuery} from "@tanstack/react-query";
import {getCategoryById} from "../categoryAPI";

export const QK_GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID'

const useGetCategoryById = (id) => {

    const {
        data,
        error,
        isFetching
    } = useQuery({
        queryKey: [QK_GET_CATEGORY_BY_ID, id],
        queryFn: () => {
            return getCategoryById(id);
        },
        enabled: !!id,
    })

    return {
        data,
        error,
        isFetching
    }

}

export { useGetCategoryById }
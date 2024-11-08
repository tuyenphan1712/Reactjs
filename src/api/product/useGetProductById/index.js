import {useQuery} from "@tanstack/react-query";
import {getDataById} from "../productAPI";

export const QK_GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'

const useGetProductById = (id) => {

    const {
        data,
        error,
        isFetching
    } = useQuery({
        queryKey: [QK_GET_PRODUCT_BY_ID, id],
        queryFn: () => {
            return getDataById(id);
        },
        enabled: !!id,
    })

    return {
        data,
        error,
        isFetching
    }

}

export { useGetProductById }
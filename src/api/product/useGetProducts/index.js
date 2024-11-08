import {useQuery} from "@tanstack/react-query";
import {getData} from "../productAPI";

export const QK_GET_PRODUCTS = "GET_PRODUCTS";

const useGetProducts = ({pageNumber, pageSize, search}) => {

    const {data, error, isFetching } = useQuery({
        queryKey: [QK_GET_PRODUCTS, {pageNumber, pageSize, search}],
        queryFn: () => {
            return getData({pageNumber, pageSize, search})
        } })

    return {
        data,
        error,
        isFetching

    }
}

export { useGetProducts }
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "../categoryAPI";

export const QK_GET_CATEGORIES = "GET_CATEGORIES";

const useGetCategories = ({pageNumber, pageSize, search}) => {
    const {data, error, isFetching } = useQuery({
        queryKey: [QK_GET_CATEGORIES, {pageNumber, pageSize, search}],
        queryFn: () => {
            return getCategories({pageNumber, pageSize, search})
        } })

    return {
        data,
        error,
        isFetching

    }
}

export { useGetCategories }
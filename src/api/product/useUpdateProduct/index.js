import {useMutation} from "@tanstack/react-query";
import {updateData} from "../productAPI";

const useUpdateProduct = () => {

    const {
        data,
        error,
        isPending,
        mutateAsync
    } = useMutation({
        mutationFn: updateData,
        onSuccess: () => {

        },
        onError: () => {

        }
    });

    return {
        mutate: mutateAsync,
        data,
        error,
        isPending
    }

}

export { useUpdateProduct }
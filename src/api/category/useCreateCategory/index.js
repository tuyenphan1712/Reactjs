import {useMutation} from "@tanstack/react-query";
import {createCategory} from "../categoryAPI";

const useCreateCategory = () => {
    const {
        mutateAsync,
        data,
        isPending,
        error} = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {

        },
        onError: () => {

        }
    });
    return {
        mutate : mutateAsync,
        data,
        error,
        isPending
    }
}

export { useCreateCategory }
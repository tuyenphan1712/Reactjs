import {useMutation} from "@tanstack/react-query";
import {createAssets} from "../AssetAPI";


const useCreateAsset = () => {

    const {
        data,
        error,
        mutateAsync,
        isPending
    } = useMutation({
        mutationFn: createAssets,
    });

    return {
        mutate: mutateAsync,
        data,
        error,
        isPending
    }

}

export { useCreateAsset }
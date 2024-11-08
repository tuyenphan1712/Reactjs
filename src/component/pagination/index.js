import {Pagination, Stack} from "@mui/material";

export const PaginationOutlined = ({numPage, page, onChange}) => {
    return (
        <Stack direction="row" spacing={2}>
            <Pagination
                count={numPage}
                page={page}
                variant="outlined"
                color="secondary"
                onChange={onChange}
            />
        </Stack>
    )
}
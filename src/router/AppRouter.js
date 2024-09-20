import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "../pages/layout";
import {HomePage} from "../pages/home";
import {ProductPage} from "../pages/product";
import {ROUTING_HOME, ROUTING_PRODUCT, ROUTING_QLPRODUCT} from "./path";
import {QLProductPages} from "../pages/QLProduct";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={""} element={<Layout/>}>
                    <Route path={ROUTING_HOME} element={ <HomePage/> } />
                    <Route path={ROUTING_PRODUCT} element={<ProductPage/>} />
                    <Route path={ROUTING_QLPRODUCT} element={<QLProductPages/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRouter };
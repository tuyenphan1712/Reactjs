import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "../pages/layout";
import {HomePage} from "../pages/home";
import {ProductPage} from "../pages/product";
import {
    ROUNTING_PRODUCT_CREATE,
    ROUTING_CATERORY,
    ROUTING_CATERORY_CREATE,
    ROUTING_CATERORY_DETAIL,
    ROUTING_CATERORY_MANAGER,
    ROUTING_HOME,
    ROUTING_PRODUCT,
    ROUTING_PRODUCT_DETAIL,
    ROUTING_QLPRODUCT
} from "./path";
import {QLProductPages} from "../pages/product-manager";
import {ProductDetail} from "../pages/product-detail";
import {ProductCreate} from "../pages/product-create";
import {CateroryPage} from "../pages/category";
import {CateroryManager} from "../pages/category-manager";
import {CategoryCreate} from "../pages/category-create";
import {CategoryDetail} from "../pages/category-detail";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={""} element={<Layout/>}>
                    <Route path={ROUTING_HOME} element={ <HomePage/> } />

                    <Route path={ROUTING_PRODUCT} element={<ProductPage/>} />
                    <Route path={ROUTING_QLPRODUCT} element={<QLProductPages/>} />
                    <Route path={ROUTING_PRODUCT_DETAIL} element={<ProductDetail/>} />
                    <Route path={ROUNTING_PRODUCT_CREATE} element={<ProductCreate/>} />

                    <Route path={ROUTING_CATERORY} element={<CateroryPage/>} />
                    <Route path={ROUTING_CATERORY_MANAGER} element={<CateroryManager/>} />
                    <Route path={ROUTING_CATERORY_DETAIL} element={<CategoryDetail/>} />
                    <Route path={ROUTING_CATERORY_CREATE} element={<CategoryCreate/>} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export { AppRouter };
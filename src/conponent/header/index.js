import {Link, useNavigate} from "react-router-dom";
import {ROUTING_HOME, ROUTING_PRODUCT, ROUTING_QLPRODUCT} from "../../router";

const Header = () => {
    const navigate = useNavigate();

    const handleBtnHomePage = () => {
        navigate(ROUTING_HOME);
    }

    const handleBtnProductPage = () => {
        navigate(ROUTING_PRODUCT);
    }
    return (
        <>
            {/*<Link to={""}>HomePage</Link>*/}
            {/*<Link to={"/product"}>ProductPage</Link>*/}
            <Link to={ROUTING_QLPRODUCT}>QLProductPages</Link>

            <button onClick={() => handleBtnHomePage()}>Go to HomePage</button>
            <button onClick={() => handleBtnProductPage()}>Go to ProductPage</button>
        </>
    )
}

export {Header};
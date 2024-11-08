import {Link, useNavigate} from "react-router-dom";
import {ROUTING_CATERORY, ROUTING_HOME, ROUTING_PRODUCT} from "../../router";
import styles from "./styles.module.scss";

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
            <header className={styles.headerStyles}>
                <nav className={styles.navStyles}>
                    <Link className={styles.linkStyles}to={ROUTING_HOME}>HomePage</Link>
                    <Link className={styles.linkStyles}to={ROUTING_PRODUCT}>ProductPage</Link>
                    <Link className={styles.linkStyles}to={ROUTING_CATERORY}>CateroryPage</Link>
                </nav>
            </header>

            {/*<button onClick={() => handleBtnHomePage()}>Go to HomePage</button>*/}
            {/*<button onClick={() => handleBtnProductPage()}>Go to ProductPage</button>*/}
        </>
    )
}

export {Header};
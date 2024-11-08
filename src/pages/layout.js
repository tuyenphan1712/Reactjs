import {Header} from '../component/header'
import {Footer} from '../component/footer'
import {Outlet} from 'react-router-dom'
import {Loading} from "../component/loading";
import {useContext} from "react";
import {AppContext} from "../context/app-context";

const Layout = () => {
    const {loading} = useContext(AppContext);

    return (
        <div>
            <Header/>
            <Outlet />
            <Footer />

            {loading && (
                <Loading/>
            )}

        </div>
    )
}

export {Layout};
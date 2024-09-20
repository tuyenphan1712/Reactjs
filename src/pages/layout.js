import {Header} from '../conponent/header'
import {Footer} from '../conponent/footer'
import {Outlet} from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet />
            <Footer />
        </div>
    )
}

export {Layout};
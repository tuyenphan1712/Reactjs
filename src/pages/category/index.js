import {Link} from "react-router-dom";
import {ROUTING_CATERORY_MANAGER} from "../../router";


const CateroryPage = () => {
    return (
        <div className="mt-9">
            <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                to={ROUTING_CATERORY_MANAGER}
            >
                CateroryManager
            </Link>
        </div>
    )
}

export {CateroryPage};
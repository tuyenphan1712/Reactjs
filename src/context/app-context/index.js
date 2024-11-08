import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(error) {
            console.log('err toast: ',error);
            toast.error(error.message);
            setError(null);
        }
    }, [error]);


    return (
        <AppContext.Provider value={{loading, setLoading, error, setError}}>
            {children}

        </AppContext.Provider>
    );
}

export {AppContext, AppProvider}
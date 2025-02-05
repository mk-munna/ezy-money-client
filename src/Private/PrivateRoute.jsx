import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { loading, auth } = useContext(AuthContext);
    const user = localStorage.getItem('user');
    if (loading) {
        return (
            <div className="fixed -translate-x-1/2 top-[40%] left-1/2">
                <div className="">
                    <img className='w-[100px]' src={"https://www.purplerosetheatre.org/wp-content/themes/dt-the7-child-2020/images/loader.gif"} alt="" />
                </div>
            </div>
        )
    }
    if (auth) {
        return children;
    }
    if (user && !auth) {
        return <Navigate to="/login" />;
    }
    return <Navigate to="/register" />;
};

export default PrivateRoute;
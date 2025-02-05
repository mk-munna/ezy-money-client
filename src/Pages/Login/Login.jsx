
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from "/logo.png"
import icon from "/iconMobile.svg"
const Login = () => {

    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [pin, setPin] = useState('');
    const { login, auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await login(mobileOrEmail, pin);
            setLoading(false)
        } catch (error) {
            console.error('Login failed', error);
        }
        setLoading(false)
    };
    useEffect(() => {
        if (auth) {
            setLoading(false)
            navigate('/');
        }
        console.log(auth);
    },[auth])
    useEffect(() => {
        const mobile = localStorage.getItem('user');
        if (mobile) {
            setMobileOrEmail(mobile)
        } else {
            setMobileOrEmail('')
        }
    }, [])
    return (
        <div className='flex lg:gap-16 md:px-0  px-8 mt-20'>
            <div className='w-full md:flex hidden justify-center'>
                <img src={icon} alt="" className='w-[550px]' />
            </div>
            <div className='w-full lg:pt-16'>
                <img src={logo} className='' alt="" />

                <h1 className='text-4xl text-[#A14AEC] mt-2 font-semibold'>Welcome</h1>
                <p className='mt-2 md:w-[300px]  lg:w-[380px]'>EzyMoney for Secure, seamless and fast transactions.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full  md:w-[300px]  lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="text"
                        value={mobileOrEmail}
                        onChange={(e) => setMobileOrEmail(e.target.value)}
                        placeholder="Mobile or Email"
                    />
                    <br />
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full md:w-[300px] lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="PIN"
                    />
                    <br />
                    <button className='mt-6 bg-[#A14AEC]  text-white border outline-none   rounded-lg py-2 px-4' type="submit">Login</button>

                </form>
                {
                    loading && (
                        <div className="fixed -translate-x-1/2 top-[40%] left-1/2">
                            <div className="">
                                <img className='w-[100px]' src={"https://www.purplerosetheatre.org/wp-content/themes/dt-the7-child-2020/images/loader.gif"} alt="" />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Login;

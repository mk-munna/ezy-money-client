
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from "/logo.png"
import icon from "/iconMobile.svg"
const Login = () => {

    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [pin, setPin] = useState('');
    const { login, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(mobileOrEmail, pin);
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    useEffect(() => {
        if (auth) {
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
        <div className='flex gap-16 mt-20'>
            <div className='w-full flex justify-center'>
                <img src={icon} alt="" className='w-[550px]' />
            </div>
            <div className='w-full lg:pt-16'>
                <img src={logo} className='' alt="" />

                <h1 className='text-4xl text-[#A14AEC] mt-2 font-semibold'>Welcome</h1>
                <p className='mt-2 w-[380px]'>EzyMoney for Secure, seamless and fast transactions.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="text"
                        value={mobileOrEmail}
                        onChange={(e) => setMobileOrEmail(e.target.value)}
                        placeholder="Mobile or Email"
                    />
                    <br />
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="PIN"
                    />
                    <br />
                    <button className='mt-6 bg-[#A14AEC]  text-white border outline-none   rounded-lg py-2 px-4' type="submit">Login</button>

                </form>
            </div>
        </div>
    );
}

export default Login;

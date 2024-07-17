import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from "/logo.png";
import icon from "/iconSignUp.svg";

const SignUp = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const { signUp, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pin.length !== 5) {
            setError('PIN must be exactly 5 digits long');
            return;
        }
        setError('');
        try {
            const role = 'agent';
            await signUp(name, mobile, email, pin, role);

        } catch (error) {
            console.error('Login failed', error);
        }
    };
    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, [auth])
    const handlePinChange = (e) => {
        const value = e.target.value;
        if (value.length <= 5) {
            setPin(value);
        }
    };

    return (
        <div className='flex gap-20 mt-16'>
            <div className='w-full flex justify-center'>
                <img src={icon} alt="" className='w-[500px]' />

            </div>
            <div className='w-full lg:pt-0'>
                <div className='flex gap-[150px]'>
                    <img src={logo} className='' alt="" />
                    <Link className='underline mt-10' to={'/agent-register'}>Register as Agent</Link>
                </div>

                <h1 className='text-4xl text-[#A14AEC] mt-2 font-semibold'>Register</h1>
                <p className='mt-2 w-[380px]'>Register EzyMoney for Secure, seamless and fast transactions.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <br />
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Your Mobile"
                    />
                    <br />
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                    />
                    <br />
                    <input
                        className='mt-6 border outline-none border-[#A14AEC] w-full lg:w-[350px] focus:border-l-4 duration-50 rounded-lg py-2 px-4'
                        type="number"
                        value={pin}
                        onChange={handlePinChange}
                        placeholder="PIN"
                    />
                    <br />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button className='mt-6 bg-[#A14AEC] text-white border outline-none rounded-lg py-2 px-4' type="submit">Register</button>
                    <p className='mt-6'><Link className=' font-semibold' to={'/login'}>Already have an account? <span className=' underline text-purple-600'>Login</span></Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

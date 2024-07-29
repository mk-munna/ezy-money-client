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
    const [loading, setLoading] = useState(false);
    const { signUp, auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bangladeshiPhoneNumberPattern = /^(?:\+88|88)?(01[3-9]\d{8})$/;

        if (!bangladeshiPhoneNumberPattern.test(mobile)) {
            setError('Invalid Bangladeshi phone number');
            return;
        }

        if (pin.length !== 5) {
            setError('PIN must be exactly 5 digits long');
            return;
        }

        setError('');
        try {
            const role = 'user';
            setLoading(true)
            await signUp(name, mobile, email, pin, role);
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
    }, [auth, navigate]);

    const handlePinChange = (e) => {
        const value = e.target.value;
        if (value.length <= 5) {
            setPin(value);
        }
    };

    return (
        <div className='flex lg:gap-20 lg:px-0 px-8 md:px-20 mt-16'>
            <div className='w-full hidden lg:flex justify-center'>
                <img src={icon} alt="" className='' />
            </div>
            <div className='w-full lg:pt-0'>
                <div className='flex gap-20 md:gap-[150px]'>
                    <img src={logo} className='' alt="" />
                    <Link className='underline mt-10' to={'/agent-register'}>Register as Agent</Link>
                </div>

                <h1 className='text-4xl text-[#A14AEC] mt-2 font-semibold'>Register</h1>
                <p className='mt-2 md:w-[380px]'>Register EzyMoney for Secure, seamless and fast transactions.</p>
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
                        type="number"
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
};

export default SignUp;

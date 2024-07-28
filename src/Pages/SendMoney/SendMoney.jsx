import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const SendMoney = () => {

    const from = localStorage.getItem('user')
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const fetchUserData = async ({ queryKey }) => {
        const [_key, from] = queryKey;
        const response = await axiosSecure(`/balance/${from}`);
        return response.data;
    };
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['balance-load', from],
        queryFn: fetchUserData,
        enabled: !!from,
    });
    console.log(data?.balance);
    console.log(data?.balance);
    const handleAmountChange = (e) => {
        const value = e.target.value;
        const checkValue = parseFloat(value) + 5;
        console.log(checkValue);
        setAmount(value);
        if (value < 50) {
            setError('Amount should be above 50 tk');
        } else if (checkValue > data?.balance) {
            setError('Insufficient balance');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount < 50) {
            setError('Amount should be above 50 tk');
            return;
        }
        if (amount > data?.balance) {
            setError('Insufficient balance');
            return;
        }
        if (!to || !amount || !pin) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axiosSecure.post('/send-money', { amount, to, pin, from });
            console.log(response.data);
            toast(response.data.message);
            queryClient.invalidateQueries(['user-load']);
            queryClient.invalidateQueries(['balance-load']);
        } catch (error) {
            console.error(error);
            setError('Failed to send money');
        }
    };

    let total = parseFloat(amount);


    return (
        <div className='pb-[100px]'>
            <div className='bg-purple-50 py-4 px-8 relative flex justify-center items-center rounded-b-2xl '>
                <Link to={'/'} className='absolute left-8'>
                    <FaArrowLeft className='text-2xl text-purple-500' />
                </Link>
                <p className='text-purple-500 font-semibold text-2xl md:text-4xl'>Send money</p>
            </div>
            <form onSubmit={handleSubmit} className='p-8'>
                <div className='mb-4'>
                    <label className='block text-purple-500 font-semibold mb-2' htmlFor='to'>To (Mobile Number)</label>
                    <input
                        type='number'
                        id='to'
                        className='w-full px-8  border-none bg-purple-100 py-5 outline-none bg rounded-lg focus:outline-none focus:border-purple-500'
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-purple-500 font-semibold mb-2' htmlFor='amount'>Amount (Tk)</label>
                    <input
                        type='number'
                        id='amount'
                        className='w-full px-8  border-none bg-purple-100 py-5 outline-none bg rounded-lg focus:outline-none focus:border-purple-500'
                        value={amount}
                        onChange={handleAmountChange}
                        required
                    />
                    {
                        error ? <p className='text-red-500 mb-4'>{error}</p> : amount ? <p className='text-purple-500 mt-2'>Total Amount Deducted: <span className='bg-teal-200 text-teal-500 px-2 rounded-lg text-lg'>{total >= 100 ? total + 5 : total}</span> Tk {amount >= 100 ? <span className='text-teal-500'> (5 TK fee for transition upto 100)</span> : <span className='text-black'>(No charge Applied)</span>} </p> : ""

                    }
                </div>
                <div className='mb-4 w-[300px] mx-auto'>
                    <label className='block text-purple-500 text-center text-3xl font-semibold mb-2' htmlFor='pin'>PIN</label>
                    <input
                        type='password'
                        id='pin'
                        className='w-full px-8  border-none bg-purple-100 py-5 outline-none bg rounded-lg focus:outline-none focus:border-purple-500'
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full mt-6 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300'
                >
                    Send Money
                </button>
            </form>
        </div>
    );
};

export default SendMoney;

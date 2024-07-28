import React, { useContext, useState } from 'react';
import './Header.css'
import { CiSettings } from "react-icons/ci";
import { TbCoinTakaFilled } from "react-icons/tb";
import { RiLogoutCircleRLine, RiQrScan2Line } from "react-icons/ri";
import { FaHouseMedical, FaRegCircleUser } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';
import logo from "/logo1.png"
const Header = () => {
    const { auth, logout } = useContext(AuthContext);
    // console.log(auth);
    const [balance, setBalance] = useState(0);
    const user = localStorage.getItem('user');
    console.log(user);
    const axiosSecure = useAxiosSecure()

    const fetchUserData = async ({ queryKey }) => {
        const [_key, user] = queryKey;
        const response = await axiosSecure(`/balance/${user}`);
        return response.data;
    };
    const { data, isLoading, refetch, error } = useQuery({
        queryKey: ['user-load', user],
        queryFn: fetchUserData,
        enabled: !!user,
    });
    return (
        <div>
            <div className='bg-gradient-to-r flex items-center justify-between rounded-b-lg from-purple-400 to-purple-500 px-4 md:px-8 pt-3 pb-4'>
                <div className='flex items-center gap-4'>
                    <div><FaRegCircleUser className='text-white text-3xl md:text-[45px]  ' /></div>
                    <div>
                        <p className='font-semibold text-white text-lg md:text-xl'>{data?.name}</p>
                        <p className='text-purple-500 text-[12px] md:text-sm bg-white py-[1px] pl-2 pr-3 rounded-xl font-semibold flex items-center gap-2'><TbCoinTakaFilled className='text-xl md:text-3xl' /> {data?.balance} Taka</p>
                    </div>
                </div>
                <div className='flex gap-2 md:gap-20'>
                    <p className='text-white text-xs md:text-sm'>Status: <span className='bg-yellow-200 rounded-md px-2 pt-[2px] pb-1 text-[9px] md:text-xs text-yellow-800'>{data?.status}</span></p>
                    <div className='flex gap-6'>
                        <img className='w-[50px]' src={logo} alt="" />
                        <button className='md:flex items-center gap-2 mt-1 text-white hidden ' onClick={() => document.getElementById('my_modal_1').showModal()}><CiSettings className="text-5xl " /></button>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-purple-500 text-lg text-center">Sorry!</h3>
                                <p className="py-4 text-center">We are Updating this feature</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;
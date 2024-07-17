import React, { useContext, useEffect, useState } from 'react';
import { RiLogoutCircleRLine, RiQrScan2Line } from "react-icons/ri";
import { FaHouseMedical, FaRegCircleUser } from "react-icons/fa6";
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import logo from "/logo1.png"
import banner from "/banner.png"
import banner1 from "/banner1.png"
import { TbCoinTakaFilled } from "react-icons/tb";
import { useQuery } from '@tanstack/react-query';
import UserMenu from '../../Components/userMenu';
import { IoHome } from 'react-icons/io5';
import { BiSolidOffer } from "react-icons/bi";
import { IoMdMailUnread } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const UserDashboard = () => {
    const { auth, logout } = useContext(AuthContext);
    console.log(auth);
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
        <div className='md:text-base text-xs'>
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

            <UserMenu></UserMenu>
            <div className='mt-12'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">
                    <SwiperSlide>
                        <div>
                            <img src={banner} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={banner1} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='bg-gradient-to-r shadow-custom grid lg:grid-cols-5 grid-cols-4 rounded-t-lg justify-between from-gray-50 to-white '>
                <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r flex flex-col items-center py-4 from-purple-100 to-purple-50'><IoHome className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px] ' /> Home</button>
                <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r flex flex-col items-center py-4 from-purple-100 to-purple-50'><RiQrScan2Line className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px] ' />QR Scan</button>
                <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r hidden lg:flex flex-col items-center py-4 from-purple-100 to-purple-50'><BiSolidOffer className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px] ' />Offer</button>
                <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r flex flex-col items-center py-4 from-purple-100 to-purple-50'><IoMdMailUnread className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px] ' />Inbox</button>
                <button className='bg-gradient-to-r flex flex-col items-center py-4 from-purple-100 to-purple-50'><RiLogoutCircleRLine className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px] ' onClick={logout} />Settings</button>

            </div>
        </div>
    );
}
export default UserDashboard;
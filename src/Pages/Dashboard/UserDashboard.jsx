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
// import { IoHome } from 'react-icons/io5';
// import { BiSolidOffer } from "react-icons/bi";
// import { IoMdMailUnread } from "react-icons/io";
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
           
            <UserMenu></UserMenu>
            <div className='mt-12 pb-[110px]'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
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
        </div>
    );
}
export default UserDashboard;
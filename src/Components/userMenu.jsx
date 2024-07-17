import React from 'react';
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { MdOutlineInstallMobile } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAddCard } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";
import { TbShoppingBagHeart } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { TbDeviceMobileShare } from "react-icons/tb";
import { LuBookOpen } from "react-icons/lu";

const UserMenu = () => {
    return (
        <div className='grid  lg:grid-cols-5 md:grid-cols-4 grid-cols-4 gap-6 mt-12 md:px-0 px-2'>
            <Link  to={'/send-money'}>
                <div className='flex flex-col items-center'>
                    <BsFillSendArrowUpFill className='text-purple-500 md:text-5xl text-3xl  lg:text-6xl' />
                    <p className='mt-2'>Send Money</p>
                </div>
            </Link>
            <Link to={'/mobile-recharge'}>
                <div className='flex flex-col items-center'>
                    <MdOutlineInstallMobile className='text-purple-500 md:text-5xl text-3xl lg:text-6xl' />
                    <p className='mt-2'>Mobile Recharge</p>
                </div>
            </Link>
            <Link to={'/cash-out'}>
                <div className='flex flex-col items-center'>
                    <BsCashCoin className='text-purple-500 md:text-5xl text-3xl lg:text-6xl' />
                    <p className='mt-2'>Cash-Out</p>
                </div>
            </Link>
            <Link to={'/request-money'}>
                <div className='flex flex-col items-center'>
                    <TbDeviceMobileShare className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Request Money</p>
                </div>
            </Link>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <IoBagCheckOutline className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Payment</p>
                </div>
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <MdAddCard className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Add Money</p>
                </div>
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <FaRegLightbulb className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Pay Bill</p>
                </div>
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <TbShoppingBagHeart  className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Savings</p>
                </div>
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <GiWorld  className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Remittance</p>
                </div>
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>
                <div className='flex flex-col items-center'>
                    <LuBookOpen   className='text-purple-500 -mt-2 md:text-5xl text-3xl lg:text-7xl' />
                    <p className='mt-2'>Education Fee</p>
                </div>
            </button>
        </div>
    );
};

export default UserMenu;
import React, { useContext } from 'react';
import { RiLogoutCircleRLine, RiQrScan2Line } from "react-icons/ri";
import { FaHouseMedical, FaRegCircleUser } from "react-icons/fa6";
import { IoHome } from 'react-icons/io5';
import { BiSolidOffer } from "react-icons/bi";
import { IoMdMailUnread } from "react-icons/io";
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { auth, logout } = useContext(AuthContext);
    return (
        <div className='bg-gradient-to-r fixed w-full max-w-6xl z-10 shadow-custom grid lg:grid-cols-5 grid-cols-4 rounded-lg justify-between from-gray-50 to-white transform -translate-x-1/2 bottom-0 left-1/2'>
            <Link to={'/'} className='bg-gradient-to-r flex flex-col justify-center items-center py-4 from-purple-100 to-purple-50'>
                <IoHome className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px]' />
                Home
            </Link>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r flex flex-col justify-center items-center py-4 from-purple-100 to-purple-50'>
                <RiQrScan2Line className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px]' />
                QR Scan
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r hidden lg:flex flex-col justify-center items-center py-4 from-purple-100 to-purple-50'>
                <BiSolidOffer className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px]' />
                Offer
            </button>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='bg-gradient-to-r flex flex-col justify-center items-center py-4 from-purple-100 to-purple-50'>
                <IoMdMailUnread className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px]' />
                Inbox
            </button>
            <button className='bg-gradient-to-r flex flex-col justify-center items-center py-4 from-purple-100 to-purple-50'>
                <RiLogoutCircleRLine className='text-purple-500 lg:text-[45px] text-[30px] md:text-[40px]' onClick={logout} />
                Logout
            </button>
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
    );
};

export default Footer;

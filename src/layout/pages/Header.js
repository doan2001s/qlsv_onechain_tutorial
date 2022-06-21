import { MdNotifications } from "react-icons/md";
import { FiMenu, FiHome } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import an from '../../img/an.jpg';
import Tippy from '@tippyjs/react';
import React, { useState, useEffect } from "react";
import SidebarNavigationMenu from './SidebarNavigationMenu';
export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    //choose the screen size 
    const handleResizeMobile = () => {
        if (window.innerWidth < 860) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
        
    }
    // console.log(isTable);

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResizeMobile);
        if (Screen.prototype.availWidth < 860) {
            setIsMobile(true);
        };
    })
    const onHandleClickMenu = () => {
        if (isMobile) {
            setIsShowSidebar(!isShowSidebar);
        }else{
            setIsShowSidebar(false);
        }
    }
    const callbackFunction = () => {
        
    }
    return (
        <div className="header 2xl h-20 bg-sky-500 flex justify-between block ease-in">
            <div className="boxLogo w-80 h-full flex items-center justify-start ease-in">
                {(() => {
                    if (isMobile) {
                        return (
                            <li onClick={onHandleClickMenu} className={"item-menu ease-in-out active w-10 flex items-center justify-center h-10 my-5 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"}>
                                <div className="icon">
                                    <FiMenu size={15} />
                                </div>
                            </li>
                        );
                    } else return "";
                })()}
                {(() =>{
                    if(isShowSidebar && isMobile){
                        return (
                            
                            <SidebarNavigationMenu isMobile={isMobile} isShowSidebar={isShowSidebar} parentCallback={callbackFunction} /> 
                        );
                    }
                })()}

                <a className={isMobile ? "text-white w-full text-center text-xl font-bold ease-in" :"text-white w-full text-center text-2xl font-bold ease-in"} href="/">Quản lý sinh viên </a>
            </div>
            <div className="boxNotification w-65 flex justify-end mr-5 items-center">
                {/* <button href="/login" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Đăng nhập</button> */}
                {/* <button href="/contract" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Liên hệ</button> */}
                <button href="/notification" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><MdNotifications size={28} /></button>
                {/* <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><MdPerson size={28} /></button> */}
                <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><img className="rounded-full w-11 h-11" src={an} alt="user" /></button>
            </div>
        </div>
    )
};
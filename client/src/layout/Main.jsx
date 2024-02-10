

import React, { useState } from 'react';
import NavBar from "./NavBar";
import SideMenu from "../components/Dashboard/SideMenu";
import { Outlet } from 'react-router-dom';

const Main = () => {
    const [show, setShow]=useState(true);

    const handleShow = ()=>{
        setShow(!show);
    }
    return (
        <>
            <NavBar handleShow={handleShow}/>
               <div className="d-flex">
                    <SideMenu show = {show}/>   
                        <div className="right-area p-2 bg-body-secondary flex-grow-1">
                            <Outlet />
                        </div>
                </div>
        </>
    );
};

export default Main;
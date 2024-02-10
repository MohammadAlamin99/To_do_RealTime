

import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { MdCreate,MdOutlineCancel  } from "react-icons/md";
import { RiChatNewLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbProgress } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";

const SideMenu = ({show}) => {
    const path = useLocation().pathname;
    const widthControl = show
    ? {
        minWidth: "220px",
        height: "calc(100vh - 119px)",
      }
    : {
        width: "0px",
        height: "calc(100vh - 119px)",
      };
    return (
        <>
          <div className="left-area overflow-auto mt-5 bg-body" style={widthControl}>
               <ul style={{ listStyle: "none" }} className="p-0 ">
                
        
            <Link to={"/"} style={{textDecoration:"none"}}>
                <li className={`p-2 customHover mb-1 ${path === "/" ? "active sidemenu" : "Not_active_sidemenu"}`}>
                    <span className="fs-6 pe-2 ">
                      <RxDashboard/>
                    </span>
                  <span className=''>
                      DashBoard   
                  </span>
                </li>
            </Link>
       


        <Link to={"/create"} style={{textDecoration:"none"}}>
            <li
              className={`p-2  mb-1  customHover ${
                path === "/create" ? "active sidemenu" : "Not_active_sidemenu"
              }`}
            >
              <span className="fs-6 pe-2">
                <MdCreate />
              </span>
              <span>Create Task</span>
            </li>
        </Link>


       <Link to={"/new"} style={{textDecoration:"none"}}>
          <li
              className={`p-2  mb-1  customHover ${
                path === "/new" ? "active sidemenu" : "Not_active_sidemenu"
              }`}
            >
              <span className="fs-6 pe-2">
                <RiChatNewLine />
              </span>
              <span>New Task</span>
            </li>
       </Link>



        <Link to={"/progress"} style={{textDecoration:"none"}}>
            <li
              className={`p-2  mb-1  customHover ${
                path === "/progress" ? "active sidemenu" : "Not_active_sidemenu"
              }`}
            >
              <span className="fs-6 pe-2">
                <TbProgress />
              </span>
              <span>In Progress</span>
            </li>
        </Link>

       
      <Link to={"/completed"} style={{textDecoration:"none"}}>
          <li
              className={`p-2  mb-1  customHover ${
                path === "/completed" ? "active sidemenu" : "Not_active_sidemenu"
              }`}
            >
              <span className="fs-6 pe-2">
                <AiOutlineFileDone />
              </span>
              <span>Completed</span>
            </li>
      </Link>


      <Link to={"/canceled"} style={{textDecoration:"none"}}>
          <li
              className={`p-2  mb-1  customHover ${
                path === "/canceled" ? "active sidemenu" : "Not_active_sidemenu"
              }`}
            >
              <span className="fs-6 pe-2">
                <MdOutlineCancel  />
              </span>
             <span>Canceled</span>
            </li>
      </Link>

      </ul>
    </div>
        </>
    );
};

export default SideMenu;
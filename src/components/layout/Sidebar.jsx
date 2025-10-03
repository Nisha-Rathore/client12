import React, { useState } from 'react'
import { Menu,LogOut,BarChart, LayoutDashboardIcon,Laptop, Dumbbell} from "lucide-react";
import { MdGroup, MdNotificationAdd, MdOutlineSecurity, MdSupportAgent } from 'react-icons/md';
import { TfiWallet } from 'react-icons/tfi';
import { BsClockHistory, BsFillBox2HeartFill } from 'react-icons/bs';
import { FaBlog, FaCapsules, FaCartPlus, FaSignInAlt, FaUserTie } from 'react-icons/fa';
import { LuFolderCog } from 'react-icons/lu';
import { TbClockExclamation, TbReportAnalytics, TbReportSearch } from 'react-icons/tb';
import { GiFruitBowl, GiGymBag, GiProgression } from 'react-icons/gi';
import { BiDumbbell } from 'react-icons/bi';
import { AiOutlineAudit, AiTwotoneRest } from 'react-icons/ai';
import { SiAuthentik, SiGoogleclassroom } from 'react-icons/si';
import { GoPasskeyFill } from 'react-icons/go';
import { SlSettings } from 'react-icons/sl';


const Sidebar = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);
     const [managementOpen, setManagementOpen] = useState(false);
     const [workoutOpen, setWorkoutOpen] = useState(false);
     const [serviceOpen, setServiceOpen] = useState(false);
     const [authenticationOpen, setAuthenticationOpen] = useState(false);
     const [productOpen, setProductOpen] = useState(false);

  return (
    <div>
      <aside className={`transition-all duration-300 bg-white border-r ${sidebarOpen ? 'w-64' : 'w-18'} shadow-sm h-screen sticky top-0`}> 
        <div className="h-18 flex items-center px-4 justify-between border-b">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(s => !s)} className="p-2 rounded-md hover:bg-slate-100">
              <Menu size={18} />
            </button>
            {sidebarOpen && <span className="font-bold text-lg">StoreAdmin</span>}
          </div>
          {sidebarOpen ? (
            <div className="text-xs text-slate-500">v1.0</div>
          ) : null}
        </div>

        <nav className="p-3 mt-4">
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
            <LayoutDashboardIcon size={18} />
            {sidebarOpen && <span>Dashboard</span>}
          </a>

          {/* Management Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm w-full"
              onClick={() => setManagementOpen(open => !open)}
            >
              <Laptop size={18} />
              {sidebarOpen && <span>Management</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${managementOpen ? 'rotate-90' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {managementOpen && sidebarOpen && (
              <div className="ml-7 flex flex-col gap-1">
                <Link to = "/members"><a  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <MdGroup  size={18} />
                  <span>Members</span>
                </a></Link>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <FaUserTie size={18} />
                  <span>Trainers</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <TfiWallet size={18} />
                  <span>Finance</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <BsFillBox2HeartFill size={18} />
                  <span>Facilities</span>
                </a>
              </div>
            )}
          </div>

           {/* Workout & Diet plans Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm w-full"
              onClick={() => setWorkoutOpen(open => !open)}
            >
              <BiDumbbell  size={18} />
              {sidebarOpen && <span>Workout & Diet Plans</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${workoutOpen ? 'rotate-90' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {workoutOpen && sidebarOpen && (
              <div className="ml-7 flex flex-col gap-1">
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <BsClockHistory size={18} />
                  <span>Workout Routines</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <TbReportAnalytics size={18} />
                  <span>Custom Diet Plans </span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <GiProgression size={18} />
                  <span>Progress Tracking</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <TbReportSearch size={18} />
                  <span>Reports / Analytics</span>
                </a>
              </div>
            )}
          </div>

           {/* Our Services Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm w-full"
              onClick={() => setServiceOpen(open => !open)}
            >
              <LuFolderCog size={18} />
              {sidebarOpen && <span>Our Services</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${serviceOpen ? 'rotate-90' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {serviceOpen && sidebarOpen && (
              <div className="ml-7 flex flex-col gap-1">
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <SiGoogleclassroom size={18} />
                  <span>Classes & Schedules</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <AiOutlineAudit size={18} />
                  <span>Courses</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <GiGymBag size={18} />
                  <span>Franchise & Memberships</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <MdOutlineSecurity size={18} />
                  <span>Security</span>
                </a>
              </div>
            )}
          </div>

             {/* Authentication */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm w-full"
              onClick={() => setAuthenticationOpen(open => !open)}
            >
              <SiAuthentik size={18} />
              {sidebarOpen && <span>Authentication</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${authenticationOpen ? 'rotate-90' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {authenticationOpen && sidebarOpen && (
              <div className="ml-7 flex flex-col gap-1">
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <FaSignInAlt size={18} />
                  <span>Sign Up</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <GoPasskeyFill size={18} />
                  <span>Sign In</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <TbClockExclamation size={18} />
                  <span>Forgot & Reset Password</span>
                </a>
              </div>
            )}
          </div>

          
             {/* Products */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm w-full"
              onClick={() => setProductOpen(open => !open)}
            >
              <FaCartPlus size={18} />
              {sidebarOpen && <span>Products</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${productOpen ? 'rotate-90' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {productOpen && sidebarOpen && (
              <div className="ml-7 flex flex-col gap-1">
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <GiFruitBowl size={18} />
                  <span>Protein</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <Dumbbell size={20} />
                  <span>Pre, Intra & Post-Workout Suppliments</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <AiTwotoneRest size={18} />
                  <span>Amino Acids Suppliments</span>
                </a>
                 <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                  <FaCapsules size={18} />
                  <span>Multivitamins & Minerals</span>
                </a>
              </div>
            )}
          </div>
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
            <MdNotificationAdd size={18} />
            {sidebarOpen && <span>Notification & Communication</span>}
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
            <FaBlog size={18} />
            {sidebarOpen && <span>GYM Blog</span>}
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
            <MdSupportAgent size={18} />
            {sidebarOpen && <span>Support Tickets</span>}
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
            <SlSettings size={18} />
            {sidebarOpen && <span>Settings</span>}
          </a>
        </nav>

        <div className="mt-auto p-3">
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
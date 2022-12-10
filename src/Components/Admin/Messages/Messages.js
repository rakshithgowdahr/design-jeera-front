import React, { useState, useEffect } from 'react';
import './Messages.scss';
import RightArrowgreen from '../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../assets/Sidebar/right-arrow-grey.png'
import axios from "axios";
import SearchImage from '../../../assets/Sidebar/search.png';
import { conf } from '../../../conf/conf';
import Input from '../Form/Input/Input';
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Messages = () => {
    const [users, setUsers] = useState([]);
    const [currentStep, setCurrentStep] = useState("All Users");
    const [currentPage, setCurrentPage] = useState(1);
    const [editUserShowed, setEditUserShowed] = useState(false)
    // edit form holders
    const [userEmail, setuserEmail] = useState("")
    const [userPlan, setuserPlan] = useState("")
    const [userSubscriptionEnds, setuserSubscriptionEnds] = useState("")
    const [userRole, setuserRole] = useState("")
    const handleInputs = (name, event) => {
        switch (name) {
            case "Email":
                setuserEmail(event.target.value)
                break;
            case "Subscription Ends":
                setuserSubscriptionEnds(event.target.value)
                break;
            default:
                break;
        }
    }
    // Dropdown
    const handleItemClick = (value, name) => {
        switch (name) {
            case "Plan":
                setuserPlan(value)
                break;
            case "Role":
                setuserRole(value)
                break;
            default:
                break;
        }
    }
    // Handle Table Item click 
    const handleTableItemClick = (value) => {
        setEditUserShowed(true)
        setuserEmail(value.email)
        setuserSubscriptionEnds(value.date)
        setuserPlan(value.message)
    }
    useEffect(() => {
        axios.post(conf.endPoint + "/api/contact/get", {
            data: {
                page: currentPage,
                limit: 10
            }
        }, { withCredentials: true }).then((resp) => {
            setUsers(resp.data)
        })
    }, [currentPage])
    // Handle submit of edit form 
    const handleSubmitForm = () => {
        axios.post(conf.endPoint + "/api/auth/edit/user/admin", {
            data: {
                plan: userPlan,
                subcrtiptionEnds: userSubscriptionEnds,
                role: userRole
            }
        }, { withCredentials: true }).then((resp) => {
            window.location.reload()
        })
    }
    // Handle top bar filter click
    const handleFilterClick = (filter) => {
        axios.post(conf.endPoint + "/api/contact/get" + filter, {
            data: {
                page: currentPage,
                limit: 10,
            }
        }, { withCredentials: true }).then((resp) => {
            setUsers(resp.data)
        })
    }
    return (
        <div className="admin__page">
            <div className="admin__users-head">
                <div className="admin__title">
                    <h2>Messages</h2>
                </div>
                {/* Search Button  */}
                <div className="admin__users-searchWrapper">
                    {/* Search Input */}
                    <div className="admin__users-search">
                        <img src={SearchImage} />
                        <input />
                    </div>
                    {/* Search Button */}
                    <a className="search-btn">Search</a>
                </div>
            </div>
            {/* Table of users */}
            <div className="admin__users-body">
                {/* Tabs */}
                <div className="admin__tabs">
                    <span onClick={() => { setCurrentStep("All Users"); handleFilterClick("all") }} className={currentStep == "All Users" && "admin__tab-active"}>
                        All Messages
                    </span>
                </div>
                {editUserShowed == false &&
                    <div className="admin__table">
                        {/* Table Head */}
                        <div className="admin__table-head">
                            <div className="admin__table-head--cell">
                                <span>_id</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Email</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Date </span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Role</span>
                            </div>
                        </div>
                        {/* Table Body  */}
                        <div className="admin__table-body">
                            {users.map((value, index) => (
                                <div onClick={() => handleTableItemClick(value)} className="admin__table-row">
                                    {/* Body Cell */}
                                    <div className="admin__table-body--cell">
                                        <span>{value._id}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---email ">
                                        <div className="email__avatar" style={{ backgroundColor: "black" }}>
                                            {value.email.substr(0, 2)}
                                        </div>
                                        <span>{value.email}</span>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.date}</span>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.role}</span>
                                    </div>
                                </div>
                            ))}
                            {users.length == 0 && <div className="admin__table-footer">
                                No data found
                            </div>}
                        </div>
                        <div className="admin__table-footer">
                            <a onClick={() => setCurrentPage(value => value > 1 ? value - 1 : value)}> <img src={RightArrowGrey} className="mirror" alt="right" /></a>
                            <a> {currentPage}</a>
                            <a onClick={() => setCurrentPage(value => value + 1)}><img src={RightArrowgreen} alt="right" /></a>
                        </div>
                    </div>
                }
                {/* Edit user form  */}
                {editUserShowed == true &&
                    <div className="edit__user">
                        <h2>A message from {userEmail} </h2>
                        <p>{userPlan}</p>
                        <Button onClick={() => { setEditUserShowed(false) }} style={{ display: "inline-block", marginTop: "10px", marginRight: "10px" }} type="outlined" value="Return" />
                    </div>
                }
            </div>
        </div>
    )
}
export default Messages

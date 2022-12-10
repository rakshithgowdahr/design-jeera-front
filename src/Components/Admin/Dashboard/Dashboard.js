import React, { useState, useEffect } from 'react';
import { conf } from '../../../conf/conf';
import './Dashboard.scss';
import axios from 'axios'
const Dashboard = () => {
    const [lastSubscription, setlastSubscription] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersNumber, setusersNumber] = useState('')
    const [templateNumber, settemplateNumber] = useState('')
    const [imagesNumber, setimagesNumber] = useState('')
    const [downloadsNumber, setdownloadsNumber] = useState('')
    useEffect(() => {
        axios.post(conf.endPoint + "/api/subscription/get/", {
            data: {
                page: currentPage,
                limit: 10
            }
        }, { withCredentials: true }).then((resp) => {
            setlastSubscription(resp.data)
        })
        // Get stats
        axios.post(conf.endPoint + "/api/getStats", {}, { withCredentials: true }).then((resp) => {
            if (resp.data[0].inited == true) {
                setusersNumber(resp.data[0].usersNumber !== undefined ? resp.data[0].usersNumber.toString() : 0)
                settemplateNumber(resp.data[0].templatesNumber !== undefined ? resp.data[0].templatesNumber.toString() : 0)
                setimagesNumber(resp.data[0].imagesNumber !== undefined ? resp.data[0].imagesNumber.toString() : 0)
                setdownloadsNumber(resp.data[0].downloadsNumber !== undefined ? resp.data[0].downloadsNumber.toString() : 0)
            }
        })
    }, [currentPage])
    return (
        <div className="admin__page">
            <div className="admin__title">
                <h2>Dashboard Overview</h2>
            </div>
            <div className="admin__dashboard">
                {/* Cards */}
                <div className="admin__dashboard__cards">
                    {/* Card */}
                    <div className="admin__dashboard-card" style={{ backgroundColor: "#eefefd" }}>
                        <span className="admin__dashboard-card--title">{usersNumber}</span>
                        <span>Users</span>
                    </div>
                    {/* Card */}
                    <div className="admin__dashboard-card" style={{ backgroundColor: "#ffeeef" }}>
                        <span className="admin__dashboard-card--title">{templateNumber}</span>
                        <span>Templates</span>
                    </div>
                    {/* Card */}
                    <div className="admin__dashboard-card" style={{ backgroundColor: "#f2e8ff" }}>
                        <span className="admin__dashboard-card--title">{imagesNumber}</span>
                        <span>Images</span>
                    </div>
                    {/* Card */}
                    <div className="admin__dashboard-card" style={{ backgroundColor: "#fbf0ed" }}>
                        <span className="admin__dashboard-card--title">{downloadsNumber}</span>
                        <span>Downloads</span>
                    </div>
                </div>
            </div>
            <div className="admin__title">
                <h2>Last Subscriptions</h2>
            </div>
            {/* Subscriptions */}
            {/* Table */}
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
                        <span>Status</span>
                    </div>
                    <div className="admin__table-head--cell">
                        <span>Date of registration</span>
                    </div>
                    <div className="admin__table-head--cell">
                        <span>Expiration Date</span>
                    </div>
                </div>
                {/* Table Body  */}
                <div className="admin__table-body">
                    {lastSubscription.map((value, index) => (
                        <div className="admin__table-row">
                            {/* Body Cell */}
                            <div className="admin__table-body--cell">
                                <span>_id</span>
                            </div>
                            <div className="admin__table-body--cell admin__table-body--cell---email ">
                                <div className="email__avatar" style={{ backgroundColor: "black" }}>
                                    {value.email.substring(0, 2)}
                                </div>
                                <span>{value.email}</span>
                            </div>
                            <div className="admin__table-body--cell admin__table-body--cell---status">
                                <div className="admin__table-status" style={{ backgroundColor: "black" }}>
                                    {value.duration}
                                </div>
                            </div>
                            <div className="admin__table-body--cell">
                                <span>{value.created_at}</span>
                            </div>
                            <div className="admin__table-body--cell">
                                <span>{value.expiration_date}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="admin__table-footer">
                    <a onClick={() => {
                        setCurrentPage(value => value > 1 ? --value : value)
                    }}>Previous</a>
                    <a>{currentPage}</a>
                    <a onClick={() => {
                        setCurrentPage(value => ++value)
                    }}>Next</a>
                </div>
            </div>
        </div>
    )
}
export default Dashboard

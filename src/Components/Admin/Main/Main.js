import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from '../Dashboard/Dashboard';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { Route } from 'react-router-dom'
import './Main.scss';
import Users from '../Users/Users';
import Templates from '../Templates/Templates';
import Images from '../Images/Images';
import SettingsMain from '../Settings/SettingsMain/SettingsMain';
import { conf } from '../../../conf/conf';
import Categories from '../Categories/Categories';
import Messages from '../Messages/Messages';
const Main = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.post(conf.endPoint + "/api/auth/check",
            {},
            { withCredentials: true }
        ).then((resp) => {
            if (resp.data.user == undefined || resp.data.user.role !== "admin") {
                window.location.href = "/auth"
            } else {
                setUser(resp.data.user)
            }
        })
    }, []);
    return (
        user !== null && user.role === "admin" ?
            <div className="admin">
                {/* Sidebar */}
                <AdminSidebar />
                {/* Content */}
                <div className="admin__content">
                    {/* <Dashboard /> */}
                    <Route exact path={"/admin"} component={Dashboard} />
                    <Route path={"/admin/users"} component={Users} />
                    <Route path={"/admin/templates"} component={Templates} />
                    <Route path={"/admin/Images"} component={Images} />
                    <Route path={"/admin/settings"} component={SettingsMain} />
                    <Route path={"/admin/categories"} component={Categories} />
                    <Route path={"/admin/messages"} component={Messages} />
                </div>
            </div>
            : "Unauthorazied"
    )
}
export default Main

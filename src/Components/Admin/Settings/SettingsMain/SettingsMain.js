import React, { useState } from 'react';
import './SettingsMain.scss';
import RightArrowgreen from '../../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../../assets/Sidebar/right-arrow-grey.png'
import SearchImage from '../../../../assets/Sidebar/search.png'
import Dropdown from '../../Form/Dropdown/Dropdown';
import SettingsMeta from './SettingsMeta/SettingsMeta';
import SettingsSocial from './SettingSocial/SettingsSocial';
import SettingsPages from './SettingsPages/SettingsPages';
import Subscriptions from './Subscriptions/Subscriptions';
import SettingsAnalytics from './SettingsAnalytics/SettingsAnalytics';
const SettingsMain = () => {
    const [currentStep, setCurrentStep] = useState("Metadata");
    const setCurrentStepName = (name) => {
        setCurrentStep(name)
    }
    return (
        <div className="admin__page">
            <div className="admin__users-head">
                <div className="admin__title">
                    <h2>Settings</h2>
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
                    <span onClick={() => setCurrentStepName("Metadata")} className={currentStep == "Metadata" && "admin__tab-active"} >
                        Metadata
                    </span>
                    <span onClick={() => setCurrentStepName("Pages")} className={currentStep == "Pages" && "admin__tab-active"}  >
                        Pages
                    </span>
                    <span onClick={() => setCurrentStepName("Social Links")} className={currentStep == "Social Links" && "admin__tab-active"} >
                        Social Links
                    </span>
                    <span onClick={() => setCurrentStepName("Analytics")} className={currentStep == "Analytics" && "admin__tab-active"} >
                        Analytics
                    </span>
                    <span onClick={() => setCurrentStepName("Subscriptions")} className={currentStep == "Subscriptions" && "admin__tab-active"} >
                        Subscriptions
                    </span>
                </div>
                {
                    currentStep == "Metadata" ? <SettingsMeta /> :
                        currentStep == "Pages" ? <SettingsPages /> :
                            currentStep == "Social Links" ? <SettingsSocial /> :
                                currentStep == "Analytics" ? <SettingsAnalytics /> :
                                    currentStep == "Subscriptions" && <Subscriptions />
                }
            </div>
        </div>
    )
}
export default SettingsMain

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '../../../Form/Button/Button'
import Input from '../../../Form/Input/Input'
import { conf } from '../../../../../conf/conf';
const SettingsAnalytics = () => {
    const [analytics, setAnalytics] = useState("")
    useEffect(() => {
        axios.post(conf.endPoint + "/api/analytics/get").then((resp) => {
            if (resp.data.length > 0) {
                setAnalytics(resp.data[0].trackingCode)
            }
        })
    }, [])
    const handleSubmit = () => {
        axios.post(conf.endPoint + "/api/analytics/add", {
            data: {
                analytics: analytics,
            }
        }, { withCredentials: true }
        ).then((resp) => {
            if (resp) {
            }
        })
    }
    const handleInputs = (name, event) => {
        switch (name) {
            case "Analytics":
                setAnalytics(event.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <div className="settings__meta">
            <div className="settings__title">
                <span>Add your analytics tracking code.</span>
                <form className="settings__form">
                    <Input title="Tracking Code" handleInputs={handleInputs} value={analytics} name="Analytics" />
                    <div className="admin__actionBtn">
                        <Button onClick={() => { handleSubmit() }} type="outlined" value={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SettingsAnalytics

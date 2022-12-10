import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '../../../Form/Button/Button'
import Input from '../../../Form/Input/Input'
import './SettingsMeta.scss'
import { conf } from '../../../../../conf/conf'
const SettingsMeta = () => {
    const [websiteTitle, setwebsiteTitle] = useState("")
    const [websiteDescription, setwebsiteDescription] = useState("")
    const [websiteKeywords, setwebsiteKeywords] = useState("")
    useEffect(() => {
        axios.post(conf.endPoint + "/api/getMeta").then((resp) => {
            console.log(resp);
            setwebsiteTitle(resp.data[0].websiteTitle)
            setwebsiteDescription(resp.data[0].websiteDescription)
            setwebsiteKeywords(resp.data[0].websiteKeywords)
        });
    }, [])
    const handleInputs = (name, event) => {
        switch (name) {
            case "Website Title":
                setwebsiteTitle(event.target.value)
                break;
            case "Description":
                setwebsiteDescription(event.target.value)
                break;
            case "Keywords":
                setwebsiteKeywords(event.target.value)
                break;
            default:
                break;
        }
    }
    const handleMetaDataSubmit = () => {
        axios.post(conf.endPoint + "/api/edit/metadata", { data: { websiteTitle: websiteTitle, websiteDescription: websiteDescription, websiteKeywords: websiteKeywords } }, { withCredentials: true }).then((resp) => {
            window.location.reload()
        });
    }
    return (
        <div className="settings__meta">
            <div className="settings__title">
                <span>In here you can change the meta data of your website.</span>
                <form className="settings__form">
                    <Input handleInputs={handleInputs} value={websiteTitle} title="Website Title" name="Website Title" />
                    <Input handleInputs={handleInputs} value={websiteDescription} title="Description" name="Description" />
                    <Input handleInputs={handleInputs} value={websiteKeywords} title="Keywords" name="Keywords" />
                    <div className="admin__actionBtn">
                        <Button onClick={() => { handleMetaDataSubmit() }} type="outlined" value={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SettingsMeta

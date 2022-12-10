import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '../../../Form/Button/Button'
import Input from '../../../Form/Input/Input'
import { conf } from '../../../../../conf/conf';
const SettingsSocial = () => {
    const [facebook, setfacebook] = useState("")
    const [twitter, settwitter] = useState("")
    const [youtube, setyoutube] = useState("")
    const [linkedin, setlinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    useEffect(() => {
        axios.post(conf.endPoint + "/api/social/get").then((resp) => {
            if (resp.data.length > 0) {
                setfacebook(resp.data[0].facebook)
                settwitter(resp.data[0].twitter)
                setyoutube(resp.data[0].youtube)
                setlinkedin(resp.data[0].linkedin)
                setInstagram(resp.data[0].instagram)
            }
        })
    }, [])
    const handleSubmit = () => {
        axios.post(conf.endPoint + "/api/social/add", {
            data: {
                twitter: twitter,
                facebook: facebook,
                youtube: youtube,
                linkedin: linkedin,
                instagram: instagram
            }
        }, { withCredentials: true }
        ).then((resp) => {
            if (resp) {
            }
        })
    }
    const handleInputs = (name, event) => {
        switch (name) {
            case "Facebook":
                setfacebook(event.target.value)
                break;
            case "Twitter":
                settwitter(event.target.value)
                break;
            case "Youtube":
                setyoutube(event.target.value)
                break;
            case "LinkedIn":
                setlinkedin(event.target.value)
                break;
            case "Instagram":
                setInstagram(event.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <div className="settings__meta">
            <div className="settings__title">
                <span>In here you can change all your social media links.</span>
                <form className="settings__form">
                    <Input title="Facebook" handleInputs={handleInputs} value={facebook} name="Facebook" />
                    <Input title="Instagram" handleInputs={handleInputs} value={instagram} name="Instagram" />
                    <Input title="Youtube" handleInputs={handleInputs} value={youtube} name="Youtube" />
                    <Input title="Linkedin" handleInputs={handleInputs} value={linkedin} name="LinkedIn" />
                    <Input title="Twitter" handleInputs={handleInputs} value={twitter} name="Twitter" />
                    <div className="admin__actionBtn">
                        <Button onClick={() => { handleSubmit() }} type="outlined" value={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SettingsSocial

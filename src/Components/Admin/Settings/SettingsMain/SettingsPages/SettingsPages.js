import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
import Button from '../../../Form/Button/Button'
import Input from '../../../Form/Input/Input'
import './SettingsPages.scss'
import { conf } from '../../../../../conf/conf'
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
const SettingsPages = () => {
    const [websiteTitle, setwebsiteTitle] = useState("")
    const [contentState, setContentState] = useState("")
    const [pagesList, setPagesList] = useState([]);
    useEffect(() => {
        axios.post(conf.endPoint + "/api/pages/get", {}, { withCredentials: true }).then((resp) => {
            console.log(resp);
            setPagesList(resp.data)
        });
    }, [])
    const handleInputs = (name, event) => {
        switch (name) {
            case "Website Title":
                setwebsiteTitle(event.target.value)
                break;
            default:
                break;
        }
    }
    const handlePageRemove = (name) => {
        axios.post(conf.endPoint + "/api/pages/remove", { data: { name: name } }, { withCredentials: true }).then((resp) => {
            if (resp) {
                window.location.reload()
            }
        })
    }
    const handlePageSubmit = () => {
        const rawContentState = convertToRaw(contentState.getCurrentContent());
        const markup = draftToHtml(
            rawContentState,
        );
        // Markup is the html exported
        axios.post(conf.endPoint + "/api/pages/add", {
            data: {
                name: websiteTitle.replace(" ", "_"),
                markup: markup
            }
        }, { withCredentials: true })
    }
    const onContentStateChange = (contentState) => {
        setContentState(contentState)
    }
    return (
        <div className="settings__meta">
            <div className="settings__title">
                <span>In here you can add and remove pages.</span>
                <div className="settings__currentPages">
                    {/* Pages */}
                    {pagesList.map((item, index) => {
                        return <div key={index} className="settings__pageItem">
                            <span className="settings__pageName">{item.name}</span>
                            <span onClick={() => { handlePageRemove(item.name) }} className="settings__delete">Delete</span>
                        </div>
                    })}
                </div>
                <form className="settings__form">
                    <Input handleInputs={handleInputs} value={websiteTitle} title="Page title" name="Website Title" />
                    <Editor
                        editorState={contentState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorStyle={{ height: "300px", border: "1px solid #F1F1F1" }}
                        onEditorStateChange={onContentStateChange}
                    />;
                    <div className="admin__actionBtn">
                        <Button onClick={() => { handlePageSubmit() }} type="outlined" value={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SettingsPages

import React, { useState, useEffect } from 'react';
import './Categories.scss';
import RightArrowgreen from '../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../assets/Sidebar/right-arrow-grey.png'
import SearchImage from '../../../assets/Sidebar/search.png'
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import Add from '../Add/Add';
import axios from 'axios';
import { conf } from '../../../conf/conf';
const Categories = () => {
    const [isAddShowed, setisAddShowed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [categoryName, setcategoryName] = useState('')
    const fetchCats = () => {
        axios.post(conf.endPoint + "/api/categories", { data: { page: currentPage, limit: 3 } }).then((resp) => {
            setCategories([...resp.data])
        })
    }
    ///
    useEffect(() => {
        fetchCats()
    }, [isAddShowed, currentPage])
    /// Delete category
    const DeleteCategory = (name) => {
        axios.post(conf.endPoint + "/api/categories/remove", { data: { name: name } }, { withCredentials: true }).then((resp) => {
            setCategories([...resp.data])
        })
    }
    const handleInputs = (name, event) => {
        switch (name) {
            // for category section
            case "CategoryName":
                setcategoryName(event.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <div className="admin__page">
            <div className="admin__users-head">
                <div className="admin__title">
                    <h2>Categories</h2>
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
                    <span className="admin__tab-active">
                        All Categories
                    </span>
                    {isAddShowed ?
                        <Button onClick={() => { setisAddShowed(false) }} type="outlined" value="Return" style={{ marginLeft: "auto" }} />
                        :
                        <Button onClick={() => { setisAddShowed(true) }} type="outlined" value="Add Category" style={{ marginLeft: "auto" }} />
                    }
                </div>
                {/* Table Stars */}
                {isAddShowed == false &&
                    <div className="admin__table">
                        {/* Table Head */}
                        <div className="admin__table-head">
                            <div className="admin__table-head--cell">
                                <span>Category</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Date added</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Status</span>
                            </div>
                        </div>
                        {/* Table Body  */}
                        <div className="admin__table-body">
                            {categories.map((value, index) => (
                                <div className="admin__table-row">
                                    {/* Body Cell */}
                                    <div className="admin__table-body--cell admin__table-body--cell---email ">
                                        <span>{value.name}</span>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.date}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---status">
                                        <div onClick={() => { DeleteCategory(value.name) }} className="admin__table-status" style={{ backgroundColor: "#e74c3c" }}>
                                            Remove
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="admin__table-footer">
                            <a onClick={() => { setCurrentPage(value => value >= 1 ? value - 1 : value) }}><img src={RightArrowGrey} className="mirror" alt="right" /></a>
                            <a> {currentPage}</a>
                            <a onClick={() => { setCurrentPage(value => value + 1) }}><img src={RightArrowgreen} alt="right" /></a>
                        </div>
                    </div>
                }
                {/* Table ends */}
                {/* Add templates */}
                {isAddShowed &&
                    <Add handleInputs={handleInputs} categoryName={categoryName} type={"category"} />
                }
            </div>
        </div>
    )
}
export default Categories

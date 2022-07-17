import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Axios from "axios";
import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



export default function DetailComponent() {
    const navigate = useNavigate();
    const { Id } = useParams();
    const [itemDetail, setDetail] = useState({});
    const FindId = (o) => {
        if (o && o.length > 0)
            for (let i = 0; i < o.length; i++) {
                if (o[i].id === Id) {
                    setDetail(o[i])
                    break
                }
            }
    }
    useEffect(() => {
        async function GetData() {
            await Axios.get(window.API_PRODUCT_ALL)
                .then(rs => {
                    FindId(rs.data)
                })
        }
        if (!window.mar || window.mar.length === 0) {
            GetData()
        } else {
            FindId(window.DATA_PRODUCT)
        }
    }, [])

    const _location = itemDetail.location ? itemDetail.location : "Missing";
    const _stateOfHealth = itemDetail.stateOfHealth ? itemDetail.stateOfHealth + "%" : "Missing";
    const _stateOfCharge = itemDetail.stateOfCharge ? itemDetail.stateOfCharge + "%" : "Missing";

    const _conStatus = () => {
        if (itemDetail.connectionStatusId == 1) {
            return "Online"
        }
        else if (itemDetail.connectionStatusId == 2) {
            return "Pending"
        }
        else {
            return "Offline"
        }
    }

    //const _issues = () => {
    //    if (itemDetail.recentIssues == 1) {
    //        return "Deep discharge"
    //    }
    //    else if (itemDetail.recentIssues == 2) {
    //        return "Overheating"
    //    }
    //    else if (itemDetail.recentIssues == 3){
    //        return "Unknown anomaly"
    //    }
    //    else {
    //        return "Missing data"
    //    }
    //}

    const _issues = (o) => {
        let str = "";
        if (o && o.length > 0) {
            for (let i = 0; i < o.length; i++) {
                if (o[i] == 1) {
                    str += "Deep discharge"
                }
                else if (o[i] == 2) {
                    str += "Overheating"
                }
                else if (o[i] == 3) {
                    str += "Unknown anomaly"
                }
                else {
                    str += "Missing data"
                }
                if (i == 0 && o.length > 1) {
                    str += " & "
                }
            }
        }
        return str;
    }

    const _classCharge = () => {
        if (itemDetail.stateOfCharge > 20) {
            return "battery-level"
        }
        else if (itemDetail.stateOfCharge <= 20 && itemDetail.stateOfCharge > 5) {
            return "battery-level warn"
        }
        else if (itemDetail.stateOfCharge <= 5 & itemDetail.stateOfCharge !== null) {
            return "battery-level alert"
        }
    }

    const _classHealth = () => {
        if (itemDetail.stateOfHealth > 70) {
            return "health-level"
        }
        else if (itemDetail.stateOfHealth <= 70 && itemDetail.stateOfHealth > 50) {
            return "health-level warn"
        }
        else if (itemDetail.stateOfHealth <= 50 & itemDetail.stateOfHealth !== null) {
            return "health-level alert"
        }
    }

    return (
        <div className="container">
            <div className="header">
                <button className="back_button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <label className="topic">{itemDetail.id}</label>
            </div>
            {/*<h1>{itemDetail.id}</h1>*/}
            <div className="row">
                <div>
                    <div className="lable">Location:</div>
                    <div className="value">{_location}</div>
                </div>
                <div>
                    <div className="lable">Capacity:</div>
                    <div className="value">{itemDetail.capacity} A⋅h</div>
                </div>
                <div>
                    <div className="lable">Voltage:</div>
                    <div className="value">{itemDetail.voltage} V</div>
                </div>
                <div>
                    <div className="lable">Last connection time:</div>
                    <div className="value">{itemDetail.lastConnectionTime}</div>
                </div>
                <div>
                    <div className="lable">State of Charge:</div>
                    <div className="battery">
                        <div className={_classCharge()} style={{ height: itemDetail.stateOfCharge + '%' }}></div>
                    </div>
                    <div className="value">{_stateOfCharge}</div>
                </div>
                <div>
                    <div className="lable">State of Health:</div>
                    <div className="health">
                        <div className={_classHealth()} style={{ height: itemDetail.stateOfHealth + '%' }}></div>
                    </div>
                    <div className="value">{_stateOfHealth}</div>
                </div>
                <div>
                    <div className="lable">Recent Issues:</div>
                    <div className={_issues(itemDetail.recentIssues)}>{_issues(itemDetail.recentIssues)}</div>
                </div>
                <div>
                    <div className="lable">Connection Status:</div>
                    <div className={_conStatus()}>{_conStatus()}</div>
                </div>

            </div>
        </div>
    )
}
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "../index.css";

function Table() {
    const columns = [
        { label: "ID", accessor: "id", sortable: true },
        { label: "Location Name", accessor: "location", sortable: true },
        { label: "Capacity", accessor: "capacity", sortable: false },
        { label: "Voltage", accessor: "voltage", sortable: false },
        { label: "Last Connection Time", accessor: "lastConnectionTime", sortable: false },
        { label: "State Of Charge", accessor: "stateOfCharge", sortable: true },
        { label: "State Of Health", accessor: "stateOfHealth", sortable: false },
        { label: "Recent Issues", accessor: "recentIssues", sortable: false },
        { label: "Connection Status Id", accessor: "connectionStatusId", sortable: true },
    ];

    const [tableData, SetData] = useState([]);
    const [loadingData, SetLoadingData] = useState(true);

    const [query, setQuery] = useState("");
    const search = (data) => {
        return data.filter((item) =>
            item.id.toLowerCase().includes(query) ||
            (item.location !== null ? item.location.toLowerCase().includes(query) : null) ||
            (item.connectionStatusId !== null ? item.connectionStatusId.toString().toLowerCase().includes(query) : null) ||
            (item.stateOfCharge !== null ? item.stateOfCharge.toString().toLowerCase().includes(query) : null)
        );
    };


    useEffect(() => {
        async function GetData() {
            await Axios.get(window.API_PRODUCT_ALL)
                .then(rs => {
                    window.DATA_PRODUCT = rs.data;
                    SetData(rs.data);
                    SetLoadingData(false);
                })
        }
        if (loadingData) {
            GetData();
        }
    }, []);

    const navigate = useNavigate();
    const handleOnClick = useCallback((d) => navigate('/detail/' + d.id, { replace: false }), [navigate]);

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            SetData(sorted);
        }
    };

    return (
        <>
            <div className="header">
                <label className="topic">Battery List</label>
            </div>
            <div className="table_container">
                <div className= "search_container">
                    <input
                        type="text"
                        className="search"
                        style={{ width: "240px" }}
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <div>
                    <table className="table">
                        <TableHead columns={columns} handleSorting={handleSorting} />
                        <TableBody columns={columns} tableData={search(tableData)} handleOnClick={handleOnClick} />
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table


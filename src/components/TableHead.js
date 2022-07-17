import React from 'react'
import { useState } from "react";
//import { MouseEventHandler, useCallback, useState } from "react";
//import axios from 'axios'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSort } from '@fortawesome/free-solid-svg-icons'
//import { faSortUp } from '@fortawesome/free-solid-svg-icons'
//import { faSortDown } from '@fortawesome/free-solid-svg-icons'

const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };
    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up"
                            : sortField === accessor && order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;


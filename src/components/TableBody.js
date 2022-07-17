import React from 'react'
import navigateTo from "./IndividualPage";
import { Link, useNavigate } from "react-router-dom"
import { MouseEventHandler, useCallback, useState } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'

const TableBody = ({ columns, tableData, handleOnClick }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr key={data.id} onClick={() => handleOnClick(data)}>
                        {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "N/A";
                            return <td key={accessor} >{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}


export default TableBody;


import React, { Component } from "react";
import './App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Table from "./components/Table";
import DetailComponent from "./components/IndividualPage";

window.DATA_PRODUCT = [];
window.API_PRODUCT_ALL = "https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter basename={window.location.pathname || ''}>
                    <Routes>
                        <Route path="/" element={<Table />} />
                        <Route path="/detail/:Id" element={<DetailComponent />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;


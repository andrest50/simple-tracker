import React from 'react'
import { Link } from "react-router-dom";

function Header() {
    const changeColorMode = () => {
        var element = document.getElementById('colorModeBtn');
        element.classList.toggle('night-mode');
    }
    return (
        <div>
            <h1>Simple Tracker</h1>
            <p>This is a website for creating, and maintaining, many trackers</p>
            <Link to="/">Dashboard</Link>
            <hr />
      {/*       <br />
            <br />
            <span className="color-dot center" id="colorModeBtn" onClick={changeColorMode}/> */}
        </div>
    )
}

export default Header;

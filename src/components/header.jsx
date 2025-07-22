import "./header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


const Header = ({ width }) => {
    // console.log("width value",width)
    return <>
        <div className="headContainer">
            <div className="Heading">
                <h1 className={width?"headingDisAppearence":"headingAppearence"}>TodoList App</h1>
            </div>
            <div className="profile">
                <FontAwesomeIcon icon={faBell} className="Icon"/>
                <div className="Profilepic">
                    <img src="/images/me.jpg" alt="me" />
                </div>

            </div>
        </div>
    </>
}


export default Header
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import "./todolistHeader.css"
import { faAdd } from "@fortawesome/free-solid-svg-icons";



// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function TodolistHeader({findFunction, today, func, setData, formType, tabs,tabsStateFunciton}) {
    const refference = useRef(0);
    const [search, setsearch] = useState();
    const ref2 = useRef(0)
    const [display, setdisplay] = useState(false);
    const [Iteraction, SetIteraction] = useState(0);
    const [formatDate,setformatDate] = useState("");
    let handleCLick = (e) => {
        if (e.target && !ref2.current.contains(e.target)) {
            if (display) {
                console.log("from inside ");
                setdisplay(!display)
            }
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleCLick)
        return () => {
            console.log("unmount")
            document.removeEventListener("click", handleCLick);
        }
    }, [display])


    const date = new Date();
    const n = 0;
    const futureDate = new Date(date);
    futureDate.setDate(date.getDate() + n);
    const formattedDate = futureDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    let datesArray = [];
    for (let i = 0; i < 31; i++) {
        const futureDate = new Date(date);
        futureDate.setDate(date.getDate() + i);
        const formattedDate = futureDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            
        });
        datesArray.push([formattedDate,futureDate.toISOString().split("T")[0]]);
    }


    const searchRes = (e) => {
        if (e.key === "Enter") {
            if (e.target.value == "") {
                alert("Search query is empty !!")
                return;
            }
            console.log(search);
            e.target.value = ""
            setsearch("")
        }
    }
    const Currentdate=(e,date,string)=>{
        console.log(date,string);
        today(date);
        setformatDate(string)
        setdisplay(!display)
    }
    const searchChange = (e) => {
        // setsearch(e.target.value);
        findFunction(e.target.value);
    }
    console.log(Iteraction, display);

    return <>
        <div ref={ref2} className={"Todheader"}>
            <div className={"Dates"}>
                <h2 ref={refference}>{formatDate==""?formattedDate:formatDate}</h2>
                <FontAwesomeIcon className={"FontIcon"} onClick={() => {
                    console.log("hello world ", display);
                    setdisplay(!display)
                    SetIteraction(Iteraction + 1);
                }} icon={faCaretDown} />
                <div className="NextDatesConatiner" style={{display:`${Iteraction > 0 ? display ? "block" : "none" : "none"}`}}>
                    <div className={`NextDates ${Iteraction > 0 ? display ? "NextDatesAnimate" : "exitAnimation" : ""}`}>
                        {datesArray.map((item, index) => {
                            return <React.Fragment key={index}>
                                <p onClick={(e)=>{Currentdate(e,item[1],item[0])}}>{item[0]}</p>
                            </ React.Fragment>
                        })}
                    </div>
                </div>

            </div>
            <div className="tabs">
                <p onClick={()=>{tabsStateFunciton(true)}} className={`${tabs?"bordered":""}`} >Active tasks</p>
                <p onClick={()=>{tabsStateFunciton(false)}} className={`${!tabs?"bordered":""}`}>Completed</p>
            </div>
            <div className="search">
                <input onChange={(e) => { searchChange(e) }} onKeyDown={(e) => { searchRes(e) }} type="text" className="searchTodo" placeholder={"search task by Title"} />
                <button onClick={() => { 
                    func(true)
                    formType(true);
                 }} className="submit">
                    <FontAwesomeIcon icon={faAdd} />
                    Add new Task
                </button>
            </div>
        </div>

    </>
}
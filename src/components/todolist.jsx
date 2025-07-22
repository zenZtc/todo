import { useEffect, useRef, useState } from "react";
import TodolistHeader from "./todoComponent/todolistHeader";
import "./todolist.css"
import TodolistItem from "./todoComponent/todoListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256); // Red: 0–255
    const g = Math.floor(Math.random() * 256); // Green: 0–255
    const b = Math.floor(Math.random() * 256); // Blue: 0–255
    return `rgb(${r}, ${g}, ${b})`;
}

const Todolist = () => {
    const [tabs, setTab] = useState(true);
    const [DisplayForm, SetDisplayForm] = useState(false);
    const [Title, setTitle] = useState("");
    const [date, setdate] = useState("");
    const [Time, setTime] = useState("");
    const [desc, setdesc] = useState("");
    const [formType, setformType] = useState(false);
    const [search, setsearch] = useState("");
    const [taskNumber, settaskNumber] = useState(null);
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // today
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    const maxDateString = maxDate.toISOString().split('T')[0];
    const Form = useRef();
    const [taskItem, settaskItem] = useState([]);
    const [todaysDate, settodaysDate] = useState(minDate);
    useEffect(() => {
        console.log(minDate, tabs)
        if (tabs) {
            let arr = localStorage.getItem("arr");
            // console.log(arr);
            let windows
            if (arr[0]) {
                windows = JSON.parse(arr);
                windows = windows?.filter((item) => item.date == todaysDate)
                if (search != "") {
                    windows = windows?.filter(item => item.Title.includes(search))
                }
                settaskItem(windows);
            }
        } else {
            let arr = localStorage.getItem("complete")
            console.log(arr);
            let windows
            if (arr[0]) {
                windows = JSON.parse(arr);
                windows = windows?.filter((item) => item.date == todaysDate)
                if (search != "") {
                    windows = windows?.filter(item => item.Title.includes(search))
                }
                settaskItem(windows);
            }
            settaskItem(windows);
        }


    }, [DisplayForm, tabs, todaysDate, search])
    console.log("rendered ")
    const TitleChange = (e) => {
        console.log(e.target.value);
        setTitle(e.target.value);
    }
    const DateChange = (e) => {
        console.log(e.target.value);
        setdate(e.target.value);
    }

    const TimeChange = (e) => {
        console.log(e.target.value)
        setTime(e.target.value)
    }
    const DescriptionChange = (e) => {
        console.log(e.target.value)
        setdesc(e.target.value);
    }

    const clickOutside = (e) => {
        console.log(e.target)
        SetDisplayForm(false)
    }

    const submitChanges = (formType) => {
        let bgColor = getRandomRGBColor();
        const obj = { Title, date, Time, desc, bgColor };
        if (formType) {
            if (desc == "") {
                alert("fill your description")
                return;
            }
            if (Time == "") {
                alert("fill Time")
                return;
            }
            if (date == "") {
                alert("fill Date");
                return;
            }
            if (Title == "") {
                alert("Fill Title")
                return;
            }



            console.log(localStorage.getItem("arr"))

            if (!localStorage.getItem("complete")) {
                localStorage.setItem("complete", JSON.stringify([]));
                console.log("not there")
            }
            if (!localStorage.getItem("arr")) {
                console.log("helow")
                let arr = [obj];
                let stringarr = JSON.stringify(arr);
                localStorage.setItem("arr", stringarr);
            } else {
                let hellow = localStorage.getItem("arr");
                let arr = JSON.parse(hellow);
                console.log("frmfdsaf dsaf dsafds afdsa ")
                arr.push(obj)
                console.log("hellow :: ", arr);
                let stringarr = JSON.stringify(arr);
                localStorage.setItem("arr", stringarr);
            }
        } else {

            console.log("form else part ");
            console.log(Title, date, Time, desc)
            if (!Title && !date && !Time && !desc) {
                alert("fill atleaset on value");
                SetDisplayForm(false);
                return;
            }
            let hellow = localStorage.getItem("arr");
            let arr = JSON.parse(hellow);
            console.log(arr[taskNumber]);
            if (Title) {
                arr[taskNumber]["Title"] = Title
            }
            if (Time) {
                arr[taskNumber]["Time"] = Time;
            }
            if (date) {
                arr[taskNumber]["date"] = date;
            }
            if (desc) {
                arr[taskNumber]["desc"] = desc;
            }
            let stringarr = JSON.stringify(arr);
            localStorage.setItem("arr", stringarr);
        }

        setTitle("");
        setTime("");
        setdate("");
        setdesc("");
        SetDisplayForm(false)
        formType ? settaskItem(prev => prev ? [...prev, obj] : [obj]) : null;
    }
    // console.log(taskNumber);
    return <>
        <div className="MainContainer2">
            <TodolistHeader findFunction={setsearch} today={settodaysDate} tabs={tabs} tabsStateFunciton={setTab} formType={setformType} func={SetDisplayForm} setData={settaskItem} />
            <TodolistItem tabs={tabs} func={SetDisplayForm} form={setformType} newItemsfunction={settaskItem} setnumber={settaskNumber} data={taskItem} />
        </div>
        {
            DisplayForm ? <div className="AddTaskForm" onClick={(e) => { clickOutside(e) }} ref={Form}>
                <div className="formContainer" onClick={(e) => { e.stopPropagation() }}>
                    <div className="formContainerHeader">
                        <h2>{
                            formType ? "Add new Task" : "EditTask"
                        }</h2>
                        <FontAwesomeIcon onClick={() => { SetDisplayForm(false) }} icon={faXmark} size="2x" />
                    </div>
                    <div className="FormInputs">
                        <input onChange={(e) => { TitleChange(e) }} value={Title} type="text" placeholder="Add Title" />
                        <input onChange={(e) => { DateChange(e) }} value={date} type="date" placeholder="Add Title" max={maxDateString} min={minDate} />
                        <input onChange={(e) => { TimeChange(e) }} value={Time} type="time" />
                        <textarea onChange={(e) => { DescriptionChange(e) }} value={desc} placeholder="Description"></textarea>
                    </div>
                    <div className="FormFooter">
                        <button onClick={() => { SetDisplayForm(false) }}>close</button>
                        <button onClick={() => { submitChanges(formType) }}>submit</button>
                    </div>
                </div>
            </div> : null
        }
    </>
}

export default Todolist;

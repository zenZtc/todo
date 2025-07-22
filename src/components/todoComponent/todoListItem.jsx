import { useRef, useState } from "react"
import "./todoListItem.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { faClose } from "@fortawesome/free-solid-svg-icons"


export default function TodolistItem({ tabs, data, setnumber, form, func, newItemsfunction }) {
    // console.log(data)
    const divref = useRef(null);
    const [checkboxes, setcheckboxes] = useState(0);
    const [indexNumber, setindexNumber] = useState(-1);
    // document.querySelector("3containerMain");
    const handleclick = (e, index) => {
        const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
        console.log(checkboxes)
        console.log()
        if (index == indexNumber) {
            setindexNumber(-1);
        } else {
            setindexNumber(index);
        }
    }

    const showMenu = (e, index) => {
        e.stopPropagation();
        console.log("helow", index)
        setnumber(index)
        form(false);
        func(true);
    }


    function deletethis(e, index) {
        e.stopPropagation()
        if (tabs) {
            console.log("this")
            if (index > -1 && index < data.length) {
                data.splice(index, 1);
            }
            setindexNumber(-1);
            console.log(data)
            localStorage.setItem("arr", JSON.stringify(data));
            newItemsfunction(data)
        } else {
            console.log(index, data);
            if (index > -1 && index < data.length) {
                data.splice(index, 1);
            }
            console.log(data)
            localStorage.setItem("complete", JSON.stringify(data));
            newItemsfunction(data)
            setindexNumber(-1);
        }


    }

    function editForm(e, index) {
        e.stopPropagation()
        console.log("helo from edit")
        setnumber(index)
        form(false);
        func(true);
    }
    const complete = (e, item, index) => {
        console.log(item);
        const arr = JSON.parse(localStorage.getItem("complete"))
        arr.push(item);
        console.log(arr);
        if (index > -1 && index < data.length) {
            data.splice(index, 1);
        }
        localStorage.setItem("arr", JSON.stringify(data));
        newItemsfunction(data)
        let stringarr = JSON.stringify(arr);
        localStorage.setItem("complete", stringarr);
        console.log(item.bgColor, item.desc)
        let newarr = JSON.parse(localStorage.getItem("arr"))
        newarr = newarr.filter((elem) => (item.bgColor != elem.bgColor) || (item.desc != elem.desc));
        console.log(newarr);
        localStorage.setItem("arr", JSON.stringify(newarr));
        console.log(index);
    }
    let counterApp = 0;
    return <>
        <div className="itemConatiner">
            {
                data?.map((item, index) => {
                    console.log("windows", counterApp);
                    counterApp++;
                    return <div

                        onClick={(e) => handleclick(e, index)}
                        // onDoubleClick={}
                        style={{ backgroundColor: item.bgColor }} key={index}>

                        <div className="Itemheader">
                            <div className="titleInput">
                                <h2>{item.Title.length > 50 ? <span>{item.Title}</span>
                                    : item.Title}</h2>
                            </div>
                            <div className="editContainer">
                                <div className="EditButton" onClick={(e) => { showMenu(e, index) }}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </div>

                        </div>
                        <div className="Itembody">
                            <div className="descContainer">
                                <p className="description">{item.desc}</p>
                            </div>

                            <div className="DateAndTimeContainer">
                                <p>
                                    {
                                        <FontAwesomeIcon className="DateAndTime" icon={faClock} />
                                    }{item.Time}
                                </p>
                                <p>
                                    {
                                        <FontAwesomeIcon className="DateAndTime" icon={faCalendar} />
                                    }
                                    {
                                        item.date
                                    }
                                </p>
                            </div>

                        </div>

                        {
                            indexNumber == index ? <div className="menuDiv">
                                <div className="closebuttonContainer">
                                    <FontAwesomeIcon icon={faClose} className="CLoseIcon" />

                                </div>
                                <div className="buttonComtainer">

                                    {tabs ? checkboxes < 2 ? <button style={{ backgroundColor: "rgb(65, 222, 65)" }} onMouseOver={() => { console.log("hellow ") }} onClick={(e) => complete(e, item, index)}>Mark Complete </button> : null : null}
                                    {
                                        tabs ? checkboxes < 2 ? <button style={{ backgroundColor: "rgb(65, 128, 222)" }} onMouseOver={() => { console.log("hellow ") }} onClick={(e) => editForm(e, index)}>Edit</button> : null : null
                                    }
                                    <button style={{ "backgroundColor": "rgb(222, 65, 65)" }} onClick={(e) => deletethis(e, index)}>Delete</button>
                                </div>
                            </div> : null
                        }
                    </div>
                }
                )
            }

        </div>
    </>
}

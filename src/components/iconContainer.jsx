import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  } from "@fortawesome/free-brands-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"
import { faClock, faCircleUser,faDownload ,faHouse } from "@fortawesome/free-solid-svg-icons"
import "./iconContainer.css"
const Iconconatiners = ({ state ,userInteraction}) => {

    // console.log(state,userInteraction);
    return <>
        <div className="iconConatiner">
            <div style={{width:state?"90%":"100%"}}>
                <FontAwesomeIcon className={"fontIcon"} icon={faHouse} />{state ? <p>home</p>  : null}
            </div>
            <div style={{width:state?"90%":"100%"}}>
                <FontAwesomeIcon className={"fontIcon"} icon={faClock} />{state ? <p>history</p>  : null}
            </div>
            <div style={{width:state?"90%":"100%"}}>
                <FontAwesomeIcon className={"fontIcon"} icon={faCircleUser} />{state ? <p>User</p>  : null}
            </div>
            <div style={{width:state?"90%":"100%"}}>
                <FontAwesomeIcon className={"fontIcon"} icon={faDownload} />{state ? <p>import</p>  : null}
            </div>
        </div>
    </>
}


export default Iconconatiners;
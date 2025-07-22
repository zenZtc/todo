import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Todolist from './components/todolist'
import Iconconatiners from './components/iconContainer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [count, setCount] = useState(0);
  const [SideBar, setSideBar] = useState(false);
  const [userInteraction, SetuserInteraction] = useState(false);


  const width = userInteraction ? !SideBar ? "closeSidebar" : "sideBarAnimation" : "";

  function CheckWidth() {
    setSideBar(!SideBar);
    count == 0 ? SetuserInteraction(!userInteraction) : null;
    setCount(count + 1);
  }

  return <div className='Appcontainer'>
    <div className={`sideBar ${width}`} >
      {/* <button onClick={() => {
        CheckWidth();
      }}>Close</button> */}
      <div className='sidebarIconsContainers'>
        <FontAwesomeIcon icon={SideBar ? faXmark : faBars} className={"openClose"} onClick={() => CheckWidth()} />
        <Iconconatiners state={SideBar} userInteraction={userInteraction} />
      </div>

    </div>
    <div className='Maincontent'>
      <Header width={SideBar} />
      <Todolist />
    </div>

  </div>
}

export default App

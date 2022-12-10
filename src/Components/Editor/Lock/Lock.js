import React ,{useState,useEffect}from 'react'
import './Lock.scss';

import {ReactComponent as ClosedLock} from '../../../assets/images/padlock.svg'
import {ReactComponent as OpenedLock} from '../../../assets/images/padlockOpened.svg'


const Lock = (props) => {

    const [isLocked,setisLocked] = useState(false)

    useEffect(()=>{
        // console.log("cahnged locked status");
        setisLocked(props.selectedLockedStatus)
    },[props.selectedLockedStatus]);
    
    const handleLockClick = ()=>{
        setisLocked(prevState =>!prevState)
        props.handleLockClick()
    }
     return (
        <div onClick={()=>{handleLockClick()}}  className={isLocked ? "lock active" : "lock"}>
            {isLocked == true ?  <ClosedLock /> :< OpenedLock />}
        </div>
    )
}

export default Lock

import { useContext } from 'react'
import AppBar from './appBar'
import MobileAppBar from './mobileAppBar'
import { MobileContext } from '../../contexts/mobileContext'

const HarmonyAppBar = () => {
  const mobile = useContext(MobileContext)
  if (mobile) {
    return (<MobileAppBar />) as JSX.Element
  } else {
    return (<AppBar />) as JSX.Element
  }
}

export default HarmonyAppBar

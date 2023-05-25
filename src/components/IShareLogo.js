import React from 'react'
import { Link } from "react-router-dom";


import {ReactComponent as Logo} from '../assets/logo-icon-text.svg';

const IShareLogo = ({ toLink }) => {
  return (
    <Link to={ toLink ? toLink : '/'}>
        <Logo className="logo" />
    </Link>
  )
}

export default IShareLogo
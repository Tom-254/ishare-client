import React from 'react'
import { Link } from 'react-router-dom'

const IShareButton = ({buttonName, buttonStyle, buttonType, buttonIcon, buttonIconLeft, onClick, linkTo}) => {
  return (
    <>{ linkTo
      ? <Link to={linkTo} className={`${buttonStyle ? "flex-center button-primary " + buttonStyle : "flex-center button-primary"}`} type={`${buttonType ? buttonType : "button"}`}>{buttonName}{buttonIcon}</Link> :
      (<button className={`${buttonStyle ? "flex-center button-primary " + buttonStyle  : "flex-center button-primary"}`} type={`${buttonType ? buttonType : "button"}`} onClick={onClick}>
        {buttonIconLeft}
        {buttonName}
      </button>)
    }
    </>
  )
}

export default IShareButton
import React from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { ReactComponent as LikeIcon } from "../assets/like-icon.svg";
import { ReactComponent as MessageIcon } from "../assets/message-icon.svg";
import { ReactComponent as MoreIcon } from "../assets/more-icon.svg";
import { ReactComponent as BookMarkIcon } from "../assets/book-mark-icon.svg";


const ImageShow = ({profileImage, contentImage, name, email, imageDescription}) => {
  return (
    <div className='flex-column image-container'>
        <div className='flex image-top'>
            <div className='flex image-top-left'>
                <div className='flex image-top-left__profile'>
                    <img src={profileImage} alt="Profile" />
                </div>
                <div className='flex-column image-top-left__content'>
                    <p title={parse(name)}>
                        {name}
                    </p>
                    <p title={email}>
                        {parse(email || "")}
                    </p>
                </div>
            </div>
            <Link>
                <MoreIcon />
            </Link>
        </div>
        <div className='flex image-middle'>
            <img src={contentImage} alt="Content" />
        </div>
        <div className='flex-column image-bottom'>
            <div className="flex image-bottom-top">
                <div className='flex image-bottom-top__left'>
                    <LikeIcon />
                    <MessageIcon />
                </div>
                <div className='image-bottom-top__right'>
                    <BookMarkIcon />
                </div>
            </div>
            <div className='image-bottom-content'>
                <p>
                    {parse(imageDescription || "") }
                </p>
            </div>
        </div>
    </div>
  )
}

export default ImageShow
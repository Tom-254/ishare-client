import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import {ReactComponent as ArrowRight} from '../assets/arrow-right.svg'

const FeatureCard = ({cardImage, cardIcon, cardTitle, cardContent}) => {
  return (
    <div className='flex-column card-container'>
        <div className='card-image-container'>
            <div className='card-image'>
                <img src={cardImage} alt="Card Banner" />
            </div>
            <div className='flex-center card-icon'>
                <img src={cardIcon} alt="Card Icon" />
            </div>
        </div>
        <div>
            <p className='card-title'>
                {parse(cardTitle)}
            </p>
            <p className='card-content'>
                {parse(cardContent)}
            </p>
        </div>
        <Link to="/" className='flex card-link'>
            Read More
            <ArrowRight />
        </Link>
    </div>
  )
}

export default FeatureCard
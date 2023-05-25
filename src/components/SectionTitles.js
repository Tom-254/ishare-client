import React from 'react'
import parse from 'html-react-parser';

const SectionTitles = ({topText, middleText, bottomText}) => {
  return (
    <div className='flex-column section-titles'>
        <p className='section-titles__top-text'>
            {topText}
        </p>
        <p className='section-titles__middle-text'>
            {parse(middleText)}
        </p>
        {bottomText ?  <p className='section-titles__bottom-text'>
            {parse(bottomText)}
        </p> : ""}
    </div>
  )
}

export default SectionTitles
import React from 'react'

const DashStats = ({icon, title, content}) => {
  return (
    <div className='flex dashboard-stats'>
        {icon}
        <div className='flex-column dashboard-stats-content'>
            <p>
                {title}
            </p>
            <p>
                {content}
            </p>
        </div>
    </div>
  )
}

export default DashStats
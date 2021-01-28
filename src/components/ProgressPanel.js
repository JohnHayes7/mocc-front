import React, { useState } from 'react'
import './progressPanel.css'

const ProgressPanel = (props) => {

    const [updatedCount, setUpdatedCount] = useState(0)

    return(
        <div id="progress-overview">
            <div >{props.activityName}</div>
            <div>{updatedCount} of {props.count} completed</div>
            <div id="columns">
                <div className="column">{props.columnOneTitle}</div>
                <div className="column">{props.columnTwoTitle}</div>
                
            </div>
        </div>
        
    )
}
export default ProgressPanel
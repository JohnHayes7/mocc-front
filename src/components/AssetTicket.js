import React, { useState } from 'react'

const AssetTicket = props =>{
    const [selected, toggleSelected] = useState(false);

    const select = event => {
        event.preventDefault()
        const vodId = event.target.dataset.id || event.target.parentNode.dataset.id

        
        toggleSelected(!selected)
        props.addVideoToSelected(vodId)
        
    }

    const unselect = event =>{
        event.preventDefault()
        const vodId = event.target.dataset.id || event.target.parentNode.dataset.id
        
        toggleSelected(!selected)
        props.removeVideoFromSelected(vodId)
    }
    

   

     if(selected){
        return  <div className="selected-asset-display" >
                    <div className="asset-text" data-id={props.video.mvVodId}  onClick={event => unselect(event)}>
                       <h3>VODID: {props.video.mvVodId}</h3><h3>{props.video.language}</h3><h3>{props.video.artist}</h3><h4>{props.video.title}</h4>
                    </div>
                </div>    
     }else{
        return  <div className="asset-display">
                    <div className="asset-text" data-id={props.video.mvVodId + "-" + props.video.rowID} key={props.video.rowID} onClick={event => select(event)}>
                       <h3>VODID: {props.video.mvVodId}</h3><h3>{props.video.language}</h3><h3>{props.video.artist}</h3><h4>{props.video.title}</h4>
                    </div>
                </div>
    }
}

export default AssetTicket
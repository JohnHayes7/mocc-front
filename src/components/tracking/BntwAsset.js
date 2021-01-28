import React, {useState} from 'react'
import './bntw.css'

const BntwAssetCardFront = props => {
    const [isShown, setIsShown] = useState(false)
    // const [showForm, setShowForm] = useState(false)


    const parseArtistNames = () => {
        let artistData = props.video.artisttitle.split("/")[0]
        let artistString = ""
        artistData.split(",").forEach(artist => artistString += artist + ",")
        return artistString.replace(/,\s*$/, "")
    }

    const parseSongTitle = () => {
        return props.video.artisttitle.split("/")[1]
    }
    
    return(
        <div>
            <div id="bntw-ticket" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                <div>
                    <h4>{parseArtistNames()}</h4>
                    <h4>{parseSongTitle()}</h4>
                </div>
                {isShown && (
                    <div>
                        <div><strong>VODID: {props.video.vodid}</strong></div>
                        <div><strong>Received at: {props.video.receivedinhouse}</strong></div>
                        <div><strong>Embargo: {props.video.embargo ? props.video.embargo : "NA"}</strong></div>
                    </div>
                )}
            </div> 
        </div>
    )
}

export default BntwAssetCardFront
import React, {useState} from 'react'
import BntwAsset from './BntwAsset'

const BntwInfo = props => {

    const [thisWeeksVideos, setThisWeeksVideos] = useState([])
    const [dateIds, setDateIds] = useState([])
    const [countBack, setCountBack] = useState(0)
    
    let months = {
        "Jan": "1", 
        "Feb": "2", 
        "Mar": "3", 
        "Apr": "4", 
        "May": "5",
        "Jun": "6", 
        "Jul": "7",
        "Aug": "8", 
        "Sep": "9", 
        "Oct": "10", 
        "Nov": "11", 
        "Dec": "12"
    }
    // TODAYS DATE
    const currDate = new Date

    // DEFINE THIS WEEK
    const thisWeek = () => {
        let curr = new Date; // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6

        let firstday = new Date(curr.setDate(first)).toDateString();
        let lastday = new Date(curr.setDate(last)).toDateString();
        
        return [firstday, lastday]
    }

    // CREATE DATE IDS FOR THIS WEEK
    const thisWeekDateIds = () => {
        const firstSplit = thisWeek()[0].split(" ")
        const lastSplit = thisWeek()[1].split(" ")
        const firstDateId = `${months[firstSplit[1]]}${firstSplit[2]}${firstSplit[3].slice(-2)}`
        const lastDateId = `${months[lastSplit[1]]}${lastSplit[2]}${lastSplit[3].slice(-2)}`
        return [firstDateId, lastDateId]
    }

    const previousWeekDateIds = () => {
        // setCountBack()
        console.log(countBack + 1)
    }

    // FIND VIDEOS BY DATE ID FOR THIS WEEK
    const findVideosFromThisWeek = () => {
        let bntwVideos = []

        props.details.videos.forEach(video => {
            const videoDateIdRx = video.receivedinhouse.split(" ")[0].replace(/[^a-zA-Z0-9]/g, '')
            // const videoEmbargoDateId = video.embargo.split(" ")[0].replace(/[^a-zA-Z0-9]/g, '')
            if(videoDateIdRx >= thisWeekDateIds()[0] && videoDateIdRx <= thisWeekDateIds()[1]){
               bntwVideos = [...bntwVideos, video]
            }
        })
        return bntwVideos
    }

    const displayBntwAssets = () => {
       return findVideosFromThisWeek().map(video => <BntwAsset key={video.vodid} video={video} />)
    }


    return(
        <div>
            <h6>{currDate.toString()}</h6>
            <h4>Showing Videos for {thisWeek()[0]} through {thisWeek()[1]} </h4>
            <button onClick={previousWeekDateIds}>Show Previous Week</button>
            {displayBntwAssets()}
        </div>
    )
}

export default BntwInfo
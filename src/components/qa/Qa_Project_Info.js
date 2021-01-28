import React, { useState } from 'react'
import './qa_project.css'
import AssetTicket from '../AssetTicket'
import SelectionInfo from "../SelectionInfo"
import { postReviewerDataToSheet } from '../../actions/postReviewerDataToSheet'
import { postAutoAssignmentToTracker } from '../../actions/postAutoAssignmentToTracker'
import { connect } from 'react-redux'
import { moveFoundFilesToReviewerFolder } from '../../actions/moveFoundFilesToReviewerFolder'
import { findMissingFiles } from '../../actions/findMissingFiles'
import ProgressPanel from '../ProgressPanel'

const QaProjectInfo = props =>{
    // console.log(props.details)
    const availableLanguages = ["English", "Spanish"]
    const reviewers = props.details.availableReviewers
    const [selectedVideos, setSelected] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedLanguage, setSelectedLanguage] = useState("English")
    const [progressPanel, showProgressPanel] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const addVideoToSelected = (vodId) =>{
        const videoIdAndRow = {}
        videoIdAndRow["mcVodId"] = vodId.split("-")[0]
        videoIdAndRow["row"] = vodId.split("-")[1]
        setSelectedCount(selectedCount + 1)
        setSelected([...selectedVideos, videoIdAndRow])
        selectedVideos.push(videoIdAndRow)
        // console.log(selectedVideos)
    }

    const findIndex = (array, attr, value) => {
        for(let i = 0; i < array.length; i += 1){
            if(array[i][attr] === value){
                return i
            }
        }
        return -1
    }
    const assignmentsCompletedByReviewer = (reviewer) => props.details.videos.filter(video => video.reviewer === reviewer.name && video.mcQastatus)
    
    const assignmentsNotCompletedByReviewer = (reviewer) => props.details.videos.filter(video => video.reviewer === reviewer.name && !video.mcQastatus)

    const totalAssignmentsByReviewer = (reviewer) => assignmentsCompletedByReviewer(reviewer).length + assignmentsNotCompletedByReviewer(reviewer).length
   
    const updateAllReviewers = () => {
        reviewers.shift()
        reviewers.forEach(reviewer => {
            const reviewerData = {
                name: reviewer.name,
                rowId: reviewer.rowId,
                totalAssignments: totalAssignmentsByReviewer(reviewer),
                assignmentsCompleted: assignmentsCompletedByReviewer(reviewer).length
            }

            props.postReviewerDataToSheet(reviewerData)
        });
        alert("Reviewers Have Been Successfuly Updated")
    }


    const removeVideoFromSelected = (vodId) => {
        const index = findIndex(selectedVideos, "mcVodId", vodId)
        selectedVideos.splice(index, 1)
        setSelectedCount(selectedCount - 1)
        // console.log(selectedVideos) 
    }

    // TO DO: MOVE TO UTILITIES
     const updateMissingProxies = () => {
        //  showProgressPanel(true)
        missingProxies.slice(0, 10).forEach(proxy => {
            debugger
            const video = {
                mcVodId: proxy.mvVodId,
                row: proxy.rowID
            }
             const missingVideo = {
                 video: video,
                 reviewer: proxy.reviewer
            }

             findMissingFiles(missingVideo)
        })
    }

    // TO DO: MOVE TO UTILITES
    const assignFoundProxies = () => {
        foundProxies.forEach(proxy => {
            let id = proxy.rowID
            const videosAry = props.details.videos
            const proxyIndex = findIndex(props.details.videos, "rowID", id)
            const previousReviewer = findPreviousReviewer(videosAry, proxyIndex, 0)
            const nextReviewer = findNextReviewer(videosAry,proxyIndex, 0)
            previousReviewer === nextReviewer ? proxy.reviewer = previousReviewer : proxy.reviewer = nextReviewer
            postAutoAssignmentToTracker(proxy)
            moveFoundFilesToReviewerFolder(proxy) 
        })
    }

    // TO DO: MOVE TO UTILITES
    const findPreviousReviewer = (videosAry, index, count) => {
        count += 1
        let assigned = videosAry[index - count].reviewer === "Proxy Found" || videosAry[index - count].reviewer === "No Proxy" || videosAry[index - count].reviewer === "Missing Proxy"|| videosAry[index - count].reviewer === 'Corrupt File' || videosAry[index - count].reviewer === 'Corrupt' || videosAry[index - count].reviewer === "" || videosAry[index - count].reviewer === "No Proxy Confirmed" ? false : true
        return !assigned ? findPreviousReviewer(videosAry,index,count) : videosAry[index - count].reviewer
    }

    // TO DO: MOVE TO UTILITES AND REFACTOR
    const findNextReviewer = (videosAry, index, count) => {
        count += 1
        let assigned = videosAry[index + count].reviewer === "Proxy Found" || videosAry[index + count].reviewer === "No Proxy" || videosAry[index + count].reviewer === "Missing Proxy" || videosAry[index + count].reviewer === 'Corrupt File' || videosAry[index + count].reviewer === 'Corrupt' || videosAry[index + count].reviewer === "" || videosAry[index + count].reviewer === "No Proxy Confirmed" ? false : true
        return !assigned ? findNextReviewer(videosAry, index, count) : videosAry[index + count].reviewer
    }

    const reportIssues = (missingProxies, corruptProxies) => {
        debugger
    }

    // const isLoggedIn = () => {
        
    // }

    
   
    const missingProxies = props.details.videos.filter(video => video.reviewer === "No Proxy" || video.reviewer === "No Proxy Confirmed" || video.reviewer === "Missing Proxy")
    const corruptProxies = props.details.videos.filter(video => video.reviewer === "Corrupt File")
    const foundProxies = props.details.videos.filter(video => video.reviewer === 'Proxy Found')
    const parseAssetDetails = () => props.details.videos.map(video => !video.reviewer && video.mvVodId && video.language === selectedLanguage? <AssetTicket key={video.mvVodId} video={video} removeVideoFromSelected={removeVideoFromSelected} addVideoToSelected={addVideoToSelected} /> : null)
    const parseReviewers = () => reviewers.map(r => <option key={r.name} value={r.name}>{r.name}</option>)
    
    return(
        <div id="asset-info">
            <div className="asset-details-column">
                <div>
                    Show <select onChange={event => setSelectedLanguage(event.currentTarget.value)}>
                           
                           <option key="English" value="English">English</option>
                           <option key="Spanish" value="Spanish">Spanish</option>
                        </select>
                    Language Assets
                </div>
                {parseAssetDetails()}
            </div>
            <div className="selection-column">
                <button onClick = {updateAllReviewers}>Update All Reviewers</button>
                {missingProxies.length > 0 ? <button onClick = {updateMissingProxies}>Update Missing Proxies</button> : null}
                {foundProxies.length > 0 ? <button onClick = {assignFoundProxies}>Assign Found Proxies</button> : null}
                <button onClick = {reportIssues}>Report Issues</button>
                {selectedCount > 0 ? <SelectionInfo allVideos={props.details.videos} parseReviewers={parseReviewers} count={selectedCount} selectedVideos={selectedVideos} reviewers={reviewers}/>  : <h4>Select Videos for Details</h4>}
                {progressPanel ? <ProgressPanel /> : null}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    postReviewerDataToSheet: reviewerData => dispatch(postReviewerDataToSheet(reviewerData))
})

export default connect (0, mapDispatchToProps)(QaProjectInfo)
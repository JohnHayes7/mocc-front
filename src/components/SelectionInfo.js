import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postDataToSheet } from '../actions/postDataToTrackingSheet'
import { postReviewerDataToSheet } from '../actions/postReviewerDataToSheet'
import { findDriveFolderIds } from '../actions/moveToSelectedDriveFolder'
import ReviewerInfo from './ReviewerInfo'
import ProgressPanel from './ProgressPanel'


const SelectionInfo = props => {

    const [selectedReviewer, setSelectedReviewer] = useState("-")
    
    const [updatingDrive, setDriveStatus] = useState(false)

    const pageRefresh = () => window.location.reload(false)

    const assignmentsCompletedByReviewer = () => props.allVideos.filter(video => video.reviewer === selectedReviewer && video.mcQastatus)
    
    const assignmentsNotCompletedByReviewer = () => props.allVideos.filter(video => video.reviewer === selectedReviewer && !video.mcQastatus)
    
    const totalAssignmentsByReviewer = assignmentsCompletedByReviewer().length + assignmentsNotCompletedByReviewer().length + props.count

    const selectedReviewerRowId = props.reviewers.find(r => r.name === selectedReviewer).rowId

    const [showProgressPanel, setShowProgressPanel] = useState(false)

    const toggleUpdateStatus = () => {
        setDriveStatus(!updatingDrive)
    }

    const clickHandler = event => {
        event.preventDefault()
        toggleUpdateStatus()
        setShowProgressPanel(true)
        if(selectedReviewer !== "-"){
            const selectionData = {
                selectedVideos: props.selectedVideos,
                reviewer: selectedReviewer
            }

            const reviewerData = {
                name: selectedReviewer,
                rowId: selectedReviewerRowId,
                totalAssignments: totalAssignmentsByReviewer,
                assignmentsCompleted: assignmentsCompletedByReviewer().length
            }

            selectionData.selectedVideos.forEach(video => {
                
                const selectedVideo = {
                    video: video,
                    reviewer: selectedReviewer
                }
                
                props.postSelectionDataToSheet(selectedVideo)
                props.findDriveFolderIds(selectedVideo)
            })
            props.postReviewerDataToSheet(reviewerData)
            // TO DO: FIX LOGIC BELOW
            // alert(`You've assigned ${props.selectedVideos.length} videos to ${selectedReviewer}`)
            // pageRefresh()
        }else{
            alert("You Must Select a Reviewer to assign videos")
        }
        toggleUpdateStatus()
    }


    return(
        <div>
            <div className="selection-div">
                <div id="selection-details">
                    <h2>Selected Videos: {props.count} </h2>
                </div>
                <form id="options">
                    Assign {props.count} videos to:
                    <select onChange={event => setSelectedReviewer(event.currentTarget.value)}>
                        {props.parseReviewers()}
                    </select>
                    <button onClick={event => clickHandler(event)}>Assign Videos</button>
                </form>
                <ReviewerInfo reviewers={props.reviewers} assignmentsCompleted={assignmentsCompletedByReviewer} assignmentsNotCompleted={assignmentsNotCompletedByReviewer} count={props.count} selectedReviewer={selectedReviewer}/>
                <div>
                {updatingDrive ? <span>Updating Drive Information....</span>: <span>Reviewer Drive Up To Date</span>}
                </div> 
            </div>
            {showProgressPanel ? <ProgressPanel activityName={`Assigning Videos to ${selectedReviewer}`} columnOneTitle={"Found:"} columnTwoTitle={"Not Found:"} count={props.count}/> : null}
        </div>
        
    )
}

const mapDispatchToProps = dispatch => ({
    postSelectionDataToSheet: selectionData => dispatch(postDataToSheet(selectionData)),
    postReviewerDataToSheet: reviewerData => dispatch(postReviewerDataToSheet(reviewerData)),
    findDriveFolderIds: selectionData => dispatch(findDriveFolderIds(selectionData))
})



export default connect (0, mapDispatchToProps)(SelectionInfo)
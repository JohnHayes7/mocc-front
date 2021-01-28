export default function manageQaProject(state={
    loading: false,
    status: "Initiated",
    name: "",
    trackingSheetId: "",
    reviewerSheetId: "",
    videos: [],
    selectedForReview: [],
    reviwer: 'unassigned',
    availableReviewers: []
}, action) {
switch(action.type){

    case 'LOADING_PROJECT_DATA':
        
        return {
            ...state,
            loading: true
        }

    case 'RETURNED_TRACKING_SHEET_DATA':
        // const videoAttrs = action.sheetData.shift()
        const videosAry = action.sheetData
        
        
        videosAry.forEach(video => {
            
            const videoData = {}
            videoData["rowID"] = video[0]
            videoData["title"] = video[2]
            videoData["artist"] = video[3]
            videoData["language"] = video[12]
            videoData["mvVodId"] = video[15]
            videoData["mcRating"] = null
            videoData["reviewer"] = video[16]
            videoData["mcQastatus"] = video[17]
            state.videos.push(videoData)
        })

        return{
           ...state,
           loading: false
        }

    case 'ADD_PROJECT_NAME_AND_IDS':

        return{
            ...state,
            name: action.data.projectData.name,
            trackingSheetId: action.data.projectData.trackingSheetId,
            reviewerSheetId: action.data.projectData.reviewerSheetId
        }

    case 'RETURNED_REVIEWER_SHEET_DATA':
        const reviewerAttrs = action.reviewerData.shift()
        const reviewerData = action.reviewerData

       reviewerData.forEach(rev => {
           const reviewer = {}
           reviewer["rowId"] = rev[0]
           reviewer["name"] = rev[1]
           reviewer["department"] = rev[2]
           reviewer["language"] = rev[3]
           reviewer["noOfAssignments"] = rev[4]
           reviewer["assignmentsCompleted"] = rev[5]
           reviewer["quota"] = rev[6]
           
           state.availableReviewers.push(reviewer)
       })
        return{
            ...state
        }

    case 'RETURNED_DRIVE_DATA':
    


        return{
            ...state
        }

    

    

    // case 'LOGIN_FAN':
    //    const loginFan = {
    //     loading: false,
    //     id: action.fan.data.attributes.id,
    //     username: action.fan.data.attributes.username,
    //     email: action.fan.data.attributes.email,
    //     shows: action.fan.included.filter(attr => attr.type === "show"),
    //     memories: action.fan.included.filter(attr => attr.type === "memory"),
    //     loggedIn: localStorage.logged_in
    //    } 
    // return Object.assign({}, state, loginFan)


   
       

    default:
        return state
    }
}
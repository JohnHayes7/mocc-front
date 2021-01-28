export const fetchTrackingSheetData = (sheetId)=> {

    const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
    const GSHEETS_QASHEET_ID = sheetId

    debugger
    return (dispatch) => {
        dispatch({type: 'LOADING_PROJECT_DATA'})
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_QASHEET_ID}/values/'ITEMS WITH IDS FOR QA'!1:10000?key= ${GSHEETS_API_KEY}`).then(response => response.json())
        .then(rxData => {
            debugger
            rxData.error ? alert('fetchTrackingSheet',rxData.error.message) : dispatch({type: 'RETURNED_TRACKING_SHEET_DATA', sheetData: rxData.values})
        })
    }
}

export const fetchReviewerSheetData = (sheetId) => {
    debugger
    const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
    const GSHEETS_REVIEWERSHEET_ID = sheetId

    return(dispatch) => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_REVIEWERSHEET_ID}/values/'Sheet1'!1:100000?key= ${GSHEETS_API_KEY}`).then(response => response.json())
        .then(rxData => {
            rxData.error ? alert(`fetchReviewers ${rxData.error.message}`) : dispatch({type: 'RETURNED_REVIEWER_SHEET_DATA', reviewerData: rxData.values})
        })
    }
    
}


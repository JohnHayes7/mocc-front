export const getBntwData = () => {
    const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
    const ACCESS_TOKEN = process.env.REACT_APP_MS_ACCESS_TOKEN
    debugger
    return(dispatch) => {
        dispatch({type: 'LOADING_BNTW_DATA'})  
        // *******GOOGLESHEETS******
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1iIyn0yvJaruSx506LsiS9MBkgqWOdXXn7gBRgVHqw7Y/values/'BNTWData'!1:10000?key= ${GSHEETS_API_KEY}`).then(response => response.json())
        .then(rxData => {
            debugger
            rxData.error ? alert('fetchTrackingSheet',rxData.error.message) : dispatch({type: 'RETURNED_BNTW_DATA', sheetData: rxData.values})
        })





        // ******MICROSOFT GRAPH*******
        // fetch(`https://graph.microsoft.com/v1.0/me/drive/items/2AFCEB71CDCBE53D!1166/workbook/worksheets('BNTWData')/usedRange`, {
        //     headers:{
        //         "Content-Type": 'application/json',
        //         Authorization: `Bearer ${ACCESS_TOKEN}`
        //     }
        // }).then(response => response.json())
        // .then(rxData => {
        //     debugger
        //     // rxData.error ? alert(rxData.error.message) : dispatch({type: 'RETURNED_PROJECTS_DATA', sheetData: rxData.values})
        // })
    }
}
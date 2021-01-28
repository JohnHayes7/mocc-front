export const postDataToSheet = (selectedVideo) => {
    // const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
    // TO DO: MAKE THIS DYNAMIC
    const GSHEETS_SHEET_ID = process.env.REACT_APP_QA_SS_PHASEII_SHEET_ID
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN 
    const rowId =  parseInt(selectedVideo.video.row)
    // const highlight = () =>{
    //     debugger
        
    // }
    
    return (dispatch) => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_SHEET_ID}/values/ITEMS WITH IDS FOR QA!Q${rowId}?valueInputOption=USER_ENTERED`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
                body: JSON.stringify({
                    "range": `ITEMS WITH IDS FOR QA!Q${rowId}` ,
                    "majorDimension": "COLUMNS",
                    "values": [
                       
                        [selectedVideo.reviewer],
                    ]
                })
            }).then(response => response.json())
            .then(rxData => {    
            if(rxData.error){
                alert(rxData.error.message)
            }else{
                
                // debugger
                dispatch({type: 'APPENDED_SHEET_DATA', sheetData: rxData})
            }
        })
    }
    
}   

export const postNoProxyToTrackingSheet = (missingProxy) => {
    debugger
    // TO DO: MAKE THIS DYNAMIC
    const GSHEETS_SHEET_ID = process.env.REACT_APP_QA_SS_PHASEII_SHEET_ID
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN 
    const rowId = parseInt(missingProxy.video.row)
    const textToPost = missingProxy.reviewer === "No Proxy" || missingProxy.reviewer === "No Proxy Confirmed" ? "Proxy Found" : "No Proxy"
    debugger
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_SHEET_ID}/values/ITEMS WITH IDS FOR QA!Q${rowId}?valueInputOption=USER_ENTERED`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
                body: JSON.stringify({
                    "range": `ITEMS WITH IDS FOR QA!Q${rowId}` ,
                    "majorDimension": "COLUMNS",
                    "values": [
                        [textToPost],
                    ]
                })
            }).then(response => response.json())
            .then(rxData => {   
                debugger 
            if(rxData.error){
                alert(rxData.error.message)
            }else{
                if(textToPost === 'No Proxy'){
                    alert(`No Proxy Found for ${missingProxy.video.mcVodId}. Marked in Sheet!`)
                }else if(textToPost === 'Proxy Found'){
                    alert(`Found ${missingProxy.video.mcVodId}`)
                }
                
                // debugger
                // dispatch({type: 'APPENDED_SHEET_DATA', sheetData: rxData})
            }
        })
}


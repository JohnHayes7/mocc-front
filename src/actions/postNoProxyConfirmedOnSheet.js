export const postNoProxyConfirmedToTrackingSheet = (missingProxy) => {
    debugger
    // TO DO: MAKE THIS DYNAMIC
    const GSHEETS_SHEET_ID = process.env.REACT_APP_QA_SS_PHASEII_SHEET_ID
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN 
    const rowId = parseInt(missingProxy.video.row)
    const textToPost = "No Proxy Confirmed"
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
                debugger
                alert(`Updated ${missingProxy.video.mcVodId} at Row ${missingProxy.video.row}`)
                
                // debugger
                // dispatch({type: 'APPENDED_SHEET_DATA', sheetData: rxData})
            }
        })
}
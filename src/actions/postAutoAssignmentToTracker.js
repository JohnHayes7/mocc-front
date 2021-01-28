export const postAutoAssignmentToTracker = (proxy) => {
    // debugger
     const GSHEETS_SHEET_ID = process.env.REACT_APP_QA_SS_PHASEII_SHEET_ID
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN 
    const rowId =  parseInt(proxy.rowID)
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
                        [proxy.reviewer],
                        [],
                        [],
                        [],
                        ['PROXY FOUND']
                    ]
                })
            }).then(response => response.json())
            .then(rxData => {    
            if(rxData.error){
                alert(rxData.error.message)
            }else{
                alert(`AutoAssigned ${proxy.title} to ${proxy.reviewer}`)
                // debugger
                // dispatch({type: 'APPENDED_SHEET_DATA', sheetData: rxData})
            }
        })
}
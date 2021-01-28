import { postNoProxyToTrackingSheet } from './postDataToTrackingSheet'
import { postNoProxyConfirmedToTrackingSheet } from './postNoProxyConfirmedOnSheet'

export const findMissingFiles = (missingFile) => {
    // debugger
    // const GSHEETS_SHEET_ID = process.env.REACT_APP_QA_SS_PHASEII_SHEET_ID
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN 
    let fileName =  `/*/_${missingFile.video.mcVodId}_HD.wmv` 
    debugger
    fetch(`https://www.googleapis.com/drive/v3/files?corpora=allDrives&includeTeamDriveItems=true&pageSize=1000&supportsAllDrives=true`, 
        { 
            headers: {
                authorization: `Bearer ${ACCESS_TOKEN}`
            }
        }).then(response => response.json())
        .then(rxData => {
            debugger
            if(rxData.error){
                alert(rxData.error.message)
            }else{
                let file = rxData.files.find(file => file.name === fileName)
                debugger
                !!file ? postNoProxyToTrackingSheet(missingFile) : searchNextPageForMissingFile(missingFile, rxData.nextPageToken) 
            }
        })
}

const searchNextPageForMissingFile = (missingFile, nextPageToken) => {
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
    let fileName =  `/*/_${missingFile.video.mcVodId}_HD.wmv` 

     fetch(`https://www.googleapis.com/drive/v3/files?corpora=allDrives&includeTeamDriveItems=true&pageSize=1000&pageToken=${nextPageToken}&supportsAllDrives=true`, {
        headers:{
            authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }).then(reponse => reponse.json())
    .then(rxData => {
        debugger
        if(rxData.error){
            // TO DO: CHANGE THIS TO MARK THE TRACKING SHEET REVIEWER CELL AS RED
            debugger
            postNoProxyConfirmedToTrackingSheet(missingFile)
            // alert(`Still Can Not Find ${fileName}`)
        }else{
            debugger
            let file = rxData.files.find(file => file.name === fileName)
            // debugger
            !!file ? postNoProxyToTrackingSheet(missingFile) : searchNextPageForMissingFile(missingFile, rxData.nextPageToken)
        }
    })
}
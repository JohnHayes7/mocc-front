import { postNoProxyToTrackingSheet } from './postDataToTrackingSheet'
export const findDriveFolderIds = (selectionData) => {
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
    let vodId = selectionData.video.mcVodId    
    let fileName =  `/*/_${vodId}_HD.wmv` 
    let folderName = `${selectionData.reviewer}_QA` 
    
    // TO DO: MAKE THIS DYNAMIC
    const reviewerIds = {
        "Craig_QA":"1GRkauySLVv3YDsIvv8jM4fLApCI6YKqW",
        "Junior_QA": "1TpVBnxkCQwFIPjq-yQreCGm5oc-fR5o2",
        "Mike_G_QA": "1BD6vFptjA0N_oAyvQmShSqVMupWXoZxm",
        "Mike_Berlin_QA":"1ZLT3gJAxqq7kMGQO-lTEKOvbmfz8UIfe",
        "Ron_QA":"1gY0s29gHOt9qUOBmuX6alUGHVaFQDMqb",
        "Shane_QA":"14Ot7H6HKw6pks07oLitQkjb25pJFzc0r",
        "Tim_QA":"16XBqeXOWpBsw8AV3gbgMMunWKKjMafNH",
        "Josh_QA": "10C8Fod-PfX7wBr1R1PjRoncSIZTV8syq",
        "Luke_Simi_QA" : "1nzSF18X0eBUAfE-_GC2SzkyliGsPSxEK",
        "Steve_QA" : "1Yxd4w1tcqqREWVPA2hE87GWCvc8ameYb",
        "Ebis_QA": "1i3en-0yFcbjF0IVemaSg5w70VMtBlcw7",
        "Devin_QA": "11vJedJQTl_PBBbXaVxET_lfQv2yGVGdS"
    }
    return (dispatch) => {
        fetch(`https://www.googleapis.com/drive/v3/files?corpora=allDrives&includeTeamDriveItems=true&pageSize=1000&supportsAllDrives=true`, 
        { 
            headers: {
                authorization: `Bearer ${ACCESS_TOKEN}`
            }
        }).then(response => response.json())
        .then(rxData => {
            
            const reviewerFolder = reviewerIds[folderName] || null
            const oldParentFolder = "1shZeeuZyfUucN8egUBkemkmbexmkjWji"
            
            if(rxData.error){
                
                postNoProxyToTrackingSheet(selectionData)    
            }else if(rxData.files.find(file => file.name === fileName)){
                const fileId = rxData.files.find(file => file.name === fileName).id  
                    const dataForUpdate = {
                        fileId: fileId,
                        fileName: fileName,
                        reviewerName: selectionData.reviewer,
                        reviewerFolderId: reviewerFolder,
                        parentFolderId: oldParentFolder
                    }
                    
                    updateDriveFolders(dataForUpdate) 
                
            }else{
                checkNextPageForVideo(rxData.nextPageToken, selectionData, reviewerFolder, oldParentFolder)
            } 
        })
    }
}


export const updateDriveFolders = (dataForUpdate) => {
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
    const url = `https://www.googleapis.com/drive/v3/files/${dataForUpdate.fileId}?addParents=${dataForUpdate.reviewerFolderId}&removeParents=${dataForUpdate.parentFolderId}`
    fetch(url, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }).then(response => response.json())
    .then(rxData => {
        rxData.error ? alert(rxData.error.message) :alert(`You have moved ${dataForUpdate.fileName}`)
    })  
}


export const checkNextPageForVideo = (nextPageToken, missingProxy, reviewerFolder, oldParentFolder) => {
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
    
    const name = missingProxy.video ? `KS_${missingProxy.video.mcVodId}_HD.wmv` : `KS_${missingProxy.mvVodId}_HD.wmv`

    fetch(`https://www.googleapis.com/drive/v3/files?corpora=allDrives&includeTeamDriveItems=true&pageSize=1000&pageToken=${nextPageToken}&supportsAllDrives=true`, {
        headers:{
            authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }).then(reponse => reponse.json())
    .then(rxData => {
        debugger
        if(rxData.error){
            postNoProxyToTrackingSheet(missingProxy)
        }else if(rxData.files.find(file => file.name === name)){
            const selectedFileDriveId = rxData.files.find(file => file.name === name).id
            const dataForUpdate = {
                fileId: selectedFileDriveId,
                fileName: name,
                reviewerFolderId: reviewerFolder,
                parentFolderId: oldParentFolder
            }
            updateDriveFolders(dataForUpdate)
             
        }else{
            checkNextPageForVideo(rxData.nextPageToken, missingProxy, reviewerFolder, oldParentFolder)
        }
    })
}





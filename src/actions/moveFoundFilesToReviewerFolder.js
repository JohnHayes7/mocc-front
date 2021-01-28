import { updateDriveFolders, checkNextPageForVideo  } from './moveToSelectedDriveFolder'

export const moveFoundFilesToReviewerFolder = ( selectionData ) => {
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
    let vodId = selectionData.mvVodId 
    let fileName =  `KS_${vodId}_HD.wmv` 
    let folderName = `${selectionData.reviewer}_QA` 
    debugger
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
        "Ebis_QA" : "1i3en-0yFcbjF0IVemaSg5w70VMtBlcw7",
        "Devin_QA": "11vJedJQTl_PBBbXaVxET_lfQv2yGVGdS"
    }

    fetch(`https://www.googleapis.com/drive/v3/files?corpora=allDrives&includeTeamDriveItems=true&pageSize=1000&supportsAllDrives=true`, 
        { 
            headers: {
                authorization: `Bearer ${ACCESS_TOKEN}`
            }
        }).then(response => response.json())
        .then(rxData => {
            debugger
            const reviewerFolder = reviewerIds[folderName] || null
            const oldParentFolder = "1shZeeuZyfUucN8egUBkemkmbexmkjWji"
            debugger
            if(rxData.error){
                alert(rxData.error.message)   
            }else if(rxData.files.find(file => file.name === fileName)){
                const fileId = rxData.files.find(file => file.name === fileName).id  
                    const dataForUpdate = {
                        fileId: fileId,
                        fileName: fileName,
                        reviewerName: selectionData.reviewer,
                        reviewerFolderId: reviewerFolder,
                        parentFolderId: oldParentFolder
                    }
                    debugger
                    updateDriveFolders(dataForUpdate) 
                
            }else{
                checkNextPageForVideo(rxData.nextPageToken, selectionData, reviewerFolder, oldParentFolder)
            } 
        })

}
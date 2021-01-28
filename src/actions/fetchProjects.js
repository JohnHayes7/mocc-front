export const fetchProjects = () => {

     const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
     const PROJECTS_MASTER_ID = process.env.REACT_APP_PROJECTS_MASTER_SHEET_ID

    
    return(dispatch) =>{
        dispatch({type: 'LOADING_PROJECTS'})  
        
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${PROJECTS_MASTER_ID}/values/1:10000?key= ${GSHEETS_API_KEY}`).then(response => response.json())
        .then(rxData => {
            rxData.error ? alert(rxData.error.message) : dispatch({type: 'RETURNED_PROJECTS_DATA', sheetData: rxData.values})
        })
    }
}
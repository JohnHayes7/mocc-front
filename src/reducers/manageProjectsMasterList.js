export default function manageProjectsMasterList(state = {
    loading: false,
    projects: []
}, action){
    switch (action.type) {
        case 'LOADING_PROJECTS':
        return{
            ...state, 
            loading: true
        }

        case 'RETURNED_PROJECTS_DATA':
        
        action.sheetData.shift()
        action.sheetData.forEach(proj => {
            const projectData = {}
            projectData["rowId"] = proj[0]
            projectData["type"] = proj[1]
            projectData["name"] = proj[2]
            projectData["trackingSheetId"] = proj[3]
            projectData["reviewerSheetId"] = proj[4]
            projectData["status"] = proj[5]
            projectData["initDate"] = proj[6]
            projectData["completeDate"] = proj[7]


            const dupSearch = state.projects.find(proj => proj.rowId === projectData.rowId)
            if(!dupSearch){
                state.projects.push(projectData)
            }
        })

        

        return {
            ...state,
            loading: false
        }
            
            
    
        default:
           return state;
    }
}
export const updateProjectNameAndIds = (projData) => {
    debugger
    return(dispatch) => {
        dispatch({type: 'ADD_PROJECT_NAME_AND_IDS', data: projData})
    }
}
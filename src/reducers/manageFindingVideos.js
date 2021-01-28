export default function manageFindingVideos(state = {
    foundVideos: [],
    nonFoundVideos: []
}, action){

    switch (action.type){
        case 'FOUND_PROJECT':

        return{
            ...state
        }

        default:
            return state
    }
}
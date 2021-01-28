export default function manageBntwData(state = {
    loading: false, name: "BNTW", videos: []
}, action){

    switch (action.type){
        case 'LOADING_BNTW_DATA':
        debugger
        return{
            ...state,
            loading: true,
        }

        case 'RETURNED_BNTW_DATA':
        const keysAry = []
        const rawKeys = action.sheetData.shift()
        rawKeys.forEach(item => {
            let string = item.split(" ").join("").replace(/[^a-zA-Z ]/g, "").toLowerCase()
            keysAry.push(string)
        })

        const valuesAry = action.sheetData
        
        valuesAry.forEach(ary => {
            const video = {}
            for(let i = 0; i < keysAry.length; i++){
                video[keysAry[i]] = ary[i]
            }   
            state.videos.push(video);
        });
        return{
            ...state, 
            loading: false,
        }

        default:
            return state
    }
}
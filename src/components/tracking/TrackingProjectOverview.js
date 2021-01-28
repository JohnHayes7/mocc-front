import React from 'react'
import { connect } from 'react-redux'
import { fetchTrackingSheetData } from '../../actions/fetchProjectSheetsData'
import { updateProjectNameAndIds } from '../../actions/updateProjectNameAndIds'
import { getBntwData } from '../../actions/getBntwData'
import BntwInfo  from './BntwInfo'


class TrackingProjectOverview extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getBntwData()
    }

    render(){
        return(
            <div className='project-div'>
                <div className="project-header">
                    <h1>{this.props.sheetData.manageBntwData.name}</h1>
                </div>
                {this.props.sheetData.manageBntwData.loading ? <h1>Loading....</h1> : <BntwInfo details={this.props.sheetData.manageBntwData}/>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sheetData: state    
    }
}

const mapDispatchToProps = dispatch => ({

    getBntwData: () => dispatch(getBntwData()),
    updateProjectNameAndIds: projectData => dispatch(updateProjectNameAndIds(projectData))
})


export default connect(mapStateToProps, mapDispatchToProps)(TrackingProjectOverview)
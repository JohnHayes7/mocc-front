import React from 'react'
import './qa_project.css'
import QaProjectInfo from './Qa_Project_Info'
import { connect } from 'react-redux'
import { fetchTrackingSheetData } from '../../actions/fetchProjectSheetsData'
import { fetchReviewerSheetData } from '../../actions/fetchProjectSheetsData'
import { updateProjectNameAndIds } from '../../actions/updateProjectNameAndIds'
// import { fetchProjects } from '../../actions/fetchProjects'

class QaProjectOverview extends React.Component{
    
    constructor(){
        super()
        this.state = {
            name:""
        }
    }

    componentDidMount(){
        // this.fetchProjSheetsData(this.props.sheetData.qaProject.trackingSheetId, this.props.sheetData.qaProject.reviewerSheetId)
        debugger
        this.setState({ name: this.props.sheetData.qaProject.name })
        this.findOrFetch()
    }

    findOrFetch = () => {
        // const pathName = props.history.location.pathname.split('/').pop()
        if(!!this.props.sheetData.qaProject.trackingSheetId && !!this.props.sheetData.qaProject.reviewerSheetId){
            this.fetchProjSheetsData(this.props.sheetData.qaProject.trackingSheetId, this.props.sheetData.qaProject.reviewerSheetId)
            
        }else{
            debugger
            this.fetchProjectInfo(this.props)
        }
    }

    fetchProjectInfo = (props) => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${PROJECTS_MASTER_ID}/values/1:10000?key= ${GSHEETS_API_KEY}`).then(response => response.json())
        .then(rxData => {
            const pathName = props.history.location.pathname.split('/').pop()
            const project =props.sheetData.projectsMaster.projects.find(proj => proj.name === pathName)
            debugger
            !!project ? this.setState({name: project.name}) : alert('No Project Found With That Name')
            !!project ? this.fetchProjSheetsData(project.trackingSheetId, project.reviewerSheetId)  : alert('No Project Known by that Name')
        })
    }

    fetchProjSheetsData = (trackingSheetId, reviewerSheetId) => {
        this.props.fetchTrackingSheetData(trackingSheetId)
        this.props.fetchReviewerSheetData(reviewerSheetId)
    }    

    render(){ 
        debugger
        return(
            <div className='project-div'>
                <div className="project-header">
                    <h1>{this.state.name}</h1>
                </div>
                {this.props.sheetData.qaProject.loading ? <h1>Loading....</h1> : <QaProjectInfo details={this.props.sheetData.qaProject}/>}
            </div>
        )
    }

}

const GSHEETS_API_KEY = process.env.REACT_APP_GOOGLESHEETS_API_KEY
const PROJECTS_MASTER_ID = process.env.REACT_APP_PROJECTS_MASTER_SHEET_ID

const mapStateToProps = state => {
    debugger
    return {
        sheetData: state    
    }
}

const mapDispatchToProps = dispatch => ({

    fetchTrackingSheetData: (trackingSheetId) => dispatch(fetchTrackingSheetData(trackingSheetId)),
    fetchReviewerSheetData: (reviewerSheetId) => dispatch(fetchReviewerSheetData(reviewerSheetId)),
    // fetchProjects: () => dispatch(fetchProjects()),
    updateProjectNameAndIds: projectData => dispatch(updateProjectNameAndIds(projectData))
    

})

export default connect (mapStateToProps, mapDispatchToProps)(QaProjectOverview)
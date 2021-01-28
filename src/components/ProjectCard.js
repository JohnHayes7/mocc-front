import React from 'react'
import { useHistory } from 'react-router-dom'
import QaProjectOverview from './qa/QaProjectOverview'
import { connect } from 'react-redux'
import { updateProjectNameAndIds } from '../actions/updateProjectNameAndIds'

const ProjectCard = (props) =>{

    const myDivToFocus = React.createRef()

    const history = useHistory();

    // TRY MOVING THIS TO QA PARENT
    const clickHandler = (event) =>{
        let lowerPath = props.projectData.type.toLowerCase()
        debugger
        history.push(`/${lowerPath}/${props.projectName}`)
        debugger
        props.updateProjectNameAndIds(props)
    }

    
    return(
        <div className="project-box" onClick={event => clickHandler(event)}>
            <span className="proj-title">{props.projectName}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    updateProjectNameAndIds: (projectData) => dispatch(updateProjectNameAndIds(projectData))
})

export default connect(0, mapDispatchToProps)(ProjectCard)
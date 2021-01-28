import React from 'react'
import Header from '../Header'
import ProjectCard from '../ProjectCard'
import './qa_parent.css'
import { connect } from 'react-redux'
import {fetchProjects} from '../../actions/fetchProjects'



class QaParent extends React.Component{


    componentDidMount(){
        this.props.fetchProjects()
    }

   
   
   parseProjectCards = () => {
       const qaProjects = this.props.sheetData.projectsMaster.projects.filter(proj => proj.type === "QA")
       return qaProjects.map(proj => <ProjectCard key={proj.rowId} projectName={proj.name} projectData={proj} />)
        
    }

    

    render(){
        
        return(
            <div>
                <Header />
                <h1>QA Projects</h1>
                <div id="projects">
                    {this.props.sheetData.projectsMaster.loading ? <h1>Loading Projects....</h1> : this.parseProjectCards()}
                </div>
           </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        sheetData: state
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProjects: () => dispatch(fetchProjects())
})



export default connect(mapStateToProps, mapDispatchToProps)(QaParent)
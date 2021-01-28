import React from 'react'
import { connect } from 'react-redux'
import ReactLoginMS from "react-ms-login";
import { getBntwData } from '../../actions/getBntwData'
import ProjectCard from '../ProjectCard'
import Header from '../Header'
import {fetchProjects} from '../../actions/fetchProjects'

class TrackingParent extends React.Component {

    componentDidMount(){
         
        this.props.fetchProjects()
    }

   
   
   parseProjectCards = () => {
       const trackingProjects = this.props.sheetData.projectsMaster.projects.filter(proj => proj.type === "Tracking")
       return trackingProjects.map(proj => <ProjectCard key={proj.rowId} projectName={proj.name} projectData={proj} />)
        
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Tracking</h1>
                <div id="projects">
                    
                    {this.props.sheetData.projectsMaster.loading ? <h1>Loading Projects....</h1> : this.parseProjectCards()}
                </div>
            </div>
            // <div>
            //     <ReactLoginMS
            //     clientId="a8e594de-9520-49b6-9f12-56936e20d2e2"
            //     redirectUri="http://localhost:3000/ms" 
            //     cssClass="ms-login" 
            //     btnContent="LOGIN WITH MICROSOFT"
            //     responseType="code"
            //     handleLogin={(data) => console.log(data)}
            //     />
            //     <h1>TrackingMain</h1>
            // </div>
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

export default connect (mapStateToProps, mapDispatchToProps)(TrackingParent)
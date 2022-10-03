import React from 'react'
import AutoTable from '../elements/AutoTable';
import { useNavigate } from 'react-router-dom';

function Projects(props) {
  const [projects, setProjects] = React.useState(null);
  const [linkFields, setLinkFields] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      // console.log(`projectsFromServer = ${Object.values(projectsFromServer)}`)
      // console.log(`linkFields = ${linkFields}`)
      setProjects(projectsFromServer)
    }
    getProjects();

  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects/')
    console.log(`res: ${Object.entries((key, entry) => key === 'allProjects')}`);
    const data = await res.json()

    console.log(data['allProjects']);
    setLinkFields(Object.values(data)[0]);

    return data.allProjects;
  }



  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component projects-page'>
      <h1 className="page-title">{props.title}</h1>

      {
        projects ?
          <AutoTable model="project" route="projects" linkFields={linkFields} documents={projects}></AutoTable>
          // : <div className="no-table-here">NO CLIENT PROP RECEIVED</div>
          : <div className="no-table-here"></div>
      }
      <button className="btn-add-client" >add new</button>

    </div>
  );
}

Projects.defaultProps = {
  title: `Moe's Software Services Projectéle`,
}

export default Projects
import React from 'react';
import AutoForm from '../elements/AutoForm';
import SubDisplay from '../elements/SubDisplay';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// i read something saying arrow function declarations don't give you access to `this`. 
const Project = ({ document, title }) => {
  const [project, setProject] = React.useState(null);
  const [projectClient, setProjectClient] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState(null);
  const location = useLocation();

  const current_id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const navigate = useNavigate();

  // const imgEntry = project
  //   ? Object.entries(project).find(([key, value]) => key === 'image_url')
  //   : null;

  // const image_url = imgEntry ? imgEntry[1] : '';
  const nameEntry = project
    ? Object.entries(project).find(([key, value]) => (key === 'name' || key === 'title'))
    : null;

  const nameTitle = nameEntry ? nameEntry[1] : '';
  // console.log(`project.jsx: current_id = ${current_id}`)
  // console.log(`project.jsx: document: ${document}`);

  React.useEffect(() => {
    // console.log(`useEffect document(obj.values) = ${Object.values(document)}`)
    const getProject =
      current_id && current_id !== '' ?
        async () => {
          try {
            // console.log(`what is the id? ${current_id}`)
            // this ternary allows an empty /:id path to use the default props document
            const projectFromServer = current_id === 'project'
              ? document
              : await fetchProject()
            // console.log(`projectFromServer = ${Object.values(projectFromServer).allProjects}`)
            // console.log(`projectFromServer = ${Object.values(Object.values(projectFromServer.project))}`)
            console.log(`proj.from.srv. = ${JSON.stringify(projectFromServer)}`)
            setProject(projectFromServer.project);
            // console.log(`projectClientFromserver = ${Object.values(Object.values(projectFromServer.project_client))}}`)
            console.log(`pr.fr.sv.client = ${JSON.stringify(projectFromServer.client)}`)
            setProjectClient(projectFromServer.client);
            setImgUrl(projectFromServer.client
              // ? Object.entries(projectFromServer.project_client).find(([key, value]) => key === 'image_url')
              ? projectFromServer.client.image_url
              : null)
          }
          catch (err) {
            console.log(`getProject err: i can't read err`);
          }
        }
        : ''

    getProject();

  }, []);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${current_id}`);
      // console.log(`res: ${Object.entries((key, entry) => key === 'allProjects')}`);
      const data = await res.json()

      console.log(`data from api/projects/:id = ${data}`);

      return data;
    }
    catch (err) {
      console.log(`fetchProject err: no idea`);
    }
  }



  // RETURN()
  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹
  return (
    <div className=" page-wrapper project-page-wrapper">
      <h1 className="component-title">{title}</h1>
      <AutoForm
        document={project}
        title={`${nameTitle}`}
        route='projects'
        id={current_id}
        keys={
          [
            { id: current_id ? current_id : '' },
            { title: '' },
            { order_date: '' },
            { promise_date: '' },
            { client: '' },
            { invoice: '' }
          ]
        }
      />
      <div className="project-client-wrapper">
        {/* <img
          src={imgUrl ? imgUrl : ''}
          alt=""
          className="project-client-img" /> */}
        <div className="project-client-sub-wrapper">
          {/* <AutoForm document={projectClient} title={'client for project'}></AutoForm> */}
          <SubDisplay document={projectClient} title={'client for project'}></SubDisplay>
          {/* <ul className="project-client-details" style={{ border: '2px solid green' }}> */}
          {projectClient && Object.entries(projectClient).forEach((entry) => {
            // console.log(`projClient tostring ${JSON.stringify(projectClient)}`)
            // console.log(`the entry = ${entry[1]}`)
            return (
              <p style={{ color: "white" }}>{entry[1]}</p>
            )
          })}
        </div>

        {/* </ul> */}
      </div>
    </div>
  )
}

Project.defaultProps = {
  title: `project`,
  document: {
    name: 'Jim Bode',
    email: 'Jim.Bode@gmail.com',
    phone: '(790) 291-1596',
    image_url: 'http://www.thispersondoesnotexist.com/image',
    foo: false
  }
}

export default Project;
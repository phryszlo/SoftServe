import React from 'react'
import AutoTable from '../elements/AutoTable';

function Dashboard(props) {
  const [clients, setClients] = React.useState(null);
  const [projects, setProjects] = React.useState(null);
  const [seedQ, setSeedQ] = React.useState(5);

  // there is a new "feature" in react v18 whereby useEffect runs 2x
  // when in dev mode with StrictMode turned on. it's intentional. i don't understand it.
  // when you build and deploy, it stops happening. but it's a problem when you do things like
  // seed data in your useEffect. or do inserts. or whatever. 
  // hence StrictMode is disabled whilst i.b. dev'ing.

  React.useEffect(() => {
    const getClients = async () => {
      const clientsFromServer = await fetchClients()
      console.log(`clientsFromServer = ${Object.keys(clientsFromServer)}`)
      setClients(clientsFromServer)
    }

    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      console.log(`projectsFromServer = ${Object.keys(projectsFromServer)}`)
      setProjects(projectsFromServer)
    }

    getClients();
    getProjects();

  }, []);

  const fetchClients = async () => {
    const res = await fetch('/api/clients/')
    const data = await res.json()
    return data
  }
  const fetchProjects = async () => {
    const res = await fetch('/api/projects/')
    const data = await res.json()
    return data
  }



  const onSeedClientsClick = (e) => {
    // setSeedClicks(seedClicks + 1);
    fetch(`/api/clients/seed/${seedQ}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data && setClients(data.message)
      })
      ;
  }

  const onSeedProjectsClick = (e) => {
    // setSeedClicks(seedClicks + 1);
    fetch(`/api/projects/seed/${seedQ}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data && setClients(data.message)
      })
      ;
  }

  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
  
  return (
    <div className='page-component dashboard-page'>
      <h1 className="page-title">{props.title}</h1>
      {/* <p>{!data ? "Loading..." : data}</p> */}
      <div className="button-rack">
        <button className="btn-seed btn-seed-clients" onClick={onSeedClientsClick}>seed clients</button>
        <button className="btn-seed btn-seed-projects" onClick={onSeedProjectsClick}>seed projects</button>
      </div>
      {
        projects ?
          <AutoTable title="all projects" documents={projects}></AutoTable>
          : <div className="no-table-here">NO PROJECT PROP RECEIVED IN DASHBOARD</div>
      }
      {
        clients ?
          <AutoTable title="all clients" documents={clients}></AutoTable>
          : <div className="no-table-here">NO CLIENT PROP RECEIVED IN DASHBOARD</div>
      }

    </div>
  );
}

Dashboard.defaultProps = {
  title: 'soft.serv.dash.',
}

export default Dashboard
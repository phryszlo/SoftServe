import React from 'react'
import AutoTable from '../elements/AutoTable';
import { useLocation } from 'react-router-dom';


function Dashboard(props) {
  const [clients, setClients] = React.useState(null);
  const [projects, setProjects] = React.useState(null);
  const [seedQ, setSeedQ] = React.useState(5);
  const [clientLinkFields, setClientLinkFields] = React.useState([]);
  const [projectLinkFields, setProjectLinkFields] = React.useState([]);
  const [qDelProj, setQDelProj] = React.useState(5);
  const [qDelClient, setQDelClient] = React.useState(5);
  const [updatingClients, setUpdatingClients] = React.useState(false);
  const [updatingProjects, setUpdatingProjects] = React.useState(false);

  const qProjDelRef = React.useRef(null);
  const qClientDelRef = React.useRef(null);

  const location = useLocation();



  // there is a new "feature" in react v18 whereby useEffect runs 2x
  // when in dev mode with StrictMode turned on. it's intentional. i don't understand it.
  // when you build and deploy, it stops happening. but it's a problem when you do things like
  // seed data in your useEffect. or do inserts. or whatever. 
  // hence StrictMode is disabled whilst i.b. dev'ing.

  React.useEffect(() => {
    console.log(`dashboard useEffect`)
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      // console.log(`projectsFromServer = ${Object.values(projectsFromServer)}`)
      setProjects(projectsFromServer)
    }
    const getClients = async () => {
      const clientsFromServer = await fetchClients()
      // console.log(`clientsFromServer = ${Object.values(clientsFromServer)}`)
      setClients(clientsFromServer)
    }

    getProjects();
    getClients();

  }, []);

  React.useEffect(() => {
    console.log(`qDelProj useEffect`)

    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      // console.log(`projectsFromServer = ${Object.values(projectsFromServer)}`)
      setProjects(projectsFromServer)
    }
    getProjects();

  }, [updatingProjects])

  React.useEffect(() => {
    console.log(`qDelClient useEffect`)

    const getClients = async () => {
      const clientsFromServer = await fetchClients()
      // console.log(`clientsFromServer = ${Object.values(clientsFromServer)}`)
      setClients(clientsFromServer)
    }
    getClients();

  }, [updatingClients])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects/')
    // console.log(`res: ${Object.entries((key, entry) => key === 'allProjects')}`);
    const data = await res.json()

    // console.log(data['allProjects']);
    setProjectLinkFields(Object.values(data)[0]);

    // THIS data.allProjects OR return projects.allProjects to AutoTable, NOT BOTH
    return data.allProjects;
  }

  const fetchClients = async () => {
    const res = await fetch('/api/clients/')
    const data = await res.json()

    // console.log(`data: ${Object.values(data)[0]}`)

    // this requires that the link_fields be passed in as the first object in the res.json()
    setClientLinkFields(Object.values(data)[0]);
    return data.allClients;
  }




  const onSeedClientsClick = (e) => {
    // setSeedClicks(seedClicks + 1);
    fetch(`/api/clients/seed/${seedQ}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data && setClients(data.message)
      });
  }

  const onSeedProjectsClick = (e) => {
    // setSeedClicks(seedClicks + 1);
    fetch(`/api/projects/seed/${seedQ}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data && setClients(data.message)
      });
  }
  const onDeleteRandomProjectsClick = (e) => {
    console.log(`qDelRef.current.value: ${qProjDelRef.current.value}`)
    // return;

    const fetchOpts = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    try {
      fetch(`/api/projects/random/${qProjDelRef.current.value}`, fetchOpts)
        .then((res) => res.json())
        .then((data) => {
          console.log(`data from delete random projects: ${data}`);
          setUpdatingProjects(true);

        })
    }
    catch (err) {
      console.log(`delete random projects fails: ${err}`);
    }
  }
  const onDeleteRandomClientsClick = (e) => {
    console.log(`qDelRef.current.value: ${qClientDelRef.current.value}`)
    // return;

    const fetchOpts = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    try {
      fetch(`/api/clients/random/${qClientDelRef.current.value}`, fetchOpts)
        .then((res) => res.json())
        .then((data) => {
          console.log(`data from delete random clients: ${data}`);
          setUpdatingClients(true);
        })
    }
    catch (err) {
      console.log(`delete random clients fails: ${err}`);
    }

  }

  const onQDelInputChange_proj = (e) => {
    console.log(`change q event`);
    setQDelProj(e.target.value);
  }
  const onQDelInputChange_client = (e) => {
    console.log(`change q event`);
    setQDelClient(e.target.value);
  }

  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
   🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component dashboard-page'>
      <h1 className="page-title">{props.title}</h1>
      {/* <p>{!data ? "Loading..." : data}</p> */}
      <div className="button-rack">
        <button className="btn-seed btn-seed-clients" onClick={onSeedClientsClick}>seed clients</button>
        <button className="btn-seed btn-seed-projects" onClick={onSeedProjectsClick}>seed projects</button>
        <div className="del-rnd-wrapper">
          <button className="btn-seed btn-delete-random-projects" onClick={onDeleteRandomProjectsClick}>delete random projects:</button>
          <input
            onChange={onQDelInputChange_proj}
            type="number" name="qDelProjects" id="qDelProjects"
            className="q-del" ref={qProjDelRef} value={qDelProj}
            style={{ width: "50px" }}
          />
        </div>
        <div className="del-rnd-wrapper">
          <button className="btn-seed btn-delete-random-clients" onClick={onDeleteRandomClientsClick}>delete random clients:</button>
          <input
            onChange={onQDelInputChange_client}
            type="number" name="qDelClients" id="qDelClients"
            className="q-del" ref={qClientDelRef} value={qDelClient}
            style={{ width: "50px" }}
          />
        </div>
      </div>
      {
        projects ?
          <AutoTable model="project" linkFields={projectLinkFields} documents={projects}></AutoTable>
          : <div className="no-table-here">no projects received</div>

      }
      {
        clients ?
          <AutoTable model="client" linkFields={clientLinkFields} documents={clients} />
          : <div className="no-table-here">no clients received</div>
      }

    </div>
  );
}

Dashboard.defaultProps = {
  title: `Moe's Soft Serv - Internal Dashboard`,
}

export default Dashboard
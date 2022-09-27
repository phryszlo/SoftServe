import React from 'react'
import AutoTable from './AutoTable';

function Dashboard(props) {
  const [data, setData] = React.useState(null);
  const [seedQ, setSeedQ] = React.useState(5);

  // there is a new "feature" in react v18 whereby useEffect runs 2x
  // when in dev mode with StrictMode turned on. it's intentional. i don't understand it.
  // when you build and deploy, it stops happening. but it's a problem when you do things like
  // seed data in your useEffect. or do inserts. or whatever. 
  // hence StrictMode is disabled whilst i.b. dev'ing.

  React.useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message)
      })
      ;
  }, []);



  const onSeedClick = (e) => {
    // setSeedClicks(seedClicks + 1);
    fetch(`/api/clients/seed/${seedQ}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data && setData(data.message)
    })
    ;
  }

  return (
    <div className='component dashboard-container'>
      <h1 className="component-title">{props.title}</h1>
      {/* <p>{!data ? "Loading..." : data}</p> */}

      <button className="btn-seed" onClick={onSeedClick}>seed clients</button>

      <AutoTable></AutoTable>

    </div>
  )
}

Dashboard.defaultProps = {
  title: 'soft.serv.dash.',
}

export default Dashboard
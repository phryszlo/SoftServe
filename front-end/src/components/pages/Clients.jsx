import React from 'react'
import AutoTable from '../elements/AutoTable';

function Clients(props) {
  const [clients, setClients] = React.useState(null);

  React.useEffect(() => {
    const getClients = async () => {
      const clientsFromServer = await fetchClients()
      console.log(`clientsFromServer = ${Object.keys(clientsFromServer)}`)
      setClients(clientsFromServer)
    }
    getClients();

  }, []);

  const fetchClients = async () => {
    const res = await fetch('/api/clients/')
    const data = await res.json()
    return data
  }


  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component clients-page'>
      <h1 className="page-title">{props.title}</h1>

      {
        clients ?
          <AutoTable title="all clients" linkOn="name" documents={clients}></AutoTable>
          : <div className="no-table-here"></div>
      }

    </div>
  );
}

Clients.defaultProps = {
  title: `Moe's software package clientéle`,
}

export default Clients
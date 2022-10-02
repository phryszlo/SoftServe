import React from 'react'
import AutoTable from '../elements/AutoTable';

function Clients(props) {
  const [clients, setClients] = React.useState(null);
  const [linkFields, setLinkFields] = React.useState([]);

  React.useEffect(() => {
    const getClients = async () => {
      const clientsFromServer = await fetchClients()
      console.log(`clientsFromServer = ${Object.values(clientsFromServer)}`)
      console.log(`linkFields = ${linkFields}`)
      setClients(clientsFromServer)
    }
    getClients();

  }, []);

  const fetchClients = async () => {
    const res = await fetch('/api/clients/')
    console.log(`res: ${Object.entries((key, entry) => key === 'allClients')}`);
    const data = await res.json()

    console.log(data['allClients']);
    setLinkFields(Object.values(data)[0]);

    return data.allClients;
  }



  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component clients-page'>
      <h1 className="page-title">{props.title}</h1>

      {
        clients ?
          <AutoTable title="all clients" route="clients" linkFields={linkFields} documents={clients}></AutoTable>
          // : <div className="no-table-here">NO CLIENT PROP RECEIVED</div>
          : <div className="no-table-here"></div>
      }

    </div>
  );
}

Clients.defaultProps = {
  title: `Moe's Software Services Clientéle`,
}

export default Clients
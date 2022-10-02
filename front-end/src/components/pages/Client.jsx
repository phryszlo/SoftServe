import React from 'react';
import AutoForm from '../elements/AutoForm';
import { useLocation } from 'react-router-dom';

// i read something saying arrow function declarations don't give you access to `this`. 
const Client = ({ document }) => {
  const [client, setClient] = React.useState(null);

  const location = useLocation();

  const current_id = !document._id
    ? location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    : document._id;

  // ///////////
  // console.log(`doc.leng = ${JSON.stringify(document)}`)



  // console.log(`document._id = ${client.id ? document.id : 'no doc._id'}  `)

  const imgEntry = client
    ? Object.entries(client).find(([key, value]) => key === 'image_url')
    : null;

  const image_url = imgEntry ? imgEntry[1] : '';
  const nameEntry = client
    ? Object.entries(client).find(([key, value]) => key === 'name' || key === 'title')
    : null;

  const nameTitle = nameEntry ? nameEntry[1] : '';
  // console.log(`client.jsx: current_id = ${current_id}`)
  // console.log(`client.jsx: document: ${document}`);

  React.useEffect(() => {
    // console.log(`useEffect document(obj.values) = ${Object.values(document)}`)
    // Object.values(document).forEach((k) => {
    //   console.log(`k = ${k}`)
    // })
    const getClient =
      current_id && current_id !== '' ?
        async () => {
          try {
            // this ternary allows an empty /:id path to use the default props document
            const clientFromServer = current_id === 'client'
              ? document
              : await fetchClient()
            // console.log(`clientFromServer = ${Object.values(clientFromServer)}`)
            setClient(clientFromServer)

          }
          catch (err) {
            console.log(`getClient err: that was some sort of disaster.`);
          }
        }
        : ''

    getClient();

  }, []);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${current_id}`);
      // console.log(`res: ${Object.entries((key, entry) => key === 'allClients')}`);
      const data = await res.json()

      console.log(`Client.jsx : data from api/clients/:id = ${JSON.stringify(data)}`);

      return data;
    }
    catch (err) {
      console.log(`fetchClient err: ${err}`);
    }
  }

  // RETURN()
  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹
  return (
    <div className=" page-wrapper client-page-wrapper">
      <img
        className="client-img"
        src={image_url ? image_url : ''}
        width="150px"
        alt={`fake image courtesy 'www.thispersondoesnotexist.com' (unless you are reading this alt tag)`} />
      <AutoForm
        keys={
          [
            { id: current_id ? current_id : '' },
            { name: '' },
            { email: '' },
            { phone: '' },
            { image_url: '' }
          ]
        }
        document={client}
        title={nameTitle}
        route='clients'
        id={current_id ? current_id : null} />
    </div>
  )
}

Client.defaultProps = {
  title: `clientele form`,
  document: {
    name: 'Jim Bode',
    email: 'Jim.Bode@gmail.com',
    phone: '(790) 291-1596',
    image_url: 'http://www.thispersondoesnotexist.com/image',
    foo: false
  }
}

export default Client;
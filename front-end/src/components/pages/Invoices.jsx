import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AutoTable from '../elements/AutoTable';

function Invoices(props) {
  const [invoices, setInvoices] = React.useState(null);
  const [linkFields, setLinkFields] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getInvoices = async () => {
      const invoicesFromServer = await fetchInvoices()
      console.log(`invoicesFromServer = ${Object.values(invoicesFromServer)}`)
      console.log(`linkFields = ${linkFields}`)
      setInvoices(invoicesFromServer)
    }
    getInvoices();

  }, []);

  const fetchInvoices = async () => {
    const res = await fetch('/api/invoices/')
    // console.log(`res: ${Object.entries((key, entry) => key === 'allInvoices')}`);
    const data = await res.json()

    console.log(data['allInvoices']);
    console.log(data['links']);

    setLinkFields(data['links']);

    // console.log(`invoice fields = ${JSON.stringify(linkFields)}`);

    return data['allInvoices'];
  }

  const handleAddInvoiceClick = (e) => {
    e.preventDefault();
    navigate('/invoice', {
      props: {
        document: {
          name: 'Default P. Invoice',
          email: 'deefie@gmail.com',
          phone: '(790) 291-1596',
          image_url: 'http://thispersondoesnotexist.com/image',
          foo: false
        }
      }
    });

  }

  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className='page-component invoices-page'>
      <h1 className="page-title">{props.title}</h1>

      {
        invoices ?
          <AutoTable title="all invoices" route="invoices" linkFields={linkFields} documents={invoices}></AutoTable>
          // : <div className="no-table-here">NO CLIENT PROP RECEIVED</div>
          : <div className="no-table-here">no table</div>
      }

      <button className="btn-add-item btn-add-invoice" onClick={handleAddInvoiceClick}>add new</button>

    </div>
  );
}

Invoices.defaultProps = {
  title: `working title software services - invoices`,
}

export default Invoices
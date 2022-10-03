import React from 'react'
import { useNavigate } from "react-router-dom";


const AutoTable = ({ documents, route, model, linkFields }) => {

  const fields =
    documents && documents.length > 0
      ? Object.keys(documents[0])
      : []


  let current_id = "63334d4c99b7d70f32220120";
  let current_sub_id = "63334d4c99b7d70f32220120";

  // '_id' was removed from excludeFields to be used in link generator
  const excludeFields = [
    'id', '__v', 'image_url'
  ];

  const navigate = useNavigate();


  // console.log(`${model} docs = ${documents}`)
  // console.log(`${model} fields = ${fields}`)

  const renderTDList = (data) => {
    console.log(`data = ${JSON.stringify(data)}`)
    console.log(`data.length = ${data.length}`);
    for (let i = 0; i < data.length; i++) {
      console.log(`data[${i}] = yer ${JSON.stringify(Object.values(data)[i])}`)
    }

    return (
      <ul className="td-list">
        {/* <li> */}
        {/* {for (let i = 0; i < data.length; i++) {
          console.log(`data[${i}] = yer ${JSON.stringify(Object.values(data)[i])}`)
        }} */}
        {Object.values(data).map((element, index) => {
          return (
            <li className='td-list-item'>
              <span>{element.vendor}</span>
              <span>${element.cost}</span>
            </li>
          )
        }
        )}
        {/* </li> */}
      </ul>
    )
  }

  // 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻
  const renderTD = (field, doc, colIndex) => {
    console.log(`fields: ${fields}, field=${field}`);

    if (field === '_id') {
      current_id = Object.values(doc)[colIndex];
      return '';
    }

    // this is bad. this is pre-populated for the projects sub = 'client'.
    if (field === 'client') {
      // console.log(`field eqd client: ${Object.values(doc)[colIndex].id}`);
      current_sub_id = Object.values(doc)[colIndex] ? Object.values(doc)[colIndex].id : ''
    }

    if (field === 'invoice_items') {
      // console.log(`field eqd invoice_items: ${Object.values(doc)[colIndex].id}`);
      // console.log(`INVOICE ITEMS (obj.vals): ${Object.values(doc)[0]}`);
      // console.log(`INVOICE ITEMS (obj.vals): ${Object.values(doc)[1]}`);
      // console.log(`INVOICE ITEMS (obj.vals): ${Object.values(doc)[2]}`);
      current_sub_id = Object.values(doc)[0] ? Object.values(doc)[0] : ''
    }

    return (
      <td
        key={`td-${colIndex}`}
        style={field === 'phone' ? { textAlign: "right" } : {}}
      >
        {/* so. how to know which route to link to? singular of the all[Enitys] name? */}
        {/* LINK-FIELD TERNARY */}
        {linkFields && linkFields.length > 0 && linkFields.indexOf(field) >= 0
          ?

          <a
            className="td-link"
            href={field === 'client'
              ? `/${field}/${current_sub_id}`
              : `/${model}/${current_id}`}>

            {/* DATE FIELD TERNARY */}
            {/* // is this a date field? if so, format it. */}
            {/* {typeof ((Object.values(doc)[colIndex]) !== "object") || (field.endsWith('_date')) */}
            {/* {field.endsWith('_date') let isDate =  */}
            {new Date(Object.values(doc)[colIndex]).getDay()
              ?

              `${new Date(Object.values(doc)[colIndex]).toDateString()}`

              // {/* IS OBJECT TERNARY (avoids the Objects are not allowed as React children error)*/}
              // it's not a date. is it an object? if so, handle it like an object (Object.entries, Object.values, etc.) 
              : typeof (Object.values(doc)[colIndex]) === "object"
                ? Object.entries(Object.values(doc)[colIndex]).find((key, value) =>
                  Object.values(doc)[colIndex][key] = value)[1] //[0] = key, [1] = value, in Object.entries.

                // {/* DEFAULT CONDITION OF DATE/OBJECT TERNARY */}
                // no, it's what? a literal or primitive? this is the default. 
                // (the whole thing is still an Object, so it still gets handled with one Object.values call.)
                : Object.values(doc)[colIndex]
            }
            {/* END OF DATE FIELD TERNARY */}
          </a>

          // linkFields did not contain the field: this should contain the value as not-a-link
          :

          // {/* i regret to have to repeat that whole section again */}

          // {/* DATE FIELD TERNARY */ }
          field.endsWith('_date')
            ?

            `${new Date(Object.values(doc)[colIndex]).toDateString()}`

            // 🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺
            // IS ARRAY?
            : field === 'invoice_items'
              // : Array.isArray(Object.values(doc)[0])
              // ? JSON.stringify(Object.values(doc)[2])
              ? renderTDList(Object.values(doc)[2])

              // {/* IS OBJECT TERNARY (avoids the Objects are not allowed as React children error)*/}
              // it's not a date. is it an object? if so, handle it like an object (Object.entries, Object.values, etc.)
              : typeof (Object.values(doc)[colIndex]) === "object"
                ? Object.entries(Object.values(doc)[colIndex]).find((key, value) =>
                  Object.values(doc)[colIndex][key] = value)[1] //[0] = key, [1] = value, in Object.entries.

                // {/* DEFAULT CONDITION OF DATE/OBJECT TERNARY */}
                // no, it's what? a literal or primitive? this is the default.
                // (the whole thing is still an Object, so it still gets handled with one Object.values call.)
                : Object.values(doc)[colIndex]
        }
        {/* END OF LINK-FIELD TERNARY */}
      </td>
    )
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const rte = e.target.parentNode.parentNode.parentNode.parentNode.dataset.route;
    console.log(`deleting ${e.target.parentNode.dataset.id}`)
    // return;
    const this_id = e.target.parentNode.dataset.id;
    const fetchOpts = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    try {
      fetch(`/api/${rte}/${this_id}`, fetchOpts)
        .then((res) => res.json())
        .then((data) => {
          console.log(`data from delete client ${this_id}: ${data}`);
          // setUpdatingClients(true);
        })
      navigate(0);
    }
    catch (err) {
      console.log(`delete random clients fails: ${err}`);
    }
  }

  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className="component autotable-component">
      <h2 className="component-title">{route}</h2>

      {documents && documents.length > 0
        ?

        <table className="auto-table" data-route={route}>
          <thead>
            <tr>
              {fields.map((field, index) => {
                return (
                  excludeFields.indexOf(field) < 0 && field !== '_id'
                    ?
                    <th key={`th-${index}`}>
                      {field}
                    </th>
                    : ''
                )
              })}
            </tr>
          </thead>
          <tbody>

            {documents && documents.map((doc, rowIndex) => {
              return (
                <tr
                  key={`tr-${rowIndex}`}
                  className="auto-table-row"
                >

                  {fields.map((field, colIndex) => {
                    return (
                      excludeFields.indexOf(field) < 0
                        ? renderTD(field, doc, colIndex)
                        : ''
                    )
                  })}
                  <td className="td-delete-btn" data-id={current_id}>
                    <button
                      className="btn-delete btn-delete-one-client"
                      onClick={handleDeleteClick}
                    >
                      🤢
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        : <div className="no-table-here"></div>
        // : <div className="no-table-here"> {title.toUpperCase()} : NO DATA RECEIVED IN AUTOTABLE</div>
      }
    </div>
  )

}

AutoTable.defaultProps = {
  title: 'autotable',
  model: 'client',
  documents: [
    {
      name: 'Emmanuel Parisian',
      email: 'Emmanuel.Parisian@gmail.com',
      phone: '401-233-3548 x244',
    },
    {
      name: 'Elisa Altenwerth',
      email: 'Elisa_Altenwerth95@gmail.com',
      phone: '1-223-997-1495',
    },
    {
      name: 'Madalyn Bode',
      email: 'Madalyn.Bode@gmail.com',
      phone: '(790) 291-1596',
    },

  ]
}


export default AutoTable
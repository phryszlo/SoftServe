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


  // 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻
  const renderTD = (field, doc, colIndex) => {
    if (field === '_id') {
      current_id = Object.values(doc)[colIndex];
      return '';
    }

    // this is bad. this is pre-populated for the projects sub = 'client'.
    if (field === 'client') {
      // console.log(`field eqd client: ${Object.values(doc)[colIndex].id}`);
      current_sub_id = Object.values(doc)[colIndex] ? Object.values(doc)[colIndex].id : ''
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

          <a className="td-link" href={field === 'client' ? `/${field}/${current_sub_id}` : `/${model}/${current_id}`}>

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
    // return;
    const fetchOpts = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    try {
      fetch(`/api/${rte}/${current_id}`, fetchOpts)
        .then((res) => res.json())
        .then((data) => {
          console.log(`data from delete client ${current_id}: ${data}`);
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
      <h2 className="component-title">{model}</h2>

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
                <tr key={`tr-${rowIndex}`} className="auto-table-row" data-id={current_id}>

                  {fields.map((field, colIndex) => {
                    return (
                      excludeFields.indexOf(field) < 0
                        ? renderTD(field, doc, colIndex)
                        : ''
                    )
                  })}
                  <td className="td-delete-btn">
                    <button
                      className="btn-delete btn-delete-one-client"
                      onClick={handleDeleteClick}
                    >
                      del
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
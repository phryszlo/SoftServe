import React from 'react'

const AutoTable = ({ documents, title, linkFields }) => {
  // const [fields, setFields] = React.useState(
  //   documents && documents.length > 0
  //     ? Object.keys(documents[0])
  //     : []
  // );
  const fields =
    documents && documents.length > 0
      ? Object.keys(documents[0])
      : []


  const excludeFields = [
    '_id', 'id', '__v'
  ];


  // documents.map((object, index) => {
  //   console.log(`this object : ${Object.entries(object)[0][0]}..., ${Object.entries(object)[0][1]}`);
  // });

  console.log(`${title} docs = ${documents}`)
  console.log(`${title} fields = ${fields}`)



  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className="component autotable-component">
      <h2 className="component-title">{title}</h2>

      {documents && documents.length > 0
        ?

        <table className="auto-table">
          <thead>
            <tr>
              {fields.map((field, index) => {
                return (
                  excludeFields.indexOf(field) < 0
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
            {/* MAP I */}
            {documents.map((doc, rowIndex) => {
              return (
                <tr key={`tr-${rowIndex}`}>

                  {/* MAP II */}
                  {fields.map((field, colIndex) => {
                    console.log(excludeFields, field)
                    return (
                      excludeFields.indexOf(field) < 0
                        ?
                        <td
                          key={`td-${colIndex}`}
                          style={field === 'phone' ? { textAlign: "right" } : {}}
                        >
                          {/* LINK-FIELD TERNARY */}
                          {linkFields.indexOf(field) >= 0
                            ?

                            <a className="td-link" href={`/projects`}>

                              {/* DATE FIELD TERNARY */}
                              {/* // is this a date field? if so, format it. */}
                              {field.endsWith('_date')
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

                        // excludeFields contained the field: render nothing
                        : ''
                      //{/* END OF EXCLUDE FIELDS TERNARY */}

                    )
                  })}
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
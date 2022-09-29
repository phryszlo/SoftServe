import React from 'react'

const AutoTable = ({ documents, title }) => {
  const [fields, setFields] = React.useState(
    documents && documents.length > 0
      ? Object.keys(documents[0])
      : []
  )

  const excludeFields = [
    '_id', 'id', '__v'
  ]

  console.log(`${title} docs = ${documents}`)
  console.log(`${title} fields = ${fields}`)

  return (
    <div className="component autotable-component">
      <h2 className="component-title">{title}</h2>

      {/* ONLY DISPLAY TABLE IF THERE'S SOMETHING TO DISPLAY */}
      {
        documents && documents.length > 0 ?
          <table className="auto-table">
            <thead>
              <tr>
                {fields.map((field, index) => {
                  return (
                    excludeFields.indexOf(field) < 0 ?

                      <th key={`th-${index}`}>
                        {field}
                      </th>

                      : ''
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, rowIndex) => {
                return (
                  <tr key={`tr-${rowIndex}`}>
                    {fields.map((field, colIndex) => {
                      return (
                        excludeFields.indexOf(field) < 0
                          ?
                          <td
                            key={`td-${colIndex}`}
                            style={field === 'phone' ? { textAlign: "right" } : {}}
                          >
                            {
                              //    (Object.values(doc)[colIndex] instanceof Date) ?
                              field.endsWith('_date') ?

                                `${new Date(Object.values(doc)[colIndex]).toDateString()}`

                                : typeof (Object.values(doc)[colIndex]) === "object"
                                  ? Object.entries(Object.values(doc)[colIndex]).find(
                                    (key, value) =>
                                      Object.values(doc)[colIndex][key] = value
                                  )
                                  : Object.values(doc)[colIndex]
                            }
                          </td>

                          : ''

                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

          : <div className="no-table-here"> {title.toUpperCase()} : NO DATA RECEIVED IN AUTOTABLE</div>
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
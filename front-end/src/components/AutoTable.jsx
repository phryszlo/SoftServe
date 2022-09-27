import React from 'react'

const AutoTable = ({ documents }) => {
  const [fields, setFields] = React.useState(
    documents ? Object.keys(documents[0])
      : []
  )

  console.log('doccos=', documents)
  console.log(fields)
  documents.forEach(d => {
    console.log(Object.values(d));
  });

  return (
    <div className="component table-container">

      {/* ONLY DISPLAY TABLE IF THERE'S SOMETHING TO DISPLAY */}
      {documents && documents.length > 0 ?
        <table className="auto-table" style={{ width: "50vw", height: "50vh", border: "2px solid black" }}>
          <thead>
            <tr>
              {fields.map((field, index) => {
                return (
                  <th key={`th-${index}`}>
                    {field}
                  </th>
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
                      <td style={{ border: "1px solid green" }} key={`td-${colIndex}`}>
                        {Object.values(doc)[colIndex]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        : <h4>no data was sent</h4>}
    </div>
  )

}

AutoTable.defaultProps = {
  documents: [
    {
      name: 'Emmanuel Parisian',
      email: 'Emmanuel.Parisian@gmail.com',
      phone: '401-233-3548 x244',
      __v: 0
    },
    {
      name: 'Elisa Altenwerth',
      email: 'Elisa_Altenwerth95@gmail.com',
      phone: '1-223-997-1495',
      __v: 0
    },
    {
      name: 'Madalyn Bode',
      email: 'Madalyn.Bode@gmail.com',
      phone: '(790) 291-1596',
      __v: 0
    },

  ]
}


export default AutoTable
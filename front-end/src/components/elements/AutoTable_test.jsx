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

  console.log('docs=', documents)
  console.log('fields=', fields)

  // documents && documents.forEach(d => {
  //   console.log(Object.values(d));
  // });

  return (
    <div className="component autotable-component">
      <h2 className="component-title">{title}</h2>
{/*  */}
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
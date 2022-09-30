import React from 'react'

const AutoForm = ({ title, document }) => {
  const [fields, setFields] = React.useState(
    document ? Object.keys(document)
      : []
  )

  console.log('doc=', document)
  console.log('fields=', fields)

  return (
    <div className="component autoform-component">
      <h2 className="component-title">{title}</h2>

      {document ?
        <form action="" className="auto-form">

        </form>

        : <h4>no data was sent</h4>}
    </div>
  )

}

AutoForm.defaultProps = {
  document: {
      name: 'Madalyn Bode',
      email: 'Madalyn.Bode@gmail.com',
      phone: '(790) 291-1596',
    }
}

export default AutoForm
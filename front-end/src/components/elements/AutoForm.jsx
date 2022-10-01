import React from 'react'

const AutoForm = ({ title, document }) => {

  const fields =
    document ? Object.keys(document)
      : []
  const excludeFields = [
    '_id', 'id', '__v'
  ];
  console.log('doc=', document)
  console.log('fields=', fields)

  const renderFormInput = (docKey, docVal) => {
    console.log(`docKey= ${docKey} docVal=${docVal}`);
    switch (typeof (docVal)) {
      case "string":
        let isDate = (new Date(docVal).getDay());
        return (
          <>
            <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>
            <input
              id={`form-input-${docKey}`}
              type="text"
              className="form-input form-text-input"
              name={docKey}
              defaultValue={
                isDate ?
                  `${new Date(docVal).toDateString()} ${new Date(docVal).toLocaleTimeString('en-US')}`
                  :
                  docVal 
              } />
          </>
        )
      case "boolean":
        return (
          <>
            <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>
            <input id={`form-input-${docKey}`} type="checkbox" className="form-input form-checkbox-input" name={docKey} defaultChecked={docVal} />
          </>
        )
      case "object":
        if (docVal instanceof Date) {
          return (
            <>
              <h2>date!</h2>
            </>
          )
        }
        else {
          return (
            <>
              <h2>OBJECT!</h2>
            </>
          )
        }
    }
  }


  /*🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸
    🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹*/
  return (
    <div className="component autoform-component">
      <h2 className="component-title">{title}</h2>

      {document ?

        <form action="" className="auto-form">
          {Object.entries(document).map(([docKey, docVal], index) => {
            return (
              excludeFields.indexOf(docKey) < 0 ?
                <div className="form-field" key={`field-${index}`}>
                  {
                    renderFormInput(docKey, docVal)
                  }
                </div>
                : ''
            )
          })}
        </form>

        : <h4>no data was sent</h4>}
    </div>
  )

}

AutoForm.defaultProps = {
  title: `client form`,
  document: {
    name: 'Madalyn Bode',
    email: 'Madalyn.Bode@gmail.com',
    phone: '(790) 291-1596',
    foo: false
  }
}

export default AutoForm
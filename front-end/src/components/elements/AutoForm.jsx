import React from 'react'
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers"
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const AutoForm = ({ title, document }) => {

  const [newOrderDate, setNewOrderDate] = React.useState(null);
  const [newPromiseDate, setNewPromiseDate] = React.useState(null);

  React.useEffect(() => {
    console.log('usin effect')
    console.log(
      `useEffect autoform newPromiseDate ${newPromiseDate} newClientDate ${newOrderDate}`);
  })

  const fields =
    document ? Object.keys(document)
      : []

  const excludeFields = [
    '_id', 'id', '__v'
  ];
  console.log('doc=', document)
  console.log('fields=', fields)




  // 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔺🔺🔺🔺
  const renderFormInput = (docKey, docVal) => {
    // console.log(`docKey= ${docKey} docVal=${docVal}`);

    switch (typeof (docVal)) {

      // STRINGS
      case "string":
        // quick way to check if this is actually a datestring
        let isDate = (new Date(docVal).getMonth());
        let useAsDate = isDate && (docKey !== 'createdAt' && docKey !== 'updatedAt');
        const strLen = docVal.length;

        // DATE STRING
        if (useAsDate) {
          return (
            <React.Fragment>
              <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>

              <DateTimePicker
                className="form-input date-time-picker"
                defaultValue={console.log(
                  `docval to string ${docVal.toString()} docKey ${docKey}
                  newPromiseDate ${newPromiseDate} newClientDate ${newOrderDate}`
                ) && `${docVal.toString()}`}
                value={
                  newOrderDate !== null && docKey === 'order_date'
                    ? newOrderDate
                    : newPromiseDate !== null && docKey === 'promise_date'
                      ? newPromiseDate
                      : '1973/09/20 08:04:20' //`${docVal}`
                }
                sx={{
                  width: 400,
                  color: 'success.main',
                  backgroundColor: 'white'
                }}
                onChange={
                  docKey === 'order_date'
                    ? setNewOrderDate
                    : setNewPromiseDate
                }

                renderInput={(params) => (
                  <React.Fragment>
                    <TextField
                      className="form-input"
                      {...params}
                      size="small"
                      sx={{
                        width: { sm: 270, md: 320 },
                        "& .MuiInputBase-root": {
                          height: 26,
                          fontSize: 14
                        }
                      }}
                    />
                    {/* <Box sx={{ mx: 2 }}> to </Box> */}
                  </React.Fragment>
                )}
              />
            </React.Fragment>
          )

        }
        else {
          // LONG STRING
          if (strLen > 40) {
            return (
              <>
                <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>
                <textarea
                  className="form-input form-textarea-input"
                  name={docKey}
                  id={`form-input-${docKey}`}
                  cols="30"
                  rows={Math.ceil(strLen / 30)}
                  defaultValue={docVal}>
                </textarea>
              </>
            )
          }
          // SHORT STRING
          else {
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
                  }
                  disabled={isDate ? true : false}
                />
              </>
            )
          }
        }

      // BOOLEAN
      case "boolean":
        return (
          <>
            <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>
            <input id={`form-input-${docKey}`} type="checkbox" className="form-input form-checkbox-input" name={docKey} defaultChecked={docVal} />
          </>
        )

      // OBJECTS
      case "object":

        // DATE OBJECT
        if (docVal instanceof Date) {
          return (
            <>
              <p>date object received</p>
            </>
          )
        }
        // NON-DATE OBJECT
        else {
          return (
            <>
              <label className="form-input-label"></label>
              {/* <p className="comment">{docKey}</p> */}
              {
                Object.entries(docVal).forEach(([key, val], index) => {
                  return (
                    <>
                      <label
                        key={`label-${key}-${index}`}
                        className="form-input-label"
                        htmlFor={`form-input-${docKey}-${key}`}>{key}</label>
                      <input
                        key={`input-${key}-${index}`}
                        id={`form-input-${docKey}-${key}`}
                        type="text"
                        className="form-input form-text-input"
                        name={key}
                        defaultValue={val} />
                    </>
                  )
                })
              }
            </>
          )
        }
    }
  }
  // END renderformField() FORM-FIELD TYPE SWITCH FUNCTION
  // 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺


  // 🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺
  // RETURN()
  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹

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
// END RETURN()
// 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹


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
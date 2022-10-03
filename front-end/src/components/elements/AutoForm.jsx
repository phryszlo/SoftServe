import React from 'react'
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers"
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
// import { Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AutoForm = ({ title, document, keys, route, id }) => {

  const [newOrderDate, setNewOrderDate] = React.useState(null);
  const [newPromiseDate, setNewPromiseDate] = React.useState(null);
  const [formVals, setFormVals] = React.useState({});
  const [updateNeeded, setUpdateNeeded] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);

  // const [fields, setFields] = React.useState([]);
  const formRef = React.useRef(null);

  const navigate = useNavigate();



  let fields = keys ? keys : {}

  React.useEffect(() => {
    console.log('autoform in effect')
    try {
      fields.forEach((field, index) => {
        if (excludeFields.indexOf(field) < 0) {
          setFormVals((oldVals) => (
            { ...oldVals, [field]: `unbeknownst-${index}` }
          ));
        }
      });
    }
    catch (err) {
      console.log(`useEffect erred: ${err}`);
    }
  }, [])


  // this seems a much hacky manner of forcing this update to work.
  React.useEffect(() => {
    if (!updateNeeded) return;
    console.log('updateNeeded in effect')
    try {
      fields.forEach((field, index) => {
        if (excludeFields.indexOf(field) < 0) {
          setFormVals((oldVals) => (
            {
              ...oldVals, [field]: `what-the-${index}`
            }
          ));
        }
      });

      Object.entries(formVals).forEach(([key, value], index) => {
        console.log(`UPDATE NEEDED formvals => ${key}:${value} [${index}]`)
      })

      // return;
      // THE PUT
      const putEdit =
        async () => {
          console.log(
            `putEdit
            formVals: ${JSON.stringify(formVals)}
            formVals-length: ${Object.keys(formVals).length}`
          );

          try {
            const body = {};
            Object.entries(formVals).forEach(([key, value], index) => {
              console.log(`nothing`);
              if (index > 0) {
                body[key] = value
              }
            });
            console.log(`body: ${JSON.stringify(body)}`)

            const fetchOpts = {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }
            console.log(`fetch route: /api/${route}/${id}`);
            // return;
            fetch(`/api/${route}/${id}`, fetchOpts)
              .then((res) => res.json())
              .then((data) => {
                console.log(`data from put projects/${id}: ${JSON.stringify(data)}`);
              })
            navigate(0);
          }
          catch (err) {
            console.log(`putEdit err: that was some sort of disaster. ${err}`);
          }
        }

      putEdit();


      setUpdateNeeded(false);

      Object.entries(formVals).forEach(([key, value], index) => {
        console.log(`af. useEff. formvals => ${key}:${value} [${index}]`)
      })
    }
    catch (err) {
      console.log(`useEffect erred: ${err}`);
    }

  }, [updateNeeded])

  // const fields =
  //   document ? Object.keys(document)
  //     : []

  const excludeFields = [
    '_id', 'id', '__v'
  ];


  const docId = id ? id : '';
  console.log(`doc'mentid = ${docId}`);
  console.log('doc=', document)
  console.log('fields=', fields)


  // form submission method learned from, e.g.,
  // https://codesandbox.io/s/form-state-es25p?file=/src/App.js
  const setFormVal = (key) => {
    console.log(`setFormVal hit, key = ${key}`);
    return ({ target: { value } }) => {
      console.log(`inside setFormVal value?? = ${value}`)
      setFormVals(currentVals => ({ ...currentVals, [key]: value }));
    }
  };


  //🤺 🤺 🤺 🤺 🤺 🤺 🤺 🤺
  const handleUpdateClick = async (e) => {
    e && e.preventDefault();
    // Navigate(0);

    // console.log(`update clicked ${e.currentTarget}`);

    // the awfulest possibly way. but i am stuck.
    // Object.entries(fields).forEach(([key, value], index) => {
    fields.forEach((obj) => {
      console.log(`field!!! ${Object.keys(obj)}`);
      switch (`${Object.keys(obj)}`) {
        case 'name':
          console.log(`>>> it's name e.target.name.value = ${e.target.name.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.name.value }));
          break;

        case 'email':
          console.log(`>>> it's name e.target.email.value = ${e.target.email.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.email.value }));
          break;

        case 'phone':
          console.log(`>>> it's name e.target.phone.value = ${e.target.phone.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.phone.value }));
          break;

        case 'image_url':
          console.log(`>>> it's name e.target.image_url.value = ${e.target.image_url.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.image_url.value }));
          break;

        case 'title':
          console.log(`>>> it's name e.target.title.value = ${e.target.title.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.title.value }));
          break;

        case 'order_date':
          console.log(`>>> it's name e.target.order_date.value = ${e.target.order_date.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.order_date.value }));
          break;

        case 'promise_date':
          console.log(`>>> it's name e.target.promise_date.value = ${e.target.promise_date.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.promise_date.value }));
          break;

        case 'completed':
          console.log(`completed allegedly found in fields`);
          console.log(`>>> it's name e.target.completed.value = ${e.target.completed ? e.target.completed.value : ''}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.completed.value }));
          break;

        case 'budget_number':
          console.log(`>>> it's name e.target.budget_number.value = ${e.target.budget_number.value}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.budget_number.value }));
          break;

        case 'description':
          console.log(`>>> it's name e.target.description.value = ${e.target.name.description}`);
          setFormVals(currentVals =>
            ({ ...currentVals, [Object.keys(obj)]: e.target.description.value }));
          break;

      }
    })

    // console.log(`formVals LENGTH = ${Object.values(formVals).length}`)
    // console.log(`formVals to JSON string: ${JSON.stringify(formVals)}`);
    // Object.entries(formVals).forEach(([key, value], index) => {
    //   console.log(`formVals A-GAIN ${key} = ${value}`)
    // })
    // Object.entries(formVals).forEach(([key, value], index) => {
    //   console.log(`why no formvals => ${key}:${value} [${index}]`)
    // })


    setUpdateNeeded(true);


  }

  // 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔺🔺🔺🔺
  const renderFormInput = (docKey, docVal, index) => {
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
            <div className="form-field" key={`field-${index}`}>

              <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>

              <DateTimePicker

                className="form-input date-time-picker"
                // defaultValue={console.log(
                //   `docval to string ${docVal.toString()} docKey ${docKey}
                //   newPromiseDate ${newPromiseDate} newClientDate ${newOrderDate}`
                // ) && `${docVal.toString()}`}
                value={
                  newOrderDate !== null && docKey === 'order_date'
                    ? newOrderDate
                    : newPromiseDate !== null && docKey === 'promise_date'
                      ? newPromiseDate
                      : `${docVal}`
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
                      name={
                        docKey === 'order_date'
                          ? 'order_date'
                          : docKey === 'promise_date'
                            ? 'promise_date'
                            : 'date'
                      }
                      onChange={setFormVal(docKey)}
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
            </div>
          )
        }

        else {
          // LONG STRING
          if (strLen > 30) {
            return (
              <div className="form-field" key={`field-${index}`}>

                <label className="form-input-label" htmlFor={`form-input-${docKey}`}>{docKey}</label>
                <textarea
                  onChange={setFormVal(docKey)}
                  className="form-input form-textarea-input"
                  name={docKey}
                  id={`form-input-${docKey}`}
                  cols="30"
                  rows={Math.ceil(strLen / 30)}
                  // value={formVals[docKey]
                  // Object.entries(formVals).find(([key, value], index) =>
                  //   key === docKey
                  // ) ?
                  //    {docKey} : 'oh no'
                  // }
                  defaultValue={docVal}
                >
                </textarea>
              </div>
            )
          }
          // SHORT STRING
          else {
            return (
              <div className="form-field" key={`field-${index}`}>

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
              </div>
            )
          }
        }

      // BOOLEAN
      case "boolean":
        return (
          <div className="form-field check-field" key={`field-${index}`}>

            <label className="form-input-label-chk" htmlFor={`form-input-${docKey}`}>
              <p>{docKey}</p>
              <input id={`form-input-${docKey}`} type="checkbox" className="form-input form-checkbox-input" name={docKey} defaultChecked={docVal} />
            </label>

          </div>
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
            <div className="form-field" key={`field-${index}`}>
              {/* <label className="form-input-label"></label>
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
              } */}
            </div>
          )
        }
    }
  }
  // END renderformField() FORM-FIELD TYPE SWITCH FUNCTION
  // 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺




  const updateModel = async (route, id) => {
    try {
      const settings = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: formRef.current.body
      };
      const res = await fetch(`/api/${route}/${id}`, settings);
      // console.log(`res: ${Object.entries((key, entry) => key === 'allProjects')}`);
      const data = await res.json()

      console.log(`data from /api/${route}/${id} = ${JSON.stringify(data)}`);

      return data;
    }
    catch (err) {
      console.log(`updateModel err: ${JSON.stringify(err)}`);
    }
  }

  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹
  // RETURN()
  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹

  return (
    <div className="component autoform-component">
      <h2 className="component-title">{title}</h2>

      {document ?
        <div className="auto-form-wrapper">
          <form
            action={`/api/${route}/${id}?_method=PUT`}
            onSubmit={handleUpdateClick}
            className="auto-form"
            ref={formRef}
            method="POST"
          >
            <div className="auto-form-inner-wrapper">
              <div className="auto-form-inner-inputs-wrapper">

                {Object.entries(document).map(([docKey, docVal], index) => {
                  return (
                    excludeFields.indexOf(docKey) < 0 ?
                      // <div className="form-field" key={`field-${index}`}>
                      // {
                      renderFormInput(docKey, docVal, index)
                      // }
                      // </div>
                      : ''
                  )
                })}
              </div>
              {/* <button
                className="update-button client-update-button"
                onClick={handleUpdateClick}
              >
                update
              </button> */}
              <input
                onSubmit={handleUpdateClick}
                className="update-button client-update-button"
                type="submit"
                value="update" />
            </div>
          </form>
        </div>

        :
        <h4>no data received</h4>
      }
    </div>
  )

}
// END RETURN()
// 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹


AutoForm.defaultProps = {
  title: `client form`,
  document: {
    title: 'THIS IS A DEMO FORM',
    subtitle: 'it will not update',
    isOverdue: true,
    date: '12:35:55',
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique minus velit accusantium sapiente ipsum minima maiores sit earum aliquid aliquam dolore eveniet autem alias quam consequatur distinctio, placeat fugit omnis?',
    image_url: 'http://thispersondoesnotexist.com/image',
    isNotOverdue: false
  }
}

export default AutoForm
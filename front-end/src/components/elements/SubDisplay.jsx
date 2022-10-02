import React from 'react'
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers"
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import logo from './logo192.png';

const SubDisplay = ({ title, document }) => {
  const [imgUrl, setImgUrl] = React.useState(null);

  const fields =
    document ? Object.keys(document)
      : []

  // console.log(`image_url = ${document && document.image_url}`);

  // 🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺
  React.useEffect(() => {
    setImgUrl(document ? document.image_url : '')
  }, []);

  const excludeFields = [
    '_id', 'id', '__v', 'image_url', 'updatedAt', 'createdAt'
  ];
  // console.log('doc=', document)
  // console.log('fields=', fields)



  // 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔺🔺🔺🔺
  const renderDisplayItem = (docKey, docVal, index, renderAs) => {
    switch (typeof (docVal)) {
      // STRINGS
      case "string":
        return (
          <>
            <span className="sub-display-label">{docKey}</span>
            {renderAs === 'p'
              ?
              <p key={`p-${index}`} className="sub-display-item">{docVal}</p>
              :
              <h6 key={`h6-${index}`} className="sub-display-item">{docVal}</h6>
            }

          </>
        )
    }
  }

  // 🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺🤺
  // RETURN()
  // 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹

  return (
    <div className="component autoform-component">
      <h2 className="component-title">{title}</h2>

      {document ?

        <div className="sub-display-details">
          <img
            src={imgUrl ? imgUrl : document.image_url ? document.image_url : logo}
            alt=""
            className="project-client-img" />
          <div className="sub-display-list">
            {Object.entries(document).map(([docKey, docVal], index) => {
              return (
                excludeFields.indexOf(docKey) < 0
                  ?
                    <div className="form-field" key={`field-${index}`}>
                      {
                        renderDisplayItem(docKey, docVal, index, "p")
                      }
                    </div>

                  : ''
              )
            })}
          </div>
        </div>

        : <h4>no data was sent</h4>

      }
    </div>
  )

}
// END RETURN()
// 🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹


SubDisplay.defaultProps = {
  title: `sub display`,
  document: {
    name: 'Madalyn Bode',
    email: 'Madalyn.Bode@gmail.com',
    phone: '(790) 291-1596',
    foo: false
  }
}

export default SubDisplay
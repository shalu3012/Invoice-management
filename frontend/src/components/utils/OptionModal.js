import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { PrintPage } from "./printPdf/print";
import axios from "axios"

export function OptionModal({ show,currentInvoice }) {
  const history=useHistory();
  console.log(currentInvoice)
  let companyInfo=JSON.parse(window.localStorage.getItem('companyInfo'))
  console.log(currentInvoice)
  console.log(companyInfo)
  if (show) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const [preview, setPreview] = useState(false);
  const togglePreview = () => {
    setPreview(!preview);
  };
  const deleteInvoice=(_id)=>{
    console.log(_id)
    axios.delete('http://localhost:5000/api/invoice/deleteInvoice',{params:{_id}})
    .then((res)=>{
      console.log(res)
      alert(res.data.message)
      history.push("/invoices")
    })
  }
console.log(preview)
  if (preview) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div className="dropdownBox">
      <div className="dropdown">
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={togglePreview}>
            <ReceiptOutlinedIcon className="dropdownIcons" />
            Preview
          </div>
          {preview ? (
            <div className="dropdownBox-lg">
              <div className="dropdownOverlay-lg"></div>
              <div className="dropdown-lg">
                <div className="dropdown-menu-lg">
                  <div className="dropdown-header">
                    <button type="button" className="btn-close-preview" onClick={togglePreview}>
                      +
                    </button>
                  </div>
                  <PrintPage/>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="dropdown-item" onClick={()=>deleteInvoice(currentInvoice._id)}>
            <DeleteIcon className="dropdownIcons" />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import ClientDetails from "./ClientDetails";
import ClientInvoices from "./ClientInvoices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom";

export default function SingleClient({ selectedClient }) {
  const history=useHistory();
  const [showContainer, setShowContainer] = useState("clientDetails");
  const [active, setActive] = useState("clientDetails");
  const [showModal, setShowModal] = useState(false);
  const [updateClientModal, setUpdateClientModal] = useState(false);
  const [message, setMessage] = useState("");
  const [client, setClient] = useState({
    _id: selectedClient._id,
    coName: selectedClient.coName,
    coWeb: selectedClient.coWeb,
    name: selectedClient.name,
    email: selectedClient.email,
    taxName: selectedClient.taxName,
    taxRate: selectedClient.taxRate,
    taxNo: selectedClient.taxNo,
    addressStreet: selectedClient.addressStreet,
    addressCountry: selectedClient.addressCountry,
    addressState: selectedClient.addressState,
    addressCity: selectedClient.addressCity,
    addressPostal: selectedClient.addressPostal,
  });
  console.log(client);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };
  const show = (show) => {
    if (showContainer === show) {
      return "";
    } else {
      setShowContainer(show);
      setActive(`${show}`);
    }
  };
  const updateClient = () => {
    const config = { headers: { "content-type": "application/json" } };
    if (selectedClient) {
      axios
        .post("http://localhost:5000/api/client/updateClient", client, config)
        .then((res) => {
          alert(res.data.message);
          toggleClientModal();
          toggleModal();
        });
    } else {
      setMessage("Please input all fields");
    }
  };

  const toggleModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  const toggleClientModal = () => {
    if (updateClientModal) {
      setUpdateClientModal(false);
    } else {
      setUpdateClientModal(true);
    }
  };
  console.log(showModal);
  const deleteClient=(_id)=>{
    console.log(_id)
    axios.delete('http://localhost:5000/api/client/deleteClient',{params:{_id:_id}})
    .then((res)=>{
      alert(res.data.message)
      window.location.reload()
    })
  }
  return (
    <div className="singleClientContainer">
      <div className="clientHeader">
        <div className="headerRow">
          <h1 className="clientName">{selectedClient.name}</h1>
          <div className="headerOptions">
            <div className="option" onClick={toggleModal}>
              <ArrowDropDownIcon />
              Options
            </div>
          </div>
          {showModal ? (
            <>
              <div onClick={toggleModal} className="dropdownOverlay"></div>
              <div className="dropdownBox">
                <div className="dropdown">
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={toggleClientModal}>
                      <EditIcon className="dropdownIcons" />
                      Edit
                    </div>
                    <div className="dropdown-item" onClick={()=>deleteClient(selectedClient._id)}>
                      <DeleteOutlineOutlinedIcon className="dropdownIcons" />
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {updateClientModal && (
            <div className="modal">
              <div onClick={toggleClientModal} className="overlay"></div>
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Update Client</p>
                  {message !== "" ? (
                    <ErrorMessage
                      styles={{
                        margin: "8px 0px 0px 80px",
                        padding: " 2px 30px",
                        fontSize: "17px",
                      }}
                    >
                      {message}
                    </ErrorMessage>
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    className="btn-close-modal"
                    onClick={toggleClientModal}
                  >
                    +
                  </button>
                </div>
                <div className="modal-body">
                  <div className="main_container">
                    <form className="basicForm">
                      <label htmlFor="companyInfo" className="form-label-2">
                        Company Information
                      </label>
                      <div className="coInfo">
                        <div className="form-field">
                          <label htmlFor="coName" className="form-label-2">
                            Comapny Name
                          </label>
                          <input
                            type="text"
                            id="coName"
                            name="coName"
                            className="form-inp"
                            value={client.coName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="website" className="form-label-2">
                            Website
                          </label>
                          <input
                            type="url"
                            id="coWeb"
                            name="coWeb"
                            className="form-inp"
                            value={client.coWeb}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inline-form-field">
                          <div className="form-field-2">
                            <label htmlFor="name" className="form-label-2">
                              Contact Name
                            </label>
                            <input
                              type="text"
                              id="contactName"
                              name="name"
                              className="form-inp"
                              value={client.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-field-2">
                            <label htmlFor="email" className="form-label-2">
                              Contact Email
                            </label>
                            <input
                              type="email"
                              id="contactEmail"
                              name="email"
                              className="form-inp"
                              value={client.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <label htmlFor="taxInfo" className="form-label-2">
                        Taxes Information
                      </label>
                      <div className="taxInfo">
                        <div className="inline-form-field">
                          <div className="form-field-2">
                            <label htmlFor="taxName" className="form-label-2">
                              Tax Name
                            </label>
                            <input
                              type="text"
                              id="taxName"
                              name="taxName"
                              className="form-inp"
                              placeholder="VAT(default)"
                              value={client.taxName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-field-2">
                            <label htmlFor="taxRate" className="form-label-2">
                              Tax Rate
                            </label>
                            <input
                              type="number"
                              id="taxRate"
                              name="taxRate"
                              className="form-inp"
                              value={client.taxRate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-field">
                          <label htmlFor="taxNo" className="form-label-2">
                            Tax Number
                          </label>
                          <input
                            type="number"
                            id="taxNo"
                            name="taxNo"
                            className="form-inp"
                            value={client.taxNo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <label htmlFor="address" className="form-label-2">
                        Address
                      </label>
                      <div className="address">
                        <div className="form-field">
                          <label htmlFor="street" className="form-label-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="street"
                            name="addressStreet"
                            className="form-inp"
                            value={client.addressStreet}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inline-form-field">
                          <div className="form-field-2">
                            <label htmlFor="country" className="form-label-2">
                              Country &nbsp; &nbsp;
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="addressCountry"
                              className="form-inp"
                              value={client.addressCountry}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-field-2">
                            <label htmlFor="taxRate" className="form-label-2">
                              State &nbsp; &nbsp; &nbsp;
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="addressState"
                              className="form-inp"
                              value={client.addressState}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="inline-form-field">
                          <div className="form-field-2">
                            <label htmlFor="city" className="form-label-2">
                              City &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="addressCity"
                              className="form-inp"
                              value={client.addressCity}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-field-2">
                            <label htmlFor="taxRate" className="form-label-2">
                              Postal Code
                            </label>
                            <input
                              type="number"
                              id="postal"
                              name="addressPostal"
                              className="form-inp"
                              value={client.addressPostal}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="btn-md" onClick={updateClient}>
                    Save changes
                  </div>
                  <div
                    className="btn-md transparent"
                    onClick={toggleClientModal}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="containerOptions">
          <div
            className={
              active === "clientDetails"
                ? "clientDetails active"
                : "clientDetails"
            }
            onClick={() => {
              show("clientDetails");
            }}
          >
            Details
          </div>
          <div
            className={
              active === "clientInvoice"
                ? "clientInvoice active"
                : "clientInvoice"
            }
            onClick={() => {
              show("clientInvoice");
            }}
          >
            Invoices
          </div>
        </div>
      </div>
      <div className="subContainer">
        {showContainer === "clientDetails" ? (
          <ClientDetails selectedClient={selectedClient} />
        ) : (
          <ClientInvoices selectedClient={selectedClient} />
        )}
      </div>
    </div>
  );
}

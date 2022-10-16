import React from "react";
import Header from "./Header";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CompanyInfo({
  signUpuser,
  setCompanyInfo,
  loginUser
}) {
  const loggedIn=window.localStorage.getItem('loggedIn')
  const history = useHistory();
  const user_id = signUpuser._id ? signUpuser._id : loginUser._id;
  const [coInfo, setCoInfo] = useState({
    coName: "",
    coWeb: "",
    taxName: "",
    taxRate: "",
    taxNo: "",
    addressStreet: "",
    addressCountry: "",
    addressState: "",
    addressCity: "",
    addressPostal: "",
    user_id: user_id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoInfo({
      ...coInfo,
      [name]: value,
    });
  };
  const companyInfo = async () => {
    const config = { headers: { "content-type": "application/json" } };
    const {
      coName,
      coWeb,
      taxName,
      taxRate,
      taxNo,
      addressStreet,
      addressCountry,
      addressState,
      addressCity,
      addressPostal,
      user_id,
    } = coInfo;
    if (
      coName &&
      coWeb &&
      taxName &&
      taxRate &&
      taxNo &&
      addressStreet &&
      addressCountry &&
      addressState &&
      addressCity &&
      addressPostal &&
      user_id
    ) {
      axios
        .post("http://localhost:5000/api/coInfo", coInfo, config)
        .then((res) => {
          alert(res.data.message);
          if (res.data.coInfo !== undefined || null) {
            setCompanyInfo(res.data.coInfo);
            window.localStorage.setItem(
              "companyInfo",
              JSON.stringify(res.data.coInfo)
            );
            history.push("/dashboard");
          }
        });
    } else {
      alert(" not registererd");
    }
  };
  return (
    <div>
      <Header />
      <div className="main_container">
        <div className="coInfoContainer">
          <span className="setUp">Let's get you setup !</span>
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
                  value={coInfo.coName}
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
                  value={coInfo.coWeb}
                  onChange={handleChange}
                />
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
                    value={coInfo.taxName}
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
                    value={coInfo.taxRate}
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
                  value={coInfo.taxNo}
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
                  value={coInfo.addressStreet}
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
                    value={coInfo.addressCountry}
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
                    value={coInfo.addressState}
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
                    value={coInfo.addressCity}
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
                    value={coInfo.addressPostal}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn" onClick={companyInfo}>
              Update
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

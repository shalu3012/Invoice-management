
import React from "react";
import { useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useHistory } from "react-router-dom";

export default function Header() {
  const user=JSON.parse(window.localStorage.getItem('user'));
  const companyInfo=JSON.parse(window.localStorage.getItem('companyInfo'));
  // const coInfo=window.localStorage.getItem('coInfo');
  const history=useHistory();
  const logout=()=>{
    window.localStorage.removeItem('IsloggedIn');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('companyInfo');
    window.localStorage.removeItem('clients');
    window.localStorage.removeItem('currentProduct');
    history.push('/')
    window.location.reload(true)
    alert('loggedOut');

  }
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div>
      <nav>
        <div className="header">
          <div className="head">
            <i id="logo" className="fa-solid fa-book"></i>
            <h1 className="coloured">Your</h1>
            <h1>BillBook</h1>
          </div>
          <div className="profile" onClick={toggleModal}>
           <div className="user"> {user.firstname[0].toUpperCase()}</div>
          </div>
          {modal && (
            <div className="dropdownBox">
              <div onClick={toggleModal} className="dropdownOverlay"></div>
              <div className="dropdown">
                <div className="dropdown-menu">
                  {companyInfo&&companyInfo._id?<div className="dropdown-item" onClick={()=>{history.push('/profile')}}>
                      <PermIdentityOutlinedIcon className="dropdownIcons" />
                      Profile
                    </div>:''}
                    <div className="dropdown-item" onClick={logout}>
                      <LogoutOutlinedIcon className="dropdownIcons" />
                      Logout
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

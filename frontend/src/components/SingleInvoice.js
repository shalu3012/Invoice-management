import React from "react";
import DatePicker from "./utils/DatePicker";
import Products from "./Products";
import axios from "axios";
import moment from "moment";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded';
import {OptionModal} from "./utils/OptionModal";
import {withRouter} from 'react-router-dom';

class SingleInvoice extends React.Component {
  constructor(props){
    super(props);
   this.state = {
    show:false,
      products: [],
      invoiceNo:this.props.invoiceNo||JSON.parse(localStorage.getItem('currentInvoice')).invoiceNo,
      status: "",
      invoiceDate:this.props.invoiceDate|| moment(JSON.parse(localStorage.getItem('currentInvoice')).invoiceDate).format(),
      dueDate: "",
      paidDate: "",
      user_id: "",
      company_id: "",
      client_id: "",
      _id:'',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

 toggleModal = () => {
  let show=this.state.show===true?false:true
    this.setState(prevState=>prevState.show=show);
    console.log(show)
  };
  addCurrentProducts() {
    let currentInvoice = JSON.parse(
      window.localStorage.getItem("currentInvoice")
    );
    if (currentInvoice) {
      var currentProducts = currentInvoice.product;
      currentProducts.map((item, index) => {
        this.setState((prevState) => ({
          products: [
            ...prevState.products,
            {
              item: item.item,
              qty: item.qty,
              price: item.price,
              discount: item.discount,
              desc: item.desc,
              unit: item.unit,
              subtotal: item.subtotal,
              total: item.total,
              _id:item._id
            },
          ],
        }));
      });
      this.setState((prevState) => ({
        ...prevState,
        invoiceNo: currentInvoice.invoiceNo,
        status: currentInvoice.status,
        invoiceDate: currentInvoice.invoiceDate,
        dueDate: currentInvoice.dueDate,
        paidDate: currentInvoice.paidDate,
        user_id: currentInvoice.user_id,
        company_id: currentInvoice.company_id,
        client_id: currentInvoice.client_id,
        _id:currentInvoice._id
      }));
    }
  }
  componentDidMount() {
    this.addCurrentProducts();
    console.log(this.props)
  }
  handleChange = (e) => {
    if (
      ["item", "qty", "price", "discount", "desc", "unit","subtotal","total"].includes(
        e.target.name
      )
    ) {
      let products = [...this.state.products];
      products[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  clicked = (e, name) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addNewRow = () => {
    this.setState((prevState) => ({
      products: [
        ...prevState.products,
        {
          index: "",
          item: "",
          qty: "",
          price: "",
          discount: "",
          desc: "",
          unit: "",
          subtotal:'',
          total:''
        },
      ],
    }));
  };

  deteteRow = (index) => {
    this.setState({
      products: this.state.products.filter((s, sindex) => index !== sindex),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var client_id;
    let selectedClient=this.props.selectedClient;
    console.log(selectedClient)
    if(selectedClient)client_id=selectedClient._id
    let currentInvoice= JSON.parse(window.localStorage.getItem("currentInvoice"))
    if(currentInvoice){
    var _id=currentInvoice?currentInvoice._id:''
    var clientInfo=currentInvoice.clientInfo[0];
    client_id= clientInfo._id?clientInfo._id:client_id
    }
    let data = {
      formData: this.state,
      user_id: JSON.parse(window.localStorage.getItem("user"))._id,
      company_id: JSON.parse(window.localStorage.getItem("companyInfo"))._id,
      client_id:client_id,
      _id:_id
    };
console.log(data)
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
      if(data._id&&this.state.products){
        axios
        .post("http://localhost:5000/api/invoice/updateInvoice", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message)
            this.props.history.push('/invoices')
          }
        })
        .catch((error) => {
          if (error) {
            alert("Bad Request");
            console.log(error);
          }
        });
      }
      else{
        axios
      .post("http://localhost:5000/api/invoice", data)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        if (error) {
          alert("Bad Request");
          console.log(error);
        }
      });
      }
  };
  clickOnDelete(record) {
    console.log(record)
    this.setState({
      products: this.state.products.filter((r) => r !== record),
    });
    axios.delete('http://localhost:5000/api/invoice/deleteProduct',{params:{_id:record._id}})
    .then((res)=>{
      alert(res.data.message)
    })
  }
  render() {
    let currentInvoice = JSON.parse(
      window.localStorage.getItem("currentInvoice")
    );
    let companyInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
    let user = JSON.parse(window.localStorage.getItem("user"));
    let selectedClient = this.props.selectedClient;
    console.log(selectedClient)
    if (currentInvoice) {
      var clientInfo = currentInvoice.clientInfo[0];
      selectedClient = clientInfo || selectedClient;
    }
    let { products } = this.state;
    const datepickerStyle = {
      cursor: "pointer",
      background: "none",
      border: "1px solid #277bc0",
      padding: "7px 0px",
      textAlign: "center",
      color: " white",
      borderRadius: "15px",
      fontSize: "19px",
      width: "166px",
      marginLeft: "80px",
    };
    return (
      <>
        <div className="mainInvoiceContainer">
          <div className="invoiceNo">
            <div className="invoiceNo">
              Invoice# 00000
              {currentInvoice ? currentInvoice.invoiceNo : this.props.invoiceNo}
            </div>
          </div>
          <div className="traders">
            <div className="payer">
              <span className="invoiceSpan">Invoice to :</span>
              <h3 className="invoiceName">{selectedClient.name}</h3>
              <p className="clientAddress">
                {`${selectedClient.addressStreet}, ${selectedClient.addressCity}, ${selectedClient.addressState}, ${selectedClient.addressPostal}, ${selectedClient.addressCountry}`}
              </p>
              <hr />
              <p>{selectedClient.name}</p>
              <p id="clientEmail">{selectedClient.email}</p>
            </div>
            <div className="payee">
              <span className="invoiceSpan">Pay To :</span>
              <h3 className="invoiceName">{companyInfo.coName}</h3>
              <p>
                {`${companyInfo.addressStreet}, ${companyInfo.addressCity}, ${companyInfo.addressState}, ${companyInfo.addressPostal}, ${companyInfo.addressCountry}`}
              </p>
              <p>{`${companyInfo.taxName} #${companyInfo.taxNo}`}</p>
              <hr />
              <p>{`${user.firstname} ${user.lastname}`}</p>
              <p id="userEmail">{user.email}</p>
            </div>
          </div>
          <form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            id="invoiveForm"
          >
            <div className="invoiceInfo">
              <div className="invoiceDetails">

      <div>
        <div className="options">
          <div className="option" onClick={this.toggleModal}>
            <ArrowDropDownIcon />
            Options
          </div>
          {this.state.show? 
            (<><div onClick={this.toggleModal}  className="dropdownOverlay"></div>
           <OptionModal show={this.state.show} currentInvoice={currentInvoice}/></>)
        :''}
         
          <div className="save">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
                <div className="row">
                  <div className="label">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                  </div>
                  <select
                    name="status"
                    id="status"
                    // value={currentInvoice ? currentInvoice.status : ""}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Paid">Paid</option>
                    <option value="Sent">Sent</option>
                  </select>
                  <div className="label">
                    <label htmlFor="invoiceDate" className="form-label">
                      Invoice Date
                    </label>
                  </div>
                  <div className="dateBox">
                    <input
                      type="text"
                      id="invoiceDate"
                      value={
                        moment(this.props.invoiceDate).format("MMM ,D y") ||
                        moment(currentInvoice.invoiceDate).format("MMM ,D y")
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="label">
                    <label htmlFor="dueDate" className="form-label">
                      Due Date
                    </label>
                  </div>
                  <div
                    className="dateBox"
                    onInput={(e) => this.clicked(e, "dueDate")}
                  >
                    <DatePicker
                      style={datepickerStyle}
                      name={"dueDate"}
                      value={
                        new Date(currentInvoice ? currentInvoice.dueDate : "")
                      }
                    />
                  </div>
                  <div className="label">
                    <label htmlFor="paidDate" className="form-label">
                      Paid Date
                    </label>
                  </div>
                  <div
                    className="dateBox"
                    onInput={(e) => this.clicked(e, "paidDate")}
                  >
                    <DatePicker
                      style={datepickerStyle}
                      name={"paidDate"}
                      value={
                        new Date(currentInvoice ? currentInvoice.paidDate : "")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="addNew-btn" onClick={this.addNewRow}>
              + Add new item
            </div>
            <div className="itemsContiner">
              <Products
                add={this.addNewRow}
                delete={this.clickOnDelete.bind(this)}
                products={products}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default  withRouter(SingleInvoice);

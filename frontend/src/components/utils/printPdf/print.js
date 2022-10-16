import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { createPdfFromHtml } from "./logic";
import moment from "moment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Global = createGlobalStyle`
  /* paper.css */
  https://github.com/cognitom/paper-css

  /* @page { margin: 0 } */
  #print {
    margin: 0;
    font-family: "IPAexGothic", sans-serif;
  }
  .sheet {
    color:black;
    margin: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    page-break-after: always;
  }
  
  
  /** Paper sizes **/
  #print.A3               .sheet { width: 297mm; height: 419mm }
  #print.A3.landscape     .sheet { width: 420mm; height: 296mm }
  #print.A4               .sheet { width: 238mm; height: 296mm }
  #print.A4.landscape     .sheet { width: 297mm; height: 209mm }
  #print.A5               .sheet { width: 148mm; height: 209mm }
  #print.A5.landscape     .sheet { width: 210mm; height: 147mm }
  #print.letter           .sheet { width: 216mm; height: 279mm }
  #print.letter.landscape .sheet { width: 280mm; height: 215mm }
  #print.legal            .sheet { width: 216mm; height: 356mm }
  #print.legal.landscape  .sheet { width: 357mm; height: 215mm }
  

  .sheet.padding-10mm { padding: 10mm }
  .sheet.padding-15mm { padding: 15mm }
  .sheet.padding-20mm { padding: 20mm }
  .sheet.padding-25mm { padding: 25mm }
  
  @media screen {
    body {
      background: rgb(90 88 88);
      height: 100%;
    }
    .sheet {
      background: #FFFFFF;
      margin: 5mm auto;
      padding: 5mm 0;
    }
  }
  
  @media print {
    #print.A3.landscape            { width: 420mm }
    #print.A3, #print.A4.landscape { width: 297mm }
    #print.A4, #print.A5.landscape { width: 210mm }
    #print.A5                      { width: 148mm }
    #print.letter, #print.legal    { width: 216mm }
    #print.letter.landscape        { width: 280mm }
    #print.legal.landscape         { width: 357mm }
  }
`;

export class PrintPage extends React.Component {
  printContent;
  render() {
    return (
      <>
        <Global />
        <div className="btn-md-download" onClick={this.handleClick}>
          <ArrowDownwardIcon className="downloadIcon" fontSize="small" />
          Download
        </div>
        <div id="print" className="A4">
          <Sheet />
          <div style={{ position: "fixed", top: "200vh" }}>
            <div
              ref={(el) => {
                this.printContent = el;
              }}
            >
              <Sheet />
            </div>
          </div>
        </div>
      </>
    );
  }

  handleClick = () => {
    createPdfFromHtml(this.printContent);
  };
}
const Sheet = () => {
  let currentInvoice = JSON.parse(
    window.localStorage.getItem("currentInvoice")
  );
  let user = JSON.parse(window.localStorage.getItem("user"));
  let companyInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
  let [total, setTotal] = useState(0);

  useEffect(() => {
    currentInvoice.product.map((item, index) => {
      let temp = item.price * item.qty - item.discount;
      setTotal(total => total + temp);
    });
  }, []);

  return (
    <div className="sheet padding-10mm">
      <div className="downloadContainer">
        <div className="basicDetails">
          <p>{`#IN0000${currentInvoice.invoiceNo}`}</p>
          <p>{moment(currentInvoice.invoiceDate).format("MMM ,D y")}</p>
        </div>
        <div className="partiesDetails">
          <div className="invoiceTo">
            <h1 id="invoiceToHeading">Invoice To:</h1>
            <p>{currentInvoice.clientInfo[0].name}</p>
            <p>{`${currentInvoice.clientInfo[0].addressStreet},${currentInvoice.clientInfo[0].addressCity}`}</p>
            <p>{currentInvoice.clientInfo[0].addressState}</p>
            <p>{currentInvoice.clientInfo[0].addressCountry}</p>
            <span>{currentInvoice.clientInfo[0].name}</span>
            <br />
            <span className="email">{currentInvoice.clientInfo[0].email}</span>
          </div>
          <div className="payTo">
            <h1>Pay To:</h1>
            <p>{companyInfo.coName}</p>
            <p>{`${companyInfo.addressStreet},${companyInfo.addressCity}`}</p>
            <p>{companyInfo.addressState}</p>
            <p>{companyInfo.addressCountry}</p>
            <span>{companyInfo.coName}</span>
            <br />
            <span id="email">{user.email}</span>
          </div>
        </div>
        <div className="products-table">
          <div className="table-items">
            <p className="item-box">
              <strong>Item</strong>
            </p>
            <p className="desc-box">
              <strong>Description</strong>
            </p>
            <p className="qty-box">
              <strong>Quantity</strong>
            </p>
            <p className="price-box">
              <strong>Price</strong>
            </p>
            <p className="discount-box">
              <strong>Discount</strong>
            </p>
            <p className="total-box">
              <strong>Total</strong>
            </p>
          </div>
          {currentInvoice.product.map((item, index) => (
            <div className="table-items" key={index}>
              <p className="item-box">{item.item}</p>
              <p className="desc-box">{item.desc}</p>
              <p className="qty-box">{item.qty}</p>
              <p className="price-box">{item.price}</p>
              <p className="discount-box">{item.discount}</p>
              <p className="total-box">
                {item.price * item.qty - item.discount}<br/>
              </p>
            </div>
          ))}
          <div className="totalBox">
            <div className="totalHeadings">
            <h1>Subtotal :</h1>
            <h1>{`${companyInfo.taxName}-${companyInfo.taxRate}%`} :</h1>
            <h1 style={{background:"orange"}}>GrandTotal :</h1>
            </div>
           <div className="totalContent">
            <p>{total}</p>
            <p>{(total-total*(companyInfo.taxRate/100)).toFixed(2)}</p>
            <p style={{background:"orange"}}>{total-(total-total*(companyInfo.taxRate/100)).toFixed(2)}</p>
           </div>
            </div>
          </div>
        </div>
      </div>
  );
};

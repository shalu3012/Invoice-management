import React from 'react'
// import Client from './Client'
// import Invoices from './Invoices'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function MainDashboard({signUpuser,loginUser}) {
  const user_id = signUpuser._id
    ? signUpuser._id
    : loginUser._id || JSON.parse(window.localStorage.getItem("user"))._id
  const [clients,setClients]=useState([]);
  const [invoices,setInvoices]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respclients = await axios("http://localhost:5000/api/client/getAllClients",{params: { user_id: user_id }});
      const respinvoices = await axios("http://localhost:5000/api/invoice/getAllInvoicesWithClientInfo");
      respclients.data.map((client,index)=>{
        if(client.user_id===user_id){
          setClients(clients=>[...clients,client])
        }
      })
      if (respinvoices.data.length>0) {
        respinvoices.data.map((item,index)=>{
          if(item.user_id===user_id){
            setInvoices(invoices=>[...invoices,item])
          }
        })
      }
    };
    fetchData()
  }, []);
  window.localStorage.setItem('clients',JSON.stringify(clients))
   if(clients.length>5){
    setClients(clients.slice(-5))
   }
  return (
    <>
    <div className='heading'><p>Dashboard</p></div>
    <div className='MainDashboard'>
    <div className='clients'>
            <p className='clientHeading'>Recent Clients<span><Link to='/clients' className='viewAll'>View all</Link></span></p>
            <div className="clientContainer">
          <div className="content-Box">
            <p className="name-box">
              <strong>Name</strong>
            </p>
            <p className="tax-box">
              <strong>Tax</strong>
            </p>
            <p className="invoice-box">
              <strong>Invoices</strong>
            </p>
          </div>
          {clients.map((client)=><div className="content-Box" key={client._id}>
            <p className="name-box">
              {client.name}
            </p>
            <p className="tax-box">
              {client.taxName}
            </p>
            <p className="invoice-box">
              {client.invoices.length}
            </p>
          </div>)}
          </div>
    </div>
      <div className="invoices">
      <p className="invoiceHeading">Invoices <span><Link to='/invoices' className='viewAll'>View all</Link></span></p>
      <div className="invoiceContainer">
        <div className="content-Box">
        <p className="invoiceNo-box">
              <strong>#Invoice</strong>
            </p>
            <p className="date-box">
              <strong>Date</strong>
            </p>
            <p className="client-name">
              <strong>Client Name</strong>
            </p>
            <p className="status">
              <strong>Status</strong>
            </p>
        </div>
        {invoices!==null||undefined?
        invoices.map((invoice,index)=>
          (
          <div className="content-Box" key={invoice._id}>
          <p className="invoiceNo-box">
                {invoice.invoiceNo}
              </p>
              <p className="date-box">
              { moment(invoice.invoiceDate).format("MMM ,D y")}
              </p>
              <p className="client-name">
                {invoice.clientInfo[0].name}
              </p>
              <p className="status">
                {invoice.status}
              </p>
          </div>
          )
        ):''}
      </div>
    </div>
    </div>
    </>
  )
}

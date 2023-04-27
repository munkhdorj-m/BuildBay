import React from "react";
import "./UserProfile.css";
import { user } from "../data";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import styled from "styled-components";

const Container = styled.div``;

const UserProfile = () => {
  return (
    <Container>
      <Navbar />

      <div className="user-profile">
        <div className="user-profile-header">
          <h2 className="user-profile-name">{user.name}</h2>
          <p className="user-profile-email">{user.email}</p>
        </div>
        <div className="user-profile-details">
          <div className="user-profile-details-section">
            <h3 className="user-profile-section-title">Contact Information</h3>
            <div className="user-profile-details-row">
              <p className="user-profile-details-label">Phone:</p>
              <p className="user-profile-details-value">{user.phone}</p>
            </div>
            <div className="user-profile-details-row">
              <p className="user-profile-details-label">Address:</p>
              <p className="user-profile-details-value">{user.address}</p>
            </div>
          </div>
          <div className="user-profile-details-section">
            <h3 className="user-profile-section-title">Order History</h3>
            <table className="user-profile-order-history-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {user.orderHistory.map((order) => (
                  <tr key={order.orderNumber}>
                    <td>{order.orderNumber}</td>
                    <td>{order.date}</td>
                    <td>{order.amount}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;

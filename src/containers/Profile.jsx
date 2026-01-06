import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Account</h1>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <span>MA</span>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Name:</strong>Maciel Alvarez</p>
              <p><strong>Email:</strong> Hello@MacielAlvarez.com</p>
              <p><strong>Member Since:</strong> January 2026</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Messages & Notifications</h2>
          <div className="settings-list messages-list">
            <div className="setting-item">
              <span>Inbox</span>
              <button className="settings-button">View</button>
            </div>
            <div className="setting-item">
              <span>Notifications</span>
              <button className="settings-button">Manage</button>
            </div>
            <div className="setting-item">
              <span>Order Updates</span>
              <button className="settings-button">View</button>
            </div>
            <div className="setting-item">
              <span>Promotions</span>
              <button className="settings-button">Manage</button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Order Summary</h2>
          <div className="order-stats">
            <div className="stat-card">
              <div className="stat-number">{cart.totalItems}</div>
              <div className="stat-label">Items in Cart</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">${cart.totalPrice.toFixed(2)}</div>
              <div className="stat-label">Cart Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Account Settings</h2>
          <div className="settings-list">
            <div className="setting-item">
              <span>Edit Profile</span>
              <button className="settings-button">Edit</button>
            </div>
            <div className="setting-item">
              <span>Change Password</span>
              <button className="settings-button">Change</button>
            </div>
            <div className="setting-item">
              <span>Payment Methods</span>
              <button className="settings-button">Manage</button>
            </div>
            <div className="setting-item">
              <span>Shipping Addresses</span>
              <button className="settings-button">Manage</button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Orders & Support</h2>
          <div className="settings-list">
            <div className="setting-item">
              <span>Manage Orders</span>
              <button className="settings-button">View</button>
            </div>
            <div className="setting-item">
              <span>Order History</span>
              <button className="settings-button">View</button>
            </div>
            <div className="setting-item">
              <span>Contact Support</span>
              <button className="settings-button">Contact</button>
            </div>
            <div className="setting-item">
              <span>Help Center</span>
              <button className="settings-button">Visit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


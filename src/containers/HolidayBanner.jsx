import React from 'react';
import './HolidayBanner.css';

const HolidayBanner = () => {
  const bannerContent = (
    <>
      <span className="holiday-text">
        <strong>Holiday Sale!</strong> Get 15% OFF on select items including Electronics & Jewelry. Limited time offer!
      </span>

    </>
  );

  return (
    <div className="holiday-banner">
      <div className="holiday-banner-wrapper">
        <div className="holiday-banner-content">
          {bannerContent}
        </div>
        <div className="holiday-banner-content">
          {bannerContent}
        </div>
      </div>
    </div>
  );
};

export default HolidayBanner;


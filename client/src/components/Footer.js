import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer">
      Rebel &copy; { (new Date()).getFullYear() }
    </div>
  );
};

export default Footer;
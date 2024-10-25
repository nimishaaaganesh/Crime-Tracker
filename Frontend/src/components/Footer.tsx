import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-black text-white py-6 fixed bottom-0 left-0 w-full h-22 z-10"
      
    >
      <div className="container mx-auto text-center">
        <p className="mb-1">&copy; 2024 Criminal Report Management System. All Rights Reserved.</p>
        <p className="mb-1">
          <a href="/terms" className="text-yellow-400 hover:text-yellow-300">Terms of Service</a> | 
          <a href="/privacy" className="text-yellow-400 hover:text-yellow-300 ml-2">Privacy Policy</a>
        </p>
        <p>
          <a href="mailto:support@crms.com" className="text-yellow-400 hover:text-yellow-300">Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

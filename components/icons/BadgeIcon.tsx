
import React from 'react';

const BadgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 21l-8-4.5V6L12 3l8 3v10.5z"/>
    <path d="M12 21V12"/>
    <path d="M20 10.5l-8-4.5"/>
    <path d="M4 10.5l8-4.5"/>
    <path d="M12 3v9"/>
    <path d="m16.5 8.4-4.5 2.6-4.5-2.6"/>
  </svg>
);

export default BadgeIcon;


import React from 'react';

const HeatwaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 4v2"/>
    <path d="m16.2 7.8 1.4-1.4"/>
    <path d="M20 12h2"/>
    <path d="m16.2 16.2 1.4 1.4"/>
    <path d="M12 20v2"/>
    <path d="m7.8 16.2-1.4 1.4"/>
    <path d="M4 12h2"/>
    <path d="m7.8 7.8-1.4-1.4"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

export default HeatwaveIcon;

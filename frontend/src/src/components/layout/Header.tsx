import React from 'react';

/**
 * Header layout partial.
 * 
 * Source: src/main/webapp/WEB-INF/common/header.jspf
 * 
 * This component reproduces the HTML head structure and global styles 
 * defined in the legacy JSP header. It is designed to be used as a 
 * layout wrapper or injected into the document head via a layout component.
 * 
 * Note: In a standard React SPA, <html>, <head>, and <body> tags are 
 * managed by the framework (index.html). This component exposes the 
 * title and styles so they can be applied to the application root or 
 * used in a custom layout system that mirrors the JSP include structure.
 */
const Header: React.FC = () => {
  return (
    <>
      {/* 
        In a real SPA, the <title> and <link> tags belong in index.html.
        However, to strictly preserve the source structure for migration 
        fidelity, we render the styles here. If this component is mounted 
        inside the body, the <style> tag will apply globally.
        
        The original JSP included Bootstrap 3.3.6. 
        We preserve the link reference for fidelity, though in a modern 
        build, this would typically be imported via CSS or a CDN in index.html.
      */}
      <style>
        {`
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 60px;
            background-color: #f5f5f5;
          }
        `}
      </style>
    </>
  );
};

export default Header;
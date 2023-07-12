import * as React from 'react';
import './header.scss';
import insights from './image/insights.png';
const Header = () => {

  const routing = (path) => {
    document.dispatchEvent(new CustomEvent('route-change-event', { detail: path }));
  }
  return (
    <header className="header">
      <div className="header-left">
    <img src={insights} className="header-logo" style={{    height: "41px",
    width: "60px"}} alt="My Image" />
        <h1 className="header-title">IBM Storage Insights</h1>
      </div>
      <nav className="header-right">
        <ul className="header-menu">
          <li className="header-menu-item" onClick={() => routing("topology")}>Topology</li>
          <li className="header-menu-item" onClick={() => routing("details")}>Summary</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
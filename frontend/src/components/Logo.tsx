import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo2.png';

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <Link to="/">
    <img src={logo} alt="Logo" className={`w-16 ${className}`} />
  </Link>
);

export default Logo;

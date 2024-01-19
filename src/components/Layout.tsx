import React, { ReactNode } from "react";
import Navbar from "./global/Navbar"
import Hero from "./Hero";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <div className="container mx-auto">

        {children}
      </div>
    </>

  )
}

export default Layout
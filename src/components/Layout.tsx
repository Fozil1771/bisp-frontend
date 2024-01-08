import React, { ReactNode } from "react";
import Navbar from "./global/Navbar"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Navbar />
      <div className="container mx-auto">

        {children}
      </div>
    </>

  )
}

export default Layout
import { Link } from "react-router-dom"
import Main from "../../components/Main"
import Footer from "../../components/global/Footer"
import Navbar from "../../components/global/Navbar"

const HomePage = () => {
  return (
    <>
      <div className="bg-bluegray-900 text-gray-500 p-3 flex justify-content-between lg:justify-content-center justify-center align-items-center flex-wrap text-center">
        <div className="font-bold mr-8">🔥 Hot Deals!</div>
        <div className="align-items-center hidden lg:flex">
          <span className="line-height-3"></span>
        </div>
        <a className="flex align-items-center ml-2 mr-8">
          <Link to={"/"} className="underline font-bold">Learn More</Link>
        </a>
        <a className="flex align-items-center no-underline justify-content-center border-circle text-100 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150" style={{ width: '2rem', height: '2rem' }}>
          <i className="pi pi-times"></i>
        </a>
      </div>
      <Navbar />
      <Main />
      <Footer />
    </>
  )
}

export default HomePage
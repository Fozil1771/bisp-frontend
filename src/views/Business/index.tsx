import { Link, useLocation, useNavigate } from "react-router-dom"
import Footer from "../../components/global/Footer"
import Navbar from "../../components/global/Navbar"
import { TabMenu } from "primereact/tabmenu"
import Banner from "../../components/Banner"

const BusinessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const items = [
    {
      label: 'For Students', url: "/", command: () => {
        navigate("/")
      }
    },
    {
      label: 'For Teachers', url: "/business", command: () => {
        navigate("/business")
      }
    },
  ];

  return (
    <>
      <TabMenu model={items} activeIndex={location.pathname === "/business" ? 1 : 0} />
      <nav className="bg-gray-800 relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={"/"}><h4 className="text-white">Learn Online</h4></Link>
              </div>

            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button> */}

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <Link to={"/business/apply"} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">Apply</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Menu open: "block", Menu closed: "hidden" */}

      </nav>
      <Banner />
      <Footer />
    </>
  )
}

export default BusinessPage
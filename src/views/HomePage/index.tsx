import { Link, useLocation, useNavigate } from "react-router-dom"
import Main from "../../components/Main"
import Footer from "../../components/global/Footer"
import Navbar from "../../components/global/Navbar"
import { TabMenu } from "primereact/tabmenu"
import TeacherListSection from "../../components/TeacherListSection"

const HomePage = () => {
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
      <Navbar />
      <Main />
      <TeacherListSection />
      <Footer />
    </>
  )
}

export default HomePage
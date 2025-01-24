/* eslint-disable react/prop-types */
import Footer from "./Footer"
import Header from "./Header"

function Layout({children}) {
  return (
    <>
    <Header/>
    <div className="h-[calc(100vh_-_7rem)] px-2">{children}</div>
    <Footer/>
    </>
  )
}

export default Layout
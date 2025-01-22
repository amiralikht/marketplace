/* eslint-disable react/prop-types */
import Footer from "./Footer"
import Header from "./Header"

function Layout({children}) {
  return (
    <>
    <Header/>
    <div className="min-h-screen p-2">{children}</div>
    <Footer/>
    </>
  )
}

export default Layout
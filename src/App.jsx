import React from "react"
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Story from "./Pages/Story"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Footer from "./Components/Footer"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div>
        <Header />
        <Home />
        <Footer />
      </div>
    },
    {
      path: "/About",
      element: <div>
        <Header />
        <About />
        <Footer />
      </div>
    },
    {
      path: "/Story",
      element: <div>
        <Header />
        <Story />
        <Footer />
      </div>
    },
    {
      path: "/Contact",
      element: <div>
        <Header />
        <Contact />
        <Footer />
      </div>
    }
  ]
);



function App() {

  return ( 
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

import React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Story from "./Pages/Story";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import StoryEditor from "./Components/StoryEditor";
import StoryDetail from "./Pages/StoryDetails";
import Admin from "./Pages/admin";
import LearnMore from "./Components/LearnMore";
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/About",
    element: (
      <div>
        <Header />
        <About />
        <Footer />
      </div>
    ),
  },
  {
    path: "/Story",
    element: (
      <div>
        <Header />
        <Story />
        <Footer />
      </div>
    ),
  },
  {
    path: "/Contact",
    element: (
      <div>
        <Header />
        <Contact />
        <Footer />
      </div>
    ),
  },
  {
    path: "/add-story",
    element: (
      <div>
        <Header />
        <StoryEditor />
        <Footer />
      </div>
    ),
  },
  {
    path: "/story/:id",
    element: (
      <div>
        <Header />
        <StoryDetail />
        <Footer />
      </div>
    ),
  },
  {
    path: "/admin",
    element: (
      <div>
        <Header />
        <Admin />
        <Footer />
      </div>
    ),
  },
  {
    path: "/learn-more",
    element: (
      <div>
        <Header />
        <LearnMore />
        <Footer />
      </div>
    ),
  }
]);

function App() {
  return (
    <>
       <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

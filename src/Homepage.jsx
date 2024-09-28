import React from 'react'

import HeroSection from './Hero'
import NavBar from "./NavBar.jsx"
import Footer from './Footer.jsx'


export const Homepage = () => {
  return (
    <div>
       <NavBar/>
      
        <HeroSection/>
        <Footer/>
        
    </div>
  )
}

export default Homepage;
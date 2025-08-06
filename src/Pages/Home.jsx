import React from 'react'
import Status from "../Components/Status"
import Team from "../Components/Team"
import HeroSection from "../Components/HeroSection"
import FloatingActionButton from '../Components/FloatingActionButton'
import ByteWarBanner from '../Components/ByteWarBanner' // Import the new component

const Home = () => {
  return (
    <>
      <HeroSection />
      <ByteWarBanner /> {/* Add the banner */}
      <Status />
      <Team />
      <FloatingActionButton />
    </>
  )
}

export default Home
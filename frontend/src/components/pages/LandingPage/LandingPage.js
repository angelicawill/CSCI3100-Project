import { useState, useEffect } from 'react'
import { Header } from './header'
import { Features } from './features'
import { About } from './about'
import { Contact } from './contact'
import JsonData from './data.json'
import SmoothScroll from 'smooth-scroll'

// this displays the landing page.

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
    </div>
  )
}

export default App

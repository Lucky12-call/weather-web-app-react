import FetchWeatherData from "./components/FetchWeatherData"
import Geo from "./components/Geo"

function App() {

  return (
    <section className="h-screen w-screen flex justify-center items-center font-sans ">
      <FetchWeatherData />
      {/* <Geo /> */}
    </section>
  )
}

export default App

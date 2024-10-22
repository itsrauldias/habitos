import { useEffect } from 'react'
import { useThemeMode } from 'flowbite-react'
import dayjs from "dayjs";
import Header from './components/Header'
import DashboardGrid from './components/DashboardGrid'
// import Footer from './components/Footer'

import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

function App() {

  const theme = useThemeMode()
  useEffect(() => {
    theme.setMode('auto')
  })

  return (
    <>
      <Header />
      <div className='flex-1 max-w-full'>
        <div className="h-full mx-auto container content-center">
          <DashboardGrid />
        </div>
      </div >
      {/* <Footer /> */}
    </>
  )
}

export default App

import { useEffect } from 'react'
import { useThemeMode } from 'flowbite-react'
import dayjs from "dayjs";
import Header from './components/Header'
import DashboardGrid from './components/DashboardGrid'
// import Footer from './components/Footer'
import { getSysThemeColor } from './services/sysThemeColorService';

import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

function App() {

  const theme = useThemeMode()
  useEffect(() => {
    theme.setMode('auto')
  })

  const sysThemeColor = getSysThemeColor() + ''

  return (
    <div className={`bg-${sysThemeColor}-50 dark:bg-slate-900 dark:text-gray-400 flex flex-col h-full max-h-full`}>
      <Header />
      <div className='flex-1 max-w-full'>
        <div className="h-full mx-auto container content-center">
          <DashboardGrid />
        </div>
      </div >
      {/* <Footer /> */}
    </div >
  )
}

export default App

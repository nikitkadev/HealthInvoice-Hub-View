import { Outlet } from 'react-router'
import { AppHeader } from './components/app_header/AppHeader'
import { Slide, ToastContainer } from 'react-toastify'
import { JournalProvider } from './components/app_mainjournal/JournalContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

export function App() {
  return (
    <>
      <JournalProvider>
        <div className='app'>
          <AppHeader />
          <main className='app-content'>
            <Outlet />
          </main>
        </div>
        <ToastContainer
          position='top-center' autoClose={5000} limit={3} hideProgressBar={false}
          newestOnTop={true} closeOnClick rtl={false} theme='light' pauseOnFocusLoss={false}
          pauseOnHover={false} transition={Slide} toastClassName="toast-container" />
      </JournalProvider>
    </>
  )
}
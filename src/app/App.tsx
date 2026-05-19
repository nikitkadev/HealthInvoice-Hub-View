import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

import { Outlet } from 'react-router'
import { Slide, ToastContainer } from 'react-toastify'
import { useHeartbeat } from '../shared/hooks/useHeartbeat';
import { JournalProvider } from '../components/app_lk_journal/general/JournalContext';
import Header from '../components/widgets/Header';

export function App() {

  useHeartbeat(30000);

  return (
    <>
      <JournalProvider>
        <div className='app'>
          <Header />
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
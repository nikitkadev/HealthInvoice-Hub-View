import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

import { Outlet } from 'react-router'
import { useHeartbeat } from '../shared/hooks/useHeartbeat';
import { JournalProvider } from '../components/app_lk_journal/general/JournalContext';
import Header from '../components/widgets/Header';
import ConfigToast from '../components/ui/ConfigToast';

export function App() {

  // useHeartbeat(30000); 

  return (
    <JournalProvider>
      <Header />
      <Outlet />
      <ConfigToast />
    </JournalProvider>
  )
}
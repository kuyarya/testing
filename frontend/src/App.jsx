import { Route, Routes } from 'react-router-dom';
import RoutesOutlet from './config/RoutesOutlet';
import LandingPage from './pages/01-LandingPage/LandingPage';
import Informasi from './pages/02-InformasiPage/Informasi';
import HubungiKami from './pages/03-Hubungi/Hubungi';
import About from './pages/04-Tentang/About';
import Modul from './pages/05-Modul/Modul';
import Login from './pages/06-LoginPage/Login';
import Register from './pages/07-Daftar/Register';
import CaraMendafatarPengajar from './pages/08-DaftarPengajar/CaraDaftarPengajar';
import Protected from './protected/protectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoutesOutlet />}>
        <Route index element={<LandingPage />} />
        <Route path="informasi" element={<Informasi />} />
        <Route path="hubungi" element={<HubungiKami />} />
        <Route path="tentang" element={<About />} />
        <Route element={<Protected />}>
          <Route path="modul" element={<Modul />} />
        </Route>
        <Route path="masuk" element={<Login />} />
        <Route path="mendaftar" element={<Register />} />
        <Route
          path="cara_mendaftar_instruktur"
          element={<CaraMendafatarPengajar />}
        />
      </Route>
    </Routes>
  );
}

export default App;

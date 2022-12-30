import { Navigate, Outlet } from 'react-router-dom';
import { Toast } from '../components/02-Reusable/LoadingEffect/Toast';
export default function Protected() {
  let auth = { token: false };
  return auth.token ? (
    <Outlet />
  ) : (
    Toast.fire({
      icon: 'error',
      title: 'Kamu harus login terlebih dahulu untuk mengakses halaman ini',
    }) && <Navigate to="/" />
  );
}

import { Navigate, Outlet } from 'react-router-dom';
import { Toast } from '../components/02-Reusable/Toast/Toast';
import useLoginState from '../zustand/todoLogin';

export default function Protected() {
  const { isLoggedIn } = useLoginState();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    Toast.fire({
      icon: 'error',
      title: 'Kamu harus login terlebih dahulu untuk mengakses halaman ini',
    }) && <Navigate to="/" />
  );
}

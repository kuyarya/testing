import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '../../components/02-Reusable/Toast/Toast';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

//Action Creators
function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}
function loginSuccess(token, user) {
  localStorage.setItem('token', token);
  Swal.fire({
    icon: 'success',
    title: 'Berhasil Login',
    showConfirmButton: false,
    timer: 1500,
  });
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    },
  };
}

export function loginFailure(error) {
  Toast.fire({
    icon: 'error',
    title: 'Email atau Kata Sandi Salah',
  });
  return {
    type: LOGIN_FAILURE,
    payload: {
      error,
    },
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

//Async Action Creators
export function login(email, password, props) {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        'http://localhost:8080//auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      /* 
        atau dengan cara 
        const {token , user} = response.data
        dispatch(loginSuccess(token, user));
      */
      if (response.data) {
        dispatch(loginSuccess());
        dispatch(loginSuccess(response.data.token, response.data.user));
        props.history.push('/dashboard');
      } else {
        throw new Error('Data tidak ditemukan');
      }
    } catch (error) {
      dispatch(loginFailure());
      dispatch(loginFailure(error.response.data.error));
    }
  };
}

export function logoutSucces(props) {
  localStorage.removeItem('token');
  return async (dispatch) => {
    dispatch(logout());
    props.history.push('/');
  };
}

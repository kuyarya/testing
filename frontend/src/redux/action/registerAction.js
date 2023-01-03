import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '../../components/02-Reusable/Toast/Toast';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

//Action Creators

function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

function registerSuccess(token, user) {
  localStorage.setItem('token', token);
  Swal.fire({
    icon: 'success',
    title: 'Berhasil Register',
    showConfirmButton: false,
    timer: 1500,
  });
  return {
    type: REGISTER_SUCCESS,
    payload: {
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    },
  };
}

function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    payload: {
      error,
    },
  };
}

//Async Action Creators

export function register(
  firstname,
  lastname,
  email,
  password,
  konfirmasiPassword
) {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        {
          firstname,
          lastname,
          email,
          password,
          konfirmasiPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(registerSuccess(response.data.token, response.data.user));
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Belum berhasil Mendaftar',
      });
      dispatch(registerFailure(error.response.data.error));
    }
  };
}

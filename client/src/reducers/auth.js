import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = { authData: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;

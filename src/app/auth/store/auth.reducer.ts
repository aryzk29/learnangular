import {User} from "../user.model";
import * as authAction from "./auth.action";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initState: State = {
  user: null,
  authError: '',
  loading: false
};

export function authReducer(state = initState, action: authAction.AuthActions) {
  switch (action.type) {
    case authAction.AUTHENTICATE_SUCCESS:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);

      return {
        ...state,
        user: user,
        authError: null,
        loading: false
      }
    case authAction.LOGOUT:
      return {
        ...state,
        user: null
      };
    case authAction.LOGIN_START:
    case authAction.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case authAction.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case authAction.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
}

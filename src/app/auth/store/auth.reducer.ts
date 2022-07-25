import {User} from "../user.model";
import * as authAction from "./auth.action";

export interface State {
  user: User
}

const initState: State = {
  user: null
};

export function authReducer(state = initState, action: authAction.AuthActions) {
  switch (action.type) {
    case authAction.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);

      return {
        ...state,
        user: user
      }
    case authAction.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state
  }
}

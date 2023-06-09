import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  logoutStart,
} from "./userRedux";
import { createOrderFailure, createOrderSuccess } from "./orderRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    throw err;
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    throw err;
  }
};

export const createOrder = async (dispatch, order) => {
  try {
    const res = await userRequest.post("/orders", order);
    dispatch(createOrderSuccess(res.data));
  } catch (err) {
    throw err;
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
};

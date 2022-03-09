import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const sigIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.sigIn(formData);
    dispatch({ type: AUTH, data }); // to the reducers
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const sigUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.sigUp(formData);
    dispatch({ type: AUTH, data }); // to the reducers
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

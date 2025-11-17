import { API, API_FORMDATA, apiError } from "../api/api";

export const updateUserProfile = async (formData: FormData) => {
  try {
    const response = await API_FORMDATA.put('User/update-user-profile', formData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const updateUserPersonalDetail = async (userData: any) => {
  try {
    const response = await API.put('User/update-user-detail', userData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const cancelAppointment = async (id: string | number) => {
  try {
    const response = await API.put(`Appointment/cancel-appointment/${id}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

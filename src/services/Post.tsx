import { API, apiError } from "../api/api";

export const addPatient = async (patientData: {
  firstName: string;
  lastName: string;
  genderId: number;
  dob: string;
  bloodGroupId: number;
  cnic: string;
}) => {
  try {
    const response = await API.post('Patient/add-patient', patientData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const deletePatient = async (patientId: string) => {
  try {
    const response = await API.delete(`Patient/delete-patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const addReviewOnDoctor = async (id: string,reviewData: any) => {
  try {
    const response = await API.post(`Review/add-reivew-on-doctor/${id}`, reviewData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

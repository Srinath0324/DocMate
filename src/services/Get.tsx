import { API, apiError } from "../api/api";

export const getLabsByCity = async () => {
  try {
    const response = await API.get(`Lab/get-labs-by-city`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalsByCity = async () => {
  try {
    const response = await API.get(`Hospital/get-hospitals-by-city`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getClinicsByCity = async () => {
  try {
    const response = await API.get(`Clinic/get-clinics-by-city`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const searchHospitalLabClinicDoctor = async (queryParams: any) => {
  try {
    const response = await API.get(`Search/search-hospital-lab-clinic-doctor?${queryParams}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getAllCities = async () => {
  try {
    let key = ''
    const response = await API.put(`Search/get-Cities-by-search?searchKey=${key}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getUserAppointments = async () => {
  try {
    const response = await API.get('Appointment/get-user-appointments');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const isUserAppointmentOnDoctor = async (userId: string, doctorId: string) => {
  try {
    const response = await API.get(`Appointment/is-user-appointment-on-doctor/${userId}/${doctorId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const isReviewOnDoctor = async (doctorId: string, userId: string) => {
  try {
    const response = await API.get(`Review/Is-review-on-doctor/${doctorId}/${userId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await API.get('User/get-user-profile');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getUserPersonalDetail = async () => {
  try {
    const response = await API.get('User/get-user-personal-detail');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getBloodGroups = async () => {
  try {
    const response = await API.get('Master/get-blood-groups');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getGenderTypes = async () => {
  try {
    const response = await API.get('Master/get-gender-types');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getUserPatients = async () => {
  try {
    const response = await API.get('Patient/get-user-patients');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const checkPatientCNICExistence = async (userId: string, cnic: string) => {
  try {
    const response = await API.get(`Patient/check-patient-CNIC-existance?userId=${userId}&&CNIC=${cnic}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorFieldListWithType = async () => {
  try {
    const response = await API.get('DoctorField/get-doctor-field-list-with-type');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorsByType = async (typeId: number) => {
  try {
    const response = await API.get(`Doctor/get-doctors-by-type/${typeId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorsByField = async (doctorFieldId: string) => {
  try {
    const response = await API.get(`Doctor/get-doctors-by-doctorFiled/${doctorFieldId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await API.get('Doctor/get-doctors-by-city');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDiseases = async () => {
  try {
    const response = await API.get('Disease/get-diseases');
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getClinicById = async (clinicId: string) => {
  try {
    const response = await API.get(`Clinic/get-clinic/${clinicId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getClinicDoctors = async (clinicId: string) => {
  try {
    const response = await API.get(`Doctor/get-clinic-doctors/${clinicId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorById = async (doctorId: string) => {
  try {
    const response = await API.get(`Doctor/get-doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorAvailableTime = async (mappingId: string, date: string) => {
  try {
    const response = await API.get(`Doctor/get-doctors-available-time/${mappingId}?date=${date}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getDoctorReviews = async (doctorId: string) => {
  try {
    const response = await API.get(`Review/get-doctor-review/${doctorId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getLabById = async (labId: string) => {
  try {
    const response = await API.get(`Lab/get-lab/${labId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getLabFacilities = async (labId: string) => {
  try {
    const response = await API.get(`Facility/get-lab-facilities/${labId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getLabAvailableTime = async (labId: string, date: string) => {
  try {
    const response = await API.get(`Lab/get-lab-available-time/${labId}?date=${date}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalById = async (hospitalId: string) => {
  try {
    const response = await API.get(`Hospital/get-hospital/${hospitalId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalFacilityByType = async (typeId: number, hospitalId: string) => {
  try {
    const response = await API.get(`Facility/get-hospital-facility-by-type/${typeId}/${hospitalId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalRadiologyFacilities = async (hospitalId: string) => {
  try {
    const response = await API.get(`Facility/get-hospital-radiology-facilities/${hospitalId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalDoctors = async (hospitalId: string) => {
  try {
    const response = await API.get(`Doctor/get-hospatial-doctors/${hospitalId}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const bookDoctorAppointment = async (
  mappingId: any,
  appointmentData: any
) => {
  try {
    const response = await API.post(`Appointment/book-appointment-of-doctor/${mappingId}`, appointmentData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const bookFacilitiesAppointment = async (appointmentData: any) => {
  try {
    const response = await API.post(`Appointment/book-appointment-by-facilities`, appointmentData);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalRadiologyTime = async (id: string, date: string) => {
  try {
    const response = await API.get(`Hospital/get-radiology-department-available-time/${id}?date=${date}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

export const getHospitalParamedicalTime = async (id: string, date: string) => {
  try {
    const response = await API.get(`Hospital/get-paramedical-department-available-time/${id}?date=${date}`);
    return response.data;
  } catch (error) {
    throw apiError(error);
  }
};

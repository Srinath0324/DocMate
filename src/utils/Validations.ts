export interface ProfileErrors {
  firstName: string;
  lastName: string;
  dob: string;
  cnic: string;
  bloodGroup: string;
  gender: string;
  phoneNumber: string;
}

export const isValidEmail = (email: string) => {
  // const reg = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return reg.test(email);
};

export const isValidURLTag = (URLTag: string) => {
  const reg = URLTag.includes(" ");
  return reg;
};

export const isValidPassword = (password: string) => {
  if (password.length < 8) {
    return false;
  } else {
    const hasNumber =
      /^(?=.{8,}$)(?=.*?[A-Z a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;
    return hasNumber.test(password);
  }
};

export const validateCNIC = (value: string): boolean => {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(value);
};

export const validateProfileForm = (
  firstName: string,
  lastName: string,
  dobString: string,
  cnic: string,
  selectedBloodGroup: { id: number; name: string },
  selectedGender: { id: number; name: string },
  phoneNumber: string
): { isValid: boolean; errors: ProfileErrors } => {
  let isValid = true;
  let errors: ProfileErrors = {
    firstName: '',
    lastName: '',
    dob: '',
    cnic: '',
    bloodGroup: '',
    gender: '',
    phoneNumber: ''
  };

  if (!firstName.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  }

  if (!lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }

  if (!dobString) {
    errors.dob = 'Date of birth is required';
    isValid = false;
  }

  if (!cnic) {
    errors.cnic = 'CNIC is required';
    isValid = false;
  } else if (!validateCNIC(cnic)) {
    errors.cnic = 'CNIC format should be #####-#######-#';
    isValid = false;
  }

  if (selectedBloodGroup.id === 0) {
    errors.bloodGroup = 'Blood group is required';
    isValid = false;
  }

  if (selectedGender.id === 0) {
    errors.gender = 'Gender is required';
    isValid = false;
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
    isValid = false;
  }

  return { isValid, errors };
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateForApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
};

export const formatTime = (timeString?: string | null): string => {
  if (!timeString) return 'N/A';
  try {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } catch (e) {
    return 'N/A';
  }
};

export const formatCNIC = (text: string): string => {
  let cleaned = text.replace(/\D/g, '');
  
  if (cleaned.length > 12) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12, 13)}`;
  } else if (cleaned.length > 5) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  
  return cleaned;
};

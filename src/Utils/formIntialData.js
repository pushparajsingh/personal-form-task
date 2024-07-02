import { toast } from 'react-toastify';
export const InitialFormData = {
  relationShip: '',
  nomineesName: '',
  DOB: new Date(),
  address: '',
  pinCode: '',
  city: '',
  state: '',
  country: '',
};

export const InitialFormError = {
  relationShip: '',
  nomineesName: '',
  address: '',
  pinCode: '',
  city: '',
  state: '',
  country: '',
};

export const notify = (msg) =>
  toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export const isValidDateValue = (formData, setError) => {
  let validation = true;
  let errorData = { ...InitialFormError };
  if (
    formData.relationShip?.trim('') == '' ||
    formData.relationShip == undefined
  ) {
    errorData.relationShip = 'This Field is Required';
    validation = false;
  }
  if (
    formData.nomineesName?.trim('') == '' ||
    formData.relationShip == undefined
  ) {
    errorData.nomineesName = 'This Field is Required';
    validation = false;
  }
  if (
    formData.address?.trim('') == '' ||
    formData.relationShip == undefined
  ) {
    errorData.address = 'This Field is Required';
    validation = false;
  }
  if (
    formData.pinCode?.trim('') == '' ||
    formData.relationShip == undefined
  ) {
    errorData.pinCode = 'This Field is Required';
    validation = false;
  }
  setError(errorData);
  return validation;
};

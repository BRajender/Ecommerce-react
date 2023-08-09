export const mobileValidator = (value) => {
  let error = "";
  if (!value) {
    error = "This field is required";
  } else if (!/^\d{10}$/.test(value)) {
    error = "Enter a valid phone number";
  }
  return error;
};

export const passwordValidator = (value) => {
  let error = "";
  if (!value) {
    error = "This field is required";
  }
  else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)){
      error="password must have atleast one Uppercase letter,one Lowercase letter,one Number,one Special character and Minimum 6 characters"
  } return error;
};

export const emailValidator=(value)=>{
    let error=""
    if(!value){
        error="This field is required"
    }
    else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) {
        error="Please enter valid email address"
    }
    return error;
}

export const primaryValidator=(value)=>{
    let error = "";
    if (!value) {
      error = "This field is required";
    }
    return error;
}

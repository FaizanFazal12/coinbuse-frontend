import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "Use lowercase, uppercase, and digits";

const signupSchema = yup.object().shape({
  name: yup.string().max(30).required("Name is required"),
  username: yup.string().min(5).max(30).required("Username is required"),
  email: yup.string().email("Email is not correct").required("Email is required"),
  password: yup.string().min(5).max(30).matches(passwordPattern, { message: errorMessage }).required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], 'Password must match').required('Confirm Password is required'),
});

export default signupSchema;

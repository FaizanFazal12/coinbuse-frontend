import { useState } from "react";
import styles from "./Signup.module.css";
import TextInput from "../../Component/TextInput/TextInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import signupSchema from "../../schema/signupSchema";
import { signup } from "../../api/internal";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword
    };

    const response = await signup(data);

    if (response.status === 201) {
      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth
      };

      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: signupSchema
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Sign up</div>
      <TextInput
        onChange={handleChange}
        type="text"
        name="name"
        value={values.name}
        onBlur={handleBlur}
        placeholder="Name"
        error={errors.name && touched.name ? 1 : undefined}
        errorMessage={errors.name}
      />
      <TextInput
        onChange={handleChange}
        type="text"
        name="username"
        value={values.username}
        onBlur={handleBlur}
        placeholder="Username"
        error={errors.username && touched.username ? 1 : undefined}
        errorMessage={errors.username}
      />
      <TextInput
        onChange={handleChange}
        type="text"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        placeholder="Email"
        error={errors.email && touched.email ? 1 : undefined}
        errorMessage={errors.email}
      />
      <TextInput
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
        onBlur={handleBlur}
        placeholder="Password"
        error={errors.password && touched.password ? 1 : undefined}
        errorMessage={errors.password}
      />
      <TextInput
        onChange={handleChange}
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        placeholder="Confirm Password"
        error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
        errorMessage={errors.confirmPassword}
      />
      <button className={styles.signupButton}
    disabled={
      errors.username ||
      errors.name ||
      errors.password ||
      errors.email ||
      errors.confirmPassword ||
      !values.username ||
      !values.name ||
      !values.password ||
      !values.email ||
      !values.confirmPassword
    }
       onClick={handleSignup}>
        Sign up
      </button>

      <span>
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>
      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}

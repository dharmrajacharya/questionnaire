import React, { useState } from "react";
import * as Yup from 'yup';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from 'formik';
import { auth, db } from "../../firebase/firebase_config";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Must be 5 characters or more').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  sex: Yup.string().oneOf(['Male', 'Female', 'Other']).required('Required'),
});

const SignupScreen = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");

  const initialFormValues = {
    firstName: '',
    lastName: '',
    sex: '',
    mobileNumber: '',
    profileImage: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: any, { setSubmitting } : any) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = response.user;

      // Set user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        sex: values.sex,
        mobileNumber: values.mobileNumber,
        email: user.email,
        role: 'user',
      });

      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      setNotice("Sorry, something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 mt-3 pt-3 pb-3">
          <Formik
            initialValues={initialFormValues}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                {notice && (
                  <div className="alert alert-warning" role="alert">
                    {notice}
                  </div>
                )}
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        id="signupFirstName"
                        type="text"
                        name="firstName"
                        className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="signupFirstName" className="form-label">First Name</label>
                      <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        id="signupLastName"
                        type="text"
                        name="lastName"
                        className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="signupLastName" className="form-label">Last Name</label>
                      <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    id="signupMobileNumber"
                    type="text"
                    name="mobileNumber"
                    className={`form-control ${errors.mobileNumber && touched.mobileNumber ? 'is-invalid' : ''}`}
                    placeholder="Mobile Number"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="signupMobileNumber" className="form-label">Mobile Number</label>
                  <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                </div>

                <div className="form-floating mb-3">
                  <select
                    id="signupSex"
                    name="sex"
                    className={`form-select ${errors.sex && touched.sex ? 'is-invalid' : ''}`}
                    value={values.sex}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" label="Select sex" />
                    <option value="Male" label="Male" />
                    <option value="Female" label="Female" />
                    <option value="Other" label="Other" />
                  </select>
                  <label htmlFor="signupSex" className="form-label">Sex</label>
                  <ErrorMessage name="sex" component="div" className="invalid-feedback" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    id="signupEmail"
                    type="email"
                    name="email"
                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="signupEmail" className="form-label">Email</label>
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary pt-3 pb-3"
                    disabled={isSubmitting}
                  >
                    Signup
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <span>Already have an account? <Link to="/">Login here</Link>.</span>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;

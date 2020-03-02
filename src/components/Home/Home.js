import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import './Home.css';
const Home = () => (
  <Formik
    initialValues={{ userName: "", password: "", permission: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
      
      let response = async ()=>{
        try{
            //let apiResponse = await axios.post('',{values});
            let apiResponse = await axios.get('/api/sayHello');
            console.log(apiResponse.data);
            return apiResponse.data;
        }
        catch(error){
            console.log("Error occurred",error);
        }
      } 
    }}
    
    validationSchema={Yup.object().shape({
      userName: Yup.string()
        .required("No User Name Specified")
        .min(7,'Username too short- should be 7 characters long')
        .max(7,'Username too long- should be 7 characters long')
        .matches(/^[A-Z]+$/i, 'Username should only contain alphabets'),
      password: Yup.string()
        .required("No password provided."),
      permission: Yup.string().required("No SSO permission query specified")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
          <div className="container">
              <div className="row">
                  <div className="offset-md-3 col-md-6">
                      <div className="card loginCard rounded">
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-center mx-auto">
                                    <p className="headingLoginCard">SSO Login</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userName">User Name</label>
                                    <input
                                        name="userName"
                                        type="text"
                                        placeholder="Enter your UserName"
                                        value={values.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.userName && touched.userName && "error" && "form-control"} 
                                        id="userName"
                                    />
                                    {errors.userName && touched.userName && (
                                    <div className="input-feedback">{errors.userName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="password"
                                        className={errors.password && touched.password && "error" && "form-control"}
                                    />
                                    {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="permission">SSO Permission Query</label>
                                    <input 
                                        name="permission" 
                                        type="text"
                                        placeholder="Enter SSO permission query"
                                        value={values.permission}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="permission"
                                        className={errors.permission && touched.permission && "error" && "form-control"}
                                    /> 
                                    {errors.permission && touched.permission && (
                                        <div className="input-feedback">{errors.permission}</div>
                                    )}
                                </div>
                                <div className="form-group justify-content-center d-flex">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                  </div>
              </div>
          </div>
      );
    }}
  </Formik>
);

export default Home;

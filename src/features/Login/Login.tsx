import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./authReducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
import {handleServerNetworkError} from "../../utils/errorUtils";
import {log} from "util";

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Min password 3 symbols';
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers) => {
            if (navigator.onLine) {
                const action = await dispatch(loginTC(values))
                if (loginTC.rejected.match(action)) {
                    if (action.payload?.fieldsErrors?.length) {
                        const error = action.payload?.fieldsErrors[0];
                        formikHelpers.setFieldError(error.field, error.error)
                    }
                }
            } else {
                handleServerNetworkError({message: 'Problems with the Internet'}, dispatch)
            }


        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <div className={s.containerLoginForm}>
        <div className={s.form}>
            <div className={s.warning}>
                <div>
                    Из-за особенностей back-end, если Вы ранее в данном браузере не заходили
                    к нам в проект,
                </div>
                <div> пожалуйста пройдите авторизацию на сайте API сервера</div>
                <a href={'https://social-network.samuraijs.com/login'} target="_blank">здесь.</a>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>Don't have an account?
                            <a href={'https://social-network.samuraijs.com/signUp'}
                               target={'_blank'}> Registration
                            </a>
                        </p>
                    </FormLabel>

                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        <div style={{height: '15px'}}>{formik.touched.email && formik.errors.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null}</div>
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        <div style={{height: '15px'}}>{formik.touched.password && formik.errors.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null}</div>

                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                          {...formik.getFieldProps('rememberMe')}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    </div>
}


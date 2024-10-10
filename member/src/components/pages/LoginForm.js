
'use client'
import React, { useContext, useEffect, useState } from "react"
import AuthContext from '../../context/AuthContext'
import AppThemeContext from '../../context/AppThemeContext'
import { useFormik } from 'formik'

import { Bounce, ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';

const validate = values => {
    const errors = {};


    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }


    return errors;
};

export default function LoginForm() {


    const router = useRouter();


    const { login, isError, user, isLoading } = useContext(AuthContext)
    const { theme } = useContext(AppThemeContext)



    const handleLoginSubmit = async ({ email, password }) => {
        login({ email, password }).then(success => {
            if (success) {
                toast.success('Logging In...', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            else {
                toast.error(isError || 'Could not log-in.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    closeButton: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            handleLoginSubmit(values)
        },

    });



    const [appName, setAppName] = useState('Konexxu')
    const [appLogo, setAppLogo] = useState('/xmindlogo.png')
    const [appBackground, setAppBackground] = useState('')
    const [buttonProps, setButtonProps] = useState()

    //w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800

    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        if (theme) {
            if (theme.brandLogoUrl && theme.brandLogoUrl.length > 0) {
                setAppLogo(theme.brandLogoUrl)
            }
            if (theme.brandBackgroundPhotoUrl && theme.brandBackgroundPhotoUrl.length > 0) {
                setAppBackground(theme.brandBackgroundPhotoUrl)
            }
            if (theme.data.button_primary) {
                setButtonProps({ ...theme.data.button_primary, className: `w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${theme.data.button_primary.className}` })
            }

            setShowLogo(true)
        }

    }, [theme])



    return (<>
        {appBackground != '' && <img class={`object-fill absolute w-full h-full -z-50 blur-lg opacity-45`} src={appBackground}></img>}
        <section className="w-full" >

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">



                <div className="w-full flex flex-row bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <a href="#" className={`flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white transition-all duration-300 ${showLogo ? 'opacity-100' : 'opacity-0}'} `}>
                            <img className={` max-h-16 mr-2 ${theme == null ? 'opacity:0' : 'opacity-100'}`} src={appLogo} alt="logo" />
                           {/*  <span className="drop-shadow-sm">{appName}</span> */}
                        </a>
                    </div>

                    <div className="w-1/2">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>


                            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6"  >
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    <span className="text-red-700 text-xs">{formik.errors.email}&nbsp;</span>
                                </div>
                                <div>
                                    <label htmlFor="password"

                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password} id="password" placeholder="••••••••"
                                        className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <span className="text-red-700 text-xs">{formik.errors.password}&nbsp;</span>
                                </div>
                                {/* <div>
                            {!formik.isValid && formik.submitCount > 0 && (
                                <div className="alert alert-danger">
                                    One or more fields has an error.
                                </div>
                            )}
                        </div> */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" loading={isLoading}
                                    className={`w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 `}
                                    {...buttonProps} >Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>



                        </div>
                    </div>

                </div>
            </div>
        </section><ToastContainer></ToastContainer></>);
}
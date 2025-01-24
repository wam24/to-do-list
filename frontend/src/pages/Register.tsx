import React from "react";
import {apiWithoutCredentials} from "@/apis/config.ts";
import {apiUrls} from "@/apis/apiUrl.ts";
import Swal from "sweetalert2";

export const Register = () => {
    const [email, setEmail] = React.useState()
    const [errors, setErrors] = React.useState()
    const [password, setPassword] = React.useState()
    const [password1, setPassword1] = React.useState()
    const [firstName, setFirstName] = React.useState()
    const [lastName, setLastName] = React.useState()
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setErrors({})
        if (password !== password1) {
            Swal.fire({
                title: 'Error!',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            setErrors({password1: ['Las contraseñas no coinciden']})
            return
        }
        apiWithoutCredentials.post(apiUrls.register, {
            username: email,
            email,
            password,
            first_name: firstName,
            last_name: lastName
        }).then((response) => {
            Swal.fire({

                icon: "success",
                title: "Registro exitoso!",
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {


                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = '/login'

                    }


                }
            )
        }).catch((error) => {
            setErrors(error.response.data.message)
            if (error.response.data.message?.non_field_errors) {
                setErrors({
                    password: error.response.data.message.non_field_errors,
                    password1: error.response.data.message.non_field_errors,
                })
            }
            Swal.fire({
                title: 'Error!',
                text: 'Corrija los siguientes errores',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
    }
    return (

        <section className="bg-white ">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 ">Registro de usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">
                                Correo electrónico
                            </label>
                            <input type="email" name="email" id="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder="example@example.com" required=""/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">{errors?.email ? errors.email[0] : ''}</span></p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="first_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                            <input type="text" name="first_name" id="first_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   placeholder=""
                            />
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">{errors?.first_name ? errors.first_name[0] : ''}</span></p>
                        </div>

                        <div className="w-full">
                            <label htmlFor="last_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
                            <input type="text" name="last_name" id="last_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder=""
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   required=""/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">{errors?.last_name ? errors.last_name[0] : ''}</span></p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
                            <input type="password" name="password" id="password"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder=""
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required=""/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">{errors?.password ? errors.password[0] : ''}</span></p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password1"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Repetir
                                contraseña</label>
                            <input type="password" name="password1" id="password1"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder=""
                                   value={password1}
                                   onChange={(e) => setPassword1(e.target.value)}
                                   required=""/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">{errors?.password1 ? errors.password1[0] : ''}</span></p>
                        </div>

                    </div>
                    <button type="submit"
                            className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800">
                        Guardar
                    </button>
                </form>
            </div>
        </section>

    )
}
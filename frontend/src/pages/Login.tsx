import React from "react";
import Swal from 'sweetalert2'

import {apiWithoutCredentials} from "@/apis/config.ts";
import {apiUrls} from "@/apis/apiUrl.ts";

export const Login = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        apiWithoutCredentials.post(apiUrls.login, {username: email, password}).then((response) => {
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            window.location.href = '/'

        }).catch((error) => {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: error.response.data.detail,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Bienvenido de nuevo</h2>
                <p className="text-center text-gray-600 mb-6">Por favor inicia sesión en tu cuenta</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo
                            electrónico</label>
                        <input type="email" id="email" name="email" required
                               value={email} onChange={e => setEmail(e.target.value)}
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="example@example.com"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" required
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="*********"
                               value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                        Iniciar Sesión
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/register" className="text-sm text-blue-500 hover:underline">Crear Cuenta</a>
                </div>
            </div>
        </div>
    )
}
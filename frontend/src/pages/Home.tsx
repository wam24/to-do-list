import React, {useEffect} from "react";
import {useAuth} from "@/hooks/useAuth.ts";
import {Header} from "@/pages/includes/Header.tsx";
import {apiWithCredentials} from "@/apis/config.ts";
import {apiUrls} from "@/apis/apiUrl.ts";

export const Home = () => {

    useAuth()
    const [toDoList, setToDoList] = React.useState([{}])
    const [isLoading, setIsLoading] = React.useState(true)
    const fetchList = ()=> {
        apiWithCredentials.get(apiUrls.toDoList).then((response) => {
                setToDoList(response.data.results)
            }).finally(
                () => setIsLoading(false)
            )
    }
    useEffect(() => {
        if (isLoading) {
            fetchList()
        }

    }, [])

    return (
        <>
            <Header/>
            <div
                className="p-4 bg-white-50 w-full block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="text-right">
                        <a
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800"
                            type="button"
                            href=""
                        >
                            Añadir nueva tarea
                        </a>

                    </div>
                </div>
            </div>
            <div className="flex flex-col ">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>

                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Fecha de creación
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Titulo
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Descripción
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Fecha programada
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Completada
                                    </th>
                                    <th scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Acciones
                                    </th>

                                </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {
                                    toDoList.map((item, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(item.creation_date).toLocaleDateString('es-ES') + ' ' + new Date(item.creation_date).toLocaleTimeString('es-ES')}
                                                </td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {item.title}
                                                </td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {item.description}
                                                </td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {item.scheduled_date ? new Date(item.scheduled_date).toLocaleDateString('es-ES'):'Sin definir'}
                                                </td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                    {item.ready ?
                                                        <svg className="w-5 h-5 text-green-500" fill="currentColor"
                                                             viewBox="0 0 448 512"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>

                                                        </svg> : <svg className="w-5 h-5 text-red-500" fill="currentColor"
                                                                      viewBox="0 0 512 512"
                                                                      xmlns="http://www.w3.org/2000/svg">

                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm175 79c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path>

                                                        </svg>
                                                    }
                                                </td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <button type="button"
                                                            className="mr-2  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor"
                                                             viewBox="0 0 20 20"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                                            </path>
                                                            <path fillRule="evenodd"
                                                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                  clipRule="evenodd"></path>
                                                        </svg>
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-primary-800">
                                                        <svg aria-hidden="true" className="w-4 h-4 mr-1 ml-1"
                                                             fill="currentColor"
                                                             viewBox="0 0 20 20"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd"
                                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                  clipRule="evenodd"></path>
                                                        </svg>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
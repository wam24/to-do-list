import * as React from "react";
import {apiWithCredentials} from "@/apis/config.ts";
import {apiUrls} from "@/apis/apiUrl.ts";
import {useEffect} from "react";

export const useAuth = () => {
    const [isAuth, setIsAuth] = React.useState(false)
    useEffect(() => {
        if (!isAuth) {
            apiWithCredentials.get(apiUrls.session, {
            }).then((response) => {
                setIsAuth(true)
            }).catch((error) => {
                setIsAuth(false)
                window.location.href = '/login'
            }).finally(() => setIsAuth(false))
        }

    }, [])


}
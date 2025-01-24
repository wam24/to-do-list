import path from "path"
import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"


export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        host: true,
        watch: {
            usePolling: true,
        },
    },
})

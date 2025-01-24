import {Route} from 'wouter'
import {Login, Home, Register} from '@/pages'
import './App.css'

function App() {

    return (
        <>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Home}></Route>
            <Route path="/register" component={Register}></Route>

        </>
    )
}

export default App

import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {HashRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Login/authReducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
                        {/*    <Menu/>*/}
                        {/*</IconButton>*/}
                        <Typography variant="h6">
                            Todolist by DevAndreyIT
                        </Typography>
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}> Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path='/' element={<TodolistsList demo={demo}/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/*<Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                        {/*<Route path='*' element={<Navigate to={'/404'}/>}/>*/}
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    )
}

export default App

import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../utils/errorUtils";


export const fetchTodolistsTC = createAsyncThunk('/todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolists: res.data}
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('/todolists/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
//изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({status: "loading"}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    try {
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {id: todolistId}
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk('/todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.createTodolist(title)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolist: res.data.data.item}
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const changeTodolistTitleTC = createAsyncThunk('/todolists/changeTodolistTitle', async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const res = await todolistsAPI.updateTodolist(param.id, param.title)
    return {id: param.id, title: param.title}
})


const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
    }
})

export const todolistsReducer = slice.reducer

export const {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
} = slice.actions


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>

import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4df4176d-a901-401a-823f-86f4c8f72b8c'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<'', AxiosResponse<BaseResponseType<{ item: TodoType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

//Types:
type TodoType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type BaseResponseType<T = {}> = {
    fieldsErrors: string[],
    resultCode: number
    messages: string[],
    data: T
}

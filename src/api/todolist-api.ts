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
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<'', AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

//Types:
type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type ResponseType<T = {}> = {
    fieldsErrors: string[],
    resultCode: number
    messages: string[],
    data: T
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    error: string | null,
    totalCount: number
    items: TaskType[]
}




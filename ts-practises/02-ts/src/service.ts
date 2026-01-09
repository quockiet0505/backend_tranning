import {Task} from './types'

let tasks: Task[] =[]
let idCounter =1

export async function addTask(title: string): Promise<Task>{
     if(title.trim().length ==0){
          throw new Error("Task title cannot be empty");
     }

     const newTask: Task ={
          id: idCounter++,
          title,
          completed: false
     }

     tasks.push(newTask)
     return newTask
};

export async function toggleTask(id: number): Promise<void>{
     const task = tasks.find(t => t.id ==id)
     if(!task){
          throw new Error("Task not found")
     }

     task.completed = !task.completed

};

export async function deleteTask(id: number): Promise<void>{
     tasks = tasks.filter( t => t.id !=id)

}

export function getTasks(): Task[]{
     return tasks;
}
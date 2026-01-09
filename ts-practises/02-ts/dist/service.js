let tasks = [];
let idCounter = 1;
export async function addTask(title) {
    if (title.trim().length == 0) {
        throw new Error("Task title cannot be empty");
    }
    const newTask = {
        id: idCounter++,
        title,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
}
;
export async function toggleTask(id) {
    const task = tasks.find(t => t.id == id);
    if (!task) {
        throw new Error("Task not found");
    }
    task.completed = !task.completed;
}
;
export async function deleteTask(id) {
    tasks = tasks.filter(t => t.id != id);
}
export function getTasks() {
    return tasks;
}

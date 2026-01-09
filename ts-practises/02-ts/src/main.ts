// src/main.ts
import { addTask, toggleTask, deleteTask, getTasks } from "./service.js";

export function initApp() {
    const input = document.getElementById("taskInput") as HTMLInputElement;
    const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
    const list = document.getElementById("taskList") as HTMLUListElement;
    const alertBox = document.getElementById("alertBox") as HTMLDivElement;

    if (!input || !addBtn || !list || !alertBox) {
        console.error('Required DOM elements not found');
        return;
    }

    function renderTasks() {
        list.innerHTML = "";
        const tasks = getTasks();
        
        tasks.forEach(t => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <div>
                    <input type="checkbox" class="form-check-input me-2" 
                           data-id="${t.id}" ${t.completed ? "checked" : ""}/>
                    <span class="${t.completed ? "text-decoration-line-through" : ""}">
                        ${t.title}
                    </span>
                </div>
                <button class="btn btn-danger btn-sm">Delete</button>
            `;

            const checkbox = li.querySelector("input") as HTMLInputElement;
            const deleteBtn = li.querySelector("button") as HTMLButtonElement;

            checkbox?.addEventListener("change", async () => {
                await toggleTask(t.id);
                renderTasks();
            });

            deleteBtn?.addEventListener("click", async () => {
                await deleteTask(t.id);
                renderTasks();
            });

            list.appendChild(li);
        });
    }

    addBtn.addEventListener("click", async () => {
        alertBox.style.display = "none";
        const title = input.value.trim();
        
        if (!title) {
            alertBox.style.display = "block";
            alertBox.textContent = "Task title cannot be empty";
            return;
        }

        try {
            await addTask(title);
            input.value = "";
            renderTasks();
        } catch (error) {
            if (error instanceof Error) {
                alertBox.style.display = "block";
                alertBox.textContent = error.message;
            }
        }
    });

    renderTasks();
}

// Export default 
export default initApp;
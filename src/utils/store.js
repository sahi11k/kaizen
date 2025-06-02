import {
  getDataFromLocalStorage,
  setItemInLocalStorage,
} from "./localstorage.js";
import { deepCopy } from "./utils.js";

export default {
  tasks: getDataFromLocalStorage(),
  getTasks() {
    return this.tasks;
  },
  getTaskById(id) {
    const task = this.tasks.find((task) => task.id === id);
    return deepCopy(task);
  },
  addTask(task) {
    const allTasks = [...this.tasks, task];
    this.updateTasks(allTasks);
  },
  updateTask(updatedTask) {
    const updatedTasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.updateTasks(updatedTasks);
  },
  removeTask(id) {
    const filteredTasks = this.tasks.filter((t) => t.id !== id);
    this.updateTasks(filteredTasks);
  },
  updateTasks(tasks) {
    this.tasks = tasks;
    setItemInLocalStorage(this.tasks);
  },
};

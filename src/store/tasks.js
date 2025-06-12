const { create } = require("zustand");

const useTasksStore = create((set) => ({
  tasks: [],
}));

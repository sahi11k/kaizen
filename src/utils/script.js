import store from "../../store.js";
import { initDailyProgress } from "./dailyProgress.js";
import { initTasks } from "./tasks.js";
import { initTimer } from "./timer.js";
import { initTaskModal } from "./addTaskModal.js";
import { initFooter } from "./footer.js";

function init() {
  initTasks(store);
  initDailyProgress(store);
  initTimer(store);
  initTaskModal();
  initFooter();
}

init();

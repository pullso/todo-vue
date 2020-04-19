import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]").map((task) => {
      if (new Date(task.date) < new Date()) task.status = "срок истек";
      return task;
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      console.log(state.tasks);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask(state, { id, description, date }) {
      const tasks = state.tasks.concat();
      const index = tasks.findIndex((t) => t.id === id);
      const task = tasks[index];
      const status = new Date(date) > new Date() ? "активна" : "срок истек";
      tasks[index] = { ...task, date, description, status };
      debugger;
      state.tasks = tasks;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex((t) => t.id === id);
      state.tasks[idx].status = "выполнена";
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit("createTask", task);
    },
    updateTask({ commit }, task) {
      commit("updateTask", task);
    },
    completeTask({ commit }, id) {
      commit("completeTask", id);
    }
  },
  getters: {
    tasks: (s) => s.tasks,
    taskById: (s) => (id) => s.tasks.find((t) => t.id === id)
  }
});

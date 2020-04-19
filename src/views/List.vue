<template>
  <div>
    <h1>Список задач</h1>

    <div class="row">
      <div class="input-field col s6">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Выберите фильтр </option>
          <option value="активна">Задача активна</option>
          <option value="срок истек">Срок задачи истек</option>
          <option value="выполнена">Задача выполнена</option>
        </select>
        <label>Фильтр</label>
      </div>
    </div>

    <button class="btn btn-small red" @click="filter = null" v-if="filter">
      Очистить фильтр
    </button>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Название задачи</th>
          <th>Дата</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in displayTasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td-fixed">
            <div class="text">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn blue darken-2 btn-small"
              :to="'/task/' + task.id"
            >
              Открыть
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Список задач пуст</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: null
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select, {});
  }
};
</script>

<style lang="scss" scoped>
.td-fixed {
  max-width: 400px;
}
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

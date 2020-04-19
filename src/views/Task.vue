<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>

      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea textarea"
            maxlength="2048"
          ></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px;"
            >{{ description.length }}/2048</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <div v-if="task.status !== 'выполнена'">
          <button class="btn btn_mr blue darken-2" type="submit">
            обновить
          </button>
          <button class="btn green" type="submit" @click="completeTask">
            выполнена
          </button>
        </div>
      </form>
    </div>
    <div v-else>Задача не найдена</div>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    }
  },
  data() {
    return {
      description: "",
      chips: null,
      date: null
    };
  },
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "теги",
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date
      });
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  min-height: 150px;
}
.btn_mr {
  margin-right: 1rem;
}
</style>

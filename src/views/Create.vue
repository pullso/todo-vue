<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h2>добавить задачу</h2>
      <form @submit.prevent="submitHandler">
        <div class="input-field ">
          <input
            v-model="title"
            id="title"
            type="text"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="Поле название задачи - обязательно"
          ></span>

          <label for="title">Название задачи</label>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field ">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px;"
            >{{ description.length }}/2048</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <button class="btn" type="submit">добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "create",
  data() {
    return {
      description: "",
      title: "",
      chips: null,
      date: null
    };
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "теги"
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date
      };
      console.log("task: ", task);
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

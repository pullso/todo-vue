<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper blue darken-3">
      <router-link to="/" class="brand-logo">Менеджер задач</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active"
          ><a href="#">Добавить задачу</a></router-link
        >
        <router-link tag="li" to="/list" exact active-class="active"
          ><a href="#">Список задач</a></router-link
        >
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2em;
}
</style>

<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div> -->
      <!-- <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button type="primary">Button</Button> -->
      <!-- <el-button type="primary">Button</el-button> -->
    <!-- </div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content-container {
  padding: 15px;
}

.container-card-title {
  text-align: left;
  font-size: 15px;
}
</style>

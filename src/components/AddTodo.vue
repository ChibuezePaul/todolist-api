<template>
  <div>
    <form @submit="addTodo">
      <input type="text" name="title" required placeholder="Add Todo..." v-model="title">
      <input type="submit" value="Add" class="btn">
    </form>
  </div>
</template>

<script>
// import uuid from "uuid";
// const uuid = require("uuid");
export default {
  name: "AddTodo",
  data(){
    return {
      title: ""
    }
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      const todo = {
        // id : uuid.v4(),
        title : this.title,
        completed: false
      };
      this.$emit("add-todo", todo);
      this.title = "";
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>
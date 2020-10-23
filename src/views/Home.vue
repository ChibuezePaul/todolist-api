<template>
  <div id="app">
    <Header/>
    <AddTodo v-on:add-todo="addTodo"/>
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
  </div>
</template>

<script>
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
import axios from "axios";
export default {
  name: 'Home',
  components: {
    Todos,
    AddTodo
  },
  data(){
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo(id) {
      axios.delete(`http://localhost:3000/todo?id=${id}`)
      .then(response => this.todos = response.data)
      .catch(error => console.error(error));
      // this.todos = this.todos.filter(todo => todo.id !== id);
    },

    addTodo(todo){
      const { title, completed } = todo;
      axios.post("http://localhost:3000/todo", {
        title,
        completed
      })
      .then(response => this.todos = response.data)
      .catch(error => console.error(error));
    }
  },
  created() {
    axios.get("http://localhost:3000/todo")
    // fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => this.todos = response.data)
    .catch(error => {
      console.error(error);
      this.todos = [{"id":0, "title": "Network Unavailable", "completed": false}];
    });
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>

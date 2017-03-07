<template>
  <header class="header">
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
</template>

<script>
'use strict'

export default {
  name: 'todo-input',
  data () {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.$emit('addTodo', { title: value, completed: false })
      this.newTodo = '';
    }
  }
}
</script>

<style></style>

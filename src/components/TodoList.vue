<template>
  <section class="main" v-show="total > 0">
    <slot>
      <!-- fallback of all done button -->
    </slot>
    <ul class="todo-list">
      <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editedTodo}">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input
          class="edit"
          type="text"
          :value="todo.title"
          @input="curTitle = $event.target.value"
          v-todo-focus="editedTodo === todo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'todo-list',
  props: ['total', 'filteredTodos'],

  data () {
    return {
      editedTodo: null,
      curTitle: ''
    }
  },

  methods: {
    editTodo(todo) {
      this.beforeEditCache = this.curTitle = todo.title
      this.editedTodo = todo
    },
    removeTodo(todo) {
      this.$emit('removeTodo', todo)
    },
    cancelEdit(todo) {
      //TODO: FIX @keyup.esc failure to call cancelEdit, call doneEdit directly instead
      this.editedTodo = null;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      this.$emit('editTodo', todo, this.curTitle)
      this.editedTodo = null
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style></style>

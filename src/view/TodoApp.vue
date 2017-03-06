<template>
  <div>
    <todo-input
      @addTodo="addTodo">
    </todo-input>

    <todo-list
      :todos="todos"
      :filteredTodos="filteredTodos"
      @editTodo="editTodo"
      @removeTodo="removeTodo">
      <input class="toggle-all" type="checkbox" v-model="allDone">
    </todo-list>

    <todo-filter
      :todos="todos"
      :remaining="remaining"
      :visibility="visibility"
      @removeCompleted="removeCompleted">
    </todo-filter>
  </div>
</template>

<script>
import store from '../store'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFilter from '../components/TodoFilter.vue'

let filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter( todo => !todo.completed ),
  completed: (todos) => todos.filter( todo => todo.completed )
}

export default {
  name: 'todo-app',

  props: ['visibility'],

  components: {
    TodoInput,
    TodoList,
    TodoFilter
  },

  data () {
    return {
      todos: store.fetch()
    }
  },

  // watch changes and save to localStorage
  watch: {
    todos: {
      deep: true,
      handler: store.save
    }
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
    allDone: {
      set(val) {
        this.todos.forEach( todo => { todo.completed = val } )
      },
      get() {
        return this.remaining === 0
      }
    }
  },

  methods: {
    addTodo(todo) {
      this.todos.push(todo)
    },
    editTodo(todo, title) {
      // alert(`todo: ${todo.title}, edited: ${title}`)
      todo.title = title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    removeTodo(todo) {
      let index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    removeCompleted() {
      let completedTodos = filters.completed(this.todos)
      for (let todo of completedTodos) {
        this.removeTodo(todo)
      }
    }
  }
}
</script>

<style></style>

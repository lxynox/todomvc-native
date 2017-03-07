<template>
  <footer class="footer" v-show="total > 0">
    <span class="todo-count">
      <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
      <li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
      <li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="total > remaining">
      Clear completed
    </button>
  </footer>
</template>

<script>
'use strict'

export default {
  name: 'todo-filter',
  props: ['total', 'remaining', 'visibility'],

  methods: {
    removeCompleted() {
      this.$emit('removeCompleted')
    },
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    }
  }
}
</script>

<style></style>

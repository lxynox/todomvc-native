<template>
  <footer class="footer" v-show="total > 0">
    <span class="todo-count">
       剩余 <strong v-text="remaining"></strong> {{pluralize('item', remaining)}}
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{selected: visibility == 'all'}">全部记录 ▲ </a></li>
      <li><a href="#/active" :class="{selected: visibility == 'active'}">未完成 ✘</a></li>
      <li><a href="#/completed" :class="{selected: visibility == 'completed'}">已完成 ✔︎</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="total > remaining">
      清空已完成 🗑
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

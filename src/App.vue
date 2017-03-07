<template>
  <div>
    <h1><span>Deadly Simple</span>📝</h1>
    <router-view class="view"></router-view>
  </div>
</template>

<style lang="stylus">
  h1
    font-family: fantasy
    font-size: 1em
    span
      color: #EEE8D5
      &:before
        content: '❬'
      &:after
        content: '❭'
</style>

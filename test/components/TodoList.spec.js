import Vue from 'vue'
import TodoList from '../../src/components/TodoList.vue'

function simulateClickEvt(target) {
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('dblclick', false, false)
  target.dispatchEvent(evt)
}

describe('TodoList.vue', function() {
  const propsData = {}
  propsData.todos = propsData.filteredTodos = [...Array(5)].map((v,k) => ({title: `item ${k}`, completed: false}))

  let Ctor = Vue.extend(TodoList)
  let vm = new Ctor({ propsData }).$mount()

  it('should auto focus the text input when todo label is double clicked', function() {
    let labels = vm.$el.querySelectorAll('div.view label')
    let textInputs = vm.$el.querySelectorAll('input.edit')

    simulateClickEvt(labels[1])
    expect(vm.editedTodo === vm.filteredTodos[1]).to.be.true
  })

})

import Vue from 'vue'
import TodoInput from '../../src/components/todo-input.vue'

function simulateKeypress(target, keyCode) {
  let e = document.createEvent('HTMLEvents')
  e.initEvent('keyup', true, false)
  e.keyCode = keyCode
  target.dispatchEvent(e)
}

describe('TodoInput.vue', function() {
  let Ctor = Vue.extend(TodoInput)
  let vm = new Ctor().$mount()
  let spy = sinon.spy()
  vm.$on('addTodo', spy)

  it('should not fire `addTodo` event for empty input', function() {
    let input = vm.$el.querySelector('input.new-todo')
    simulateKeypress(input, 13)
    expect(spy.notCalled).to.be.true
  })

  it('should fire `addTodo` event for non-empty input', function() {
    let input = vm.$el.querySelector('input.new-todo')
    vm.newTodo = 'sleep'
    simulateKeypress(input, 13)
    expect(spy.called).to.be.true
    expect(vm.newTodo).to.be.empty
  })
})

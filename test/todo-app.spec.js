import Vue from 'vue'
import TodoApp from '../src/view/todo-app.vue'
import store from '../src/store'

describe('TodoApp.vue', function() {
  let Ctor
  let vm

  beforeEach(function() {
    Ctor = Vue.extend(TodoApp)
    vm = new Ctor({propsData: {visibility: 'all'}}).$mount()
  })

  it('should get initial todo items from store', function() {
    sinon.spy(store, 'fetch')
    Ctor = Vue.extend(TodoApp)
    new Ctor({propsData: {visibility: 'all'}}).$mount()
    expect(store.fetch.calledOnce).to.be.true
  })

  it('should save items to store when todo changes', function() {
    sinon.spy(store, 'save')
    vm.$watch('todos', store.save, {deep: true})
    vm.todos.push({
      title: 'sleep',
      completed: false
    })

    vm.$nextTick(() => {
      expect(store.save.called).to.be.true
      store.save.restore()
    })
  })

  it('should be able to add todo item', function() {
    const todoInput = vm.$children[0]
    const todo = {
      title: 'eat',
      completed: false
    }
    vm.todos = []
    todoInput.$emit('addTodo', todo)
    expect(vm.todos[0] === todo).to.be.true
  })

  it('should be able to edit a todo item', function() {
    const todoList = vm.$children[1]
    const todo = {
      title: 'eat',
      completed: false
    }
    const editedTitle = 'eat and sleep'
    vm.todos = []
    vm.todos.push(todo)
    todoList.$emit('editTodo', vm.todos[0], editedTitle)
    expect(vm.todos[0].title).to.equal('eat and sleep')
  })

  it('should be able to remove a todo item', function() {
    const todoList = vm.$children[1]
    const todo = {
      title: 'eat',
      completed: false
    }
    vm.todos = []
    vm.todos.push(todo)
    todoList.$emit('removeTodo', vm.todos[0])
    expect(vm.todos).to.be.lengthOf(0)
  })
})

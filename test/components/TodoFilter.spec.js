import Vue from 'vue'
import TodoFilter from '../../src/components/TodoFilter.vue'

describe('TodoFilter.vue', function () {

  let vm
  let Ctor = Vue.extend(TodoFilter)

  beforeEach(function() {
    const propsData = {
      total: 0,
      remaining: 0,
      visibility: 'all'
    }
    vm = new Ctor({ propsData }).$mount()
  })

  it('should hide the footer when no todo items', function() {
    let footer = vm.$el
    expect(footer.style.display).to.equal('none')

    vm.$props.total = 2
    Vue.nextTick(() => {
      expect(footer.style.display).to.be.empty
    })
  })

  it('should hide the clear-completed button when no item is completed', function() {
    let btn = vm.$el.querySelector('button.clear-completed')
    expect(btn.style.display).to.equal('none')
  })

  it('should highlight the active filter link', function () {
    vm.$props.visibility = 'active'

    let anchors = vm.$el.querySelectorAll('ul> li> a')
      Vue.nextTick(() => {
      expect(anchors[1].className).to.include('selected')
      expect(anchors[0].className).to.not.include('selected')
      expect(anchors[2].className).to.not.include('selected')
    })
  })

  it('should compute remaining items properly', function () {
    expect(vm.pluralize('item', 0)).to.equal('items')
    expect(vm.pluralize('item', 1)).to.equal('item')
  })
})

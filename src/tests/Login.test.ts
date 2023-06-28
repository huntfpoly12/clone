import { mount } from "@vue/test-utils"
import Login from "../views/Login.vue"
import { describe, expect, it as test, test as it } from "vitest"

describe('Test Login', () => {
  test('Should be login success {id: C23050301} {pw: 1234567890}', async () => {
    // Thực hiện test case login success
  })

  test('Should be login failure {id: a} {pw: a}', async () => {
    const wrapper = mount(Login)
    const reactiveProperty = wrapper.vm.errors
    
    expect(reactiveProperty).toEqual(null) // Kiểm tra giá trị ban đầu của reactiveProperty

    await wrapper.find("#username").setValue('a')
    await wrapper.find("#password").setValue('b')
    await wrapper.vm.$nextTick()
    await wrapper.find("#submitLogin").trigger('click')
console.log(wrapper.html() );


    const updateProperty = wrapper.vm.errors
    expect(updateProperty).toBe(true)
  })
})

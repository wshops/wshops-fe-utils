import './message.less'
import Message from './message'
import Validator from './validation'
import { InputRules } from './validation/types'
import WshopUtils from './index'

const msg = new Message()
document.getElementById('msg-test')!.addEventListener('click', () => {
  msg.success('成功！！！').then(async () => {
    await new Promise(r => setTimeout(r, 500))
    msg.info('hi').then(async () => {
      await new Promise(r => setTimeout(r, 500))
      msg.warn('fuck').then(async () => {
        await new Promise(r => setTimeout(r, 500))
        msg.error('omg!').then(async () => {
          await new Promise(r => setTimeout(r, 500))
          const loading = msg.loading()
          setTimeout(loading, 10000)
        })
      })
    })
  })
})

const v = new Validator({
  onValid: result => {
    msg.success(`${result.inputElement.textContent} is (${result.isValid}), msg: ${result.message}`)
  },
  onInvalid: result => {
    msg.warn(`${result.inputElement.textContent} is (${result.isValid}), msg: ${result.message}`)
  }
}, true)

const validationRules: Array<InputRules> = [
  {
    element: document.getElementById('username')!,
    rules: [
      {
        validatorName: 'required',
        invalidMessage: 'username is required'
      },
      {
        validatorName: 'alphanum',
        invalidMessage: 'wrong username format'
      }
    ]
  },
  {
    element: document.getElementById('password')!,
    rules: [
      {
        validatorName: 'required',
        invalidMessage: 'password is required'
      },
      {
        validatorName: 'upper',
        invalidMessage: 'wrong password format'
      }
    ]
  }
]

v.init(validationRules)

document.getElementById('test-form')!.addEventListener('submit', e => {
  e.preventDefault()
  v.validate()
  alert(JSON.stringify(new WshopUtils().formDataToObject('test-form')))
})
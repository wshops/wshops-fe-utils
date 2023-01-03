import { InputRules } from './validation/types'
import WshopUtils from './index'

const v = new WshopUtils().vd(true)

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
        customValidator: (value: string): boolean => {
          return value.length >= 6
        },
        invalidMessage: 'password length must be greater than 6'
      }
    ]
  }
]

v.init(validationRules)

document.getElementById('test-form')!.addEventListener('submit', e => {
  e.preventDefault()
  v.validate()
  alert(JSON.stringify(new WshopUtils().formDataToObject('test-form')))

  new WshopUtils().api().get('example.com').then(res => {
    console.log(res)
  })
})
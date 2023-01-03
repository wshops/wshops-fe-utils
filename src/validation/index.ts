import { FormValidationFeedbackHandlers, FormValidationResult, InputRules, Rule } from './types'
import RulesSet from './rules'

export default class Validation {
  private readonly _feedbackHandlers: FormValidationFeedbackHandlers
  private initialized: boolean = false
  private _withAsync: boolean
  private validateResult: boolean
  private inputRules: InputRules[] = []

  constructor (feedbackHandlers: FormValidationFeedbackHandlers, withAsync?: boolean) {
    this._feedbackHandlers = feedbackHandlers
    if (withAsync === undefined) {
      this._withAsync = true
    } else {
      this._withAsync = withAsync
    }
    this.validateResult = false
  }

  public init (inputRules: InputRules[]): Validation {
    this.inputRules = inputRules
    if (this._withAsync) {
      for (const inputRule of inputRules) {
        inputRule.element.addEventListener('input', () => {
          this.handleValidateField(inputRule.element, inputRule.rules)
        })
        inputRule.element.addEventListener('propertychange', () => {
          this.handleValidateField(inputRule.element, inputRule.rules)
        })
      }
    }
    this.initialized = true
    return this
  }

  public withAsync (): Validation {
    this._withAsync = true
    return this
  }

  public noAsync (): Validation {
    this._withAsync = false
    return this
  }

  public validate (): Validation {
    if (!this.initialized) {
      console.error('请先执行init()函数')
      return this
    }
    for (const inputRule of this.inputRules) {
      this.handleValidateField(inputRule.element, inputRule.rules)
    }
    return this
  }

  public getResult (): boolean {
    return this.validateResult
  }

  private handleValidateField (element: HTMLElement, rules: Rule[]) {
    if (!this.initialized) {
      console.error('请先执行init()函数')
      return
    }
    let resultResponse: FormValidationResult = {
      isValid: false,
      inputElement: element,
      message: ''
    }
    if (element === undefined) {
      resultResponse.message = '无效输入参数!'
      this.validateResult = false
      this._feedbackHandlers.onInvalid(resultResponse)
      return
    }
    if (rules.length === 0) {
      resultResponse.message = '无效的规则集!'
      this.validateResult = false
      this._feedbackHandlers.onInvalid(resultResponse)
      return
    }
    for (const rule of rules) {
      if (rule.validatorName !== undefined && rule.validatorName !== null || rule.validatorName !== '') {
        if (RulesSet.hasOwnProperty(rule.validatorName!)) {
          //has preset regex
          if (!RulesSet[rule.validatorName!]!.test((<HTMLInputElement>element).value)) {
            resultResponse.isValid = false
            resultResponse.message = rule.invalidMessage
            this.validateResult = false
            this._feedbackHandlers.onInvalid(resultResponse)
            return
          }
        }
      } else {
        //use custom validation
        if (!rule.customValidator!(((element as HTMLInputElement).value))) {
          resultResponse.isValid = false
          resultResponse.message = rule.invalidMessage
          this.validateResult = false
          this._feedbackHandlers.onInvalid(resultResponse)
          return
        }
      }
    }
    this.validateResult = true
    resultResponse.isValid = true
    resultResponse.message = 'success'
    this._feedbackHandlers.onValid(resultResponse)
  }
}
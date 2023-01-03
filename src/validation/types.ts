export interface FormValidationResult {
  isValid: boolean,
  inputElement: HTMLElement,
  message?: string,
}

export interface FormValidationFeedbackHandlers {
  onValid: (result: FormValidationResult) => void,
  onInvalid: (result: FormValidationResult) => void
}

export interface InputRules {
  element: HTMLElement,
  rules: Array<Rule>
}

export interface Rule {
  validatorName?: keyof RegexRules
  customValidator?: (value: string) => boolean,
  invalidMessage: string
}

export type RegexRules = {
  [key: string]: RegExp
}
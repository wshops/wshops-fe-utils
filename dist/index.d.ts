// Generated by dts-bundle-generator v7.1.0

import { AxiosInstance, AxiosResponse } from 'axios';

export interface FormValidationResult {
	isValid: boolean;
	inputElement: HTMLElement;
	message?: string;
}
export interface FormValidationFeedbackHandlers {
	onValid: (result: FormValidationResult) => void;
	onInvalid: (result: FormValidationResult) => void;
}
export interface InputRules {
	element: HTMLElement;
	rules: Array<Rule>;
}
export interface Rule {
	validatorName?: keyof RegexRules;
	customValidator?: (value: string) => boolean;
	invalidMessage: string;
}
export type RegexRules = {
	[key: string]: RegExp;
};
export interface ApiRequestFeedbackHandlers {
	onSuccess: (message: string) => void;
	onError: (message: string) => void;
	onInfo: (message: string) => void;
	onWarning: (message: string) => void;
	onUnAuthorized: (message: string) => void;
}
declare class ApiUtils {
	private readonly _instance;
	private readonly _feedbackHandlers;
	constructor(feedbackHandlers: ApiRequestFeedbackHandlers);
	get currentAxiosInstance(): AxiosInstance;
	newAxiosInstance(): AxiosInstance;
	setHeader(key: string, value: string): void;
	get(url: string, data?: any): Promise<AxiosResponse<any, any> | any>;
	post(url: string, data?: object): Promise<AxiosResponse<any, any> | any>;
	put(url: string, data?: object): Promise<AxiosResponse<any, any> | any>;
	del(url: string, data?: object): Promise<AxiosResponse<any, any> | any>;
	patch(url: string, data?: object): Promise<AxiosResponse<any, any> | any>;
	private responseInterceptorOnSuccess;
	private responseInterceptorOnError;
}
declare class Validation {
	private readonly _feedbackHandlers;
	private initialized;
	private _withAsync;
	private validateResult;
	private inputRules;
	constructor(feedbackHandlers: FormValidationFeedbackHandlers, withAsync?: boolean);
	init(inputRules: InputRules[]): Validation;
	withAsync(): Validation;
	noAsync(): Validation;
	validate(): Validation;
	getResult(): boolean;
	private handleValidateField;
}
declare class Dsync {
	private _data;
	constructor();
	set(key: string, value: string | number | object): void;
	get(key: string): string | number | object | undefined;
	remove(key: string): void;
	has(key: string): boolean;
}
export interface FeedbackHandlers {
	apiFeedbacks?: ApiRequestFeedbackHandlers;
	formValidationFeedbacks?: FormValidationFeedbackHandlers;
}
export interface WshopUtilsConfiguration {
	feedbacks?: FeedbackHandlers;
	apiVersion?: string;
}
export default class WshopUtils {
	private _config;
	private readonly _api;
	private readonly _validator;
	private readonly _dsync;
	constructor(config?: WshopUtilsConfiguration);
	setApiFeedbacks(fb: ApiRequestFeedbackHandlers): void;
	setFormValidationFeedbacks(fb: FormValidationFeedbackHandlers): void;
	api(): ApiUtils;
	vd(withAsync?: boolean): Validation;
	md5(str: string): string;
	sha256(str: string): string;
	formDataToObject(formId: string): any;
	base64Encode(str: string): string;
	base64Decode(str: string): string;
	dsync(): Dsync;
}

declare module '@wshops/utils'
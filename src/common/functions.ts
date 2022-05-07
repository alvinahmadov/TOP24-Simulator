import axios,
{ AxiosRequestConfig }               from 'axios';
import faker                         from '@faker-js/faker';
import { HttpMethod }                from './types';
import { ADMIN_HOSTLOGIN, BASE_URL } from './constants';
import { ROUTES }                    from '../api/routes';

export let AccessToken: string;

export async function authorize() {
	const { data: { accessToken } } = await axios.post(
		ADMIN_HOSTLOGIN, {
			email:    "sysadmin@mail.com",
			password: "systemadminpwd"
		});
	return accessToken;
}

export function apiUrl(key: any, ...routes: string[]) {
	// @ts-ignore
	let url = BASE_URL + ROUTES[key].path;

	for(const route of routes) {
		// @ts-ignore
		url = url + ROUTES[route].routes[route];
	}

	return url;
}

export function randomOf<T>(...args: T[]): T {
	const size = args?.length;
	const rand = Math.floor(Math.random() * size);
	return args[rand];
}

export function dateBetween(yearMin: number, yearMax: number) {
	return faker.date.between(new Date(yearMin), new Date(yearMax));
}

export function randomFrom(end: number, start: number = 0): number {
	const range: number[] = [];
	for(let i = start; i < end; i++) range.push(i);
	return randomOf(...range);
}

export function generateAddress() {
	return `${faker.address.country()}, ${faker.address.city()}, ${faker.address.streetAddress(true)}`;
}

export function generateSerialNumber(format: number[]) {
	const length = format.reduce((p, c) => p + c);
	const min = Math.pow(9, length);
	const max = Math.pow(10, length);
	let data: number = faker.datatype.number({ min, max });
	let start: number = 0;
	let result: string = ''
	for(let i = 0; i < format.length; ++i) {
		result += data.toString().substr(start, format[i]) + ' ';
		start = i + 1;
	}
	return result;
}

export function formatUrl(url: string, argObject?: any) {
	if(!argObject)
		return url;

	const argKeys = Object.keys(argObject);
	for(const key of argKeys) {
		url = url.replace(`:${key}`, argObject[key]);
	}

	return url;
}

export async function test(testMethod: (...args: any[]) => any, ...args: any[]) {
	let result: any;
	try {
		result = await testMethod(...args);
		console.debug(result);
	} catch(e) {
		console.error(e);
	}
	return result;
}

export async function tests(testList: Array<{ func: (...args: any[]) => any; args?: any[] }>): Promise<void> {
	let result: any;
	for(let i = 0; i < testList.length; ++i) {
		console.debug(`######################## TEST ${i + 1} ########################`);
		if(testList[i].args) {
			result = await test(testList[i].func, ...testList[i].args);
		}
		else {
			result = await test(testList[i].func);
		}
		if(!!result)
			console.debug(`######################## TEST ${i + 1} PASSED ########################`);
		else
			console.debug(`######################## TEST ${i + 1} FAILED ########################`);
	}
}

export namespace Http {
	export async function method<R = any>(
		url: string,
		method: HttpMethod = 'get',
		data?: any,
		config?: AxiosRequestConfig
	): Promise<R> {
		console.debug({ url, method, data, config })
		let result: any;
		switch(method) {
			case "post":
				result = await post<R>(url, data, config);
				break;
			case "get":
				result = await get<R>(url, config);
				break;
			case "put":
				result = await put<R>(url, data, config);
				break;
			case "patch":
				result = await patch<R>(url, data, config);
				break;
			case "delete":
				result = await del<R>(url, config);
				break;
		}
		return result;
	}

	export async function post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig) {
		if(!AccessToken)
			AccessToken = await authorize();

		const { data: result } = await axios.post(url, data, {
			...(config ?? {}),
			headers: {
				'Authorization': AccessToken,
				'Content-Type':  'application/json'
			}
		});

		return result;
	}

	export async function get<R = any>(url: string, config?: AxiosRequestConfig) {
		if(!AccessToken)
			AccessToken = await authorize();

		if(!config)
			config = {};

		const { data: result } = await axios.get(url, {
			...(config ?? {}),
			headers: {
				'Authorization': AccessToken,
				'Content-Type':  'application/json'
			}
		});

		return result;
	}

	export async function put<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
		if(!AccessToken)
			AccessToken = await authorize();

		if(!config)
			config = {};

		const { data: result } = await axios.put(url, data, {
			...(config ?? {}),
			headers: {
				'Authorization': AccessToken,
				'Content-Type':  'application/json'
			}
		});

		return result;
	}

	export async function patch<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
		if(!AccessToken)
			AccessToken = await authorize();

		if(!config)
			config = {};

		const { data: result } = await axios.patch(url, data, {
			...(config ?? {}),
			headers: {
				'Authorization': AccessToken,
				'Content-Type':  'application/json'
			}
		});

		return result;
	}

	export async function del<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
		if(!AccessToken)
			AccessToken = await authorize();

		if(!config)
			config = {};

		const { data: result } = await axios.delete(url, {
			...(config ?? {}),
			headers: {
				'Authorization': AccessToken,
				'Content-Type':  'application/json'
			}
		});

		return result;
	}
}
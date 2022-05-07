// noinspection JSUnusedGlobalSymbols

import { ROUTES }           from './routes'
import * as types           from '../common/types';
import * as filters         from '../common/filters';
import { ORDER_DRIVER_API } from '../common/constants';
import * as funcs           from '../common/functions';
import Http = funcs.Http;

// const DEBUG = false;
const routes = ROUTES.order_driver.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(ORDER_DRIVER_API + path, obj);
const method = (url: string, filter: any) => Http.method(
	url,
	filter ? routes.filter.method : 'get',
	filter
);

export async function getAssociations(
	listFilter?: filters.IListFilter,
	filters?: filters.IOrderAssociationFilter
)
	: Promise<Array<types.IOrderAssociation>> {
	const { full } = listFilter ?? { full: true };
	const ordListUrl = filters ? apiUrl(routes.filter.path) : ORDER_DRIVER_API;
	const url = `${ordListUrl}${full ? '?full=true' : ''}`;
	console.debug({ test: 'getAssociations', url });
	return method(url, filters);
}

export async function getAssociation(id: string): Promise<types.IOrderAssociation> {
	const url = apiUrl(routes.index.path, { id });
	console.debug({ test: 'getAssociation', url });
	return Http.method(url, routes.index.method);
}

export async function getAssociationDrivers(orderId: string): Promise<Array<types.IDriver>> {
	const url = apiUrl(routes.driver.path, { orderId })
	console.debug({ test: 'getDrivers', url });

	return Http.method(url, routes.driver.method);
}

export async function getAssociationTransports(
	orderId: string,
	filter?: filters.IOrderTransportAssociationFilter & filters.IDriverFilter
) {
	const url = apiUrl(routes.transport.path, { orderId });
	console.debug({ test: 'getTransports', url, filter });
	return Http.method(url, routes.transport.method, filter);
}

export async function assignDrivers(
	orderId: string,
	driverList: { drivers: types.DriverAssociation[] },
	listFilter: filters.IListFilter = {}
): Promise<types.IOrderAssociation[]> {
	const { full } = listFilter;
	const path = routes.assignList.path;
	const url = apiUrl(full ? `${path}?full=true` : path, { orderId });
	console.debug({ test: 'assignDrivers', url, driverList, listFilter });

	return Http.method(url, routes.assignList.method, driverList);
}
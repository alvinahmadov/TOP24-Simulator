import { ROUTES }           from './routes'
import * as types           from '../common/types';
import * as filters         from '../common/filters';
import { ORDER_DRIVER_API } from '../common/constants';
import * as funcs           from '../common/functions';
import Http = funcs.Http;

const DEBUG = false;
const routes = ROUTES.order_driver.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(ORDER_DRIVER_API + path, obj);

export async function getAssociations(listFilter: filters.IListFilter = {})
	: Promise<Array<types.IOrderAssociation>> {
	const { full } = listFilter;
	const url = full ? `${ORDER_DRIVER_API}?full=true` : ORDER_DRIVER_API;
	const result = await Http.get(url);
	console.debug({ test: 'getAssociations', url });
	if(DEBUG) {
		for(const item of result) {
			console.debug({ item });
		}
	}
	return result;
}

export async function getAssociation(id: string): Promise<types.IOrderAssociation> {
	const url = apiUrl(routes.index.path, { id });
	console.debug({ test: 'getAssociation', url });

	return Http.method(url, routes.index.method);
}

export async function getDrivers(orderId: string): Promise<Array<types.IDriver>> {
	const url = apiUrl(routes.driver.path, { orderId })
	console.debug({ test: 'getDrivers', url });

	return Http.method(url, routes.driver.method);
}

export async function getTransports(
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
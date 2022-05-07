import { ROUTES }        from './routes';
import * as types        from '../common/types';
import * as filters      from '../common/filters';
import * as funcs        from '../common/functions';
import { TRANSPORT_API } from '../common/constants';
import Http = funcs.Http;

const routes = ROUTES.transport.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(TRANSPORT_API + path, obj);

export async function getTransports(
	filters?: filters.ITransportFilter,
	listFilter?: filters.IListFilter
): Promise<types.ITransport[]> {
	const { full } = listFilter ?? {};
	const listUrl = filters ? apiUrl(routes.filter.path) : TRANSPORT_API
	const url = full ? `${listUrl}?full=true` : listUrl;
	return Http.method(url, routes.driver.path, filters);
}

export async function getDriverTransports(
	driverId: string,
	filters?: filters.ITransportFilter,
	listFilter?: filters.IListFilter
): Promise<types.ITransport[]> {
	const { full } = listFilter ?? {};
	const getUrl = apiUrl(routes.driver.path, { driverId });
	const url = full ? `${getUrl}?full=true` : getUrl;
	return Http.method(url, routes.driver.method, filters);
}

export async function updateTransport(id: string, data: Partial<types.ITransport>) {
	const url = apiUrl(routes.update.path, { id });
	return Http.method<types.ITransport>(url, routes.update.method, data);
}

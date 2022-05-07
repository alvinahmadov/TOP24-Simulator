import { ROUTES }     from './routes';
import * as types     from '../common/types';
import * as filters   from '../common/filters';
import * as funcs     from '../common/functions';
import { DRIVER_API } from '../common/constants';

import Http = funcs.Http;

const routes = ROUTES.order.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(DRIVER_API + path, obj);
const method = (url: string, filter: any) => Http.method(
	url,
	filter ? routes.filter.method : 'get',
	filter
);

export async function getDrivers(
	filters?: filters.IDriverFilter,
	listFilter: filters.IListFilter = {}
): Promise<(types.IDriver & { transports?: types.ITransport[] })[]> {
	const { full } = listFilter ?? { full: true };
	const drListUrl = filters ? apiUrl(routes.filter) : DRIVER_API;
	const url = full ? `${drListUrl}?full=true` : drListUrl;
	return method(url, filters);
}
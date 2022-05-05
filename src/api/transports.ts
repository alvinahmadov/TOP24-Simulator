import { ROUTES }        from './routes';
import * as types        from '../common/types';
import * as filters      from '../common/filters';
import { TRANSPORT_API } from '../common/constants';
import * as funcs        from '../common/functions';
import Http = funcs.Http;

const routes = ROUTES.transport.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(TRANSPORT_API + path, obj);

export async function getTransports(
	listFilter: filters.IListFilter = {},
	filters?: filters.ITransportFilter
): Promise<types.ITransport[]> {
	const { full } = listFilter;
	const url = full ? `${TRANSPORT_API}?full=true` : TRANSPORT_API;
	return Http.get(url, { data: filters });
}

export async function updateTransport(id: string, data: Partial<types.ITransport>) {
	const url = apiUrl(routes.update.path, { id });
	return Http.method<types.ITransport>(url, routes.update.method, data);
}
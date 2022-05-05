import { ROUTES }    from './routes';
import * as types    from '../common/types';
import * as filters  from '../common/filters';
import * as funcs    from '../common/functions';
import { ORDER_API } from '../common/constants';
import Http = funcs.Http;

const routes = ROUTES.order.routes;
const apiUrl = (path: string, obj?: any) => funcs.formatUrl(ORDER_API + path, obj);

export async function getOrders(
	filters?: filters.IOrderFilter,
	listFilter: filters.IListFilter = {}
): Promise<types.IOrder[]> {
	const { full } = listFilter;
	const url = full ? `${ORDER_API}?full=true` : ORDER_API;
	return Http.get(url, { data: filters });
}

export async function updateOrder(id: string, data: Partial<types.IOrder>) {
	const url = apiUrl(routes.update.path, { id });
	return Http.method<types.IOrder>(url, routes.update.method, data);
}
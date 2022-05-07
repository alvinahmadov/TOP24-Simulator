import { ROUTES }                       from './routes';
import * as types                       from '../common/types';
import * as enums                       from '../common/enums';
import * as filters                     from '../common/filters';
import * as funcs                       from '../common/functions';
import { COMPANY_INN_API, COMPANY_API } from '../common/constants';
import Http = funcs.Http;

const routes = ROUTES.order.routes;
const apiUrl = (
	path: string,
	type: enums.CompanyType = enums.CompanyType.ORGANISATION,
	obj?: any
) => funcs.formatUrl(type === enums.CompanyType.ORGANISATION
                     ? COMPANY_API
                     : COMPANY_INN_API + path,
                     obj);
const method = (url: string, filter: any) => Http.method(
	url,
	filter ? routes.filter.method : 'get',
	filter
);

export async function getCompanies(
	filters?: filters.ICargoCompanyFilter,
	listFilter: filters.IListFilter = {}
): Promise<types.ICargoCompany[]> {
	const { full } = listFilter;
	const listUrl = filters ? apiUrl(routes.filter.path, enums.CompanyType.ORGANISATION)
	                        : COMPANY_API;
	const url = `${listUrl}${full ? '?full=true' : ''}`;
	return await method(url, filters);
}

export async function getInnCompanies(
	filters?: filters.ICargoInnCompanyFilter,
	listFilter: filters.IListFilter = {}
): Promise<types.ICargoInnCompany[]> {
	const { full } = listFilter;
	const listUrl = filters ? apiUrl(routes.filter.path, enums.CompanyType.ENTREPRENEUR)
	                        : COMPANY_INN_API;
	const url = `${listUrl}${full ? '?full=true' : ''}`;
	return await method(url, filters);
}
import {
	COMPANY_INN_API,
	COMPANY_API,
}                   from '../common/constants';
import * as types   from '../common/types';
import { Http }     from '../common/functions';
import * as filters from '../common/filters';

export async function getCompanies(
	filters?: filters.ICargoCompanyFilter
): Promise<types.ICargoCompany[]> {
	return Http.get(COMPANY_API, { data: filters });
}

export async function getInnCompanies(
	filters?: filters.ICargoInnCompanyFilter
): Promise<types.ICargoInnCompany[]> {
	return Http.get(COMPANY_INN_API, { data: filters });
}
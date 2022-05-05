import * as types   from '../common/types';
import * as filters from '../common/filters';
import {DRIVER_API} from '../common/constants';
import {Http}       from '../common/functions';

export async function getDrivers(
		filters?: filters.IDriverFilter,
		listFilter: filters.IListFilter = {}
): Promise<types.IDriver[]>
{
	const {full} = listFilter;
	const url = full ? `${DRIVER_API}?full=true` : DRIVER_API;
	return Http.get(url, {data: filters});
}
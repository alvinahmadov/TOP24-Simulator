import faker                      from '@faker-js/faker';
import * as enums                 from './common/enums';
import * as types                 from './common/types';
import { randomFrom, test }       from './common/functions';
import { getDrivers }             from './api/driver';
import { getOrders, updateOrder } from './api/order';
import { updateTransport }        from './api/transports';
import {
	assignDrivers,
	getTransports,
	getAssociations,
}                                 from './api/orderAssociation';

const DEBUG = false;

const testAssociations = async() =>
{
	const associations = await getAssociations();
	if(DEBUG)
		console.debug(associations)
}

const testAssociationTransport = async() =>
{
	const associations = await getAssociations();
	// Select random order
	const orderId = faker.helpers.arrayElement(associations).orderId;
	// Select transports which: 1. available to use, 2. driver accepted order
	const transports = await getTransports(orderId, { transport_status: 1, order_status: 1 });
	if(DEBUG)
		console.debug(transports);

	return transports;
}

const testAssignDrivers = async(order?: types.IOrder) =>
{
	if(!order)
		order = faker.helpers.arrayElement(await getOrders());
	// First delete existing by setting drivers to null
	await assignDrivers(order.id, { drivers: null });
	const drivers = await getDrivers();
	// Get random unique drivers from 4 to 6, and assume
	// that the driver is suitable for order parameters
	const selectedDrivers = faker.helpers.uniqueArray(
		drivers,
		faker.datatype.number({ min: 4, max: 6 })
	);
	// Send associations with random status for selected order and drivers
	const result = await assignDrivers(order.id, {
		drivers: selectedDrivers.map(d => ({
			driverId:     d.id,
			order_status: faker.helpers.arrayElement([
				                                         enums.OrderStatus.PENDING,
				                                         enums.OrderStatus.ACCEPTED,
				                                         enums.OrderStatus.CANCELLED
			                                         ])
		}))
	})
	if(DEBUG)
		console.debug(result);

	return result;
}

/**
 * Reset statuses of transports and set one of them as active
 * */
const resetTransportStatuses = async(
	drivers?: (types.IDriver & { transports: types.ITransport[] })[]
): Promise<types.ITransport[]> =>
{
	if(!drivers)
		drivers = await getDrivers({}, { full: true }) as
			(types.IDriver & { transports: types.ITransport[] })[];

	const result: types.ITransport[] = [];

	for(const driver of drivers) {
		const transports = driver.transports;
		if(transports && transports.length) {
			// Select random transport for status change
			const luckyIndex = randomFrom(transports.length);
			for(let i = 0; i < transports.length; ++i) {
				updateTransport(transports[i].id, {
					// Index matches for lucky index so the transport
					// is set as main. In real only one transport can be
					// set as currently active. Other either may be used or
					// they have problems.
					status: (i == luckyIndex) ? enums.TransportStatus.ACTIVE
					                          : enums.TransportStatus.READY_TO_WORK
				}).then(t =>
				        {
					        result.push(t);
					        if(DEBUG)
						        console.debug({ id: t.id, status: t.status });
				        })
			}
		}
	}

	return result;
}

// Main simulation
const simulateAdminLogic = async() =>
{
	// Get orders
	const orders = await getOrders();
	// Get drivers with `full` query parameter set to true
	// which in turn will return driver and his transports.
	const drivers = await getDrivers({}, { full: true }) as
		(types.IDriver & { transports: types.ITransport[] })[];
	//Select random order from orders
	let order = faker.helpers.arrayElement(orders);
	console.debug('Selected order for simulation: ', { order });
	// Reset order driver association and reassign
	const associations = await testAssignDrivers(order);

	console.debug('Made associations for order-drivers: ', { associations })
	//Simulate that drivers selected their transports for order execution
	//and maybe accept order
	await resetTransportStatuses(drivers);
	// Get drivers that ready to execute order and select one of them
	// No need for `full` query it will return with associated models
	// such as driver, cargo or cargoinn
	const driverData = await getTransports(order.id, {
		// Get only accepted ones
		order_status:     enums.OrderStatus.ACCEPTED,
		// Get transports only which driver selected as main/default
		transport_status: enums.TransportStatus.ACTIVE
	}) as (types.ITransport & {
		driver?: types.IDriver;
		cargo?: types.ICargoCompany;
		cargoinn?: types.ICargoInnCompany
	})[];
	const selected = faker.helpers.arrayElement(driverData);
	// const association = associations.filter(a => a.driverId == selected.driverId)[0];
	console.debug('Selected by admin/owner driver: ', { driverData, selected })

	// Then accept driver for order
	order = await updateOrder(order.id, {
		// Driver's company
		cargoId:    selected.driver.cargoId,
		// Driver's individual company
		cargoinnId: selected.driver.cargoinnId,
		// Driver that executes the order
		driverId:   selected.driverId,
		// Order is implemented by driver at the moment
		status:     enums.OrderStatus.PROCESSING,
		// Here we copy contract document link from
		// association to order.
		// contract_link: association.contract_link,
		// Order is no longer free for other drivers
		is_free: false,
		// Order is no longer open for other drivers?
		is_open: false
	});

	console.debug('Selected order: ', { order });
}

test(simulateAdminLogic);
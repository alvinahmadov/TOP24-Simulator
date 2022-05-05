import * as enums from './enums';
import * as types from './types';

export type BaseFilter<T extends types.IBase> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

export interface IFilter<T extends types.IBase = any, K = keyof T> {
	[f: string]: any;

	/**
	 * The sort order of model data
	 * */
	order?: K;
}

/**
 * Interface to used to filter list data fetched from database
 * */
export interface IListFilter {
	/**
	 * Start offset position of list.
	 * @default 0
	 * */
	from?: number;
	/**
	 * Number of items to return starting from `from` member.
	 * @default 500
	 * */
	count?: number;
	/**
	 * If there any associated another modle related to
	 * current model include them also in result.
	 *
	 * @default false
	 * */
	full?: boolean;
}

/**
 * Admin model filters
 * */
export interface IAdminFilter
	extends BaseFilter<types.IAdmin>,
	        IFilter<types.IAdmin> {}

/**
 * Cargo model filters
 * */
export interface ICargoCompanyFilter
	extends BaseFilter<types.ICargoCompany>,
	        IFilter<types.ICargoCompany> {}

/**
 * CargoInn model filters
 * */
export interface ICargoInnCompanyFilter
	extends BaseFilter<types.ICargoInnCompany>,
	        IFilter<types.ICargoInnCompany> {}

/**
 * Driver model filters
 * */
export interface IDriverFilter
	extends BaseFilter<types.IDriver>,
	        IFilter<types.IDriver> {
	order_status?: enums.OrderStatus;
}

/**
 * Image model filters
 * */
export interface IImageFilter
	extends BaseFilter<types.IImage>,
	        IFilter<types.IImage> {}

/**
 * Payment model filters
 * */
export interface IPaymentFilter
	extends BaseFilter<types.IPayment>,
	        IFilter<types.IPayment> {}

/**
 * Order model filters
 * */
export interface IOrderFilter extends IFilter<types.IOrder> {
	cargoId?: types.UUID;
	cargoinnId?: types.UUID;
	driverId?: types.UUID;
	crm_id?: number;
	title?: string;
	date_at?: Date;
	number?: number;
	mileage?: number;
	status?: enums.OrderStatus;
	is_open?: boolean;
	is_free?: boolean;
	cancel_cause?: string;
	is_canceled?: boolean;
	has_problem?: boolean;
	price?: number;
	is_bid?: boolean;
	bid_price_min?: number;
	bid_price_max?: number;
	bid_info?: string;
	payment_type?: string;
	payload?: string;
	payload_type?: string;
	loading_type?: enums.LoadingType;
	weight_min?: number;
	weight_max?: number;
	volume_min?: number;
	volume_max?: number;
	length_min?: number;
	length_max?: number;
	width_min?: number;
	width_max?: number;
	height_min?: number;
	height_max?: number;
	palets?: number;
	boxes?: number;
	load_addr_a?: string;
	load_date_a?: Date;
	load_contact_a?: string;
	load_phone_a?: string;
	load_addr_b?: string;
	load_date_b?: Date;
	load_contact_b?: string;
	load_phone_b?: string;
	unload_addr_a?: string;
	unload_date_a?: Date;
	unload_contact_a?: string;
	unload_phone_a?: string;
	unload_addr_b?: string;
	unload_date_b?: Date;
	unload_contact_b?: string;
	unload_phone_b?: string;
	comments?: string;
	info?: string;
	dedicmachine?: string;
}

export interface IOrderAssociationFilter
	extends IFilter<types.IOrderAssociation> {
	orderId?: string;
	driverId?: string;
	order_status?: enums.OrderStatus;
}

export interface IOrderTransportAssociationFilter {
	order_status?: enums.OrderStatus;
	transport_status?: enums.TransportStatus;
}

/**
 * Transport model filters
 * */
export interface ITransportFilter<T extends types.IBase = types.ITransport>
	extends IFilter<T> {
	weight_min?: number;
	weight_max?: number;
	volume_min?: number;
	volume_max?: number;
	length_min?: number;
	length_max?: number;
	width_min?: number;
	width_max?: number;
	height_min?: number;
	height_max?: number;
	type?: string;
	pallets?: number;
	payload?: string;
	payload_type?: string;
	loading_type?: enums.LoadingType;
	status?: enums.TransportStatus
}

/**
 * Cargo transport filters
 * */
export interface ICargoTransportFilter
	extends ITransportFilter<types.ICargoCompany> {
	cargoId?: string;
	class?: string;
	dedicated?: types.DedicatedTransport;
	payment_types?: types.VAT[];
	directions?: string[];
	has_driver?: boolean;
	payload_extra?: boolean;
}

/**
 * Cargo transport filters
 * */
export interface ICargoInnTransportFilter
	extends ITransportFilter<types.ICargoInnCompany> {
	cargoinnId?: string;
	class?: string;
	dedicated?: types.DedicatedTransport;
	payment_types?: types.VAT[];
	directions?: string[];
	has_driver?: boolean;
	payload_extra?: boolean;
}
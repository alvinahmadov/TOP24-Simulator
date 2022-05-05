import * as enums from './enums';

/**
 * Value-added tax (VAT)
 * */
export type VAT = "НДС 20%" | "Наличными" | "Без НДС" | string;
export type float = number;
export type UUID = string;
export type DedicatedTransport = "Да" | "Нет" | "Не важно";
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IAccessParams {
	/**
	 * User authentification mode comparer
	 * */
	compareMode: enums.AccessMode | number,

	/**
	 * Operations to check against user rights,
	 * which also allows for group rights.
	 *
	 * lt - less than
	 *
	 * eq - equal
	 *
	 * gt - greater than
	 * */
	op?: "lt" | "eq" | "gt",

	/**
	 * Response data to return when rights are not sufficient for operation
	 * */
	responseData?: { status: number; message: string }
}

export interface IRouteParameter {
	/**
	 * Api path to fetch
	 * */
	path: string;

	/**
	 * Method type to use for api endpoint
	 *
	 * @see HttpMethod
	 * */
	method: HttpMethod;

	/**
	 * Access guard that routes users/admins by their type
	 * */
	guard?: IAccessParams;
}

export interface IApiRouteParams {
	[route: string]: IRouteParameter;
}

export interface IApiRoute {
	path: string;
	routes: any;
}

export interface Routes {
	admin: IApiRoute;
	bitrix: IApiRoute;
	cargo: IApiRoute;
	cargo_inn: IApiRoute;
	driver: IApiRoute;
	generator?: IApiRoute;
	image: IApiRoute;
	order: IApiRoute;
	order_driver: IApiRoute;
	pay: IApiRoute;
	reference: IApiRoute;
	transport: IApiRoute;
}

export interface IBase {
	id: UUID;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddress extends IBase {
	country: string;
	postal_code?: string;
	federal_district?: string;
	region_type?: string;
	region?: string;
	area_type?: string;
	area?: string;
	city_type?: string;
	city?: string;
	settlement_type?: string;
	settlement?: string;
	kladr_id?: string;
	fias_id?: string;
	fias_level?: string;
	capital_marker?: string;
	okato?: string;
	oktmo?: string;
	tax_office?: string;
	timezone?: string;
	latitude?: float;
	longitude?: float;
}

export interface IAdmin extends IBase {
	email: string;
	name: string;
	type: enums.AccessMode;
	phone: string
	verify?: string;
	privilege?: boolean;
	confirmed?: boolean;
}

export interface ICompany extends IBase {
	crm_id: number;
	name: string;
	inn: string;
	email: string;
	company_type: enums.CompanyType;
	passport_serial_number: string;
	passport_date: Date;
	passport_subdivision_code: string;
	passport_issued_by?: string;
	passport_registration_address?: string;
	postal_code: string;
	phone: string;
	phone_second?: string;
	phone_third?: string;
	address_first?: string;
	address_second?: string;
	address_third?: string;
	directions?: string[];
	verify?: string;
	nds?: string;
	confirmed?: boolean;
	avatar_link: string;
	link_pass?: string;
	link_reg?: string;
	link_ord?: string;
	level?: string;
	info?: string;
	status?: string;
}

export interface ICargoCompany extends ICompany {
	shortname: string;
	kpp: string;
	ogpn: string;
	director?: string;
	certificate_photo_link: string;
	passport_photo_link: string;
	director_order_photo_link: string;
	proxy_photo_link: string;
	contact_first?: string;
	contact_second?: string;
	contact_third?: string;
}

export interface ICargoInnCompany extends ICompany {
	surname: string;
	middle_name: string;
	birth_date: Date;
	passport_link: string;
	passport_sign_link: string;
	passport_selfie_link: string;
}

export interface IDriver extends IBase {
	cargoId?: UUID;
	cargoinnId?: UUID;
	crm_id?: number;
	name: string;
	middle_name?: string;
	surname?: string;
	date_of_birth: Date;
	phone?: string;
	passport_serial_number: string;
	passport_date: Date;
	passport_subdivision_code: string;
	passport_issued_by?: string;
	passport_registration_address?: string;
	passport_link: string;
	passport_sign_link?: string;
	passport_selfie_link?: string;
	avatar_link?: string;
	registration_address?: string;
	physical_address?: string;
	additional_phone?: string;
	email: string;
	license: string;
	license_date: Date;
	link_front?: string;
	link_back?: string;
	info?: string;
	status?: enums.DriverStatus;
	latitude?: float;
	longitude?: float;
}

export interface IImage extends IBase {
	cargoId?: UUID;
	cargoinnId?: UUID;
	transportId?: UUID;
	link?: string;
}

export interface IOrder extends IBase {
	cargoId?: UUID;
	cargoinnId?: UUID;
	driverId?: UUID;
	crm_id?: number;
	title: string;
	price: float;
	dateAt: Date;
	number?: number;
	mileage?: float;
	status: enums.OrderStatus;
	is_open?: boolean;
	is_free?: boolean;
	cancel_cause?: string;
	is_canceled?: boolean;
	has_problem?: boolean;
	is_bid?: boolean;
	bid_price?: number;
	bid_price_max?: number;
	bid_info?: string;
	payment_type?: string;
	payload?: string;
	payload_type?: string;
	payload_mode?: string;
	loading_type: enums.LoadingType;
	weight?: number;
	volume?: number;
	length?: number;
	width?: number;
	height?: number;
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
	shipping_link?: string;
	payment_link?: string;
}

export interface IOrderAssociation extends IBase {
	orderId: string;
	driverId: string;
	order_status: enums.OrderStatus;
	comments?: string;
	contract_link?: string;
}

export type DriverAssociation = Omit<IOrderAssociation, 'orderId' | 'id' | 'createdAt' | 'updatedAt'>;

export interface IPayment extends IBase {
	cargoId?: UUID;
	cargoinnId?: UUID;
	bank: string;
	bankbik: string;
	ogrnip: string;
	ogrnip_link?: string;
	rs: string;
	ks: string;
	info?: string;
}

export interface ITransport extends IBase {
	cargoId?: UUID;
	cargoinnId?: UUID;
	driverId?: UUID;
	crm_id: number;
	status?: enums.TransportStatus;
	mode?: string;
	type: string;
	extra_fixtures?: string[];
	brand: string;
	model: string;
	registr_num: string;
	prod_year: number;
	payload: string;
	payload_extra?: boolean;
	is_trailer?: boolean;
	sts: string;
	weight: float;
	volume: float;
	length: number;
	width: number;
	height: number;
	loading_types: enums.LoadingType[];
	polets: number;
	osago_number: string;
	osago_date: Date;
	osago_link?: string;
	diag_num: string;
	diag_date: Date;
	diag_link?: string;
	info?: string;
	data?: string;
	comments?: string;
}
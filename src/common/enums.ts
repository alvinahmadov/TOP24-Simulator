export enum AccessMode {
	LOGIST = 0,
	CARGO = 1,
	ADMIN = 2,
}

export enum CompanyType {
	// Организация
	ORGANISATION,
	// ИП
	ENTREPRENEUR,
	// Физ. лицо
	INDIVIDUAL
}

/**
 * Status of driver for order fulfillment
 * */
export enum DriverStatus {
	// Driver is not ready or not willing to fulfill the order
	NONE,
	// Driver is ready to execute the new order
	READY,
	// Driver is already executing the new order
	BUSY,
	// Driver on the way to load cargo
	ON_WAY_LOADING,
	// Driver loading cargo
	ON_LOADING,
	// Driver on the way to unload cargo
	ON_WAY_UNLOADING,
	// Driver unloading cargo
	ON_UNLOADING,
	// Driver uploads document
	DOC_LOAD,
}

/**
 * Status of the cargo order carry
 * */
export enum OrderStatus {
	// Order is pending on completion
	// Default value
	PENDING,
	// Order completion is accepted by driver
	ACCEPTED,
	// Order is on processing/payment
	PROCESSING,
	// Driver declined offer.
	CANCELLED,
	// Order finished
	FINISHED,
}

export enum TransportStatus {
	// Transport is not active but ready to work
	READY_TO_WORK,
	// Transport is selected by driver and is currently used for order fullfilment
	ACTIVE,
	// Transport can not be used because of technical or other problems
	HAS_PROBLEM
}

/**
 * Position of the payload in transport
 * */
export enum LoadingType {
	// For any type is unknown.
	// Default
	NONE,
	// Payload on back side of transport
	FRONT,
	// Payload on back side of transport
	BACK,
	// Payload on top side of transport
	TOP,
	// Payload on side of transport
	SIDE
}
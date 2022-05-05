// noinspection JSUnusedLocalSymbols

import { AccessMode } from '../common/enums';
import * as types     from '../common/types';

const RESPONSES = {
	401: { status: 401, message: 'Unauthorized.' },
	403: { status: 403, message: 'Incorrect token. Try again.' }
}

const ACCESS_FREE: types.IAccessParams = null;

const ACCESS_AUTHORIZED: types.IAccessParams = {
	op:           'gt',
	compareMode:  AccessMode.LOGIST,
	responseData: RESPONSES['401']
};

const ACCESS_COMPANY: types.IAccessParams = {
	op:           'gt',
	compareMode:  AccessMode.CARGO,
	responseData: RESPONSES['401']
};

const ACCESS_COMPANY_ONLY = {
	op:           'eq',
	compareMode:  AccessMode.CARGO,
	responseData: RESPONSES['401']
};

const ACCESS_ADMIN_ONLY: types.IAccessParams = {
	op:           'eq',
	compareMode:  AccessMode.ADMIN,
	responseData: RESPONSES['401']
};

export const ROUTES: types.Routes = {
	admin:        {
		path:   '/admin',
		routes: {
			list:       {
				path:   '/',
				method: 'get',
				guard:  ACCESS_ADMIN_ONLY
			},
			index:      {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_ADMIN_ONLY
			},
			update:     {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_ADMIN_ONLY
			},
			create:     {
				path:   '/',
				method: 'post',
				guard:  ACCESS_ADMIN_ONLY
			},
			delete:     {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_ADMIN_ONLY
			},
			login:      {
				path:   '/login',
				method: 'post',
				guard:  ACCESS_FREE
			},
			refresh:    {
				path:   '/refresh',
				method: 'post',
				guard:  ACCESS_FREE
			},
			host_login: {
				path:   '/hostlogin',
				method: 'post',
				guard:  ACCESS_FREE
			},
			signin:     {
				path:   '/signin',
				method: 'post',
				guard:  ACCESS_FREE
			}
		}
	},
	bitrix:       {
		path:   '/bitrix',
		routes: {
			update_cargo: {
				path:   '/cargo/:id',
				method: 'put',
				guard:  ACCESS_FREE
			},
			update_order: {
				path:   '/order/:id',
				method: 'put',
				guard:  ACCESS_FREE
			},
			delete_order: {
				path:   '/order/:id',
				method: 'delete',
				guard:  ACCESS_FREE
			},
			orders:       {
				path:   '/orders',
				method: 'get',
				guard:  ACCESS_FREE
			},
			sync:         {
				path:   '/orders',
				method: 'patch',
				guard:  ACCESS_FREE
			}
		}
	},
	cargo:        {
		path:   '/cargo',
		routes: {
			list:       {
				path:   '/',
				method: 'get',
				guard:  ACCESS_COMPANY
			},
			index:      {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			create:     {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			update:     {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			delete:     {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			},
			transports: {
				path:   '/transports',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			refresh:    {
				path:   '/refresh',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			control:    {
				path:   '/control',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			login:      {
				path:   '/login',
				method: 'post'
			},
			send:       {
				path:   '/send/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			avatar:     {
				path:   '/avatar/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			passport:   {
				path:   '/passport/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			registr:    {
				path:   '/registr/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			order:      {
				path:   '/order/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			ogrnip:     {
				path:   '/ogrnip/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			}
		}
	},
	cargo_inn:    {
		path:   '/cargoinn',
		routes: {
			list:       {
				path:   '/',
				method: 'get',
				guard:  ACCESS_COMPANY
			},
			index:      {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			update:     {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			create:     {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			delete:     {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_COMPANY
			},
			transports: {
				path:   '/transports',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			refresh:    {
				path:   '/refresh',
				method: 'post',
				guard:  ACCESS_COMPANY
			},
			control:    {
				path:   '/control',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			login:      {
				path:   '/login',
				method: 'post',
				guard:  ACCESS_FREE
			},
			send:       {
				path:   '/send/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			avatar:     {
				path:   '/avatar/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			passport:   {
				path:   '/passport/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			registr:    {
				path:   '/registr/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			order:      {
				path:   '/order/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			ogrnip:     {
				path:   '/ogrnip/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			}
		}
	},
	driver:       {
		path:   '/driver',
		routes: {
			list:   {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:  {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			update: {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			create: {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			delete: {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			},
			status: {
				path:   '/:id',
				method: 'patch',
				guard:  ACCESS_AUTHORIZED
			},
			front:  {
				path:   '/front/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			back:   {
				path:   '/back/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED,
			}
		}
	},
	generator:    {
		path:   '/generator',
		routes: {
			company:   {
				path:   '/companies',
				method: 'post',
				guard:  ACCESS_FREE
			},
			driver:    {
				path:   '/drivers',
				method: 'post',
				guard:  ACCESS_FREE
			},
			order:     {
				path:   '/orders',
				method: 'post',
				guard:  ACCESS_FREE
			},
			transport: {
				path:   '/transports',
				method: 'post',
				guard:  ACCESS_FREE
			},
		}
	},
	image:        {
		path:   '/image',
		routes: {
			list:   {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:  {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			delete: {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			}
		}
	},
	order:        {
		path:   '/order',
		routes: {
			list:     {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:    {
				path:   '/:id',
				method: 'get',
				guard:  {
					compareMode:  0, op: 'gt',
					responseData: RESPONSES['403']
				}
			},
			create:   {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			update:   {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED,
			},
			delete:   {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			},
			cargos:   {
				path:   '/cargolist/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			send:     {
				path:   '/send/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			cancel:   {
				path:   '/cancel/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			shipping: {
				path:   '/shipping/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			payment:  {
				path:   '/payment/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			contract: {
				path:   '/contract/:id/:driverId',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
		}
	},
	order_driver: {
		path:   '/order_association',
		routes: {
			list:        {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:       {
				path:   '/:id',
				method: 'get',
				guard:  {
					compareMode:  0, op: 'gt',
					responseData: RESPONSES['403']
				}
			},
			update:      {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED,
			},
			delete:      {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			},
			assign:      {
				path:   '/:orderId/:driverId',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			association: {
				path:   '/:orderId/:driverId',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			assignList:  {
				path:   '/drivers/:orderId',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			order:       {
				path:   '/order/:orderId',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			driver:      {
				path:   '/driver/:driverId',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			driverUpd:   {
				path:   '/driver/:driverId',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			transport:   {
				path:   '/transport/:orderId',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			cancel:      {
				path:   '/cancel/:id',
				method: 'patch',
				guard:  ACCESS_AUTHORIZED
			},
			contract:    {
				path:   '/contract/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
		}
	},
	pay:          {
		path:   '/pay',
		routes: {
			list:   {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:  {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			create: {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			update: {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			delete: {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			}
		}
	},
	reference:    {
		path:   '/reference',
		routes: {
			address:       {
				path:   '/address/:id',
				method: 'get',
				guard:  ACCESS_FREE
			},
			addresses:     {
				path:   '/address',
				method: 'get',
				guard:  ACCESS_FREE
			},
			payloads:      {
				path:   '/payloads',
				method: 'get',
				guard:  ACCESS_FREE
			},
			risk_classes:  {
				path:   '/risk_classes',
				method: 'get',
				guard:  ACCESS_FREE
			},
			loading_types: {
				path:   '/loading_types',
				method: 'get',
				guard:  ACCESS_FREE
			},
			auto_types:    {
				path:   '/auto_types',
				method: 'get',
				guard:  ACCESS_FREE
			}
		}
	},
	transport:    {
		path:   '/transport',
		routes: {
			list:   {
				path:   '/',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			index:  {
				path:   '/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			create: {
				path:   '/',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			update: {
				path:   '/:id',
				method: 'put',
				guard:  ACCESS_AUTHORIZED
			},
			delete: {
				path:   '/:id',
				method: 'delete',
				guard:  ACCESS_AUTHORIZED
			},
			driver: {
				path:   '/driver/:id',
				method: 'get',
				guard:  ACCESS_AUTHORIZED
			},
			image:  {
				path:   '/image/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			diag:   {
				path:   '/diag/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			},
			osago:  {
				path:   '/osago/:id',
				method: 'post',
				guard:  ACCESS_AUTHORIZED
			}
		}
	}
}
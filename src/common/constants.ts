import * as json  from '../json';
import { ROUTES } from '../api/routes'

const MODE: number = 1;

export const BASE_URL = MODE == 1 ? 'http://51.250.65.72/api'
                                  : 'http://localhost:3001/api';

export const ADMIN_HOSTLOGIN = BASE_URL +
                               ROUTES.admin.path +
                               ROUTES.admin.routes.host_login.path;

export const COMPANY_API = BASE_URL +
                           ROUTES.cargo.path;

export const COMPANY_INN_API = BASE_URL +
                               ROUTES.cargo_inn.path;

export const DRIVER_API = BASE_URL +
                          ROUTES.driver.path;

export const ORDER_API = BASE_URL +
                         ROUTES.order.path;

export const ORDER_DRIVER_API = BASE_URL +
                                ROUTES.order_driver.path;

export const PAYMENT_API = BASE_URL +
                           ROUTES.pay.path;

export const TRANSPORT_API = BASE_URL +
                             ROUTES.transport.path;

export const PAYLOADS: string[] = json.payloads.map(j => j.VALUE);
export const RISK_CLASSES: string[] = json.risk_classes.map(j => j.VALUE);
export const TRANSPORT_TYPES: string[] = json.transport_types.map(j => j.VALUE);
export const TRANSPORT_BRANDS: string[] = json.transport_brands.map(j => j.VALUE);
export const FIXTURES: string[] = json.extra_fixtures.map(j => j.VALUE);

export const DIRECTIONS: string[] = [
	"Москва",
	"Санкт-Петербург",
	"Казань",
	"Крым",
	"Севастополь",
	"Екатеринбург",
	"Вологда",
	"Воронеж",
	"Курск",
	"Белгород",
	"Нарва",
	"Байкальск",
	"Уренгой",
	"Помары",
	"Тумень",
	"Перм"
]
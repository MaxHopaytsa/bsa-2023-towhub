import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { OrdersApiPath } from './libs/enums/enums.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderResponseDto,
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
} from './libs/types/types.js';
import { type OrderCreateRequestDto } from './orders.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class OrdersApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ORDERS, baseUrl, http, storage });
  }

  public async createOrder(
    payload: OrderCreateRequestDto,
  ): Promise<OrderResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<OrderResponseDto>();
  }

  public async calculatePrice(
    payload: OrderCalculatePriceRequestDto,
  ): Promise<OrderCalculatePriceResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.CALCULATE_PRICE, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<OrderCalculatePriceResponseDto>();
  }

  public async getOrder(orderId: string): Promise<OrderResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.$ID, { id: orderId }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<OrderResponseDto>();
  }

  public async changeAcceptOrderStatusByDriver(
    orderId: string,
    payload: OrderUpdateAcceptStatusRequestDto,
  ): Promise<{ id: number; status: OrderStatusValues }> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.DRIVER, { orderId }),
      {
        method: 'PATCH',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),

        hasAuth: true,
      },
    );

    return await response.json<{ id: number; status: OrderStatusValues }>();
  }

  public async changeAcceptOrderStatusByCustomer(
    orderId: string,
    payload: OrderUpdateAcceptStatusRequestDto,
  ): Promise<{ id: number; status: OrderStatusValues }> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.CUSTOMER, { orderId }),
      {
        method: 'PATCH',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<{ id: number; status: OrderStatusValues }>();
  }
}

export { OrdersApi };

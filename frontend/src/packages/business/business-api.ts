import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type EntityPagination, type TruckEntity } from '~/libs/types/types.js';

import {
  type TruckAddRequestDto,
  type TruckGetAllResponseDto,
} from '../trucks/libs/types/types.js';
import { BusinessApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class BusinessApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.BUSINESS, baseUrl, http, storage });
  }

  public async findAllTrucksByBusinessId(
    queryString?: string,
  ): Promise<TruckGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        `${BusinessApiPath.TRUCKS}?${queryString ?? ''}`,
        {},
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<TruckGetAllResponseDto>();
  }

  public async getTrucksByBusinessId(): Promise<EntityPagination<TruckEntity>> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.TRUCKS, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<TruckGetAllResponseDto>();
  }

  public async addTruck(payload: TruckAddRequestDto): Promise<TruckEntity> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.TRUCKS, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<TruckEntity>();
  }
}

export { BusinessApi };

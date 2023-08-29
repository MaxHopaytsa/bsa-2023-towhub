import {
  type UserEntityT,
  type UserGroupEntityT,
} from '~/packages/users/libs/types/types.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverCreatePayload = {
  payload: Pick<DriverEntityT, 'driverLicenseNumber' | 'userId'>;
  owner: Pick<UserEntityT, 'id'> & { group: UserGroupEntityT };
};

export { type DriverCreatePayload };

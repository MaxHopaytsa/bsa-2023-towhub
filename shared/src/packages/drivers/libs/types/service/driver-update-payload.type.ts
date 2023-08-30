import {
  type UserEntityT,
  type UserGroupEntityT,
} from '~/packages/users/libs/types/types.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverUpdatePayload = {
  id: number;
  payload: Pick<DriverEntityT, 'driverLicenseNumber'>;
  owner: Pick<UserEntityT, 'id'> & { group: UserGroupEntityT };
  user: Pick<UserEntityT, 'id'> & { group: UserGroupEntityT };
};

export { type DriverUpdatePayload };

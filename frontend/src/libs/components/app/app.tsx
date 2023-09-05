import 'react-toastify/dist/ReactToastify.css';

import { Header, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute, BurgerMenuItemsName, IconName } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { actions as userActions } from '~/slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [isWebSocketsConnected, setIsWebSocketsConnected] = useState(false);
  const { users, dataStatus } = useAppSelector(({ users }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
  }));

  const user = useAppSelector(selectUser);
  const hasUser = Boolean(user);

  const isRoot = pathname === AppRoute.ROOT;

  const menuItems = useMemo(
    () => [
      {
        name: BurgerMenuItemsName.HISTORY,
        navigateTo: AppRoute.ORDER_HISTORY,
        icon: IconName.CLOCK_ROTATE_LEFT,
      },
      {
        name: BurgerMenuItemsName.EDIT,
        navigateTo: AppRoute.EDIT_PROFILE,
        icon: IconName.USER_PEN,
      },
      {
        name: BurgerMenuItemsName.LOG_OUT,
        navigateTo: AppRoute.SIGN_IN,
        icon: IconName.RIGHT_FROM_BRACKET,
      },
    ],
    [],
  );

  useEffect(() => {
    socketService.connect();

    socketService.addListener('CONNECT', () => {
      setIsWebSocketsConnected(true);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  return (
    <>
      <Header menuItems={menuItems} isAuth={hasUser} />

      <div>
        <RouterOutlet />
      </div>
      {isRoot && (
        <>
          <h2>Users:</h2>
          <h3>Status: {dataStatus}</h3>
          <h3>
            Socket: {isWebSocketsConnected ? 'connected' : 'disconnected'}
          </h3>
          <ul>
            {users.map((it) => (
              <li key={it.id}>{it.phone}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export { App };

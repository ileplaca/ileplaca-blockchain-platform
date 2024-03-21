import { faBuilding, faLock, faUserSecret, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

export const sidebarRoutes = [
  {
    route: '/companies-salaries',
    name: 'Companies salaries',
    icon: faBuilding,
  },
  {
    route: '/secret-infos',
    name: 'Secret infos',
    icon: faUserSecret,
  },
  {
    route: '/secret-info-accessed',
    name: 'Secret infos accessed',
    icon: faLock,
  },
  {
    route: '/profile',
    name: 'Profile',
    icon: faUser,
  },
  {
    route: '/accounts',
    name: 'Profiles',
    icon: faUsers,
  },
];

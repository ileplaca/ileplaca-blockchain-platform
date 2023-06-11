import { faBuilding } from "@fortawesome/free-regular-svg-icons"
import { faLock, faUserSecret } from '@fortawesome/free-solid-svg-icons'

export const sidebarRoutes = [
  {
    route: "/companies-salaries",
    name: "Companies salaries",
    icon: faBuilding
  },
  {
    route: "/secret-infos",
    name: "Secret infos",
    icon: faUserSecret
  },
  {
    route: "/secret-infos-accessed",
    name: "Secret infos accessed",
    icon: faLock
  },
]
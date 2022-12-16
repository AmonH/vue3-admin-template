import { RouteRecordRaw } from 'vue-router';
import asyncRoutes from '@/router/asyncRoutes';
import { IBreadcrumb } from '@/base-ui/breadcrumb';

//默认加载第一条路由
let firstRoute: any = null;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  //1. 先加载默认所有的routes

  //2. 根据菜单获取需要添加的routes
  const _getRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const newUrl = menu.url.replace(/^\/main(.+)/g, '$1');
        const route = asyncRoutes.find((item) => item.path === newUrl);
        if (route) {
          routes.push(route);

          if (!firstRoute) {
            firstRoute = route; //将第一个菜单保留下来
          }
        }
      } else {
        _getRoutes(menu.children);
      }
    }
  };

  _getRoutes(userMenus);

  return routes;
}

//由路由路径获取对应的面包屑数据
export function pathMapBreadcrumb(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];

  pathMapToMenu(userMenus, currentPath, breadcrumbs);

  return breadcrumbs;
}

//由路由路径获取对应的菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2) {
      const newUrl = menu.url.replace(/^\/main(.+)/g, '$1');
      if (currentPath === newUrl) {
        menu.url = newUrl;
        return menu;
      }
    }
  }
}

export { firstRoute };

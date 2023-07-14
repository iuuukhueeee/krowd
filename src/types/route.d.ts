import { PropsWithChildren } from "react";
import { NonIndexRouteObject } from "react-router-dom";

export interface LayoutProps extends PropsWithChildren, AuthRouteObject {
  priviliges?: PrivilegeModel[];
}

export interface PrivilegeModel {
  entity: string;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface AuthRouteObject extends NonIndexRouteObject {
  layout?: (props: LayoutProps) => JSX.Element;
  children?: AuthRouteObject[];
  child?: AuthRouteObject;
  priviliges?: PrivilegeModel[];
  title?: string;
}

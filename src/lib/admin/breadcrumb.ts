import { adminNav, isAdminNavActive } from "@/lib/admin/nav";

export type AdminCrumb = {
  href: string;
  label: string;
};

export function adminBreadcrumbs(pathname: string): AdminCrumb[] {
  const crumbs: AdminCrumb[] = [{ href: "/admin", label: "CMS" }];
  if (pathname === "/admin") {
    crumbs.push({ href: "/admin", label: "Genel bakış" });
    return crumbs;
  }

  const current = adminNav.find((item) => isAdminNavActive(pathname, item.href, item.exact));
  if (current && current.href !== "/admin") {
    crumbs.push({ href: current.href, label: current.label });
  }

  if (pathname.endsWith("/yeni")) {
    crumbs.push({ href: pathname, label: "Yeni kayıt" });
  } else if (current && pathname !== current.href && /\/[0-9a-f-]{36}$/i.test(pathname)) {
    crumbs.push({ href: pathname, label: "Düzenle" });
  }

  return crumbs;
}

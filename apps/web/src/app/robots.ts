import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api/", "/checkout/", "/login", "/register", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: "https://www.lacasadelyesoartistico.com/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "Beans & Beyond",
    short_name:       "B&B Café",
    description:      "Halal café & restaurant on Commercial Road, East London. Order online, explore our menu, and book a table.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#0D0805",
    theme_color:      "#D2691E",
    orientation:      "portrait-primary",
    categories:       ["food", "lifestyle"],
    icons: [
      {
        src:     "/icon",
        sizes:   "512x512",
        type:    "image/png",
      },
      {
        src:     "/icon",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name:      "Order Food",
        short_name: "Order",
        url:       "/order",
        description: "Browse the menu and order online",
      },
      {
        name:      "Book a Table",
        short_name: "Book",
        url:       "/book",
        description: "Reserve a table at Beans & Beyond",
      },
      {
        name:      "Our Menu",
        short_name: "Menu",
        url:       "/menu",
        description: "Browse our full menu",
      },
    ],
  };
}

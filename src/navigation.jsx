import {
  Bookmark,
  BookOpen,
  Home,
  Puzzle,
  Quote,
  ScrollText,
} from "lucide-react";

/**
 * Single source of truth for the sections of the app. The `key` is used both as
 * the route hash and as the active-page identifier.
 */
export const NAV_ITEMS = [
  {
    key: "ahabanza",
    name: "Ahabanza",
    short: "Ahabanza",
    icon: Home,
    description: "Incamake y'urubuga n'amateka y'umuco wacu.",
  },
  {
    key: "imigani-migufi",
    name: "Imigani migufi",
    short: "Imigani",
    icon: Quote,
    description: "Imigani migufi n'imigenurano y'Abanyarwanda.",
  },
  {
    key: "ibisakuzo",
    name: "Ibisakuzo",
    short: "Ibisakuzo",
    icon: Puzzle,
    description: "Ibisakuzo by'ubwenge n'ibisubizo byabyo.",
  },
  {
    key: "ikeshamvugo",
    name: "Ikeshamvugo",
    short: "Ikeshamvugo",
    icon: Bookmark,
    description: "Amagambo aboneye yo mu rurimi rw'Ikinyarwanda.",
  },
  {
    key: "imigani-miremire",
    name: "Inkuru n'imigani miremire",
    short: "Inkuru",
    icon: ScrollText,
    description: "Inkuru ndende zisobanura imigani y'u Rwanda.",
  },
  {
    key: "insigamigani",
    name: "Insigamigani",
    short: "Insigamigani",
    icon: BookOpen,
    description: "Ibirari by'insigamigani: inkomoko y'imigani 100.",
  },
];

export const PAGE_KEYS = NAV_ITEMS.map((item) => item.key);

export const getNavItem = (key) =>
  NAV_ITEMS.find((item) => item.key === key) ?? NAV_ITEMS[0];

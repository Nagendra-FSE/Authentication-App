// theme.ts (Chakra v3)
import { createSystem, defaultConfig } from "@chakra-ui/react";

// Custom tokens
const tokens = {
  colors: {
    brand: {
      50: { value: "#f5f8ff" },
      100: { value: "#e6f0ff" },
      200: { value: "#bfd8ff" },
      300: { value: "#99c1ff" },
      400: { value: "#4d90ff" },
      500: { value: "#1560ff" },
      600: { value: "#0f48d9" },
      700: { value: "#0b349f" },
      800: { value: "#072265" },
      900: { value: "#03142a" },
    },
  },
  fonts: {
    heading: { value: "Inter, sans-serif" },
    body: { value: "Inter, sans-serif" },
  },
};

// Component styles
const recipes = {
  button: {
    variants: {
      solidBrand: {
        bg: "brand.500",
        color: "black",
        _hover: { bg: "brand.600" },
      },
    },
  },
};

// Build system
const theme = createSystem(defaultConfig, {
  theme: { tokens },
  recipes
} as any);

export default theme;

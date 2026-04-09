export const colors = {
  primary: "#0A84FF",
  primaryDark: "#0066CC",
  success: "#30D158",
  danger: "#FF453A",
  warning: "#FFD60A",
  background: "#F5F5F7",
  surface: "#FFFFFF",
  text: "#1C1C1E",
  textSecondary: "#8E8E93",
  border: "#E5E5EA",
  disabled: "#C7C7CC",
  overlay: "rgba(0,0,0,0.5)",
}

export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 48,
}

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
}

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
}

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
}

export default theme

import "@testing-library/react-native/extend-expect"

// Mock expo-secure-store
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

// Mock lucide-react-native
jest.mock("lucide-react-native", () => ({
  Eye: "Eye",
  EyeOff: "EyeOff",
  ArrowUpRight: "ArrowUpRight",
  ArrowDownLeft: "ArrowDownLeft",
  ChevronLeft: "ChevronLeft",
  Check: "Check",
  X: "X",
  Building2: "Building2",
  CreditCard: "CreditCard",
  BarChart3: "BarChart3",
  Settings: "Settings",
  LogOut: "LogOut",
  TrendingUp: "TrendingUp",
}))

import { Redirect } from "expo-router"
import { View, ActivityIndicator } from "react-native"
import { useAuthStore } from "../src/stores/authStore"
import { colors } from "../src/theme"

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />
  }

  return <Redirect href="/login" />
}

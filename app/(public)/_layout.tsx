import { Stack, Redirect } from "expo-router"
import { useAuthStore } from "../../src/stores/authStore"
import { colors } from "../../src/theme"

export default function PublicLayout() {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (!isLoading && isAuthenticated) {
    return <Redirect href="/home" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  )
}

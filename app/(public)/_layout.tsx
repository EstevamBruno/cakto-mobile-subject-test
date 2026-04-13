import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/theme";

export default function PublicLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (!isLoading && isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}

import { useNavigation } from "react-router";

export default function Page({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return <div>Loading...</div>;
  }

  return children;
}

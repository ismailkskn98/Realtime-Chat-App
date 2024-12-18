import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <h1>Profile</h1>
      <p>{user.email}</p>
      <p>{user.id}</p>
    </>
  );
}

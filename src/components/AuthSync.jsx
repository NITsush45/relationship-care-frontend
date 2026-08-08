import { useSyncUserRole } from "../hooks/useSyncUserRole";

/** Runs role sync after sign-up; renders nothing. */
const AuthSync = ({ children }) => {
  useSyncUserRole();
  return children;
};

export default AuthSync;

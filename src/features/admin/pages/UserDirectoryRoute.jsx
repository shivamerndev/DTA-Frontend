import { useOutletContext } from "react-router-dom";
import UserDirectory from "../components/UserDirectory.jsx";

function UserDirectoryRoute() {
  const { usersRes } = useOutletContext();
  return <UserDirectory users={usersRes?.data} />;
}

export default UserDirectoryRoute;

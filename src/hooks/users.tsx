import { useState, useEffect, useCallback } from "react";
import { useApi } from "../providers/API";
import { User, defaultUser } from "./interfaces";

export const useUsers = () => {
  const { GETCall, DELETECall, PUTCall }: any = useApi();
  const [user, setUser] = useState<User>(defaultUser);
  const [users, setUsers] = useState<User[]>([]);
  /** Pending data in table */
  const [pending, setPending] = useState(true);

  const fetchUsers = useCallback(() => {
    GETCall("/users")
      .then((data: any) => {
        setUsers(data);
        setPending(false);
      })
      .catch((error: any) =>
        console.log(error, "Error consultado los usuarios")
      );
  }, [GETCall]);

  const udpateUser = (email: string) => {
    PUTCall(`/users/update/${email}`, user)
      .then((data: any) => {
        setUser(defaultUser);
        setUsers(data);
      })
      .catch((error: any) =>
        console.log(error, "Error actualizando el usuario")
      );
  };

  const deleteUser = (email: string) => {
    DELETECall(`/users/remove/${email}`)
      .then((data: any) => {
        setUsers(data);
      })
      .catch((error: any) => console.log(error, "Error borrando el usuario"));
  };

  /** Get users on Users component is loaded */
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    /*signInUser,*/
    user,
    users,
    setUser,
    pending,
    setPending,
    fetchUsers,
    udpateUser,
    deleteUser,
  };
};

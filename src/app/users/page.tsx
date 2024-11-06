// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import {
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
} from "@/Services/usersService";
import styles from "../../styles/Users.module.css"; // Import your CSS module

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    phone: "",
  });
  const [updateUserData, setUpdateUserData] = useState<User & { id: string }>({
    id: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const documents = await getAllUsers();
      setUsers(documents);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAddUser() {
    try {
      const result = await insertUser(newUser);
      console.log(result.message);
      fetchUsers();
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }

  async function handleUpdateUser() {
    try {
      const result = await updateUser(updateUserData.id, updateUserData);
      console.log(result.message);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function handleDeleteUser(id: string) {
    try {
      const result = await deleteUser(id);
      console.log(result.message);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Next.js - User Collection</h1>

      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div>
        <h2>Update User</h2>
        <input
          type="text"
          placeholder="User ID"
          value={updateUserData.id}
          onChange={(e) =>
            setUpdateUserData({ ...updateUserData, id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Name"
          value={updateUserData.name}
          onChange={(e) =>
            setUpdateUserData({ ...updateUserData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={updateUserData.phone}
          onChange={(e) =>
            setUpdateUserData({
              ...updateUserData,
              phone: e.target.value,
            })
          }
        />
        <button onClick={handleUpdateUser}>Update User</button>
      </div>

      <div>
        <h2>All Users</h2>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user._id} className={styles.userItem}>
              <strong>{user.name}</strong> -number: {user.phone}
              <button onClick={() => handleDeleteUser(user._id!)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import {
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
} from "@/Services/usersService";
import styles from "../../styles/Users.module.css";
import UserCard from "@/components/UserCard";

export default function Users() {
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
  const [isEditing, setIsEditing] = useState(false);

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

  async function handleAddOrUpdateUser() {
    try {
      if (isEditing && updateUserData.id) {
        const result = await updateUser(updateUserData.id, updateUserData);
        console.log(result.message);
      } else {
        console.log("Adding user:", newUser);
        await insertUser(newUser);
        console.log("User added successfully.");
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  }

  function resetForm() {
    setNewUser({ name: "", phone: "" });
    setUpdateUserData({ id: "", name: "", phone: "" });
    setIsEditing(false);
  }

  async function handleDeleteUser(id: string) {
    try {
      await deleteUser(id);
      console.log("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  function handleEditUser(user: User) {
    setUpdateUserData({
      id: user._id!,
      name: user.name,
      phone: user.phone,
    });
    setIsEditing(true);
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Next.js - User Collection</h1>

      <div>
        <h2>{isEditing ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={isEditing ? updateUserData.name : newUser.name}
          onChange={(e) =>
            isEditing
              ? setUpdateUserData({ ...updateUserData, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={isEditing ? updateUserData.phone : newUser.phone}
          onChange={(e) =>
            isEditing
              ? setUpdateUserData({
                  ...updateUserData,
                  phone: e.target.value,
                })
              : setNewUser({ ...newUser, phone: e.target.value })
          }
        />
        <button onClick={handleAddOrUpdateUser}>
          {isEditing ? "Update User" : "Add User"}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </div>

      <div>
        <h2>All Users</h2>
        <div className={styles.userList}>
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

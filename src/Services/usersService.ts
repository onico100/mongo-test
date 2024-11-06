// services/usersService.ts
import axios from "./http";
import { User } from "@/types/user";

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const response = await axios.get<{ documents: User[] }>("/users/get");
  return response.data.documents;
}

// Insert a new user
export async function insertUser(user: User): Promise<{ message: string }> {
  const response = await axios.post("/users/insert", user);
  return response.data;
}

// Update an existing user
export async function updateUser(
  id: string,
  updatedUser: Partial<User>
): Promise<{ message: string }> {
  const response = await axios.patch(`/users/update`, { id, ...updatedUser });
  return response.data;
}

// Delete a user
export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await axios.delete(`/users/delete?id=${id}`);
  return response.data;
}

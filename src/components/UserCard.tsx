// components/CarCard.tsx
import React from "react";
import { User } from "@/types/user";
import styles from "@/styles/UserCard.module.css";

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export default function CarCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>Phone Number: {user.phone}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user._id!)}>Delete</button>
    </div>
  );
}

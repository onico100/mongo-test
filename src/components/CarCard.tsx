// components/CarCard.tsx
import React from "react";
import { Car } from "@/types/car";
import styles from "@/styles/CarCard.module.css";

type CarCardProps = {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
};

export default function CarCard({ car, onEdit, onDelete }: CarCardProps) {
  return (
    <div className={styles.carCard}>
      <h3>{car.model}</h3>
      <p>Plate: {car.plate_number}</p>
      <p>Color: {car.color}</p>
      <button onClick={() => onEdit(car)}>Edit</button>
      <button onClick={() => onDelete(car._id!)}>Delete</button>
    </div>
  );
}

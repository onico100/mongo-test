"use client";

import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import {
  getAllCars,
  insertCar,
  updateCar,
  deleteCar,
} from "@/Services/carsService";
import styles from "../../styles/Cars.module.css";
import CarCard from "@/components/CarCard";

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({
    model: "",
    plate_number: "",
    color: "",
  });
  const [updateCarData, setUpdateCarData] = useState<Car & { id: string }>({
    id: "",
    model: "",
    plate_number: "",
    color: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const documents = await getAllCars();
      setCars(documents);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  async function handleAddOrUpdateCar() {
    try {
      if (isEditing && updateCarData.id) {
        const result = await updateCar(updateCarData.id, updateCarData);
        console.log(result.message);
      } else {
        console.log("Adding car:", newCar);
        await insertCar(newCar);
        console.log("Car added successfully.");
      }
      fetchCars();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating car:", error);
    }
  }

  function resetForm() {
    setNewCar({ model: "", plate_number: "", color: "" });
    setUpdateCarData({ id: "", model: "", plate_number: "", color: "" });
    setIsEditing(false);
  }

  async function handleDeleteCar(id: string) {
    try {
      await deleteCar(id);
      console.log("Car deleted successfully.");
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  }

  function handleEditCar(car: Car) {
    setUpdateCarData({
      id: car._id!,
      model: car.model,
      plate_number: car.plate_number,
      color: car.color,
    });
    setIsEditing(true);
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Next.js - Car Collection</h1>

      <div>
        <h2>{isEditing ? "Edit Car" : "Add Car"}</h2>
        <input
          type="text"
          placeholder="Model"
          value={isEditing ? updateCarData.model : newCar.model}
          onChange={(e) =>
            isEditing
              ? setUpdateCarData({ ...updateCarData, model: e.target.value })
              : setNewCar({ ...newCar, model: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Plate Number"
          value={isEditing ? updateCarData.plate_number : newCar.plate_number}
          onChange={(e) =>
            isEditing
              ? setUpdateCarData({
                  ...updateCarData,
                  plate_number: e.target.value,
                })
              : setNewCar({ ...newCar, plate_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Color"
          value={isEditing ? updateCarData.color : newCar.color}
          onChange={(e) =>
            isEditing
              ? setUpdateCarData({ ...updateCarData, color: e.target.value })
              : setNewCar({ ...newCar, color: e.target.value })
          }
        />
        <button onClick={handleAddOrUpdateCar}>
          {isEditing ? "Update Car" : "Add Car"}
        </button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </div>

      <div>
        <h2>All Cars</h2>
        <div className={styles.carList}>
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              onEdit={handleEditCar}
              onDelete={handleDeleteCar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

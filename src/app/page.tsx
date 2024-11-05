// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import {
  getAllCars,
  insertCar,
  updateCar,
  deleteCar,
} from "./Services/carsService";

export default function Home() {
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

  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch all cars
  async function fetchCars() {
    try {
      const documents = await getAllCars();
      setCars(documents);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  // Insert a new car
  async function handleAddCar() {
    try {
      const result = await insertCar(newCar);
      console.log(result.message);
      fetchCars();
    } catch (error) {
      console.error("Error inserting car:", error);
    }
  }

  // Update an existing car
  async function handleUpdateCar() {
    try {
      const result = await updateCar(updateCarData.id, updateCarData);
      console.log(result.message);
      fetchCars();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  }

  // Delete a car
  async function handleDeleteCar(id: string) {
    try {
      const result = await deleteCar(id);
      console.log(result.message);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  }

  return (
    <div>
      <h1>Welcome to Next.js - Car Collection</h1>

      {/* Form for adding a new car */}
      <div>
        <h2>Add Car</h2>
        <input
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Plate Number"
          value={newCar.plate_number}
          onChange={(e) =>
            setNewCar({ ...newCar, plate_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Color"
          value={newCar.color}
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {/* Form for updating an existing car */}
      <div>
        <h2>Update Car</h2>
        <input
          type="text"
          placeholder="Car ID"
          value={updateCarData.id}
          onChange={(e) =>
            setUpdateCarData({ ...updateCarData, id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Model"
          value={updateCarData.model}
          onChange={(e) =>
            setUpdateCarData({ ...updateCarData, model: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Plate Number"
          value={updateCarData.plate_number}
          onChange={(e) =>
            setUpdateCarData({ ...updateCarData, plate_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Color"
          value={updateCarData.color}
          onChange={(e) =>
            setUpdateCarData({ ...updateCarData, color: e.target.value })
          }
        />
        <button onClick={handleUpdateCar}>Update Car</button>
      </div>

      {/* List of cars with delete option */}
      <div>
        <h2>All Cars</h2>
        <ul>
          {cars.map((car) => (
            <li key={car._id}>
              <strong>{car.model}</strong> - Plate: {car.plate_number}, Color:{" "}
              {car.color}
              <button onClick={() => handleDeleteCar(car._id!)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

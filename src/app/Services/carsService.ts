// services/carsService.ts
import axios from "./http";
import { Car } from "@/types/car";

// Get all cars
export async function getAllCars(): Promise<Car[]> {
  const response = await axios.get<{ documents: Car[] }>("/cars/get");
  return response.data.documents;
}

// Insert a new car
export async function insertCar(car: Car): Promise<{ message: string }> {
  const response = await axios.post("/cars/insert", car);
  return response.data;
}

// Update an existing car
export async function updateCar(
  id: string,
  updatedCar: Partial<Car>
): Promise<{ message: string }> {
  const response = await axios.patch(`/cars/update`, { id, ...updatedCar });
  return response.data;
}

// Delete a car
export async function deleteCar(id: string): Promise<{ message: string }> {
  const response = await axios.delete(`/cars/delete?id=${id}`);
  return response.data;
}

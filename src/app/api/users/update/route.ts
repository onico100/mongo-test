import { NextResponse } from "next/server";
import { connectDatabase } from "@/Services/mongo";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request) {
  const client = await connectDatabase();
  const data = await request.json();

  try {
    const { id, ...updateData } = data; // Assuming `data` contains an `id` and the fields to update
    const db = client.db("db01");
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return NextResponse.json({
        message: "No document found or data unchanged",
      });
    }

    return NextResponse.json({ message: "Document updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating document", error });
  } finally {
    client.close();
  }
}

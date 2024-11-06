import { NextResponse } from "next/server";
import { connectDatabase } from "@/Services/mongo";
import { ObjectId } from "mongodb";

export async function DELETE(request: Request) {
  const client = await connectDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Expecting the ID as a query parameter

  if (!id) {
    return NextResponse.json({ message: "ID parameter is required" });
  }

  try {
    const db = client.db("db01");
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "No document found with this ID" });
    }

    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting document", error });
  } finally {
    client.close();
  }
}

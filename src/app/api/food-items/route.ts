import { NextResponse } from "next/server";

import { getApplicationServices } from "@/services";
import { handleApiError, readJsonBody } from "../_lib";
import { FoodItemInput } from "@/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const items = getApplicationServices().foodItems.listFoodItems(query);
    return NextResponse.json({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<FoodItemInput>(request);
    const foodItem = getApplicationServices().foodItems.createFoodItem(body);
    return NextResponse.json({ foodItem }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}


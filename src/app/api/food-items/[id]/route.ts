import { NextResponse } from "next/server";

import { getApplicationServices, UpdateFoodItemInput } from "@/services";
import { handleApiError, readJsonBody } from "../../_lib";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const foodItem = getApplicationServices().foodItems.getFoodItem(id);
    return NextResponse.json({ foodItem });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await readJsonBody<UpdateFoodItemInput>(request);
    const foodItem = getApplicationServices().foodItems.updateFoodItem(id, body);
    return NextResponse.json({ foodItem });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    getApplicationServices().foodItems.deleteFoodItem(id);
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}



import { NextResponse } from "next/server";

import { getApplicationServices, NutritionGoalInput, UpdateNutritionGoalInput } from "@/services";
import { handleApiError, readJsonBody } from "../_lib";

export async function GET(request: Request) {
  try {
    void request;
    const goal = getApplicationServices().nutritionGoals.getCurrentNutritionGoal();
    return NextResponse.json({ goal });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<NutritionGoalInput>(request);
    const goal = getApplicationServices().nutritionGoals.createNutritionGoal(body);
    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await readJsonBody<UpdateNutritionGoalInput>(request);
    const goal = getApplicationServices().nutritionGoals.updateCurrentNutritionGoal(body);
    return NextResponse.json({ goal });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    void request;
    getApplicationServices().nutritionGoals.deleteCurrentNutritionGoal();
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}



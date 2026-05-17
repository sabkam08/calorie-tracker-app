import { NextResponse } from "next/server";

import { MealLogInput, getApplicationServices } from "@/services";
import { handleApiError, readJsonBody } from "../_lib";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mealType = searchParams.get("mealType") ?? undefined;
    const start = searchParams.get("start") ?? undefined;
    const end = searchParams.get("end") ?? undefined;
    const mealLogs = getApplicationServices().mealLogs.listMealLogs({ mealType, start, end });
    return NextResponse.json({ mealLogs });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<MealLogInput>(request);
    const mealLog = getApplicationServices().mealLogs.createMealLog(body);
    return NextResponse.json({ mealLog }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}


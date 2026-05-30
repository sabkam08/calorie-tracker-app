import { NextResponse } from "next/server";

import { getApplicationServices, UpdateMealLogInput } from "@/services";
import { handleApiError, readJsonBody } from "../../_lib";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(request: Request, context: RouteContext) {
  try {
    void request;
    const { id } = await context.params;
    const mealLog = getApplicationServices().mealLogs.getMealLog(id);
    return NextResponse.json({ mealLog });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await readJsonBody<UpdateMealLogInput>(request);
    const mealLog = getApplicationServices().mealLogs.updateMealLog(id, body);
    return NextResponse.json({ mealLog });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    void request;
    const { id } = await context.params;
    getApplicationServices().mealLogs.deleteMealLog(id);
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}



import { NextResponse } from "next/server";

import { getApplicationServices } from "@/services";
import { handleApiError } from "../../_lib";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const summary = getApplicationServices().nutritionGoals.getSummary({
      date: searchParams.get("date") ?? undefined,
      start: searchParams.get("start") ?? undefined,
      end: searchParams.get("end") ?? undefined,
    });

    return NextResponse.json({ summary });
  } catch (error) {
    return handleApiError(error);
  }
}


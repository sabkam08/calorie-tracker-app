import { NextResponse } from "next/server";

import { isServiceError, ValidationError } from "@/services";

export async function readJsonBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new ValidationError("Request body must be valid JSON.");
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (isServiceError(error)) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(error);
  return NextResponse.json({ error: "Internal server error." }, { status: 500 });
}


import { ValidationError } from "./errors";

export function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function requireText(value: unknown, label: string): string {
  if (typeof value !== "string") {
    throw new ValidationError(`${label} is required.`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new ValidationError(`${label} is required.`);
  }

  return trimmed;
}

export function optionalText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function requireFiniteNumber(value: unknown, label: string): number {
  const parsed = typeof value === "string" ? Number(value) : value;

  if (typeof parsed !== "number" || !Number.isFinite(parsed)) {
    throw new ValidationError(`${label} must be a valid number.`);
  }

  return parsed;
}

export function requirePositiveNumber(value: unknown, label: string): number {
  const parsed = requireFiniteNumber(value, label);
  if (parsed <= 0) {
    throw new ValidationError(`${label} must be greater than zero.`);
  }

  return parsed;
}

export function requireNonNegativeNumber(value: unknown, label: string): number {
  const parsed = requireFiniteNumber(value, label);
  if (parsed < 0) {
    throw new ValidationError(`${label} cannot be negative.`);
  }

  return parsed;
}

export function parseDateOrFallback(value: unknown, label: string, fallback: Date): Date {
  if (value === undefined || value === null || value === "") {
    return new Date(fallback);
  }

  const date = value instanceof Date ? new Date(value) : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(`${label} must be a valid date.`);
  }

  return date;
}

export function parseOptionalDate(value: unknown, label: string): Date | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const date = value instanceof Date ? new Date(value) : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(`${label} must be a valid date.`);
  }

  return date;
}

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function endOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
}


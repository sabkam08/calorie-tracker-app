import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { GET as getFoodItems, POST as postFoodItem } from "@/app/api/food-items/route";
import { DELETE as deleteFoodItem, GET as getFoodItem, PUT as putFoodItem } from "@/app/api/food-items/[id]/route";
import { DELETE as deleteGoal, GET as getGoal, POST as postGoal, PUT as putGoal } from "@/app/api/nutrition-goals/route";
import { GET as getSummary } from "@/app/api/nutrition-goals/summary/route";
import { DELETE as deleteMealLog, GET as getMealLog, POST as postMealLog, PUT as putMealLog } from "@/app/api/meal-logs/[id]/route";
import { GET as getMealLogs, POST as postMealLogs } from "@/app/api/meal-logs/route";
import { resetApplicationServices } from "@/services";

function jsonRequest(url: string, body?: unknown, init: RequestInit = {}): Request {
  return new Request(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function parseJson(response: Response) {
  return (await response.json()) as Record<string, unknown>;
}

describe("REST API routes", () => {
  beforeEach(() => {
    resetApplicationServices();
  });

  it("creates and fetches food items", async () => {
    const createResponse = await postFoodItem(
      jsonRequest("http://localhost/api/food-items", {
        name: "Banana",
        servingSize: "1 medium",
        caloriesPerServing: 105,
        proteinGrams: 1.3,
        carbohydrateGrams: 27,
        fatGrams: 0.3,
      })
    );

    assert.equal(createResponse.status, 201);
    const createdBody = await parseJson(createResponse);
    const foodItem = createdBody.foodItem as { foodId: string };

    const fetchResponse = await getFoodItem(new Request(`http://localhost/api/food-items/${foodItem.foodId}`), {
      params: { id: foodItem.foodId },
    });

    assert.equal(fetchResponse.status, 200);
    const fetchBody = await parseJson(fetchResponse);
    assert.equal((fetchBody.foodItem as { name: string }).name, "Banana");

    const listResponse = await getFoodItems(new Request("http://localhost/api/food-items?q=ban"));
    assert.equal(listResponse.status, 200);
    const listBody = await parseJson(listResponse);
    assert.equal((listBody.items as unknown[]).length, 1);

    const duplicateResponse = await postFoodItem(
      jsonRequest("http://localhost/api/food-items", {
        name: "Banana",
        servingSize: "1 medium",
        caloriesPerServing: 105,
        proteinGrams: 1.3,
        carbohydrateGrams: 27,
        fatGrams: 0.3,
      })
    );
    assert.equal(duplicateResponse.status, 409);

    const updateResponse = await putFoodItem(
      jsonRequest(`http://localhost/api/food-items/${foodItem.foodId}`, { name: "Banana Ripe" }),
      { params: { id: foodItem.foodId } }
    );
    assert.equal(updateResponse.status, 200);

    const deleteResponse = await deleteFoodItem(new Request(`http://localhost/api/food-items/${foodItem.foodId}`), {
      params: { id: foodItem.foodId },
    });
    assert.equal(deleteResponse.status, 200);
  });

  it("creates meal logs and summary snapshots", async () => {
    const foodResponse = await postFoodItem(
      jsonRequest("http://localhost/api/food-items", {
        name: "Greek Yogurt",
        servingSize: "170g",
        caloriesPerServing: 100,
        proteinGrams: 17,
        carbohydrateGrams: 6,
        fatGrams: 0,
      })
    );
    const foodBody = await parseJson(foodResponse);
    const foodItem = foodBody.foodItem as { foodId: string };

    const goalResponse = await postGoal(
      jsonRequest("http://localhost/api/nutrition-goals", {
        dailyCalorieTarget: 2200,
        proteinTarget: 130,
        carbohydrateTarget: 240,
        fatTarget: 70,
      })
    );
    assert.equal(goalResponse.status, 201);

    const mealResponse = await postMealLogs(
      jsonRequest("http://localhost/api/meal-logs", {
        mealType: "Breakfast",
        foodItemId: foodItem.foodId,
        portionSize: 2,
        entryDate: "2026-04-26T08:00:00.000Z",
      })
    );
    assert.equal(mealResponse.status, 201);
    const mealBody = await parseJson(mealResponse);
    const mealLog = mealBody.mealLog as { mealLogId: string };

    const fetchMealResponse = await getMealLog(new Request(`http://localhost/api/meal-logs/${mealLog.mealLogId}`), {
      params: { id: mealLog.mealLogId },
    });
    assert.equal(fetchMealResponse.status, 200);

    const listResponse = await getMealLogs(new Request("http://localhost/api/meal-logs?mealType=Breakfast"));
    assert.equal(listResponse.status, 200);
    const listBody = await parseJson(listResponse);
    assert.equal((listBody.mealLogs as unknown[]).length, 1);

    const summaryResponse = await getSummary(new Request("http://localhost/api/nutrition-goals/summary?date=2026-04-26T00:00:00.000Z"));
    assert.equal(summaryResponse.status, 200);
    const summaryBody = await parseJson(summaryResponse);
    assert.equal((summaryBody.summary as { totalCalories: number }).totalCalories, 200);

    const updateMealResponse = await putMealLog(
      jsonRequest(`http://localhost/api/meal-logs/${mealLog.mealLogId}`, { portionSize: 1.5 }),
      { params: { id: mealLog.mealLogId } }
    );
    assert.equal(updateMealResponse.status, 200);

    const deleteMealResponse = await deleteMealLog(new Request(`http://localhost/api/meal-logs/${mealLog.mealLogId}`), {
      params: { id: mealLog.mealLogId },
    });
    assert.equal(deleteMealResponse.status, 200);
  });

  it("reads and updates nutrition goals", async () => {
    const createResponse = await postGoal(
      jsonRequest("http://localhost/api/nutrition-goals", {
        dailyCalorieTarget: 2000,
        proteinTarget: 120,
        carbohydrateTarget: 220,
        fatTarget: 60,
      })
    );
    assert.equal(createResponse.status, 201);

    const fetchResponse = await getGoal(new Request("http://localhost/api/nutrition-goals"));
    assert.equal(fetchResponse.status, 200);

    const updateResponse = await putGoal(
      jsonRequest("http://localhost/api/nutrition-goals", { dailyCalorieTarget: 2100, proteinTarget: 125 })
    );
    assert.equal(updateResponse.status, 200);

    const deleteResponse = await deleteGoal(new Request("http://localhost/api/nutrition-goals"));
    assert.equal(deleteResponse.status, 200);
  });
});


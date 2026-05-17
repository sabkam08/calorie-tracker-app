import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { POST as postFoodItem } from "@/app/api/food-items/route";
import { resetApplicationServices } from "@/services";

describe("API error handling", () => {
  it("returns a validation error for malformed JSON", async () => {
    resetApplicationServices();

    const response = await postFoodItem(
      new Request("http://localhost/api/food-items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{not-json",
      })
    );

    assert.equal(response.status, 400);
  });
});


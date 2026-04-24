"use client";

import { useMemo, useState } from "react";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

type FoodItem = {
  id: string;
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type MealLog = {
  id: string;
  mealType: MealType;
  food: FoodItem;
  portion: number;
  calories: number;
  loggedAt: Date;
};

const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: "food-oats",
    name: "Rolled Oats",
    servingSize: "40g",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
  },
  {
    id: "food-chicken",
    name: "Grilled Chicken Breast",
    servingSize: "120g",
    calories: 198,
    protein: 37,
    carbs: 0,
    fat: 4,
  },
  {
    id: "food-banana",
    name: "Banana",
    servingSize: "1 medium",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.3,
  },
  {
    id: "food-yogurt",
    name: "Greek Yogurt",
    servingSize: "170g",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0,
  },
];

const INITIAL_MEALS: MealLog[] = [
  {
    id: "meal-1",
    mealType: "Breakfast",
    food: INITIAL_FOOD_ITEMS[0],
    portion: 1,
    calories: INITIAL_FOOD_ITEMS[0].calories,
    loggedAt: new Date(),
  },
  {
    id: "meal-2",
    mealType: "Lunch",
    food: INITIAL_FOOD_ITEMS[1],
    portion: 1,
    calories: INITIAL_FOOD_ITEMS[1].calories,
    loggedAt: new Date(),
  },
];

export function CalorieDashboard() {
  const [dailyGoal, setDailyGoal] = useState<number>(2200);
  const [goalInput, setGoalInput] = useState<string>("2200");
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [mealLogs, setMealLogs] = useState<MealLog[]>(INITIAL_MEALS);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFoodId, setSelectedFoodId] = useState<string>(INITIAL_FOOD_ITEMS[0].id);
  const [mealType, setMealType] = useState<MealType>("Breakfast");
  const [portionInput, setPortionInput] = useState<string>("1");

  const [newFoodName, setNewFoodName] = useState<string>("");
  const [newFoodServing, setNewFoodServing] = useState<string>("");
  const [newFoodCalories, setNewFoodCalories] = useState<string>("");
  const [newFoodProtein, setNewFoodProtein] = useState<string>("");
  const [newFoodCarbs, setNewFoodCarbs] = useState<string>("");
  const [newFoodFat, setNewFoodFat] = useState<string>("");

  const [formError, setFormError] = useState<string>("");
  const [foodFormError, setFoodFormError] = useState<string>("");
  const [notice, setNotice] = useState<string>("");

  const selectedFood = useMemo(
    () => foodItems.find((item) => item.id === selectedFoodId) ?? foodItems[0],
    [foodItems, selectedFoodId],
  );

  const filteredFoods = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return foodItems;
    }
    return foodItems.filter((item) => item.name.toLowerCase().includes(term));
  }, [foodItems, searchTerm]);

  const todayMeals = useMemo(() => {
    const today = new Date();
    return mealLogs
      .filter((meal) => {
        const date = meal.loggedAt;
        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        );
      })
      .sort((a, b) => b.loggedAt.getTime() - a.loggedAt.getTime());
  }, [mealLogs]);

  const summary = useMemo(() => {
    const consumed = todayMeals.reduce((total, meal) => total + meal.calories, 0);
    const protein = todayMeals.reduce((total, meal) => total + meal.food.protein * meal.portion, 0);
    const carbs = todayMeals.reduce((total, meal) => total + meal.food.carbs * meal.portion, 0);
    const fat = todayMeals.reduce((total, meal) => total + meal.food.fat * meal.portion, 0);
    const remaining = Math.max(dailyGoal - consumed, 0);
    const progress = dailyGoal > 0 ? Math.min((consumed / dailyGoal) * 100, 100) : 0;

    return { consumed, remaining, progress, protein, carbs, fat };
  }, [todayMeals, dailyGoal]);

  const handleAddMeal = () => {
    setFormError("");
    setNotice("");

    if (!selectedFood) {
      setFormError("Please select a food item before saving.");
      return;
    }

    const portion = Number(portionInput);
    if (!Number.isFinite(portion) || portion <= 0) {
      setFormError("Portion must be greater than zero.");
      return;
    }

    const meal: MealLog = {
      id: crypto.randomUUID(),
      mealType,
      food: selectedFood,
      portion,
      calories: Number((selectedFood.calories * portion).toFixed(2)),
      loggedAt: new Date(),
    };

    setMealLogs((previous) => [meal, ...previous]);
    setPortionInput("1");
    setNotice("Meal logged successfully.");
  };

  const handleSaveGoal = () => {
    setFormError("");
    setNotice("");

    const parsedGoal = Number(goalInput);
    if (!Number.isFinite(parsedGoal) || parsedGoal <= 0) {
      setFormError("Daily goal must be a number greater than zero.");
      return;
    }

    setDailyGoal(parsedGoal);
    setNotice("Daily calorie goal updated.");
  };

  const handleAddFood = () => {
    setFoodFormError("");
    setNotice("");

    const name = newFoodName.trim();
    const serving = newFoodServing.trim();
    const calories = Number(newFoodCalories);
    const protein = Number(newFoodProtein);
    const carbs = Number(newFoodCarbs);
    const fat = Number(newFoodFat);

    if (!name || !serving) {
      setFoodFormError("Food name and serving size are required.");
      return;
    }

    if (
      !Number.isFinite(calories) ||
      calories < 0 ||
      !Number.isFinite(protein) ||
      protein < 0 ||
      !Number.isFinite(carbs) ||
      carbs < 0 ||
      !Number.isFinite(fat) ||
      fat < 0
    ) {
      setFoodFormError("Nutrition values must be valid non-negative numbers.");
      return;
    }

    const duplicate = foodItems.some((item) => item.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      setFoodFormError("A food item with the same name already exists.");
      return;
    }

    const newFood: FoodItem = {
      id: crypto.randomUUID(),
      name,
      servingSize: serving,
      calories,
      protein,
      carbs,
      fat,
    };

    setFoodItems((previous) => [newFood, ...previous]);
    setSelectedFoodId(newFood.id);
    setSearchTerm(name);

    setNewFoodName("");
    setNewFoodServing("");
    setNewFoodCalories("");
    setNewFoodProtein("");
    setNewFoodCarbs("");
    setNewFoodFat("");

    setNotice("Food item added to the catalogue.");
  };

  const progressWidth = `${summary.progress}%`;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Calorie Tracker</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Nutrition Command Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Log meals quickly, monitor daily intake, and maintain the food catalogue from one dashboard.
          </p>
          {notice ? <p className="mt-3 text-sm text-emerald-300">{notice}</p> : null}
          {formError ? <p className="mt-1 text-sm text-rose-300">{formError}</p> : null}
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Calories Consumed" value={summary.consumed.toFixed(0)} unit="kcal" />
          <SummaryCard label="Calories Remaining" value={summary.remaining.toFixed(0)} unit="kcal" />
          <SummaryCard label="Protein" value={summary.protein.toFixed(1)} unit="g" />
          <SummaryCard label="Carbs / Fat" value={`${summary.carbs.toFixed(1)} / ${summary.fat.toFixed(1)}`} unit="g" />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Daily Goal Progress</h2>
            <span className="text-sm text-slate-300">{summary.progress.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-1 flex-col gap-1 text-sm text-slate-300">
              Daily Calorie Goal
              <input
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
                type="number"
                min={1}
                value={goalInput}
                onChange={(event) => setGoalInput(event.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={handleSaveGoal}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
            >
              Save Goal
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold text-white">Quick Meal Log</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Meal Type
                <select
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
                  value={mealType}
                  onChange={(event) => setMealType(event.target.value as MealType)}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Search Food
                <input
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
                  type="text"
                  placeholder="e.g. Banana"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Food Item
                <select
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
                  value={selectedFoodId}
                  onChange={(event) => setSelectedFoodId(event.target.value)}
                >
                  {filteredFoods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.calories} kcal / {food.servingSize})
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-300">
                Portion Multiplier
                <input
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={portionInput}
                  onChange={(event) => setPortionInput(event.target.value)}
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleAddMeal}
              className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
            >
              Log Meal
            </button>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold text-white">Add Food Item</h2>
            <p className="mt-1 text-sm text-slate-300">Create a food entry when search returns no suitable match.</p>
            {foodFormError ? <p className="mt-2 text-sm text-rose-300">{foodFormError}</p> : null}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InputField label="Food Name" value={newFoodName} onChange={setNewFoodName} placeholder="e.g. Brown Rice" />
              <InputField label="Serving Size" value={newFoodServing} onChange={setNewFoodServing} placeholder="e.g. 100g" />
              <InputField label="Calories" value={newFoodCalories} onChange={setNewFoodCalories} type="number" />
              <InputField label="Protein (g)" value={newFoodProtein} onChange={setNewFoodProtein} type="number" />
              <InputField label="Carbs (g)" value={newFoodCarbs} onChange={setNewFoodCarbs} type="number" />
              <InputField label="Fat (g)" value={newFoodFat} onChange={setNewFoodFat} type="number" />
            </div>
            <button
              type="button"
              onClick={handleAddFood}
              className="mt-4 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
            >
              Add to Database
            </button>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Today&apos;s Meal History</h2>
            <span className="text-sm text-slate-300">{todayMeals.length} entries</span>
          </div>
          {todayMeals.length === 0 ? (
            <p className="text-sm text-slate-400">No meals logged yet. Start with the quick meal form above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300">
                    <th className="px-2 py-2 font-medium">Time</th>
                    <th className="px-2 py-2 font-medium">Meal</th>
                    <th className="px-2 py-2 font-medium">Food</th>
                    <th className="px-2 py-2 font-medium">Portion</th>
                    <th className="px-2 py-2 font-medium">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {todayMeals.map((meal) => (
                    <tr key={meal.id} className="border-b border-slate-900 text-slate-100">
                      <td className="px-2 py-2 text-slate-300">{meal.loggedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                      <td className="px-2 py-2">{meal.mealType}</td>
                      <td className="px-2 py-2">{meal.food.name}</td>
                      <td className="px-2 py-2">{meal.portion}x</td>
                      <td className="px-2 py-2">{meal.calories.toFixed(0)} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  unit: string;
};

function SummaryCard({ label, value, unit }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">
        {value} <span className="text-sm font-normal text-slate-300">{unit}</span>
      </p>
    </article>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
};

function InputField({ label, value, onChange, placeholder, type = "text" }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-300">
      {label}
      <input
        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}


# Calorie Tracker App – Use Case Specifications & Test Plan

## 1. Critical Use Case Specifications

Each specification details the purpose, flow, and success criteria for the 8 most critical use cases. These directly support stakeholder needs and tie back to functional requirements in `SYSTEM_REQUIREMENTS.md`.

---

### UC-01: Create Meal Log

**Actor(s):** Primary User, Busy Professional  
**Requirement(s):** FR-01, FR-02  
**Priority:** Critical  

**Description:**  
The user records a meal by selecting or searching for a food item, specifying the portion size, and providing a timestamp. The system automatically retrieves nutritional data, calculates total calories, validates the entry, and persists it to the database.

**Preconditions:**
- User is authenticated and has a valid session
- The meal entry form is accessible from the dashboard
- Food database is populated and searchable
- User has network connectivity to reach the backend

**Postconditions:**
- Meal entry is stored in PostgreSQL with calculated calories
- User's daily total is updated and visible on the dashboard
- Meal appears in historical records for the logged date
- All summary views reflect the new entry

**Basic Flow:**
1. User clicks "Add Meal" button on dashboard
2. Meal entry form opens with fields for: Meal Type, Food Item, Portion Size, Date/Time
3. User selects meal type (Breakfast, Lunch, Dinner, Snack)
4. User searches for food item by name (e.g., "Apple")
5. System displays matching results with calorie data
6. User selects the matching item
7. User enters portion size (e.g., 1 medium)
8. System calculates total calories
9. User reviews and clicks "Save"
10. System validates, saves record, updates dashboard

**Alternative Flows:**
- **A1: Food Not Found** → User can enter custom food and calories manually
- **A2: Invalid Portion** → System prevents submission and prompts for correction
- **A3: Offline Mode** → System queues entry locally; syncs when connectivity restored

---

### UC-02: Search Food Items

**Actor(s):** Primary User, Busy Professional  
**Requirement(s):** FR-07  
**Priority:** Critical  

**Description:**  
The user searches the food database by keyword to quickly locate items before logging a meal. The system filters results in real-time and prioritizes close matches.

**Preconditions:**
- Food catalog is loaded and indexed
- User is in meal logging form
- Search UI is available

**Postconditions:**
- Search results displayed within 2 seconds
- Selected food item populates the meal form
- User can proceed to portion entry

**Basic Flow:**
1. User types keyword in search field (e.g., "Apple")
2. System filters catalog in real-time
3. System displays up to 10 matching results sorted by relevance
4. Each result shows: Food name, serving size, calories
5. User optionally applies category filters
6. User clicks on result to select
7. Food item and calorie data populate meal form
8. User proceeds to enter portion size

**Alternative Flows:**
- **A1: No Match** → System offers option to add custom food
- **A2: Generic Match** → System suggests generic entry with note
- **A3: Advanced Filters** → User can filter by calorie range, nutrient type

---

### UC-03: View Daily Totals and Remaining Calories

**Actor(s):** Primary User, Busy Professional  
**Requirement(s):** FR-03, FR-04  
**Priority:** Critical  

**Description:**  
The user opens the dashboard to see today's calorie consumption, daily goal, and remaining calories. The view updates immediately after each meal is logged.

**Preconditions:**
- User is authenticated
- Dashboard page is loaded
- User has set a daily goal (or default applied)

**Postconditions:**
- Dashboard displays current day's total calories
- Dashboard displays remaining calories
- Data updates in real-time after new entries
- Visual indicators show goal progress

**Basic Flow:**
1. User opens the dashboard
2. System queries all meals logged today
3. System aggregates calorie total
4. System retrieves user's saved daily goal
5. System calculates remaining: (goal - consumed)
6. Dashboard displays:
   - Today's Total: [X] calories
   - Daily Goal: [2000] calories
   - Remaining: [Y] calories
   - Progress bar showing consumption
7. Color coding: Green if remaining ≥ 0; Red if negative
8. Meal list shows individual calorie counts

**Alternative Flows:**
- **A1: No Meals Today** → Dashboard shows empty state with call-to-action
- **A2: Goal Not Set** → System applies default (2000) and prompts to customize
- **A3: Goal Exceeded** → Overage displayed in red with warning

---

### UC-04: View Meal History

**Actor(s):** Primary User, Nutrition Coach  
**Requirement(s):** FR-05  
**Priority:** Important  

**Description:**  
The user selects a time range to review all logged meals and their calorie totals. The view supports filtering, sorting, and exporting.

**Preconditions:**
- User is authenticated
- Historical meal data exists
- History page is accessible

**Postconditions:**
- Requested meal logs displayed with dates and calories
- Totals aggregated by day or period
- User can export or print results

**Basic Flow:**
1. User navigates to "History" or "Reports"
2. System displays time range selector with presets
3. User selects preset or enters custom date range
4. System queries database for meals in range
5. System aggregates totals by day
6. View displays: Date, meal count, daily total, expandable meal list
7. User can expand date to see meal details
8. Optional: Sort by date, calories, or meal type

**Alternative Flows:**
- **A1: No Data** → System shows empty state with suggestion
- **A2: Export Data** → System generates CSV/PDF report
- **A3: Multi-Month View** → Data aggregated by week/month with trend line

---

### UC-05: Edit or Delete Meal Log Entry

**Actor(s):** Primary User, Busy Professional  
**Requirement(s):** FR-06  
**Priority:** Important  

**Description:**  
The user corrects existing meal entries by editing details or removes entries entirely. Changes immediately update daily totals and summaries.

**Preconditions:**
- User is authenticated
- Meal entry exists and is owned by user
- Meal is not locked/archived

**Postconditions:**
- Updated meal re-persisted with new calorie total
- Deleted meal removed from database
- Daily totals recalculated
- Dashboard and history reflect change

**Basic Flow (Edit):**
1. User clicks on existing meal
2. System opens meal in edit mode with pre-populated fields
3. User modifies fields (food, portion, date/time)
4. System recalculates calorie total
5. User reviews and clicks "Save Changes"
6. System validates, updates database, recalculates totals
7. Dashboard refreshes; confirmation displayed

**Basic Flow (Delete):**
1. User views existing meal
2. User clicks "Delete"
3. System displays confirmation dialog
4. User confirms deletion
5. System deletes record, recalculates totals
6. Dashboard refreshes; confirmation displayed

**Alternative Flows:**
- **A1: Invalid Data** → System prevents save and highlights invalid field
- **A2: Meal Locked** → System prevents edit; meal may be archived
- **A3: Concurrent Edit** → Second editor warned; change prevented to avoid conflict

---

### UC-06: Save Personal Nutrition Goals

**Actor(s):** Primary User  
**Requirement(s):** FR-08  
**Priority:** Important  

**Description:**  
The user sets or updates their daily calorie goal. The goal persists to the profile and is used in all "remaining calories" calculations.

**Preconditions:**
- User is authenticated with valid profile
- Goal settings page accessible
- User input within valid range (800–5000 calories)

**Postconditions:**
- Goal saved to user profile in database
- Dashboard immediately recalculates remaining calories
- Goal persists across sessions

**Basic Flow:**
1. User navigates to "Settings" or "My Profile"
2. User clicks "Edit Nutrition Goals"
3. System displays current saved goal (or default: 2000)
4. User enters new target (e.g., 2300)
5. System validates: positive, within range (800–5000)
6. If outside range, system displays warning
7. User confirms goal
8. System saves to profile
9. Dashboard immediately updates remaining calories
10. Confirmation: "Daily goal updated to [2300] calories"

**Alternative Flows:**
- **A1: Extreme Goal** → System warns; requires confirmation
- **A2: Reset to Default** → Goal reverts to 2000
- **A3: Multiple Goals** → System supports different goals for different days

---

### UC-07: Generate Summaries and Export Data

**Actor(s):** Nutrition Coach, Product Owner  
**Requirement(s):** FR-09, FR-05  
**Priority:** Important  

**Description:**  
The user generates summary reports of meal logs and nutritional data for a selected time period. Reports include daily totals, meal counts, averages, and trend visualizations. Data can be exported as CSV or PDF.

**Preconditions:**
- User is authenticated
- Meal data exists for requested period
- Export functionality enabled
- User has sufficient permissions

**Postconditions:**
- Summary report generated with requested metrics
- Report viewable on-screen or exportable to file
- Exported file downloaded or emailed

**Basic Flow:**
1. User navigates to "Reports" or "Analytics"
2. User selects report type: Daily, Weekly, Monthly, Custom
3. User selects date range
4. System queries meal logs for range
5. System calculates metrics: total calories, meal count, averages, meal breakdown
6. System generates visualization: line chart of daily totals
7. Report displayed with: date range, metrics, daily breakdown, chart
8. User clicks "Export as CSV" or "Export as PDF"
9. System generates file and initiates download
10. Confirmation: "[filename] downloaded successfully"

**Alternative Flows:**
- **A1: No Data** → System displays empty state with suggestion
- **A2: Email Report** → User clicks "Email Report"; system sends to email address
- **A3: Share with Coach** → User generates shareable link or enters coach email

---

### UC-08: Configure Deployment Environment

**Actor(s):** System Administrator, Developer  
**Requirement(s):** FR-10, FR-11  
**Priority:** Important  

**Description:**  
An administrator configures the application for deployment by setting environment variables for database connection, API endpoints, and secrets. The system validates configuration and confirms successful connection.

**Preconditions:**
- Deployment target environment provisioned
- Node.js and PostgreSQL installed
- Required secrets available and stored securely
- Source code checked out
- Administrator has access to documentation

**Postconditions:**
- Application starts successfully with provided configuration
- Database connection established and schema loaded
- All environment variables set and validated
- Application accessible at configured URL
- Logs confirm successful startup

**Basic Flow:**
1. Administrator accesses deployment documentation
2. Administrator reviews required environment variables: DATABASE_URL, NODE_ENV, JWT_SECRET, API_BASE_URL, etc.
3. Administrator creates .env.production file (never committed) with values
4. Administrator verifies secrets secured (not in version control)
5. Administrator runs deployment script: npm install && npm run build && npm start
6. Application initialization: loads env vars, validates presence, connects to PostgreSQL, runs migrations, starts server
7. Administrator verifies: checks health endpoint, confirms logs show success, tests sample API call
8. Application deployed and ready for user traffic

**Alternative Flows:**
- **A1: Missing Env Variable** → Startup fails with error; admin sets variable and retries
- **A2: Database Connection Failed** → Error log shows connection issue; admin verifies PostgreSQL, credentials, network
- **A3: Schema Not Initialized** → Admin manually runs schema setup script: npm run db:setup
- **A4: Security Validation** → Admin verifies: no secrets in logs, HTTPS enforced, config from environment

---

## 2. Test Plan

The test plan provides clear, traceable test cases for validating all functional and key non-functional requirements.

### 2.1 Functional Test Cases (15 Total)

| Test Case ID | Requirement ID | Use Case | Description | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **TC-001** | FR-01 | UC-01 | Log meal with valid details | 1. Click "Add Meal" 2. Enter: type=Breakfast, food=Apple, portion=1 medium, time=now 3. Save | Meal saved in DB; appears in history; daily total updates | Not Run |
| **TC-002** | FR-02 | UC-01 | Automatic calorie calculation | 1. Log meal with Apple (100 cal/medium) 2. View meal details | Displayed total = 100 cal (correct calculation) | Not Run |
| **TC-003** | FR-03 | UC-03 | Dashboard total calories today | 1. Log two meals: Breakfast (300) + Lunch (600) 2. Open dashboard | Today's Total = 900 calories | Not Run |
| **TC-004** | FR-04 | UC-03 | Remaining calories calculation | 1. Set goal 2000 cal 2. Log meals totaling 1500 cal 3. View dashboard | Remaining = 500 calories (2000-1500) | Not Run |
| **TC-005** | FR-05 | UC-04 | View meal history by date range | 1. Log meals 3/1 (2 meals) and 3/2 (1 meal) 2. Select range 3/1-3/2 | History shows all 3 meals grouped by date with totals | Not Run |
| **TC-006** | FR-06 | UC-05 | Edit meal: change portion | 1. Log "1 medium apple" (100 cal) 2. Edit to "1 large apple" (120 cal) 3. Save | Meal updated; daily total increases by 20 cal | Not Run |
| **TC-007** | FR-06 | UC-05 | Delete meal from history | 1. Log meal (200 cal) 2. Click Delete 3. Confirm | Meal removed; daily total decreases by 200 cal | Not Run |
| **TC-008** | FR-07 | UC-02 | Search food by name (2 sec) | 1. Open meal form 2. Type "apple" 3. Wait for results | Results show food items with "apple" within ≤2 seconds | Not Run |
| **TC-009** | FR-08 | UC-06 | Save goal & verify persistence | 1. Settings 2. Enter goal 2300 cal 3. Save 4. Refresh page | Goal saved; persists after refresh; dashboard uses new goal | Not Run |
| **TC-010** | FR-09 | UC-07 | Generate weekly summary | 1. Reports 2. Select "Weekly Summary" 3. Choose range | Report shows: total cal, meal count, daily breakdown, chart | Not Run |
| **TC-011** | FR-09 | UC-07 | Export summary as CSV | 1. Generate weekly summary 2. Click "Export as CSV" | CSV downloads with: Date, Meal, Calories columns | Not Run |
| **TC-012** | FR-10 | UC-08 | Meals persist after restart | 1. Log meal 2. Close/restart app 3. View history | Meal present in database; daily total reflects meal | Not Run |
| **TC-013** | FR-11 | UC-08 | Deploy with env variables | 1. Create .env with DATABASE_URL, NODE_ENV, etc. 2. Run startup 3. Check logs | Logs show "Server running" and "Database connected"; no missing vars | Not Run |
| **TC-014** | FR-12 | UC-01 | Validation: invalid portion | 1. Open meal form 2. Enter portion="-5" 3. Try to Save | Error: "Portion must be positive"; form doesn't submit | Not Run |
| **TC-015** | FR-12 | UC-01 | Validation: missing field | 1. Open meal form 2. Leave Food Item blank 3. Try to Save | Error: "Food item required"; field highlighted | Not Run |

### 2.2 Non-Functional Test Scenarios (11 Total)

| Test Case ID | Requirement ID | Category | Description | Test Procedure | Expected Result | Status |
|---|---|---|---|---|---|---|
| **TC-100** | NFR-P1 | Performance | Dashboard loads within 2 seconds | 1. DevTools open 2. Navigate to dashboard 3. Measure TTI | TTI ≤ 2 seconds (90th percentile ≤ 2.5s) | Not Run |
| **TC-101** | NFR-P2 | Performance | Meal submission within 3 seconds | 1. Open meal form 2. Fill data 3. Save 4. Measure to success message | Success msg within ≤3 seconds; meal stored | Not Run |
| **TC-102** | NFR-P3 | Performance | Search returns results within 2 seconds | 1. Open meal form 2. Type keyword 3. Measure to first results | Results display within ≤2 seconds; accurate | Not Run |
| **TC-103** | NFR-S1 | Scalability | Handle 100 concurrent user sessions | 1. Load test tool (k6, JMeter) 2. Simulate 100 concurrent users 3. Monitor response times & errors | 95th percentile ≤3 sec; error rate <1%; no crashes | Not Run |
| **TC-104** | NFR-SEC1 | Security | Enforce HTTPS in production | 1. Deploy to production 2. Attempt HTTP access 3. Check SSL cert | HTTP redirects to HTTPS; valid cert; no mixed content | Not Run |
| **TC-105** | NFR-SEC2 | Security | Secrets not exposed | 1. Clone repo 2. Search for DATABASE_URL, JWT_SECRET 3. Review logs | No secrets in files or logs; config from environment | Not Run |
| **TC-106** | NFR-SEC3 | Security | Input validation prevents XSS | 1. Log meal with: `<script>alert('xss')</script>` 2. View meal | Text stored safely; no script executed; displayed as literal | Not Run |
| **TC-107** | NFR-U1 | Usability | Mobile responsive (no h-scroll) | 1. Open on iPhone 12 (390px) 2. Log meal 3. View history 4. Check scroll | No h-scroll; readable fonts; tap targets ≥44px | Not Run |
| **TC-108** | NFR-U2 | Usability | Keyboard navigation | 1. Close mouse 2. Use Tab through form 3. Use Enter to submit | All fields reachable via Tab; focus visible; Enter submits | Not Run |
| **TC-109** | NFR-M1 | Maintainability | Component isolation | 1. Modify meal calc logic 2. Run test suite 3. Check failures | Changes to calc don't break unrelated modules | Not Run |
| **TC-110** | NFR-D1 | Deployability | Deploy in <10 minutes | 1. Follow DEPLOYMENT.md on fresh VM 2. Time setup 3. Verify running | App deployed and operational within 10 minutes | Not Run |

---

## 3. Test Execution & Success Criteria

**Manual vs. Automated Testing:**
- Functional tests (TC-001–TC-015): Manual or automated with Jest/Playwright/Cypress
- Performance tests (TC-100–TC-102): Lighthouse, Chrome DevTools, k6
- Security tests (TC-104–TC-106): Manual inspection, automated scanning, third-party tools
- Usability tests (TC-107–TC-108): Manual on devices + accessibility tools (axe, Lighthouse)

**Test Data:**
- Food database with known calorie values
- Test user accounts with predefined goals
- Historical meal data for history/summary tests
- Clean database state before persistence test (TC-012)

**Success Criteria:**
- Functional Requirements: All TC-001–TC-015 must pass
- Non-Functional Requirements: All measurements meet acceptance criteria; <1% errors
- Overall: >95% of test cases pass with no critical failures


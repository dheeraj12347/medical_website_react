# Hospital Management Dashboard

A production-quality beginner React project that teaches React through a real hospital admin workflow.

You will learn how a modern React app uses routes, protected pages, forms, API calls, Material UI, local storage, JSON Server, loading states, errors, search, sorting, pagination, dialogs, and snackbars.

## Tech Stack

- React with Vite
- Material UI
- Axios
- React Router DOM
- React Hook Form
- JSON Server mock API
- Local Storage
- Environment Variables

## Getting Started

Install dependencies:

```bash
npm install
```

Start the mock API:

```bash
npm run server
```

Start the React app in another terminal:

```bash
npm run dev
```

Open the Vite URL shown in your terminal, usually:

```text
http://localhost:3000
```

Demo login:

```text
Email: admin@hospital.com
Password: password123
```

## Project Flow

```text
User
  ↓
React
  ↓
Axios
  ↓
JSON Server
  ↓
Database (db.json)
  ↓
Response
  ↓
React UI
```

What this means:

1. The user clicks, types, searches, submits, edits, or deletes.
2. React handles the UI event.
3. Axios sends an HTTP request.
4. JSON Server receives the request.
5. JSON Server reads or updates `db.json`.
6. JSON Server sends a response.
7. React updates state and shows the new UI.

## Folder Structure

```text
src/
  assets/        Images and static files.
  components/    Reusable UI pieces.
  context/       Shared app state such as authentication.
  hooks/         Custom React hooks.
  pages/         Route-level screens.
  routes/        React Router route definitions.
  services/      Axios API layer.
  utils/         Constants and theme configuration.
```

Why we use this structure:

- It separates responsibilities.
- It makes files easier to find.
- It keeps pages focused on screens and components focused on reusable UI.
- It makes the API layer reusable instead of scattering Axios calls everywhere.

## React

What it is:

React is a JavaScript library for building user interfaces from components.

Why we use it:

It helps us build complex screens from small reusable pieces.

Where it is used:

Every file ending in `.jsx`, such as `src/App.jsx`, `src/pages/DashboardPage.jsx`, and `src/components/PatientTable.jsx`.

How it works:

React renders components into the browser. When state changes, React updates the UI.

Example:

```jsx
function App() {
  return <RouterProvider router={appRouter} />;
}
```

## Components

What they are:

Components are reusable UI functions.

Why we use them:

They keep code organized and prevent repetition.

Where they are used:

- `DashboardCard` shows one dashboard metric.
- `PatientTable` displays patients.
- `PatientForm` is reused for adding and editing.
- `Loader` shows a loading spinner.

Example:

```jsx
<DashboardCard title="Total Patients" value={summary.totalPatients} />
```

## Props

What they are:

Props are values passed from a parent component to a child component.

Why we use them:

They make components reusable with different data.

Where they are used:

`DashboardPage` passes `title`, `value`, `icon`, and `color` into `DashboardCard`.

How it works:

The parent sends data. The child reads that data from its function parameters.

## State

What it is:

State is data that can change over time.

Why we use it:

React needs state to update the screen after user actions or API responses.

Where it is used:

`PatientsPage` stores patients, search text, selected patient, loading state, and snackbar messages.

Example:

```jsx
const [patients, setPatients] = useState([]);
```

## useState

What it is:

`useState` is a React Hook for creating state.

Why we use it:

It lets a component remember changing values.

Where it is used:

- `LoginPage` uses form state through React Hook Form.
- `PatientsPage` uses `useState` for table behavior.
- `AppLayout` uses `useState` to open and close the mobile drawer.

How it works:

`useState` returns the current value and a setter function.

## useEffect

What it is:

`useEffect` runs code after a component renders.

Why we use it:

It is commonly used for API calls when a page loads.

Where it is used:

- `DashboardPage` loads summary cards.
- `PatientsPage` loads patient records.

Example:

```jsx
useEffect(() => {
  loadPatients();
}, []);
```

The empty array means the effect runs once when the page first appears.

## React Router

What it is:

React Router controls which page appears for each URL.

Why we use it:

Single-page apps need navigation without full page reloads.

Where it is used:

`src/routes/AppRoutes.jsx`

Routes in this project:

- `/login`
- `/`
- `/patients`
- `/patients/add`

## Protected Routes

What they are:

Protected routes block private pages unless a user is logged in.

Why we use them:

Dashboards usually require authentication.

Where they are used:

`src/components/ProtectedRoute.jsx`

How it works:

If there is no fake JWT token in local storage, the user is redirected to `/login`.

## Local Storage

What it is:

Local Storage is browser storage that survives page refreshes.

Why we use it:

The fake JWT token should remain available after refresh.

Where it is used:

- `src/hooks/useLocalStorage.js`
- `src/context/AuthContext.jsx`

How it works:

After login, the app stores a fake token under `hospital_fake_jwt_token`.

## Axios

What it is:

Axios is a library for making HTTP requests.

Why we use it:

It gives a clean way to call APIs and read responses.

Where it is used:

`src/services/patientService.js` and `src/services/dashboardService.js`

## Axios Instance

What it is:

An Axios instance is a preconfigured Axios client.

Why we use it:

It keeps the base API URL in one place.

Where it is used:

`src/services/api.js`

Example:

```jsx
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## API

What it is:

An API lets the frontend communicate with a backend.

Why we use it:

The dashboard needs patient, doctor, appointment, and bed data.

Where it is used:

JSON Server exposes data from `db.json`.

Mock API URL:

```text
http://localhost:5000
```

## CRUD

What it is:

CRUD means Create, Read, Update, Delete.

Why we use it:

Patient management needs all four actions.

Where it is used:

`src/services/patientService.js`

## GET

What it is:

GET reads data.

Where it is used:

`getPatients()` loads patients for the table.

## POST

What it is:

POST creates data.

Where it is used:

`createPatient()` adds a new patient from `AddPatientPage`.

## PUT

What it is:

PUT updates an existing record.

Where it is used:

`updatePatient()` updates a patient from the edit dialog.

## DELETE

What it is:

DELETE removes data.

Where it is used:

`deletePatient()` deletes a patient after confirmation.

## Material UI

What it is:

Material UI is a React component library.

Why we use it:

It helps build professional interfaces quickly.

Where it is used:

This project uses MUI `Button`, `TextField`, `Card`, `Dialog`, `Snackbar`, `Table`, `Pagination`, `Drawer`, `AppBar`, `Grid`, icons, `CircularProgress`, `Typography`, and `Container`.

## React Hook Form

What it is:

React Hook Form is a form library for React.

Why we use it:

It makes validation and form state easier.

Where it is used:

- `LoginPage`
- `PatientForm`

How it works:

Fields are connected with `Controller`, and validation rules are defined near each field.

## Snackbar

What it is:

A Snackbar is a small temporary message.

Why we use it:

It confirms actions without moving the user away from the page.

Where it is used:

- Adding a patient
- Editing a patient
- Deleting a patient

## Dialog

What it is:

A Dialog is a modal window.

Why we use it:

It focuses the user on one important action.

Where it is used:

- Edit patient dialog
- Delete confirmation dialog

## Pagination

What it is:

Pagination splits long lists into pages.

Why we use it:

Tables stay readable when there are many records.

Where it is used:

`PaginationComponent` and `PatientsPage`

How it works:

`PatientsPage` slices the patient array based on the current page.

## Search

What it is:

Search filters the visible data based on user input.

Why we use it:

Users need to find patient records quickly.

Where it is used:

`SearchBar` and `PatientsPage`

How it works:

The app checks whether patient name, disease, doctor, status, or gender includes the search text.

## Sorting

What it is:

Sorting changes the order of records.

Why we use it:

Users may want to organize patients by name, age, status, or doctor.

Where it is used:

`PatientTable` uses `TableSortLabel`, and `PatientsPage` sorts the patient array.

## Loading

What it is:

Loading state tells the UI that data is still being fetched.

Why we use it:

Users should not see a blank screen while waiting.

Where it is used:

`Loader`, `DashboardPage`, and `PatientsPage`

## Error Handling

What it is:

Error handling shows helpful feedback when something fails.

Why we use it:

APIs can fail, especially if JSON Server is not running.

Where it is used:

Dashboard, patient listing, and add patient pages show MUI `Alert` messages.

## Environment Variables

What they are:

Environment variables are configuration values outside the code.

Why we use them:

The API URL can change between development and production.

Where they are used:

- `.env`
- `.env.example`
- `src/services/api.js`

Important Vite rule:

Variables must start with `VITE_` to be available in React code.

## Project Flow By Screen

Login:

1. User enters email and password.
2. React Hook Form validates the fields.
3. Auth context stores a fake JWT token in local storage.
4. Protected routes allow access to the dashboard.

Dashboard:

1. `DashboardPage` runs `useEffect`.
2. `getDashboardSummary()` calls JSON Server.
3. The response updates React state.
4. MUI cards show totals.

Patients:

1. `PatientsPage` loads patients with GET.
2. Search filters the patient list.
3. Sorting orders the filtered list.
4. Pagination slices the list.
5. The table renders rows with stable `key` values.

Add Patient:

1. User fills the form.
2. React Hook Form validates required fields.
3. Axios sends POST.
4. Snackbar confirms success.
5. The user returns to the patients page.

Edit Patient:

1. User clicks the edit icon.
2. A dialog opens with the selected patient.
3. User updates fields.
4. Axios sends PUT.
5. The table state updates.

Delete Patient:

1. User clicks the delete icon.
2. A confirmation dialog opens.
3. User confirms.
4. Axios sends DELETE.
5. The table removes that patient.

## Beginner Learning Checklist

After studying this project, you should understand:

- How React renders components.
- How props pass data into reusable components.
- How state updates the UI.
- How `useEffect` loads API data.
- How routes map URLs to pages.
- How protected routes guard private screens.
- How Axios talks to a backend.
- How JSON Server acts like a fake backend.
- How CRUD maps to HTTP methods.
- How Material UI builds polished screens.
- How React Hook Form validates forms.
- How local storage keeps a token after refresh.
- How search, sorting, and pagination are derived from state.
- How loading, error, empty, dialog, and snackbar states improve user experience.

# Back Paddock Country Report

A React application that allows users to search, add, edit, replace, and remove countries from a report using the REST Countries API.

## Features

- Search countries with autocomplete
- Add countries to the report
- Prevent duplicate countries
- Edit country area (km² or mi²) with automatic unit conversion
- Replace a country with another country
- Delete countries with a confirmation dialog and countdown timer
- Display total combined area in the DataGrid footer
- Persist report data across page refreshes
- Responsive Material UI interface
- Unit tested business logic with Vitest

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI v7
- Redux Toolkit
- Redux Saga
- React Router
- Vitest
- REST Countries API

---

## Prerequisites

- Node.js 20+
- npm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/miergonzales/mier-backpaddock.git
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=https://api.restcountries.com
VITE_API_TOKEN=YOUR_API_TOKEN
```

Replace `YOUR_API_TOKEN` with a valid API token from REST Countries(https://restcountries.com/api-keys).

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

---

## Running Tests

Run all unit tests:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Generate a coverage report:

```bash
npm run test:coverage
```

---

## Project Structure

```
src/
┣ app/
┃ ┣ FullscreenLoader.tsx
┃ ┣ Layout.tsx
┃ ┗ router.tsx
┣ assets/
┣ components/
┃ ┗ errors/
┃   ┣ ErrorBoundary.tsx
┃   ┗ RouteError.tsx
┣ features/
┃ ┗ countries/
┃   ┣ components/
┃ ┃ ┃ ┣ columns.tsx
┃ ┃ ┃ ┣ CountryAutocomplete.tsx
┃ ┃ ┃ ┣ CountryDataGrid.tsx
┃ ┃ ┃ ┣ CountryReplaceDialog.tsx
┃ ┃ ┃ ┣ DataGridFooter.tsx
┃ ┃ ┃ ┣ DeleteCountryDialog.tsx
┃ ┃ ┃ ┗ exports.ts
┃   ┣ utils/
┃ ┃ ┃ ┗ country.mapper.ts
┃   ┣ __tests__/
┃ ┃ ┃ ┣ countries.service.test.ts
┃ ┃ ┃ ┣ countries.slice.test.ts
┃ ┃ ┃ ┗ country.mapper.test.ts
┃   ┣ countries.actions.ts
┃   ┣ countries.saga.ts
┃   ┣ countries.service.ts
┃   ┣ countries.slice.ts
┃   ┣ exports.ts
┃   ┣ index.tsx
┃   ┗ types.ts
┣ lib/
┃ ┣ apiFetch.ts
┃ ┗ storage.ts
┣ store/
┃ ┣ hooks.ts
┃ ┣ index.ts
┃ ┣ rootReducer.ts
┃ ┗ rootSaga.ts
┣ themes/
┃ ┗ rootThemes.ts
┣ App.css
┣ App.tsx
┣ index.css
┗ main.tsx
```

---

## Application Workflow

1. Search for a country using the autocomplete.
2. Select a country and click **Add**.
3. Edit the area values directly within the DataGrid.
4. Click a country name to replace it with another country.
5. Delete countries using the delete action.
6. The footer displays the total combined area.
7. Report data is automatically saved and restored after refreshing the page.

---

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## Notes

- Country information is retrieved from the REST Countries API.
- Area values remain synchronized between square kilometers and square miles.
- Replacing a country fetches a fresh record from the API and discards any previous edits for that row.
- Report data is persisted locally so it survives browser refreshes.

---

## License

This project was created as part of a technical assessment.

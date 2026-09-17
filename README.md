# Open Data Kabupaten Bandung Barat

Open Data Kabupaten Bandung Barat is a React web application for publishing, browsing, and managing public datasets for Kabupaten Bandung Barat (KBB). It provides a public-facing data portal as well as protected administration screens for dataset management.

The application consumes the Open Data KBB backend API for dataset metadata and records.

## Features

- Public homepage and informational pages for KBB history, vision and mission, and logo guidance.
- Dataset catalogue and dataset detail views.
- Dataset metadata display, data viewing, and Excel file support.
- Administrative login and protected dashboard.
- Administrative tools to add datasets from Excel, edit metadata, view stored records, and create accounts.
- Responsive interface built with Bootstrap, React Bootstrap, and custom CSS.

## Technology

- React 19
- React Router 7
- Axios
- Bootstrap and React Bootstrap
- SheetJS (`xlsx`) for spreadsheet processing
- Framer Motion and AOS for interface animation

## Prerequisites

- Node.js 18 or newer
- npm
- A running instance of the Open Data KBB backend. The current API client is configured to use `https://backendopendata-production.up.railway.app/api`.

## Installation

Clone the repository and install its dependencies:

```bash
git clone <repository-url>
cd OpenData
npm install
```

Start the development server:

```bash
npm start
```

The application is available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm test` | Runs the test suite in watch mode. |
| `npm run build` | Creates an optimized production build in `build/`. |

## Application Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/detail/:id` | Dataset detail | Public |
| `/dataSet` | Dataset catalogue | Public |
| `/sejarah` | KBB history | Public |
| `/visimisi` | Vision and mission | Public |
| `/logo` | Logo information | Public |
| `/admin/LoginAdmin` | Administrator login | Public |
| `/admin/dashboard` | Dataset administration dashboard | Authenticated administrator |
| `/admin/tambah` | Add a dataset from Excel | Authenticated administrator |
| `/admin/EditFile/:id` | Edit dataset metadata | Authenticated administrator |
| `/admin/view/:id` | View dataset records | Authenticated administrator |
| `/owner/akun` | Create an administrator account | Authenticated administrator |

## API Integration

The API client is located at `src/api/api.js`. Its configured base URL is:

```text
https://backendopendata-production.up.railway.app/api
```

The client uses these backend resources:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/tables` | Retrieve all dataset metadata. |
| `GET` | `/data/:id` | Retrieve records for a dataset. |
| `PUT` | `/tables/:id` | Update dataset metadata. |
| `DELETE` | `/tables/:id` | Remove a dataset. |

For local development, update the Axios `baseURL` in `src/api/api.js` to point to your local backend, for example `http://localhost:5000/api`.

## Project Structure

```text
OpenData/
├── public/              Static files and sample spreadsheet data
├── src/
│   ├── admin/           Administrator pages and styles
│   ├── api/             Axios API client
│   ├── assets/          Images and visual assets
│   ├── auth/            Route protection
│   ├── components/      Shared layout and UI components
│   ├── pages/           Public pages
│   ├── styles/          Page and component styles
│   ├── workers/         Spreadsheet worker
│   └── App.js           Route definitions
└── package.json
```

## Deployment

Create a production build with:

```bash
npm run build
```

Deploy the generated `build/` directory to a static hosting service. Ensure the backend URL in `src/api/api.js` is reachable from the deployed frontend and accepts requests from the frontend origin.

## Related Project

The server API for this application is maintained in the `BackEnd(KBB)` project.

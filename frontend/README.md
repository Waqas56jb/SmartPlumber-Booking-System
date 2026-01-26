# SmartPlumber Frontend

React.js frontend application for BP Heating & Plumbing booking system.

## Features

- Built with React.js (no TypeScript)
- Styled with Tailwind CSS
- Uses React Icons for icons
- React Toastify for notifications
- Modular component structure
- Responsive design
- Smooth scroll animations
- Lightbox gallery for portfolio items

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

Create a production build:
```bash
npm run build
```

The build folder will contain the optimized production files.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ContactStrip.js
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── Services.js
│   │   ├── Portfolio.js
│   │   ├── CTA.js
│   │   ├── Footer.js
│   │   ├── MobileBar.js
│   │   └── Lightbox.js
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- React 18.2.0
- Tailwind CSS 3.4.0
- React Icons 4.12.0
- React Toastify 9.1.3

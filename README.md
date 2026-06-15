# Repository Structure Analysis & Visualization System

## Overview

Repository Structure Analysis & Visualization System is a full-stack developer tool designed to help users understand, explore, and analyze large codebases. The system scans a local repository, extracts file dependencies, calculates code metrics, and visualizes relationships between files using an interactive graph interface.

The project addresses common challenges faced when onboarding to unfamiliar projects, understanding architecture, identifying complex files, and exploring dependencies across modules.

The platform combines static code analysis, interactive visualization, and AI-powered file explanations to provide a comprehensive repository exploration experience.

---

## Features

### Repository Scanning

* Scan any local repository by providing its folder path.
* Recursive directory traversal.
* Automatically ignores unnecessary directories:

  * `.git`
  * `node_modules`
  * `dist`
  * `build`
  * `venv`

### Dependency Analysis

Extracts dependencies without executing code.

Supported languages:

* JavaScript
* TypeScript
* Python
* C
* C++

Supported dependency patterns:

* ES6 Imports
* CommonJS Requires
* Dynamic Imports (`import()`)
* Python Imports
* Python From Imports
* C/C++ Includes
* Next.js Alias Imports (`@/`)

### Interactive Graph Visualization

Built using React Flow.

Features:

* Draggable nodes
* Zoom & pan support
* Interactive minimap
* Automatic graph layout
* Dependency edge visualization
* Repository refresh functionality

### Code Metrics Engine

Calculates metrics for every file:

* Lines of Code (LOC)
* Number of Functions
* Number of Imports
* File Size
* Basic Complexity Score

### File Explorer Sidebar

Clicking a node displays:

* File Name
* Relative Path
* LOC
* Function Count
* Import Count
* File Size
* Complexity Score
* Source Code Preview

### AI-Powered File Summaries

Uses Google Gemini API to generate plain-English explanations of files.

Features:

* On-demand summary generation
* User-triggered requests
* Cached responses
* Reduced API usage

### Smart Caching

To minimize API calls and improve performance:

* File content hash generation
* Summary caching
* Automatic cache reuse if file content has not changed

---

## Technology Stack

### Frontend

* React.js
* React Flow
* Axios
* Tailwind CSS
* React Router

### Backend

* FastAPI
* Python

### AI Integration

* Google Gemini API

### Graph Layout

* Dagre

---

## Project Structure

```text
repo-analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│
├── backend/
│   ├── main.py
│   ├── scanner.py
│   ├── graph_builder.py
│   ├── dependency_parser.py
│   ├── metrics.py
│   ├── ai_service.py
│   ├── cache.py
│   └── requirements.txt
│
└── README.md
```

---

# Installation & Setup

## Prerequisites

Install:

* Python 3.10+
* Node.js 18+
* npm

---

## Clone Repository

```bash
git clone https://github.com/skmachra/repo-analyzer.git
cd repo-analyzer
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create environment file:

```text
.env
```

Add:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Running the Application

1. Start FastAPI backend.
2. Start React frontend.
3. Open the application.
4. Enter a local repository path.

Example:

```text
C:\Users\Admin\Desktop\MyProject
```

5. Click Analyze Repository.
6. Explore the generated dependency graph.
7. Click nodes to inspect file metrics.
8. Generate AI summaries when needed.

---

# Supported Repository Types

The system currently works well with:

* React Projects
* Vite Projects
* Next.js Projects
* Python Projects
* C Projects
* C++ Projects

---

# Assumptions

The following assumptions are made:

1. Source files are text-based and readable using UTF-8 encoding.
2. Dependency analysis is static and does not execute code.
3. Only import/include relationships are analyzed.
4. Complexity score is an approximate static metric and not a full cyclomatic complexity implementation.
5. AI summaries depend on Gemini API availability.
6. The application is intended primarily for local repository analysis.

---

# Additional Enhancements Implemented

### Next.js Support

Added support for:

```js
import Navbar from "@/components/Navbar";
```

and

```js
const Component = dynamic(
    () => import("./Component")
);
```

### Smart Graph Layout

* Automatic node positioning using Dagre.
* Special handling for isolated files.
* Reduced graph clutter for large repositories.

### Performance Optimizations

* AI response caching.
* Ignored folder filtering.
* Efficient dependency extraction.

### User Experience Improvements

* Dark themed interface.
* Responsive layout.
* Repository switching.
* Loading states.
* Error handling.
* Interactive sidebar.
* Zoomable graph navigation.

---

# Future Improvements

Potential future enhancements:

* Folder-level grouping and collapsing
* Git history analysis
* Cyclomatic complexity calculation
* Search and filtering
* Export graph as PNG/PDF
* Repository comparison
* Multi-language dependency analysis
* Electron desktop application support

---

# Author

**Sunil Kumar**
Chemical Science, IIT Roorkee

Repository Structure Analysis & Visualization System was developed as a software engineering project to simplify understanding, exploration, and analysis of complex codebases through visualization, metrics, and AI-assisted insights.

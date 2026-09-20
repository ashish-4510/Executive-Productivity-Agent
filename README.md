# ⚡ Executive Productivity Agent

> **AI Chief of Staff for Arjun Malhotra (VP Sales, Veridian Corp)**\
> Week of **Monday 21 September -- Friday 25 September 2026**

A full-stack executive intelligence prototype that brings together
meeting transcripts, email threads, calendar events, voice notes, and
commitments into one executive dashboard.

The application is designed to help an executive quickly understand:

-   What needs attention
-   What actions are pending
-   What is waiting on other people
-   Which items are critical
-   What meetings are coming up
-   What commitments have been identified
-   What the important executive priorities are

------------------------------------------------------------------------

## 📌 Project Overview

The Executive Productivity Agent acts as an AI-powered executive
assistant / Chief of Staff.

It processes structured executive data from multiple sources and
converts that information into actionable intelligence.

### Data sources

The prototype currently uses four local JSON data sources:

1.  **Meetings**
2.  **Emails**
3.  **Calendar**
4.  **Voice Notes**

The backend analyzes these sources and exposes REST APIs. The React
frontend consumes those APIs and presents the information through a
professional executive dashboard.

------------------------------------------------------------------------

## 🎯 Main Objectives

The project is designed to:

-   Consolidate executive information into one interface
-   Identify commitments from meetings and emails
-   Track pending actions
-   Identify ownership problems
-   Detect important deadlines
-   Show upcoming meetings
-   Surface critical items
-   Provide an executive-level brief
-   Allow natural-language questions through an AI Chat interface

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
Executive-Productivity-Agent/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/                         # Node.js + Express backend
│   ├── data/
│   │   ├── calendar.json
│   │   ├── emails.json
│   │   ├── meetings.json
│   │   └── voiceNotes.json
│   │
│   ├── services/
│   │   └── commitmentEngine.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

# 🖥️ Frontend

The frontend is built using:

-   React
-   Vite
-   React Router
-   CSS

The frontend runs on:

``` text
http://localhost:5173
```

## Frontend Pages

### 1. Overview

The main executive dashboard.

It displays:

-   My Actions
-   Waiting on Others
-   Critical Items
-   Upcoming Meetings
-   Executive Insight

Example information shown by the dashboard:

``` text
My Actions: 1
Waiting on Others: 1
Critical: 1
Upcoming Meetings: 11
```

The exact values depend on the current data in the JSON files.

------------------------------------------------------------------------

### 2. My Actions

Shows commitments and actions that require executive attention.

Examples include:

``` text
Send updated vendor list
Review Q3 campaign deck
```

Each commitment can contain:

-   Owner
-   Person being waited on
-   Deadline
-   Status
-   Priority
-   Source

------------------------------------------------------------------------

### 3. Meetings

Displays meeting intelligence.

The current sample data includes:

``` text
Leadership Sync
```

The meeting page displays:

-   Meeting title
-   Date
-   Start time
-   End time
-   Attendees
-   Transcript

The transcript contains discussion points that can later be converted
into commitments and priorities.

------------------------------------------------------------------------

### 4. Calendar

Displays upcoming executive meetings.

Example events include:

``` text
Leadership Sync
1:1 with Neha
Internal Budget Review
Call — Meridian Logistics
Board Prep Session
Hiring Panel — Sales Associate
Facilities Check-in
```

------------------------------------------------------------------------

### 5. Emails

Displays executive email threads.

The current data contains threads such as:

``` text
Vendor List
Q3 Campaign Deck
Call Reschedule
Expense Variance Report
Mumbai Office Lease Renewal
```

The email page allows the executive to inspect messages within each
thread.

------------------------------------------------------------------------

### 6. Voice Notes

Displays executive voice notes.

The current prototype contains:

``` text
Voice Note 1
Voice Note 2
```

Voice notes contain additional executive context and follow-up
information.

------------------------------------------------------------------------

### 7. AI Brief

The AI Brief combines information from the different sources into an
executive summary.

It provides:

-   Pending actions
-   Critical items
-   Waiting items
-   Upcoming meetings
-   Email thread count
-   Voice note count
-   Completed items
-   Priorities

------------------------------------------------------------------------

### 8. AI Chat

The AI Chat provides a conversational interface for asking questions
about the executive's information.

Example questions:

``` text
What do I need to focus on?
```

``` text
What am I waiting for?
```

``` text
What are my critical items?
```

``` text
What meetings do I have?
```

``` text
Summarize my emails.
```

The chat interface is designed to answer using the project's executive
data.

------------------------------------------------------------------------

### 9. Data Sources

The Data Sources page shows the connected information available to the
agent.

It currently tracks:

-   Meetings
-   Emails
-   Calendar
-   Voice Notes

The page shows the number of records available for each source.

------------------------------------------------------------------------

# ⚙️ Backend

The backend is built using:

-   Node.js
-   Express
-   CORS
-   Local JSON data

The backend runs on:

``` text
http://localhost:5000
```

------------------------------------------------------------------------

# 🔌 REST API

## Health Check

``` http
GET /api/health
```

Used to verify that the backend is running.

------------------------------------------------------------------------

## Meetings

``` http
GET /api/meetings
```

Returns meeting records and transcripts.

------------------------------------------------------------------------

## Calendar

``` http
GET /api/calendar
```

Returns calendar events.

------------------------------------------------------------------------

## Emails

``` http
GET /api/emails
```

Returns email threads and messages.

------------------------------------------------------------------------

## Voice Notes

``` http
GET /api/voice-notes
```

Returns voice-note records.

------------------------------------------------------------------------

## Commitments

``` http
GET /api/commitments
```

Returns commitments generated by the commitment engine.

------------------------------------------------------------------------

## Executive Brief

``` http
GET /api/brief
```

Returns the executive-level summary generated from the available data.

------------------------------------------------------------------------

# 🧠 Commitment Engine

The project contains:

``` text
server/services/commitmentEngine.js
```

The commitment engine converts information from the executive data
sources into structured commitments.

A commitment can contain:

``` text
ID
Title
Owner
Waiting On
Deadline
Deadline Label
Status
Priority
Source
```

Example:

``` json
{
  "id": "commitment-001",
  "title": "Send updated vendor list",
  "owner": "Arjun Malhotra",
  "waitingOn": "Raghav Sethi",
  "deadline": "2026-09-23",
  "status": "Pending",
  "priority": "High"
}
```

------------------------------------------------------------------------

# 📊 Sample Executive Intelligence

The current sample data demonstrates several types of executive
situations.

### Pending action

``` text
Send updated vendor list
```

### Scheduled action

``` text
Review Q3 campaign deck
```

### Completed action

``` text
Confirm Meridian Logistics call
```

### Critical ownership issue

``` text
Assign owner for Mumbai office lease renewal
```

The last example demonstrates how the system can surface an item where
ownership is unclear and a deadline is approaching.

------------------------------------------------------------------------

# 🛠️ Technologies Used

## Frontend

  Technology     Purpose
  -------------- ---------------------------------
  React          User interface
  Vite           Frontend development/build tool
  React Router   Page navigation
  CSS            Styling

## Backend

  Technology   Purpose
  ------------ --------------------------------
  Node.js      Server runtime
  Express      REST API
  CORS         Frontend/backend communication
  JSON         Prototype data storage

## Development Tools

  Tool              Purpose
  ----------------- --------------------
  VS Code           Development
  Git               Version control
  GitHub            Repository hosting
  Chrome            Testing
  Postman/Browser   API testing

------------------------------------------------------------------------

# 🚀 Installation

## Prerequisites

Install:

-   Node.js
-   npm
-   Git
-   VS Code

Verify Node.js:

``` powershell
node --version
```

Verify npm:

``` powershell
npm --version
```

Verify Git:

``` powershell
git --version
```

------------------------------------------------------------------------

# 📥 Clone the Repository

``` powershell
git clone https://github.com/YOUR_USERNAME/Executive-Productivity-Agent.git
```

Move into the project:

``` powershell
cd Executive-Productivity-Agent
```

------------------------------------------------------------------------

# 📦 Install Backend Dependencies

Open PowerShell:

``` powershell
cd server
npm install
```

Start the backend:

``` powershell
node server.js
```

Expected output:

``` text
Executive Productivity Agent

Server running at http://localhost:5000
```

------------------------------------------------------------------------

# 📦 Install Frontend Dependencies

Open another PowerShell terminal:

``` powershell
cd client
npm install
```

Start the frontend:

``` powershell
npm run dev
```

Expected output:

``` text
VITE ready

Local: http://localhost:5173/
```

Open:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 🧪 Testing

## Backend Testing

Open the following URLs in a browser:

``` text
http://localhost:5000/api/health
http://localhost:5000/api/meetings
http://localhost:5000/api/calendar
http://localhost:5000/api/emails
http://localhost:5000/api/voice-notes
http://localhost:5000/api/commitments
http://localhost:5000/api/brief
```

The APIs return JSON responses.

------------------------------------------------------------------------

## Frontend Testing

Open:

``` text
http://localhost:5173
```

Test:

``` text
/
 /actions
 /meetings
 /calendar
 /emails
 /voice-notes
 /brief
 /chat
 /sources
```

The exact navigation is provided through the application's sidebar.

------------------------------------------------------------------------

# 🏭 Production Build

To create a production build of the React application:

``` powershell
cd client
npm run build
```

A successful build creates:

``` text
client/dist/
```

The `dist` folder is a generated build artifact and should not normally
be committed to Git.

------------------------------------------------------------------------

# 🔐 Git Configuration

The project includes a `.gitignore` file.

It excludes files and folders such as:

``` text
node_modules/
dist/
.env
*.log
```

This prevents unnecessary generated files and local configuration from
being uploaded.

------------------------------------------------------------------------

# 📁 Data Files

The prototype uses local JSON files:

``` text
server/data/calendar.json
server/data/emails.json
server/data/meetings.json
server/data/voiceNotes.json
```

These files provide the sample executive information used by the
backend.

------------------------------------------------------------------------

# 🔄 Application Flow

The overall flow is:

``` text
                 ┌──────────────────┐
                 │   JSON Data      │
                 │                  │
                 │ Meetings         │
                 │ Emails           │
                 │ Calendar         │
                 │ Voice Notes      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Node.js /        │
                 │ Express Backend  │
                 └────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
     ┌─────────────────┐    ┌──────────────────┐
     │ Commitment       │    │ Executive Brief  │
     │ Engine           │    │ Generation       │
     └────────┬────────┘    └────────┬─────────┘
              │                       │
              └───────────┬───────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ React Frontend   │
                 │                  │
                 │ Dashboard        │
                 │ Meetings         │
                 │ Calendar         │
                 │ Emails           │
                 │ Voice Notes      │
                 │ AI Brief         │
                 │ AI Chat          │
                 └──────────────────┘
```

------------------------------------------------------------------------

# 💡 Example User Workflow

An executive can start the day by opening the dashboard.

### Step 1

The Overview page highlights important actions.

### Step 2

The executive opens My Actions to see pending commitments.

### Step 3

The executive checks Meetings and Calendar for upcoming events.

### Step 4

The executive reviews important Email threads.

### Step 5

The executive checks Voice Notes for additional context.

### Step 6

The AI Brief summarizes the most important information.

### Step 7

The executive can use AI Chat to ask questions such as:

``` text
What do I need to focus on?
```

This provides a single workflow for reviewing executive information.

------------------------------------------------------------------------

# 🎯 Key Features

-   ✅ Executive dashboard
-   ✅ Meeting intelligence
-   ✅ Meeting transcript display
-   ✅ Calendar intelligence
-   ✅ Email thread intelligence
-   ✅ Voice-note intelligence
-   ✅ Commitment tracking
-   ✅ Deadline tracking
-   ✅ Priority identification
-   ✅ Ownership issue detection
-   ✅ Executive brief
-   ✅ AI Chat interface
-   ✅ Connected data-source view
-   ✅ REST APIs
-   ✅ React frontend
-   ✅ Node.js/Express backend
-   ✅ Production build support

------------------------------------------------------------------------

# 🔮 Future Improvements

The current version is a functional prototype using local JSON data.

Possible future improvements include:

-   Real Gmail integration
-   Real Google Calendar integration
-   Real meeting/transcription integration
-   Speech-to-text processing
-   LLM-powered transcript analysis
-   Persistent database storage
-   User authentication
-   Role-based access
-   Real-time notifications
-   Automated reminders
-   Background processing
-   Deployment to cloud infrastructure
-   More advanced natural-language querying
-   Vector search / semantic retrieval
-   Audit logs

------------------------------------------------------------------------

# 📌 Current Project Status

The prototype currently contains:

``` text
Frontend                 ✅
Backend                  ✅
REST APIs                ✅
Meeting Intelligence     ✅
Calendar                 ✅
Email Intelligence       ✅
Voice Notes              ✅
Commitment Engine        ✅
Executive Brief          ✅
AI Chat                  ✅
Data Sources             ✅
Production Build         ✅
```

------------------------------------------------------------------------

# 👨‍💻 Project

**Executive Productivity Agent**

**Concept:** AI Chief of Staff / Executive Intelligence System

**Frontend:** React + Vite

**Backend:** Node.js + Express

**Data:** JSON

**Version Control:** Git + GitHub

------------------------------------------------------------------------

## ⭐ Summary

The Executive Productivity Agent is a full-stack prototype that
transforms fragmented executive information into a centralized
intelligence dashboard.

Instead of manually checking meetings, emails, calendar events, and
notes separately, the executive can use one application to identify
actions, commitments, deadlines, priorities, upcoming meetings, and
items requiring attention.

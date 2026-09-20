const express = require("express");
const cors = require("cors");

const meetings = require("./data/meetings.json");
const emails = require("./data/emails.json");
const calendar = require("./data/calendar.json");
const voiceNotes = require("./data/voiceNotes.json");

const {
  generateCommitments
} = require("./services/commitmentEngine");

const app = express();

const PORT = 5000;


/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());

app.use(express.json());


/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "Executive Productivity Agent API",
    version: "1.0"
  });

});


/* ==========================================
   HEALTH
========================================== */

app.get("/api/health", (req, res) => {

  res.json({
    success: true,
    status: "healthy"
  });

});


/* ==========================================
   MEETINGS
========================================== */

app.get("/api/meetings", (req, res) => {

  res.json({
    success: true,
    count: meetings.length,
    data: meetings
  });

});


/* ==========================================
   EMAILS
========================================== */

app.get("/api/emails", (req, res) => {

  res.json({
    success: true,
    count: emails.length,
    data: emails
  });

});


/* ==========================================
   CALENDAR
========================================== */

app.get("/api/calendar", (req, res) => {

  res.json({
    success: true,
    data: calendar
  });

});


/* ==========================================
   VOICE NOTES
========================================== */

app.get("/api/voice-notes", (req, res) => {

  res.json({
    success: true,
    count: voiceNotes.length,
    data: voiceNotes
  });

});


/* ==========================================
   COMMITMENTS
========================================== */

app.get("/api/commitments", (req, res) => {

  const commitments =
    generateCommitments(
      meetings,
      emails,
      calendar,
      voiceNotes
    );

  res.json({
    success: true,
    count: commitments.length,
    data: commitments
  });

});


/* ==========================================
   AI BRIEF
========================================== */

app.get("/api/brief", (req, res) => {

  const commitments =
    generateCommitments(
      meetings,
      emails,
      calendar,
      voiceNotes
    );


  const pending =
    commitments.filter(
      (item) =>
        item.status === "Pending"
    );


  const critical =
    commitments.filter(
      (item) =>
        item.priority === "Critical"
    );


  const waiting =
    commitments.filter(
      (item) =>
        item.status ===
        "Ownership Unclear"
    );


  const completed =
    commitments.filter(
      (item) =>
        item.status === "Completed"
    );


  const upcomingMeetings =
    calendar[0]?.events || [];


  res.json({

    success: true,

    data: {

      summary: {

        pendingActions:
          pending.length,

        criticalItems:
          critical.length,

        waitingItems:
          waiting.length,

        upcomingMeetings:
          upcomingMeetings.length,

        emailThreads:
          emails.length,

        voiceNotes:
          voiceNotes.length,

        completedItems:
          completed.length

      },


      priorities:
        commitments.slice(0, 3),


      pendingActions:
        pending,


      waitingItems:
        waiting,


      criticalItems:
        critical,


      upcomingMeetings:
        upcomingMeetings,


      completedItems:
        completed

    }

  });

});


/* ==========================================
   AI CHAT
========================================== */

app.post("/api/chat", (req, res) => {

  const question =
    String(
      req.body.question || ""
    )
      .toLowerCase()
      .trim();


  /* ----------------------------------------
     VALIDATION
  ----------------------------------------- */

  if (!question) {

    return res.status(400).json({

      success: false,

      answer:
        "Please enter a question."

    });

  }


  /* ----------------------------------------
     GET COMMITMENTS
  ----------------------------------------- */

  const commitments =
    generateCommitments(
      meetings,
      emails,
      calendar,
      voiceNotes
    );


  /* ----------------------------------------
     FILTER DATA
  ----------------------------------------- */

  const pending =
    commitments.filter(
      (item) =>
        item.status === "Pending"
    );


  const critical =
    commitments.filter(
      (item) =>
        item.priority === "Critical"
    );


  const waiting =
    commitments.filter(
      (item) =>
        item.status ===
        "Ownership Unclear"
    );


  const completed =
    commitments.filter(
      (item) =>
        item.status === "Completed"
    );


  const events =
    calendar[0]?.events || [];


  let answer = "";


  /* ========================================
     FOCUS
  ======================================== */

  if (
    question.includes("focus") ||
    question.includes("priorit") ||
    question.includes("attention")
  ) {

    answer =
      "Here is what requires your attention this week:\n\n";


    pending.forEach((item) => {

      answer +=
        `• ${item.title}\n` +
        `  Priority: ${item.priority}\n` +
        `  Deadline: ${item.deadlineLabel}\n` +
        `  Waiting on: ${item.waitingOn}\n\n`;

    });


    if (critical.length > 0) {

      answer +=
        "Critical risk:\n\n";


      critical.forEach((item) => {

        answer +=
          `• ${item.title}\n` +
          `  Deadline: ${item.deadlineLabel}\n` +
          `  Owner: ${item.owner}\n` +
          `  Status: ${item.status}\n\n`;

      });

    }

  }


  /* ========================================
     WAITING
  ======================================== */

  else if (
    question.includes("waiting") ||
    question.includes("who owes") ||
    question.includes("others")
  ) {

    if (waiting.length === 0) {

      answer =
        "There are currently no ownership issues.";

    } else {

      answer =
        "These items require clarification or action from others:\n\n";


      waiting.forEach((item) => {

        answer +=
          `• ${item.title}\n` +
          `  Waiting on: ${item.waitingOn}\n` +
          `  Deadline: ${item.deadlineLabel}\n` +
          `  Priority: ${item.priority}\n\n`;

      });

    }

  }


  /* ========================================
     CRITICAL
  ======================================== */

  else if (
    question.includes("critical") ||
    question.includes("risk") ||
    question.includes("urgent")
  ) {

    if (critical.length === 0) {

      answer =
        "There are currently no critical items.";

    } else {

      answer =
        "Critical items requiring attention:\n\n";


      critical.forEach((item) => {

        answer +=
          `• ${item.title}\n` +
          `  Owner: ${item.owner}\n` +
          `  Deadline: ${item.deadlineLabel}\n` +
          `  Status: ${item.status}\n\n`;

      });

    }

  }


  /* ========================================
     MEETINGS
  ======================================== */

  else if (
    question.includes("meeting") ||
    question.includes("calendar") ||
    question.includes("schedule")
  ) {

    const usableEvents =
      events.filter(
        (event) =>
          event.title !== "Blocked"
      );


    if (usableEvents.length === 0) {

      answer =
        "There are no upcoming meetings.";

    } else {

      answer =
        "Your upcoming meetings are:\n\n";


      usableEvents.forEach((event) => {

        answer +=
          `• ${event.date}\n` +
          `  ${event.title}\n` +
          `  ${event.startTime} - ${event.endTime}\n\n`;

      });

    }

  }


  /* ========================================
     EMAILS
  ======================================== */

  else if (
    question.includes("email") ||
    question.includes("mail") ||
    question.includes("inbox")
  ) {

    answer =
      `You currently have ${emails.length} email threads.\n\n`;


    emails.forEach((thread) => {

      answer +=
        `• ${thread.subject}\n` +
        `  Messages: ${
          thread.emails?.length || 0
        }\n\n`;

    });


    answer +=
      "The important email-related areas are " +
      "the vendor list, Q3 campaign deck, " +
      "expense variance report, Meridian " +
      "Logistics call and Mumbai office lease renewal.";

  }


  /* ========================================
     COMMITMENTS
  ======================================== */

  else if (
    question.includes("commitment") ||
    question.includes("action") ||
    question.includes("task")
  ) {

    answer =
      `There are ${commitments.length} tracked commitments.\n\n`;


    commitments.forEach((item) => {

      answer +=
        `• ${item.title}\n` +
        `  Owner: ${item.owner}\n` +
        `  Deadline: ${item.deadlineLabel}\n` +
        `  Status: ${item.status}\n` +
        `  Priority: ${item.priority}\n\n`;

    });

  }


  /* ========================================
     SUMMARY
  ======================================== */

  else if (
    question.includes("summary") ||
    question.includes("summarize") ||
    question.includes("overview")
  ) {

    answer =
      "Executive summary for this week:\n\n" +

      `• Pending actions: ${pending.length}\n` +

      `• Critical items: ${critical.length}\n` +

      `• Ownership issues: ${waiting.length}\n` +

      `• Completed items: ${completed.length}\n` +

      `• Email threads: ${emails.length}\n` +

      `• Voice notes: ${voiceNotes.length}\n` +

      `• Calendar events: ${events.length}\n\n` +

      "The main risk identified by the current " +
      "commitment data is the Mumbai office lease " +
      "renewal because ownership remains unclear " +
      "and the deadline is Friday.";

  }


  /* ========================================
     DEFAULT
  ======================================== */

  else {

    answer =
      "I can help you with:\n\n" +

      "• Priorities\n" +
      "• Pending commitments\n" +
      "• Critical items\n" +
      "• What you are waiting for\n" +
      "• Meetings and calendar\n" +
      "• Email threads\n" +
      "• Executive summary\n\n" +

      "Try asking:\n" +
      "\"What do I need to focus on?\"";

  }


  /* ========================================
     RESPONSE
  ======================================== */

  res.json({

    success: true,

    question: question,

    answer: answer

  });

});


/* ==========================================
   START SERVER
========================================== */

app.listen(
  PORT,
  () => {

    console.log(
      "=========================================="
    );

    console.log(
      "     Executive Productivity Agent"
    );

    console.log(
      "=========================================="
    );

    console.log(
      `Server running at http://localhost:${PORT}`
    );

    console.log("");

    console.log("Available APIs:");

    console.log(
      `GET  http://localhost:${PORT}/`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/health`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/meetings`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/calendar`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/emails`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/voice-notes`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/commitments`
    );

    console.log(
      `GET  http://localhost:${PORT}/api/brief`
    );

    console.log(
      `POST http://localhost:${PORT}/api/chat`
    );

    console.log(
      "=========================================="
    );

  }
);
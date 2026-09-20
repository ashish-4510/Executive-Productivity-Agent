import { useEffect, useState } from "react";

function BriefPage() {
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBrief() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/brief"
        );

        if (!response.ok) {
          throw new Error("Failed to load executive brief");
        }

        const result = await response.json();

        setBrief(result.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load the executive brief.");
      } finally {
        setLoading(false);
      }
    }

    loadBrief();
  }, []);


  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">

          <div className="spinner"></div>

          <h2>
            Preparing Executive Brief...
          </h2>

          <p>
            Analyzing your commitments and schedule.
          </p>

        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="error-screen">

        <div className="error-card">

          <h2>
            Unable to load brief
          </h2>

          <p>
            {error}
          </p>

          <code>
            http://localhost:5000/api/brief
          </code>

        </div>

      </div>
    );
  }


  return (
    <div>

      {/* HEADER */}

      <div className="topbar">

        <div>

          <p className="eyebrow">
            AI EXECUTIVE BRIEF
          </p>

          <h1>
            Your Weekly Brief
          </h1>

          <p className="subtitle">
            21–25 September 2026
          </p>

        </div>

      </div>


      {/* SUMMARY */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon blue">
            ✓
          </div>

          <div>

            <span>
              PENDING ACTIONS
            </span>

            <strong>
              {brief.summary.pendingActions}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon red">
            !
          </div>

          <div>

            <span>
              CRITICAL
            </span>

            <strong>
              {brief.summary.criticalItems}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            ◷
          </div>

          <div>

            <span>
              WAITING
            </span>

            <strong>
              {brief.summary.waitingItems}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon purple">
            ◫
          </div>

          <div>

            <span>
              MEETINGS
            </span>

            <strong>
              {brief.summary.upcomingMeetings}
            </strong>

          </div>

        </div>

      </section>


      {/* TOP PRIORITIES */}

      <section className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Top Priorities
            </h2>

            <p>
              Items requiring executive attention
            </p>

          </div>

        </div>


        <div className="actions-list">

          {brief.priorities.map((item, index) => (

            <div
              className={`action-card ${item.priority.toLowerCase()}`}
              key={index}
            >

              <div className="priority-dot"></div>

              <div className="action-content">

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <div className="action-meta">

                  <span>
                    📅 {item.deadline}
                  </span>

                  <span className="status">
                    {item.priority}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* TWO COLUMN */}

      <section className="dashboard-grid">

        {/* PENDING */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Pending Actions
              </h2>

              <p>
                Commitments still requiring action
              </p>

            </div>

            <span className="count-badge">
              {brief.pendingActions.length}
            </span>

          </div>


          <div className="actions-list">

            {brief.pendingActions.map((item) => (

              <div
                className="action-card"
                key={item.id}
              >

                <div className="priority-dot"></div>

                <div className="action-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    Waiting on:{" "}
                    <strong>
                      {item.waitingOn}
                    </strong>
                  </p>

                  <div className="action-meta">

                    <span>
                      📅 {item.deadlineLabel}
                    </span>

                    <span className="status">
                      {item.status}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* RISK */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Risk & Attention
              </h2>

              <p>
                Items requiring follow-up
              </p>

            </div>

            <span className="warning-icon">
              !
            </span>

          </div>


          {brief.criticalItems.map((item) => (

            <div
              className="critical-card"
              key={item.id}
            >

              <div className="critical-header">

                <span className="critical-label">
                  CRITICAL
                </span>

                <span>
                  {item.deadlineLabel}
                </span>

              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                Ownership is currently unclear and
                the deadline is approaching.
              </p>

              <div className="critical-action">
                Action required
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* MEETINGS */}

      <section className="panel meetings-panel">

        <div className="panel-header">

          <div>

            <h2>
              Upcoming Meetings
            </h2>

            <p>
              Meetings detected from the calendar
            </p>

          </div>

          <span className="count-badge">
            {brief.upcomingMeetings.length}
          </span>

        </div>


        <div className="meetings-list">

          {brief.upcomingMeetings.map((event) => (

            <div
              className="meeting-card"
              key={`${event.date}-${event.startTime}-${event.title}`}
            >

              <div className="meeting-date">

                <strong>
                  {new Date(
                    event.date
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short"
                    }
                  )}
                </strong>

                <span>
                  {new Date(
                    event.date
                  ).getDate()}
                </span>

              </div>


              <div className="meeting-info">

                <h3>
                  {event.title}
                </h3>

                <p>
                  {event.startTime} – {event.endTime}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* DATA SUMMARY */}

      <section className="insight-card">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span className="insight-label">
            EXECUTIVE SUMMARY
          </span>

          <h2>
            Your week contains{" "}
            {brief.summary.upcomingMeetings} meetings
            and{" "}
            {brief.summary.pendingActions} pending actions.
          </h2>

          <p>
            The highest-priority unresolved item is the
            Mumbai office lease renewal, where ownership
            remains unclear ahead of the Friday deadline.
          </p>

        </div>

      </section>

    </div>
  );
}

export default BriefPage;
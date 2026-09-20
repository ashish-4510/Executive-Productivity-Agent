import { useEffect, useState } from "react";

function DashboardPage() {
  const [commitments, setCommitments] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [commitmentsResponse, calendarResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/commitments"),
            fetch("http://localhost:5000/api/calendar")
          ]);

        const commitmentsData = await commitmentsResponse.json();
        const calendarData = await calendarResponse.json();

        setCommitments(commitmentsData.data || []);
        setCalendar(calendarData.data || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    }

    loadData();
  }, []);

  const myActions = commitments.filter(
    (item) =>
      item.owner === "Arjun Malhotra" &&
      item.status !== "Completed"
  );

  const waitingOnOthers = commitments.filter(
    (item) =>
      item.waitingOn === "Arjun Malhotra" &&
      item.status !== "Completed"
  );

  const criticalItems = commitments.filter(
    (item) =>
      item.priority === "Critical" &&
      item.status !== "Completed"
  );

  const events =
    calendar.find(
      (person) => person.person === "Arjun Malhotra"
    )?.events || [];

  const meetings = events.filter(
    (event) => event.title !== "Blocked"
  );

  return (
    <div>

      <div className="topbar">
        <div>
          <p className="eyebrow">
            EXECUTIVE OVERVIEW
          </p>

          <h1>
            Good morning, Arjun
          </h1>

          <p className="subtitle">
            Here is what needs your attention.
          </p>
        </div>

        <div className="header-date">
          <span>WEEK</span>
          <strong>21–25 Sep 2026</strong>
        </div>
      </div>


      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            ✓
          </div>

          <div>
            <span>MY ACTIONS</span>
            <strong>{myActions.length}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon orange">
            ◷
          </div>

          <div>
            <span>WAITING ON OTHERS</span>
            <strong>{waitingOnOthers.length}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon red">
            !
          </div>

          <div>
            <span>CRITICAL</span>
            <strong>{criticalItems.length}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon purple">
            ◫
          </div>

          <div>
            <span>UPCOMING MEETINGS</span>
            <strong>{meetings.length}</strong>
          </div>
        </div>

      </section>


      <section className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>My Actions</h2>
              <p>Things that require your attention</p>
            </div>

            <span className="count-badge">
              {myActions.length}
            </span>
          </div>


          <div className="actions-list">

            {myActions.map((item) => (

              <div
                className={`action-card ${item.priority.toLowerCase()}`}
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


        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Needs Attention</h2>
              <p>Potential risks</p>
            </div>

            <span className="warning-icon">
              !
            </span>

          </div>


          {criticalItems.map((item) => (

            <div
              className="critical-card"
              key={item.id}
            >

              <div className="critical-header">
                <span className="critical-label">
                  CRITICAL
                </span>

                <span>
                  Due {item.deadlineLabel}
                </span>
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                Ownership is currently unclear.
                The deadline is approaching and no
                confirmed owner has been identified.
              </p>

              <div className="critical-action">
                Action required
              </div>

            </div>

          ))}

        </div>

      </section>


      <section className="panel meetings-panel">

        <div className="panel-header">

          <div>
            <h2>Upcoming Meetings</h2>
            <p>Your schedule for the week</p>
          </div>

          <span className="count-badge">
            {meetings.length}
          </span>

        </div>


        <div className="meetings-list">

          {meetings.map((event) => (

            <div
              className="meeting-card"
              key={`${event.date}-${event.startTime}`}
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
                  {new Date(event.date).getDate()}
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

    </div>
  );
}

export default DashboardPage;
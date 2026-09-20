import { useEffect, useState } from "react";

function DataSourcesPage() {
  const [data, setData] = useState({
    meetings: 0,
    emails: 0,
    calendar: 0,
    voiceNotes: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSources() {
      try {
        const [
          meetingsResponse,
          emailsResponse,
          calendarResponse,
          voiceResponse
        ] = await Promise.all([
          fetch("http://localhost:5000/api/meetings"),
          fetch("http://localhost:5000/api/emails"),
          fetch("http://localhost:5000/api/calendar"),
          fetch("http://localhost:5000/api/voice-notes")
        ]);

        const meetings = await meetingsResponse.json();
        const emails = await emailsResponse.json();
        const calendar = await calendarResponse.json();
        const voiceNotes = await voiceResponse.json();

        setData({
          meetings: meetings.count || 0,
          emails: emails.count || 0,
          calendar:
            calendar.data?.[0]?.events?.length || 0,
          voiceNotes: voiceNotes.count || 0
        });

      } catch (error) {
        console.error("Data source error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSources();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">

          <div className="spinner"></div>

          <h2>
            Loading Data Sources...
          </h2>

          <p>
            Checking connected information sources.
          </p>

        </div>
      </div>
    );
  }

  const sources = [
    {
      name: "Meetings",
      description:
        "Meeting transcripts and discussion information.",
      count: data.meetings,
      icon: "◉"
    },
    {
      name: "Emails",
      description:
        "Executive email conversations and follow-ups.",
      count: data.emails,
      icon: "✉"
    },
    {
      name: "Calendar",
      description:
        "Meetings, blocked time and scheduled events.",
      count: data.calendar,
      icon: "◷"
    },
    {
      name: "Voice Notes",
      description:
        "Voice notes captured for executive follow-up.",
      count: data.voiceNotes,
      icon: "◉"
    }
  ];

  return (
    <div>

      <div className="topbar">

        <div>

          <p className="eyebrow">
            DATA SOURCES
          </p>

          <h1>
            Connected Sources
          </h1>

          <p className="subtitle">
            Information currently available to the Executive Productivity Agent.
          </p>

        </div>

      </div>


      <section className="stats-grid">

        {sources.map((source) => (

          <div
            className="stat-card"
            key={source.name}
          >

            <div className="stat-icon purple">
              {source.icon}
            </div>

            <div>

              <span>
                {source.name.toUpperCase()}
              </span>

              <strong>
                {source.count}
              </strong>

            </div>

          </div>

        ))}

      </section>


      <section className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Source Status
            </h2>

            <p>
              All configured sources
            </p>

          </div>

        </div>


        <div className="actions-list">

          {sources.map((source) => (

            <div
              className="action-card"
              key={source.name}
            >

              <div className="priority-dot"></div>

              <div className="action-content">

                <h3>
                  {source.name}
                </h3>

                <p>
                  {source.description}
                </p>

                <div className="action-meta">

                  <span>
                    {source.count} records available
                  </span>

                  <span className="status scheduled">
                    Connected
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      <section className="insight-card">

        <div className="insight-icon">
          ✓
        </div>

        <div>

          <span className="insight-label">
            SYSTEM STATUS
          </span>

          <h2>
            Executive data pipeline is connected
          </h2>

          <p>
            The application can currently read meeting,
            email, calendar and voice-note data and use
            these sources to generate executive insights.
          </p>

        </div>

      </section>

    </div>
  );
}

export default DataSourcesPage;
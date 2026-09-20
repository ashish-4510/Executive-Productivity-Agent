import { useEffect, useState } from "react";

function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMeetings() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/meetings"
        );

        if (!response.ok) {
          throw new Error("Unable to load meetings");
        }

        const result = await response.json();

        const meetingData = result.data || [];

        setMeetings(meetingData);

        if (meetingData.length > 0) {
          setSelectedMeeting(meetingData[0]);
        }

      } catch (err) {
        console.error("Meeting error:", err);

        setError(
          "Unable to load meeting information."
        );

      } finally {
        setLoading(false);
      }
    }

    loadMeetings();
  }, []);


  if (loading) {
    return (
      <div className="loading-screen">

        <div className="loading-card">

          <div className="spinner"></div>

          <h2>
            Loading Meetings...
          </h2>

          <p>
            Reading meeting transcripts.
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
            Unable to Load Meetings
          </h2>

          <p>
            {error}
          </p>

          <code>
            http://localhost:5000/api/meetings
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
            MEETING INTELLIGENCE
          </p>

          <h1>
            Meetings
          </h1>

          <p className="subtitle">
            Meeting transcripts and executive discussion points.
          </p>

        </div>

      </div>


      {/* MEETING LIST */}

      <section className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Meetings
              </h2>

              <p>
                {meetings.length} meeting
                {meetings.length !== 1 ? "s" : ""}
                available
              </p>

            </div>

            <span className="count-badge">
              {meetings.length}
            </span>

          </div>


          <div className="actions-list">

            {meetings.map((meeting) => (

              <button
                key={meeting.id}
                className={`action-card ${
                  selectedMeeting?.id === meeting.id
                    ? "selected-meeting"
                    : ""
                }`}
                onClick={() =>
                  setSelectedMeeting(meeting)
                }
              >

                <div className="priority-dot"></div>

                <div className="action-content">

                  <h3>
                    {meeting.title}
                  </h3>

                  <p>
                    {meeting.date}
                    {" • "}
                    {meeting.startTime}
                    {" – "}
                    {meeting.endTime}
                  </p>

                  <div className="action-meta">

                    <span>
                      👥{" "}
                      {meeting.attendees?.length || 0}
                      {" attendees"}
                    </span>

                    <span className="status scheduled">
                      Transcript available
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>


        {/* SELECTED MEETING */}

        <div className="panel">

          {selectedMeeting ? (

            <>

              <div className="panel-header">

                <div>

                  <p className="eyebrow">
                    SELECTED MEETING
                  </p>

                  <h2>
                    {selectedMeeting.title}
                  </h2>

                  <p>
                    {selectedMeeting.date}
                    {" • "}
                    {selectedMeeting.startTime}
                    {" – "}
                    {selectedMeeting.endTime}
                  </p>

                </div>

              </div>


              {/* ATTENDEES */}

              <div className="meeting-section">

                <h3>
                  Attendees
                </h3>

                <div className="attendee-list">

                  {selectedMeeting.attendees?.map(
                    (person) => (

                      <span
                        className="attendee"
                        key={person}
                      >
                        {person}
                      </span>

                    )
                  )}

                </div>

              </div>


              {/* TRANSCRIPT */}

              <div className="meeting-section">

                <h3>
                  Transcript
                </h3>

                <div className="transcript">

                  {selectedMeeting.transcript}

                </div>

              </div>

            </>

          ) : (

            <div className="empty-state">

              <div>
                ◉
              </div>

              <p>
                Select a meeting to view details.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* INTELLIGENCE */}

      {selectedMeeting && (

        <section className="insight-card">

          <div className="insight-icon">
            ✦
          </div>

          <div>

            <span className="insight-label">
              MEETING INTELLIGENCE
            </span>

            <h2>
              Commitments can be extracted from this meeting
            </h2>

            <p>
              The Executive Productivity Agent uses
              meeting transcripts together with email
              and calendar information to identify
              follow-ups, deadlines and ownership.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default MeetingsPage;
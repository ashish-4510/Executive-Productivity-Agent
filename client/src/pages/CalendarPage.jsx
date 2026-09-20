import { useEffect, useState } from "react";

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/calendar")
      .then((response) => response.json())
      .then((result) => {
        const arjun = result.data?.find(
          (person) => person.person === "Arjun Malhotra"
        );

        setEvents(arjun?.events || []);
      })
      .catch((error) => {
        console.error("Calendar error:", error);
      });
  }, []);

  const meetings = events.filter(
    (event) => event.title !== "Blocked"
  );

  return (
    <div>

      <div className="topbar">

        <div>
          <p className="eyebrow">
            CALENDAR
          </p>

          <h1>
            Your Week
          </h1>

          <p className="subtitle">
            Meetings and scheduled events for 21–25 September 2026.
          </p>
        </div>

      </div>


      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>
              Scheduled Meetings
            </h2>

            <p>
              {meetings.length} meetings
            </p>
          </div>

        </div>


        <div className="meetings-list">

          {meetings.map((event) => (

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

      </div>

    </div>
  );
}

export default CalendarPage;
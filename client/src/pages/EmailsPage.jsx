import { useEffect, useState } from "react";

function EmailsPage() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmails() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/emails"
        );

        if (!response.ok) {
          throw new Error("Unable to load emails");
        }

        const result = await response.json();

        const emailData = result.data || [];

        setThreads(emailData);

        if (emailData.length > 0) {
          setSelectedThread(emailData[0]);
        }

      } catch (err) {
        console.error("Email error:", err);

        setError(
          "Unable to load email information."
        );

      } finally {
        setLoading(false);
      }
    }

    loadEmails();
  }, []);


  if (loading) {
    return (
      <div className="loading-screen">

        <div className="loading-card">

          <div className="spinner"></div>

          <h2>
            Loading Emails...
          </h2>

          <p>
            Reading executive email threads.
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
            Unable to Load Emails
          </h2>

          <p>
            {error}
          </p>

          <code>
            http://localhost:5000/api/emails
          </code>

        </div>

      </div>
    );
  }


  return (
    <div>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="topbar">

        <div>

          <p className="eyebrow">
            EMAIL INTELLIGENCE
          </p>

          <h1>
            Emails
          </h1>

          <p className="subtitle">
            Executive email threads, follow-ups and
            important decisions.
          </p>

        </div>

      </div>


      {/* ======================================
          EMAIL AREA
      ====================================== */}

      <section className="dashboard-grid">


        {/* ==================================
            THREAD LIST
        ================================== */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Email Threads
              </h2>

              <p>
                {threads.length} thread
                {threads.length !== 1 ? "s" : ""}
              </p>

            </div>

            <span className="count-badge">
              {threads.length}
            </span>

          </div>


          <div className="actions-list">

            {threads.map((thread) => (

              <button
                key={thread.threadId}
                className={`action-card ${
                  selectedThread?.threadId ===
                  thread.threadId
                    ? "selected-meeting"
                    : ""
                }`}
                onClick={() =>
                  setSelectedThread(thread)
                }
              >

                <div className="priority-dot"></div>


                <div className="action-content">

                  <h3>
                    {thread.subject}
                  </h3>


                  <p>
                    {thread.emails?.length || 0}
                    {" messages"}
                  </p>


                  <div className="action-meta">

                    <span>
                      {thread.emails?.[
                        thread.emails.length - 1
                      ]?.date || ""}
                    </span>


                    <span className="status scheduled">
                      Thread
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>


        {/* ==================================
            SELECTED THREAD
        ================================== */}

        <div className="panel">

          {selectedThread ? (

            <>

              <div className="panel-header">

                <div>

                  <p className="eyebrow">
                    SELECTED THREAD
                  </p>

                  <h2>
                    {selectedThread.subject}
                  </h2>

                  <p>
                    {selectedThread.emails?.length || 0}
                    {" messages in this conversation"}
                  </p>

                </div>

              </div>


              {/* EMAIL MESSAGES */}

              <div className="email-thread">

                {selectedThread.emails?.map(
                  (email, index) => (

                    <div
                      className="email-message"
                      key={`${email.date}-${email.time}-${index}`}
                    >

                      <div className="email-header">

                        <div>

                          <strong>
                            {email.from}
                          </strong>

                          <span>
                            {" → "}
                            {Array.isArray(email.to)
                              ? email.to.join(", ")
                              : email.to}
                          </span>

                        </div>

                        <small>
                          {email.date}
                          {" "}
                          {email.time}
                        </small>

                      </div>


                      <div className="email-body">

                        {email.message}

                      </div>

                    </div>

                  )
                )}

              </div>

            </>

          ) : (

            <div className="empty-state">

              <div>
                ✉
              </div>

              <p>
                Select an email thread to view it.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ======================================
          EMAIL INTELLIGENCE
      ====================================== */}

      {selectedThread && (

        <section className="insight-card">

          <div className="insight-icon">
            ✦
          </div>

          <div>

            <span className="insight-label">
              EMAIL INTELLIGENCE
            </span>

            <h2>
              This conversation may contain
              actionable commitments
            </h2>

            <p>
              The Executive Productivity Agent
              analyzes email conversations to identify
              deadlines, follow-ups, ownership and
              changes to previously discussed plans.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default EmailsPage;
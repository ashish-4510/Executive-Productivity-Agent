import { useEffect, useState } from "react";

function VoiceNotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVoiceNotes() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/voice-notes"
        );

        if (!response.ok) {
          throw new Error("Unable to load voice notes");
        }

        const result = await response.json();

        const noteData = result.data || [];

        setNotes(noteData);

        if (noteData.length > 0) {
          setSelectedNote(noteData[0]);
        }

      } catch (err) {
        console.error("Voice notes error:", err);

        setError(
          "Unable to load voice notes."
        );

      } finally {
        setLoading(false);
      }
    }

    loadVoiceNotes();
  }, []);


  if (loading) {
    return (
      <div className="loading-screen">

        <div className="loading-card">

          <div className="spinner"></div>

          <h2>
            Loading Voice Notes...
          </h2>

          <p>
            Reading executive voice notes.
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
            Unable to Load Voice Notes
          </h2>

          <p>
            {error}
          </p>

          <code>
            http://localhost:5000/api/voice-notes
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
            VOICE INTELLIGENCE
          </p>

          <h1>
            Voice Notes
          </h1>

          <p className="subtitle">
            Executive notes and follow-up information
            captured during the week.
          </p>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <section className="dashboard-grid">

        {/* NOTE LIST */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Voice Notes
              </h2>

              <p>
                {notes.length} note
                {notes.length !== 1 ? "s" : ""}
              </p>

            </div>

            <span className="count-badge">
              {notes.length}
            </span>

          </div>


          <div className="actions-list">

            {notes.map((note, index) => (

              <button
                key={note.id || index}
                className={`action-card ${
                  selectedNote?.id === note.id
                    ? "selected-meeting"
                    : ""
                }`}
                onClick={() =>
                  setSelectedNote(note)
                }
              >

                <div className="priority-dot"></div>

                <div className="action-content">

                  <h3>
                    {note.title ||
                      `Voice Note ${index + 1}`}
                  </h3>

                  <p>
                    {note.date ||
                      "Executive note"}
                  </p>

                  <div className="action-meta">

                    <span>
                      🎙 Voice recording
                    </span>

                    <span className="status scheduled">
                      Available
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>


        {/* SELECTED NOTE */}

        <div className="panel">

          {selectedNote ? (

            <>

              <div className="panel-header">

                <div>

                  <p className="eyebrow">
                    SELECTED VOICE NOTE
                  </p>

                  <h2>
                    {selectedNote.title ||
                      "Executive Voice Note"}
                  </h2>

                  <p>
                    {selectedNote.date || ""}
                  </p>

                </div>

              </div>


              <div className="meeting-section">

                <h3>
                  Note Content
                </h3>

                <div className="transcript">

                  {selectedNote.text ||
                    selectedNote.note ||
                    selectedNote.transcript ||
                    selectedNote.content ||
                    JSON.stringify(
                      selectedNote,
                      null,
                      2
                    )}

                </div>

              </div>


              <div className="meeting-section">

                <h3>
                  Intelligence
                </h3>

                <div className="email-body">

                  This voice note can be analyzed
                  together with meetings, emails and
                  calendar events to identify actions,
                  deadlines and follow-ups.

                </div>

              </div>

            </>

          ) : (

            <div className="empty-state">

              <div>
                🎙
              </div>

              <p>
                Select a voice note to view it.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* INSIGHT */}

      {selectedNote && (

        <section className="insight-card">

          <div className="insight-icon">
            ✦
          </div>

          <div>

            <span className="insight-label">
              VOICE INTELLIGENCE
            </span>

            <h2>
              Voice notes can become executive actions
            </h2>

            <p>
              The Executive Productivity Agent can
              combine voice notes with meetings,
              emails and calendar information to
              identify commitments and important
              follow-ups.

            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default VoiceNotesPage;
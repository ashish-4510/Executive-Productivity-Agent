import { useState } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello Arjun. I can help you understand your meetings, emails, commitments, calendar and priorities. What would you like to know?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      text: question
    };

    setMessages((previous) => [
      ...previous,
      userMessage
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question
          })
        }
      );

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const result = await response.json();

      const answer =
        result.answer ||
        "I could not find an answer.";

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: answer
        }
      ]);

    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "I couldn't connect to the Executive Productivity Agent backend. Please make sure the server is running on port 5000."
        }
      ]);

    } finally {
      setLoading(false);
    }
  }


  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }


  function askQuestion(question) {
    setInput(question);
  }


  return (
    <div>

      {/* HEADER */}

      <div className="topbar">

        <div>

          <p className="eyebrow">
            EXECUTIVE AI ASSISTANT
          </p>

          <h1>
            AI Chat
          </h1>

          <p className="subtitle">
            Ask questions about your meetings,
            commitments, emails and priorities.
          </p>

        </div>

      </div>


      {/* QUICK QUESTIONS */}

      <section className="chat-suggestions">

        <button
          onClick={() =>
            askQuestion(
              "What do I need to focus on this week?"
            )
          }
        >
          What do I need to focus on?
        </button>

        <button
          onClick={() =>
            askQuestion(
              "What am I waiting for?"
            )
          }
        >
          What am I waiting for?
        </button>

        <button
          onClick={() =>
            askQuestion(
              "What are my critical items?"
            )
          }
        >
          What are my critical items?
        </button>

        <button
          onClick={() =>
            askQuestion(
              "What meetings do I have this week?"
            )
          }
        >
          What meetings do I have?
        </button>

      </section>


      {/* CHAT */}

      <section className="chat-container">

        <div className="chat-messages">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`chat-message ${
                message.role === "user"
                  ? "chat-user"
                  : "chat-assistant"
              }`}
            >

              <div className="chat-avatar">

                {message.role === "user"
                  ? "AM"
                  : "AI"}

              </div>

              <div className="chat-bubble">

                {message.text}

              </div>

            </div>

          ))}


          {loading && (

            <div className="chat-message chat-assistant">

              <div className="chat-avatar">
                AI
              </div>

              <div className="chat-bubble">

                Analyzing your executive data...

              </div>

            </div>

          )}

        </div>


        {/* INPUT */}

        <div className="chat-input-area">

          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask about your work..."
            rows="2"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="chat-send-button"
          >
            {loading ? "..." : "Send"}
          </button>

        </div>

      </section>


      {/* INFORMATION */}

      <section className="insight-card">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span className="insight-label">
            EXECUTIVE INTELLIGENCE
          </span>

          <h2>
            Ask questions instead of searching
            through multiple sources.
          </h2>

          <p>
            The assistant combines information from
            meetings, emails, calendar events,
            voice notes and commitments to answer
            executive questions.
          </p>

        </div>

      </section>

    </div>
  );
}

export default ChatPage;
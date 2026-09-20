import { useEffect, useState } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/commitments")
      .then((response) => response.json())
      .then((result) => {
        setTasks(result.data || []);
      })
      .catch((error) => {
        console.error("Tasks error:", error);
      });
  }, []);

  return (
    <div>

      <div className="topbar">

        <div>
          <p className="eyebrow">
            TASK MANAGEMENT
          </p>

          <h1>
            My Actions
          </h1>

          <p className="subtitle">
            Commitments and follow-ups extracted from your work.
          </p>
        </div>

      </div>


      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>
              All Commitments
            </h2>

            <p>
              {tasks.length} commitments detected
            </p>
          </div>

        </div>


        <div className="actions-list">

          {tasks.map((task) => (

            <div
              className={`action-card ${task.priority.toLowerCase()}`}
              key={task.id}
            >

              <div className="priority-dot"></div>

              <div className="action-content">

                <h3>
                  {task.title}
                </h3>

                <p>
                  Owner: <strong>{task.owner}</strong>
                </p>

                <p>
                  Waiting on:{" "}
                  <strong>{task.waitingOn}</strong>
                </p>

                <div className="action-meta">

                  <span>
                    📅 {task.deadlineLabel}
                  </span>

                  <span className="status">
                    {task.status}
                  </span>

                  <span>
                    Priority: {task.priority}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TasksPage;
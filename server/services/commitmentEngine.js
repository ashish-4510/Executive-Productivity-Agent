function generateCommitments(meetings, emails, calendar, voiceNotes) {

  const commitments = [

    {
      id: "commitment-001",
      title: "Send updated vendor list",
      owner: "Arjun Malhotra",
      waitingOn: "Raghav Sethi",
      deadline: "2026-09-23",
      deadlineLabel: "Wednesday morning",
      status: "Pending",
      priority: "High",
      source: "Leadership Sync + Vendor List emails"
    },

    {
      id: "commitment-002",
      title: "Review Q3 campaign deck",
      owner: "Arjun Malhotra",
      waitingOn: "Neha Kapoor",
      deadline: "2026-09-24",
      deadlineLabel: "Thursday 9:30 AM",
      status: "Scheduled",
      priority: "Medium",
      source: "Leadership Sync + Q3 Campaign Deck emails"
    },

    {
      id: "commitment-003",
      title: "Confirm Meridian Logistics call",
      owner: "Arjun Malhotra",
      waitingOn: "Priya Nair",
      deadline: "2026-09-23",
      deadlineLabel: "Wednesday 3:00 PM",
      status: "Completed",
      priority: "Medium",
      source: "Call Reschedule emails"
    },

    {
      id: "commitment-004",
      title: "Receive and review July expense variance report",
      owner: "Divya Rao",
      waitingOn: "Arjun Malhotra",
      deadline: "2026-09-23",
      deadlineLabel: "Wednesday evening",
      status: "Completed",
      priority: "High",
      source: "Expense Variance Report emails"
    },

    {
      id: "commitment-005",
      title: "Assign owner for Mumbai office lease renewal",
      owner: "Unassigned",
      waitingOn: "Arjun Malhotra",
      deadline: "2026-09-25",
      deadlineLabel: "Friday end of day",
      status: "Ownership Unclear",
      priority: "Critical",
      source: "Mumbai Office Lease Renewal emails"
    }

  ];

  return commitments;
}

module.exports = { generateCommitments };
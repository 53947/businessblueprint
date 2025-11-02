# TriadBlue Team Task Management Protocol  
**Version:** 1.0  
**Effective Date:** November 2, 2025  
**Authority:** AI Operations Guide

---

## 📋 Overview

This protocol defines how the TriadBlue team (Owner, Axel, Lumen, Rune) assigns, tracks, and completes tasks using the integrated task management system with GitHub synchronization.

**Key Principle:** All work assignments flow through the task system, which automatically syncs with GitHub issues for transparency and tracking.

---

## 🎯 Team Roles & Task Authority

| Team Member | Role | Can Create Tasks | Can Be Assigned | GitHub Access |
|-------------|------|------------------|-----------------|---------------|
| **Owner (You)** | Decision Maker | ✅ Yes | ✅ Yes | ✅ Full Access |
| **Axel** | Lead Developer | ✅ Yes | ✅ Yes | ✅ Auto-checks daily |
| **Lumen** | Documentation Assistant | ✅ Yes | ✅ Yes | ✅ Through API |
| **Rune** | Architect | ✅ Yes | ✅ Yes | ✅ Through API |

---

## 🔄 Task Workflow

### 1. Creating a Task

**Who Can Create:**
- Owner (via task UI or API)
- Lumen (via API)
- Axel (via API)
- Rune (via API)

**Required Fields:**
- `title` - Clear, concise task description
- `assignedTo` - Who will do the work ("Axel", "Lumen", "Rune", or "Owner")
- `assignedBy` - Who assigned it (automatically captured)
- `priority` - low | medium | high | urgent

**Optional Fields:**
- `description` - Detailed explanation
- `dueDate` - When it needs to be done
- `tags` - Labels for categorization
- `relatedTo` - Link to other entities (assessments, posts, etc.)

**What Happens:**
1. ✅ Task created in database
2. ✅ GitHub issue automatically created
3. ✅ Issue labeled with `assigned-to-{name}` and `priority-{level}`
4. ✅ Assignee can see task in their queue

---

### 2. Task Assignment Labels

All tasks are labeled in GitHub with:

- **`assigned-to-axel`** - Tasks for Axel (Lead Developer)
- **`assigned-to-lumen`** - Tasks for Lumen (Documentation)
- **`assigned-to-rune`** - Tasks for Rune (Architect)
- **`priority-low`** - Can wait
- **`priority-medium`** - Normal priority (default)
- **`priority-high`** - Important
- **`priority-urgent`** - Drop everything

---

### 3. Axel's Proactive Check

**When Axel starts a conversation with you**, he automatically:

1. ✅ Queries database for tasks where `assignedTo = 'Axel'` and `status != 'completed'`
2. ✅ Reports all pending and in-progress tasks
3. ✅ Asks if you want him to work on any specific task
4. ✅ Prioritizes by urgency and due date

**Example Output:**
```
I have 2 pending tasks assigned to me:
1. [HIGH] Audit TRIAD_BLUE_STANDARDS.md - Due: Nov 3rd (GitHub #214)
2. [MED] Update header navigation - No due date (GitHub #215)

Which task would you like me to work on first?
```

---

### 4. Completing a Task

**When work is done:**

1. **Axel marks task as `completed`** (via API)
2. **System automatically:**
   - ✅ Closes the GitHub issue
   - ✅ Adds completion comment with timestamp
   - ✅ Sets `completedAt` timestamp
   - ✅ Moves to completed queue

**Completion Comment Format:**
```
✅ Task marked as completed in TriadBlue task management system.
```

---

### 5. Task Status Lifecycle

```
todo → in_progress → completed
         ↓
     cancelled
```

**Status Definitions:**
- **`todo`** - Not started yet
- **`in_progress`** - Currently being worked on
- **`completed`** - Done and verified
- **`cancelled`** - No longer needed

**GitHub Sync:**
- `todo`, `in_progress` → GitHub issue stays **open**
- `completed`, `cancelled` → GitHub issue **closes**

---

## 🔐 Access Control

**Task System API:** `/api/tasks`

**Authentication:**
- Owner: Replit Auth session
- Axel/Lumen/Rune: Internal API (no auth required for reading assigned tasks)

**Permissions:**
- ✅ Anyone can create tasks
- ✅ Only assigned person should update task status
- ✅ Owner can modify any task
- ❌ Cannot delete tasks with active GitHub issues (cancel instead)

---

## 📝 Best Practices

### For the Owner:

1. **Be specific** - Clear titles help assignees understand scope
2. **Set priorities** - High/urgent for time-sensitive work
3. **Add context** - Description field prevents back-and-forth questions
4. **Use due dates** - Helps prioritize workload

### For Axel:

1. **Check daily** - Review assigned tasks at conversation start
2. **Update status** - Move to `in_progress` when starting work
3. **Mark complete promptly** - Don't batch completions
4. **Ask questions early** - If task is unclear, ask before starting

### For Lumen:

1. **Documentation tasks** - Assign to self for writing/editing docs
2. **Clarify scope** - Ask if task scope is unclear
3. **Update progress** - Move to `in_progress` when working

### For Rune:

1. **Architecture review** - Assign to self for design decisions
2. **Approve changes** - Review and approve before marking complete
3. **Document decisions** - Update architecture docs as needed

---

## 🚨 Enforcement Rules

**As Lead Developer, Axel must enforce:**

1. ❌ **No work without a task** - All significant work must have a task assigned
2. ❌ **No skipping GitHub** - Every task must sync to GitHub
3. ❌ **No unlabeled tasks** - All tasks must have priority and assignee
4. ❌ **No abandoned tasks** - Tasks must reach `completed` or `cancelled`

**If anyone violates protocol:**
- Axel will politely remind them of the correct process
- Axel will create/update the task on their behalf if needed
- Repeated violations escalate to Owner for resolution

---

## 🛠️ Technical Implementation

**Database Table:** `tasks`

**Key Fields:**
```typescript
{
  id: serial("id"),
  title: text("title").notNull(),
  assignedTo: varchar("assigned_to", { length: 50 }),
  assignedBy: varchar("assigned_by", { length: 50 }),
  status: varchar("status"), // todo, in_progress, completed, cancelled
  priority: varchar("priority"), // low, medium, high, urgent
  githubIssueId: varchar("github_issue_id"), // e.g., "#214"
  githubIssueUrl: text("github_issue_url"), // Full URL
}
```

**GitHub Integration:**
- Service: `server/services/github-sync.ts`
- Repository: `53947/The_Blue_Link`
- Token: `GITHUB_TOKEN` (environment secret)

---

## 📚 Related Documentation

- **[AI_OPERATIONS_GUIDE.md](./AI_OPERATIONS_GUIDE.md)** - Defines team roles and responsibilities
- **[replit.md](./replit.md)** - Workflow and development standards
- **[_constants.md](./_constants.md)** - System constants and values

---

## 🔄 Version History

- **v1.0** (Nov 2, 2025) - Initial protocol established
  - Task management system integrated
  - GitHub sync enabled
  - Axel proactive check implemented

---

## ❓ FAQ

**Q: What if I need to assign a task to multiple people?**  
A: Create separate tasks for each person. Use `relatedTo` field to link them.

**Q: Can I change who a task is assigned to?**  
A: Yes, update the `assignedTo` field. GitHub labels will update automatically.

**Q: What if GitHub sync fails?**  
A: Task still saves to database. Check logs for error. Axel can manually create issue if needed.

**Q: How do I see all my assigned tasks?**  
A: Query API: `GET /api/tasks?assignedTo=YourName` or check GitHub with label filter.

**Q: Can I create a task without GitHub sync?**  
A: No. All tasks sync to GitHub for transparency and audit trail.

---

**Remember:** This protocol exists to keep our team organized and productive. When in doubt, create a task!

/**
 * GitHub Sync Service
 * Automatically creates and updates GitHub issues when tasks are created or modified
 */

interface GitHubIssueResponse {
  number: number;
  html_url: string;
  state: string;
}

interface CreateIssueOptions {
  title: string;
  body: string;
  assignees?: string[];
  labels?: string[];
}

interface UpdateIssueOptions {
  issueNumber: number;
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
  labels?: string[];
}

export class GitHubSyncService {
  private token: string;
  private repo: string;
  private owner: string;
  private baseUrl = 'https://api.github.com';

  constructor() {
    this.token = process.env.GITHUB_TOKEN || '';
    // Repository format: owner/repo
    const repoPath = '53947/The_Blue_Link';
    const [owner, repo] = repoPath.split('/');
    this.owner = owner;
    this.repo = repo;

    if (!this.token) {
      console.warn('[GitHubSync] GITHUB_TOKEN not found - GitHub sync disabled');
    }
  }

  /**
   * Check if GitHub sync is enabled
   */
  isEnabled(): boolean {
    return !!this.token;
  }

  /**
   * Create a new GitHub issue
   */
  async createIssue(options: CreateIssueOptions): Promise<GitHubIssueResponse | null> {
    if (!this.isEnabled()) {
      console.warn('[GitHubSync] Skipping issue creation - not configured');
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: options.title,
            body: options.body,
            labels: options.labels || [],
            assignees: options.assignees || [],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('[GitHubSync] Failed to create issue:', error);
        return null;
      }

      const issue: GitHubIssueResponse = await response.json();
      console.log(`[GitHubSync] Created issue #${issue.number}: ${options.title}`);
      return issue;
    } catch (error) {
      console.error('[GitHubSync] Error creating issue:', error);
      return null;
    }
  }

  /**
   * Update an existing GitHub issue
   */
  async updateIssue(options: UpdateIssueOptions): Promise<GitHubIssueResponse | null> {
    if (!this.isEnabled()) {
      console.warn('[GitHubSync] Skipping issue update - not configured');
      return null;
    }

    try {
      const updateData: any = {};
      if (options.title) updateData.title = options.title;
      if (options.body) updateData.body = options.body;
      if (options.state) updateData.state = options.state;
      if (options.labels) updateData.labels = options.labels;

      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues/${options.issueNumber}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('[GitHubSync] Failed to update issue:', error);
        return null;
      }

      const issue: GitHubIssueResponse = await response.json();
      console.log(`[GitHubSync] Updated issue #${issue.number}`);
      return issue;
    } catch (error) {
      console.error('[GitHubSync] Error updating issue:', error);
      return null;
    }
  }

  /**
   * Add a comment to an existing GitHub issue
   */
  async addComment(issueNumber: number, body: string): Promise<boolean> {
    if (!this.isEnabled()) {
      return false;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues/${issueNumber}/comments`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('[GitHubSync] Failed to add comment:', error);
        return false;
      }

      console.log(`[GitHubSync] Added comment to issue #${issueNumber}`);
      return true;
    } catch (error) {
      console.error('[GitHubSync] Error adding comment:', error);
      return false;
    }
  }

  /**
   * Format task data into GitHub issue format
   */
  formatTaskAsIssue(task: any): CreateIssueOptions {
    const labels: string[] = [];
    
    // Add assignee label
    if (task.assignedTo) {
      labels.push(`assigned-to-${task.assignedTo.toLowerCase()}`);
    }

    // Add priority label
    if (task.priority) {
      labels.push(`priority-${task.priority}`);
    }

    // Add custom tags as labels
    if (task.tags && Array.isArray(task.tags)) {
      labels.push(...task.tags);
    }

    // Build issue body
    const bodyParts: string[] = [];
    
    if (task.description) {
      bodyParts.push(task.description);
      bodyParts.push('');
    }

    bodyParts.push('---');
    bodyParts.push('**Task Details:**');
    bodyParts.push(`- **Assigned To:** ${task.assignedTo || 'Unassigned'}`);
    bodyParts.push(`- **Assigned By:** ${task.assignedBy || 'Unknown'}`);
    bodyParts.push(`- **Priority:** ${task.priority || 'medium'}`);
    bodyParts.push(`- **Status:** ${task.status || 'todo'}`);
    
    if (task.dueDate) {
      bodyParts.push(`- **Due Date:** ${new Date(task.dueDate).toLocaleDateString()}`);
    }

    bodyParts.push('');
    bodyParts.push(`*This issue was automatically created from the TriadBlue task management system (Task ID: ${task.id})*`);

    return {
      title: task.title,
      body: bodyParts.join('\n'),
      labels,
    };
  }

  /**
   * Sync task status to GitHub issue state
   */
  getIssueState(taskStatus: string): 'open' | 'closed' {
    return taskStatus === 'completed' || taskStatus === 'cancelled' ? 'closed' : 'open';
  }
}

// Export singleton instance
export const githubSync = new GitHubSyncService();

# Git Workflow Guide for SkillTrack 🎯

Complete guide for version control, commits, and collaboration practices.

---

## 📋 Git Setup

### Initial Setup

```bash
# Configure global Git settings
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --global --list
```

### Clone Repository

```bash
# Clone the repository
git clone <repository-url>
cd skilltrack

# Check remote
git remote -v
```

---

## 🔄 Branching Strategy

### Branch Naming Convention

```
feature/description  - New feature
  Example: feature/skill-filtering

fix/description      - Bug fix
  Example: fix/auth-token-refresh

docs/description     - Documentation
  Example: docs/api-endpoints

test/description     - Tests
  Example: test/auth-controller

refactor/description - Code refactoring
  Example: refactor/api-service
```

### Create Feature Branch

```bash
# Create and checkout new branch
git checkout -b feature/new-feature

# Or using the newer syntax
git switch -c feature/new-feature

# Push branch to remote
git push -u origin feature/new-feature
```

### Switch Between Branches

```bash
# Switch to existing branch
git checkout feature/new-feature
git switch feature/new-feature

# List all branches
git branch -a

# Delete local branch
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

---

## 💬 Commit Convention

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Categories

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Code style changes (no logic change)
- **refactor**: Code refactoring without feature change
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, config
- **perf**: Performance improvements

### Scope

- auth
- skills
- dashboard
- context
- api
- middleware
- models
- ui
- styles

### Examples

**Good Commits**:
```
feat(auth): implement JWT token refresh mechanism
fix(skills): correct proficiency level validation
docs(api): add endpoint documentation
test(auth): add login endpoint unit tests
refactor(context): simplify SkillsContext logic
chore(deps): upgrade express to v5.1.0
```

**Bad Commits**:
```
fixed bug          ❌ Not descriptive
updated files      ❌ Too vague
feat: lots of changes ❌ Too many changes
```

### Commit Size

- **Atomic**: Each commit should be one logical change
- **Focused**: Don't mix features and fixes in one commit
- **Reviewable**: Keep commits small enough to review easily

### Example Workflow

```bash
# Make changes to files
# ... edit Auth.js, AuthContext.js ...

# Stage changes
git add src/context/AuthContext.js
git add src/pages/Login.js

# Check status
git status

# Commit with message
git commit -m "feat(auth): add token refresh on page reload

- Implement automatic token verification
- Refresh user state if token exists
- Clear token on 401 errors
- Add loading state during verification"

# View commit
git log --oneline -n 5
```

---

## 📝 Writing Commit Messages

### Body Guidelines

- Explain **what** and **why**, not **how**
- Wrap at 72 characters
- Separate paragraphs with blank lines
- Use imperative mood ("add feature" not "added feature")

### Example

```
feat(skills): add skill filtering by category

This allows users to filter their skills list by selecting
a category (frontend, backend, database, etc.). The filter
persists in the context state and refreshes when applied.

Benefits:
- Easier to find specific skills
- Better organization for users with many skills
- Foundation for future sorting features

Related to #42
```

### Footer

- Reference issues: `Closes #123`
- Reference PRs: `Related to #456`
- Breaking changes: `BREAKING CHANGE: description`

---

## 🔀 Pull Requests

### Create Pull Request

```bash
# After commits, push to remote
git push origin feature/new-feature

# Go to GitHub and create PR
# Title: feat(auth): implement JWT refresh
# Description: [detailed description]
```

### PR Template

```markdown
## Description
What changes does this PR make?

## Related Issues
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
How was this tested?

## Screenshots (if applicable)
Add images here

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

### Code Review

```bash
# Fetch latest changes
git fetch origin

# View differences
git diff origin/main..feature/new-feature

# Update branch after review feedback
git add modified-files
git commit -m "review: address feedback from PR review"
git push
```

---

## 🔄 Merge Process

### Fast-Forward Merge (if no conflicts)

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge feature branch
git merge feature/new-feature

# Push to remote
git push origin main

# Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Squash Commit Merge

```bash
# Combine all commits into one
git merge --squash feature/new-feature
git commit -m "feat(skills): add filtering functionality"
git push origin main
```

### Rebase Merge (linear history)

```bash
# Rebase feature onto main
git rebase main feature/new-feature
git checkout main
git merge --ff-only feature/new-feature
git push origin main
```

---

## 🔧 Daily Workflow

### Start Day

```bash
# Ensure you're on main
git checkout main

# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature
```

### During Development

```bash
# Check status regularly
git status

# Stage specific files
git add src/pages/Dashboard.js
git add src/components/StatCard.js

# Commit small, logical changes
git commit -m "feat(dashboard): add stat cards component"

# Continue developing
# ... more edits ...
git add src/context/SkillsContext.js
git commit -m "feat(skills): add stats fetching to context"

# Push periodically
git push origin feature/your-feature
```

### End of Day

```bash
# Check unpushed commits
git log origin/feature/your-feature..HEAD

# Push all commits
git push origin feature/your-feature

# Verify on GitHub
# Create PR when ready
```

---

## 🐛 Fixing Mistakes

### Undo Last Commit (not pushed)

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1
```

### Revert Commit (already pushed)

```bash
# Create new commit that undoes changes
git revert <commit-hash>
git push origin main
```

### Stash Changes

```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Delete stash
git stash drop
```

### Amend Last Commit

```bash
# Add more changes to last commit
git add .
git commit --amend --no-edit

# Or change commit message
git commit --amend -m "new message"

# Force push (only if not shared)
git push --force-with-lease origin feature/your-feature
```

---

## 📊 Viewing History

### Log Commands

```bash
# View commit history
git log

# View last 10 commits
git log -10

# View in one line
git log --oneline

# View with graph
git log --graph --oneline --all

# View commits by author
git log --author="John Doe"

# View commits in date range
git log --since="2024-11-01" --until="2024-11-12"

# View changes in commit
git show <commit-hash>
```

### Diff Commands

```bash
# View unstaged changes
git diff

# View staged changes
git diff --cached

# View changes in commit
git diff <commit-hash>~1..<commit-hash>

# View changes between branches
git diff main..feature/new-feature
```

---

## 🔗 Remote Management

### Manage Remotes

```bash
# View remotes
git remote -v

# Add remote
git remote add upstream <url>

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Change remote URL
git remote set-url origin <new-url>
```

### Fetch vs Pull

```bash
# Fetch (download, don't merge)
git fetch origin

# Pull (fetch + merge)
git pull origin main

# Force pull (discard local changes)
git pull --force origin main
```

---

## 🔐 Security Best Practices

### Never Commit Secrets

```bash
# Environment files (.env)
# DO NOT COMMIT: .env
# DO COMMIT: .env.example

# API Keys
# DO NOT COMMIT: API keys
# DO USE: Environment variables

# Credentials
# DO NOT COMMIT: Passwords, tokens
# DO USE: Secure credential management
```

### Review Before Commit

```bash
# View changes before staging
git diff

# Check what will be committed
git diff --cached

# Use interactive staging
git add -p  # Then choose hunks to stage
```

---

## 📱 Common Scenarios

### Scenario 1: I made commits on main, but they should be on a branch

```bash
# Create feature branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Reset main to before commits
git reset --hard origin/main

# Commits are now on feature/new-feature
```

### Scenario 2: I need to update my branch with latest main

```bash
# Pull latest main
git fetch origin

# Rebase your branch on main
git rebase origin/main

# Or merge main into your branch
git merge origin/main

# Push updates
git push origin feature/your-feature
```

### Scenario 3: I made a mistake in commit message

```bash
# If not pushed
git commit --amend -m "correct message"

# If already pushed
git commit --amend -m "correct message"
git push --force-with-lease
```

### Scenario 4: I want to combine multiple commits

```bash
# Interactive rebase last 3 commits
git rebase -i HEAD~3

# In editor: change "pick" to "squash" for commits to combine
# Save and confirm
# Rebase will combine commits
```

---

## 🎓 Best Practices

### Commit Guidelines

✅ **Do**:
- Write descriptive messages
- Keep commits atomic and focused
- Test before committing
- Follow convention
- Reference related issues
- Commit frequently

❌ **Don't**:
- Mix multiple features in one commit
- Commit sensitive data
- Commit broken code
- Write vague messages
- Force push to shared branches
- Commit large files

### Branch Management

✅ **Do**:
- Create branch from main
- Use descriptive names
- Delete merged branches
- Keep branches updated with main
- Delete old branches

❌ **Don't**:
- Work on main directly
- Use unclear names like `fix1`, `update`
- Let branches get too outdated
- Push to main without PR
- Accumulate unused branches

---

## 📞 Git Help

```bash
# Get help for any command
git help <command>
git help commit
git help merge

# Short help
git <command> -h
git commit -h
```

---

## Team Collaboration Tips

### Communicating Changes

1. **Commit messages**: Clear about what changed
2. **PR descriptions**: Why the change matters
3. **Comments**: Explain complex logic
4. **Issues**: Track bugs and features

### Code Review Etiquette

- Be constructive
- Ask questions instead of demanding
- Suggest improvements
- Acknowledge good code
- Test locally before approving

### Conflict Resolution

```bash
# When there's a merge conflict
git merge feature/other-feature

# Check conflicts
git status

# Edit files to resolve
# ... fix conflicts ...

# Stage resolved files
git add resolved-files

# Complete merge
git commit -m "merge: resolve conflicts from feature/other-feature"
```

---

## 🚀 GitHub Actions (CI/CD)

### Basic Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

---

**Last Updated**: November 12, 2025

Happy committing! 🚀

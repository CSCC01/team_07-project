# Contributing Guide

## Workflow
Here is the high-level workflow of completing a task.
1. Ensure the task to "In Progress" column on ZenHub
2. Make sure your master is up to date
3. Create branch from master with name `[task-]userstory-task-keywords`
4. Commit your changes using proper commit messages
5. Open a PR on GitHub, with appropriate title. Include `Resolves #<issue number>` in the description when it applies
6. Commit more changes
7. Request a review from teammates
8. Commit more changes using the feedback
9. Request another review from teammates
10. Reviewer squash merges the changes and deletes the branch


## Branching
Branch names should `[<Task Number #>-]<User Story #>-<short description>`

The short description should be no more then 20 characters long; words are all smaller cases, separated using minuses.

✅ Good:
- `30-31-add-doc-plugin`
- `20-login-ui`

❌ Bad:
- `30`
- `add-doc-plugin`
- `30-31-add_doc_plugin`
- `19-Create-promotion-page`


## Commits
Commit messages should follow the following rules:
- Capitalize the first letter of the summary
- Do not use stop at the end of the summary
- Use present tense
- Summarize should be less than 50 characters 

```
Summarize changes in 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.
```

## Writing Content for the Course

### Writing Report
- Gramma check
- Final adjustments to page layout
- Update table of content

### Uploading Report
- Name to the file to `dx.pdf` where `x` is the deliverable number
- Upload to `/Deliverbles`
- Update `/Delierables/README.md` to include a link to the new deliverable


### Uploading Burn-Down Chart & Task Board
- Name the files using format that are consistent with existing files
- Update `/Burn-Down Chart & Task Board/README.md` to include the new images


## User Stories & Tasks on GitHub/ZenHub

```
                |    user story    |   user story                 |
                |  without tasks   |   with tasks       tasks     |
----------------+------------------+------------------------------+
zenhub estimate |       ✔️         |     ❌[1]           ✔️      |
 priority label |       ✔️         |     ✔️              ❌      |
      milestone |       ✔️         |     ✔️              ✔️      |
          notes |                  |     [2]             [3]      |

```
- `[1]` Should be automatically calculated using its tasks.
- `[2]` This user story must be an epic.
- `[3]` Note that tasks must also:
	- Start with `[#user-story]` in title
	- Have `Task of #user-story.` as the first line in the description
	- Properly linked to the user story on ZenHub

Assigning to People:
- For simplicity, user story with tasks does not need to be assigned to anyone, as long as its tasks are properly assigned.


<!--
  ### User Stories
  - ZenHub: added to proper column, ordered properly (higher priority on top)
  - ZenHub: added estimate
  - ZenHub: denpendency added when apply (blocked by/blocking...)
  - GitHub: labelled with priority
  - GitHub: assigned to people
  - GitHub: added to milestone (aka sprint)
  ### Making Tasks
  - ZenHub: the user story should be a epic
  - ZenHub: tasks are added to the epic
  - GitHub: tasks need to have proper prefix in issue title
  - GitHub: tasks need to have "Task of #xx." in issue description
  - GitHub: the epic issue is assigned to no one
  - GitHub: tasks are assigned to people
  - GitHub: tasks does not need to be labelled with priority
  - Report: properly listed in user story section
  - Report: user story estimate is re-calculated
-->

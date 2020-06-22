# Contributing Guide

## Branching
WIP

## Commits
WIP

## Writing Content for the Course

### Writing Report
- Gramma check
- Final adjustments to page layout
- Update table of content

### Uploading Report
- Name to the file to `dx.pdf` where `x` is the deliverable number
- Upload to `/Deliverbles`
- Update `/Delierables/README.md` to include a link to the new deliverable


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

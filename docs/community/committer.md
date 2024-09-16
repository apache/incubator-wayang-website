---
title: Becoming a committer
sidebar_position: 5
id: committer
---


To get started contributing to Wayang, learn how to contribute – anyone can submit patches, documentation and examples to the project.

The (P)PMC regularly adds new committers from the active contributors, based on their contributions to Wayang. The qualifications for new committers include:

### Sustained contributions to Wayang:
Committers should have a history of major contributions to Wayang. An ideal committer will have contributed broadly throughout the project, and have contributed at least one major component where they have taken an “ownership” role. An ownership role means that existing contributors feel that they should run patches for this component by this person.

__Quality of contributions__: Committers more than any other community member should submit simple, well-tested, and well-designed patches. In addition, they should show sufficient expertise to be able to review patches, including making sure they fit within Wayang's engineering practices (testability, documentation, API stability, code style, etc). The committership is collectively responsible for the software quality and maintainability of Spark. Note that contributions to critical parts of Spark, like its core and SQL modules, will be held to a higher standard when assessing quality. Contributors to these areas will face more review of their changes.

__Community involvement__: Committers should have a constructive and friendly attitude in all community interactions. They should also be active on the dev and user list and help mentor newer contributors and users. In design discussions, committers should maintain a professional and diplomatic approach, even in the face of disagreement.
The type and level of contributions considered may vary by project area – for example, we greatly encourage contributors who want to work on mainly the documentation, or mainly on platform support for specific OSes, storage systems, etc.

The (P)PMC also adds new (P)PMC members. (P)PMC members are expected to carry out (P)PMC responsibilities as described in [Apache Guidance](https://www.apache.org/dev/pmc.html#policy), including helping vote on releases, enforce Apache project trademarks, take responsibility for legal and license issues, and ensure the project follows Apache project mechanics. The PMC periodically adds committers to the PMC who have shown they understand and can help with these activities.

### Review process
All contributions should be reviewed before merging as described in Contributing to Wayang. In particular, if you are working on an area of the codebase you are unfamiliar with, look at the Git history for that code to see who reviewed patches before. You can do this using git log `--format=full <filename>`, by examining the “Commit” field to see who committed each patch.

## When to commit/merge a pull request
PRs shall not be merged during active, on-topic discussion unless they address issues such as critical security fixes of a public vulnerability. Under extenuating circumstances, PRs may be merged during active, off-topic discussion and the discussion directed to a more appropriate venue. Time should be given prior to merging for those involved with the conversation to explain if they believe they are on-topic.

Lazy consensus requires giving time for discussion to settle while understanding that people may not be working on Wayang as their full-time job and may take holidays. It is believed that by doing this, we can limit how often people feel the need to exercise their veto.

All -1s with justification merit discussion. A -1 from a non-committer can be overridden only with input from multiple committers, and suitable time must be offered for any committer to raise concerns. A -1 from a committer who cannot be reached requires a consensus vote of the (P)PMC under ASF voting rules to determine the next steps within the ASF guidelines for code vetoes. The Wayang project typically uses a 72h time window to conclude votes.

These policies serve to reiterate the core principle that code must not be merged with a pending veto or before a consensus has been reached (lazy or otherwise).

It is the (P)PMC’s hope that vetoes continue to be infrequent, and when they occur, that all parties will take the time to build consensus prior to additional feature work.

Being a committer means exercising your judgement while working in a community of people with diverse views. There is nothing wrong in getting a second (or third or fourth) opinion when you are uncertain. Thank you for your dedication to the Wayang project; it is appreciated by the developers and users of Wayang.

It is hoped that these guidelines do not slow down development; rather, by removing some of the uncertainty, the goal is to make it easier for us to reach consensus. If you have ideas on how to improve these guidelines or other Wayang project operating procedures, you should reach out on the dev@ list to start the discussion.

## How we merge a pull request
Changes pushed to the master branch on Apache cannot be removed; that is, we can’t force-push to it. So please don’t add any test commits or anything like that, only real patches. We typically enforce a review from minimum two committers, who are ideally owners of submodules, like ML4ALL or JDBC. They investigate the PR, add remarks and request changes. Please be not insultet in any way, the team needs to make sure that all code committed to `main` has a igh quality and does not break current functionality. Ask dev@ if you have trouble with these steps, or want help doing your first merge. Once a PR is merged please leave a comment on the PR stating which branch(es) it has been merged with.

### Policy on backporting bug fixes
We go in line with pwendell (Apache Spark PMC):

The trade off when backporting is you get to deliver the fix to people running older versions (great!), but you risk introducing new or even worse bugs in maintenance releases (bad!). The decision point is when you have a bug fix and it’s not clear whether it is worth backporting.

I think the following facets are important to consider:

- Backports are an extremely valuable service to the community and should be considered for any bug fix.
- Introducing a new bug in a maintenance release must be avoided at all costs. It over time would erode confidence in our release process.
- Distributions or advanced users can always backport risky patches on their own, if they see fit.
- For me, the consequence of these is that we should backport in the following situations:

1. Both the bug and the fix are well understood and isolated. Code being modified is well tested.
2. The bug being addressed is high priority to the community.
3. The backported fix does not vary widely from the master branch fix.
4. We tend to avoid backports in the converse situations:

The bug or fix are not well understood. For instance, it relates to interactions between complex components or third party libraries (e.g. Hadoop libraries). The code is not well tested outside of the immediate bug being fixed.
The bug is not clearly a high priority for the community.
The backported fix is widely different from the master branch fix.

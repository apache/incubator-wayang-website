---
title: How to contribute
sidebar_position: 5
id: contribute
---

This guide documents the best way to make various types of contribution to Apache Wayang, including what is required before submitting a code change.

Contributing to Wayang doesn’t just mean writing code. Helping new users on the mailing list, testing releases, and improving documentation are also welcome. In fact, proposing significant code changes usually requires first gaining experience and credibility within the community by helping in other ways. This is also a guide to becoming an effective contributor.

So, this guide organizes contributions in order that they should probably be considered by new contributors who intend to get involved long-term. Build some track record of helping others, rather than just open pull requests.

### Contributing by helping other users
A great way to contribute to Wayang is to help answer user questions on the user@ mailing list or on StackOverflow. There are always many new Wayang users; taking a few minutes to help answer a question is a very valuable community service.

Contributors should subscribe to this list and follow it in order to keep up to date on what’s happening in Wayang. Answering questions is an excellent and visible way to help the community, which also demonstrates your expertise.

See the [Mailing Lists](/docs/community/mailinglist) guide for guidelines about how to effectively participate in discussions on the mailing list, as well as forums like StackOverflow.

### Contributing by testing releases
Wayang’s release process is community-oriented, and members of the community can vote on new releases on the dev@ mailing list. Wayang users are invited to subscribe to this list to receive announcements, and test their workloads on newer release and provide feedback on any performance or correctness issues found in the newer release.

## Contributing by reviewing changes
Changes to Wayang source code are proposed, reviewed and committed via GitHub pull requests (described later). Anyone can view and comment on active changes here. Reviewing others’ changes is a good way to learn how the change process works and gain exposure to activity in various parts of the code. You can help by reviewing the changes and asking questions or pointing out issues – as simple as typos or small issues of style.

## Contributing documentation changes
To propose a change to release documentation (that is, docs that appear under [Developer](/docs/guide/getting-started) section), fork the website repo and edit the Markdown source files in Wayang’s docs/ directory, the README file shows how to build the documentation locally to test your changes. The process to propose a doc change is otherwise the same as the process for proposing code changes below.

To propose a change to the rest of the documentation (that is, docs that do __not__ appear under [Developer](/docs/guide/getting-started) section), similarly, edit the Markdown in the wayang-website repository and open a pull request.

## Contributing user libraries to Wayang
Just as Java and Scala applications can access a huge selection of libraries and utilities, none of which are part of Java or Scala themselves, Wayang aims to support a rich ecosystem of libraries. Many new useful utilities or features belong outside of Spark rather than in the core. For example: query optimizer code and language support probably has to be a part of core Wayang, but, useful machine learning algorithms can happily exist outside of Wayang.

To that end, large and independent new functionality is often rejected for inclusion in Wayang itself, but, can and should be hosted as a separate project and repository, and included in the wayang-packages.org collection.

## Contributing bug reports
Ideally, bug reports are accompanied by a proposed code change to fix the bug. This isn’t always possible, as those who discover a bug may not have the experience to fix it. A bug may be reported by creating a [JIRA](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-16?filter=allopenissues) or a [GitHub Issue](https://github.com/apache/incubator-wayang/issues) but without creating a pull request (see below).

Bug reports are only useful however if they include enough information to understand, isolate and ideally reproduce the bug. Simply encountering an error does not mean a bug should be reported; as below, search JIRA and search and inquire on the Wayang user / dev mailing lists first. Unreproducible bugs, or simple error reports, may be closed.

It’s very helpful if the bug report has a description about how the bug was introduced, by which commit, so that reviewers can easily understand the bug. It also helps committers to decide how far the bug fix should be backported, when the pull request is merged. The pull request to fix the bug should narrow down the problem to the root cause.

Performance regression is also one kind of bug. The pull request to fix a performance regression must provide a benchmark to prove the problem is indeed fixed.

Note that, data correctness/data loss bugs are very serious. Make sure the corresponding bug report JIRA ticket is labeled as correctness or data-loss. If the bug report doesn’t get enough attention, please send an email to dev@, to draw more attentions.

It is possible to propose new features as well. These are generally not helpful unless accompanied by detail, such as a design document and/or code change. Large new contributions should consider wayang-packages.org first (see above), or be discussed on the mailing list first. Feature requests may be rejected, or closed after a long period of inactivity.

### Contributing to JIRA maintenance
Given the volume of issues raised in the Apache Wayang JIRA, inevitably some issues are duplicates, or become obsolete and eventually fixed otherwise, or can’t be reproduced, or could benefit from more detail, and so on. It’s useful to help identify these issues and resolve them, either by advancing the discussion or even resolving the JIRA. Most contributors are able to directly resolve JIRAs. Use judgment in determining whether you are quite confident the issue should be resolved, although changes can be easily undone. If in doubt, just leave a comment on the JIRA.

When resolving JIRAs, observe a few useful conventions:

- Resolve as Fixed if there’s a change you can point to that resolved the issue
    - Set Fix Version(s), if and only if the resolution is Fixed
    - Set Assignee to the person who most contributed to the resolution, which is usually the person who opened the PR that resolved the issue.
    - In case several people contributed, prefer to assign to the more ‘junior’, non-committer contributor

- For issues that can’t be reproduced against master as reported, resolve as Cannot Reproduce
    - Fixed is reasonable too, if it’s clear what other previous pull request resolved it. Link to it.
    - If the issue is the same as or a subset of another issue, resolved as Duplicate
    - Make sure to link to the JIRA it duplicates
    - Prefer to resolve the issue that has less activity or discussion as the duplicate

- If the issue seems clearly obsolete and applies to issues or components that have changed radically since it was opened, resolve as Not a Problem
- If the issue doesn’t make sense – not actionable, for example, a non-Spark issue, resolve as Invalid
- If it’s a coherent issue, but there is a clear indication that there is not support or interest in acting on it, then resolve as Won’t Fix

Sometimes, a contributor will already have a particular new change or bug in mind. If seeking ideas, consult the list of starter tasks in JIRA, or ask the user@ mailing list.

Before proceeding, contributors should evaluate if the proposed change is likely to be relevant, new and actionable:

1. Is it clear that code must change? Proposing a JIRA and pull request is appropriate only when a clear problem or change has been identified. If simply having trouble using Spark, use the mailing lists first, rather than consider filing a JIRA or proposing a change. When in doubt, email user@ first about the possible change
2. Search the user@ and dev@ mailing list archives for related discussions. Often, the problem has been discussed before, with a resolution that doesn’t require a code change, or recording what kinds of changes will not be accepted as a resolution.
3. Search JIRA for existing issues: https://issues.apache.org/jira/browse/WAYANG
4. Is the scope of the change matched to the contributor’s level of experience? Anyone is qualified to suggest a typo fix, but refactoring core scheduling logic requires much more understanding of Wayang. Some changes require building up experience first (see above).
5. It’s worth reemphasizing that changes to the core of Wayang, or to highly complex and important modules like SQL and Catalyst, are more difficult to make correctly. They will be subjected to more scrutiny, and held to a higher standard of review than changes to less critical code.

### ML4ALL and optimizer-specific contribution guidelines
While a rich set of algorithms is an important goal for Wayang, scaling the project requires that maintainability, consistency, and code quality come first. New algorithms should:

1. Be used and accepted (academic citations and concrete use cases can help justify this)
2. Be well documented
3. Have APIs consistent with other algorithms in Wayang
4. Come with a reasonable expectation of developer support
5. Error message guidelines
6. Exceptions thrown in Wayang should be associated with standardized and actionable error messages

#### Error messages should answer the following questions:

- What was the problem?
- Why did the problem happen?
- How can the problem be solved?

__When writing error messages, you should__:

1. Use active voice
2. Avoid time-based statements, such as promises of future support
3. Use the present tense to describe the error and provide suggestions
4. Provide concrete examples if the resolution is unclear
5. Avoid sounding accusatory, judgmental, or insulting
6. Be direct
7. Do not use programming jargon in user-facing errors
8 See the error message guidelines for more details.

### Code review criteria
Before considering how to contribute code, it’s useful to understand how code is reviewed, and why changes may be rejected. See the detailed guide for code reviewers from Google’s Engineering Practices documentation. Simply put, changes that have many or large positives, and few negative effects or risks, are much more likely to be merged, and merged quickly. Risky and less valuable changes are very unlikely to be merged, and may be rejected outright rather than receive iterations of review.

#### Positives
- Fixes the root cause of a bug in existing functionality
- Adds functionality or fixes a problem needed by a large number of users
- Simple, targeted
- Maintains or improves consistency across Python, Java, Scala
- Easily tested; has tests
- Reduces complexity and lines of code
- Change has already been discussed and is known to committers

#### Negatives, risks
- Band-aids a symptom of a bug only
- Introduces complex new functionality, especially an API that needs to be supported
- Adds complexity that only helps a niche use case
- Adds user-space functionality that does not need to be maintained in Wayang, but could be hosted externally and indexed by wayang-packages.org
- Changes a public API or semantics (rarely allowed)
- Adds large dependencies
- Changes versions of existing dependencies
- Adds a large amount of code
- Makes lots of modifications in one “big bang” change

### Contributing code changes
Please review the preceding section before proposing a code change. This section documents how to do so.

__When you contribute code, you affirm that the contribution is your original work and that you license the work to the project under the project’s open source license. Whether or not you state this explicitly, by submitting any copyrighted material via pull request, email, or other means you agree to license the material under the project’s open source license and warrant that you have the legal authority to do so.__

### Cloning the Apache Wayang™ source code
If you are interested in working with the newest under-development code or contributing to Apache Spark development, you can check out the master branch from Git:
```
# Master development branch
git clone git://github.com/apache/incubator-wayang.git
```
Once you’ve downloaded Wayang, you can find instructions for installing and building it on the [Compiling Apache Wayang](/docs/guide/installation) page.

### JIRA
Generally, Wayang uses JIRA to track logical issues, including bugs and improvements, and uses GitHub pull requests to manage the review and merge of specific code changes. That is, JIRAs are used to describe what should be fixed or changed, and high-level approaches, and pull requests describe how to implement that change in the project’s source code. For example, major design decisions are discussed in JIRA.

- Find the existing Spark JIRA that the change pertains to.
    - Do not create a new JIRA if creating a change to address an existing issue in JIRA; add to the existing discussion and work instead
    - Look for existing pull requests that are linked from the JIRA, to understand if someone is already working on the JIRA
- If the change is new, then it usually needs a new JIRA. However, trivial changes, where the what should change is virtually the same as the how it should change do not require a JIRA. Example: `Fix typos in Foo wayang doc`
- If required, create a new JIRA:
    - Provide a descriptive Title. “Update web UI” or “Problem in scheduler” is not sufficient. “Kafka Streaming support fails to handle empty queue in YARN cluster mode” is good.
    - Write a detailed description. For bug reports, this should ideally include a short reproduction of the problem. For new features, it may include a design document.
    - Set required fields:
        - Issue Type. Generally, Bug, Improvement and New Feature are the only types used in Spark.
        - Priority. Set to Major or below; higher priorities are generally reserved for committers to set. The main exception is correctness or data-loss issues, which can be flagged as Blockers. JIRA tends to unfortunately conflate “size” and “importance” in its Priority field values. Their meaning is roughly:
            - __Blocker__: pointless to release without this change as the release would be unusable to a large minority of users. Correctness and data loss issues should be considered Blockers for their target versions.
            - __Critical__: a large minority of users are missing important functionality without this, and/or a workaround is difficult
            - __Major__: a small minority of users are missing important functionality without this, and there is a workaround
            - __Minor__: a niche use case is missing some support, but it does not affect usage or is easily worked around
            - __Trivial__: a nice-to-have change but unlikely to be any problem in practice otherwise
        - Component
        - Affects Version. For Bugs, assign at least one version that is known to exhibit the problem or need the change
        - Label. Not widely used, except for the following:
            - `correctness`: a correctness issue
            - `data-loss`: a data loss issue
            - `release-notes`: the change’s effects need mention in release notes. The JIRA or pull request should include detail suitable for inclusion in release notes – see “Docs Text” below.
            - `starter`: small, simple change suitable for new contributors
        - Docs Text: For issues that require an entry in the release notes, this should contain the information that the release manager should include in Release Notes. This should include a short summary of what behavior is impacted, and detail on what behavior changed. It can be provisionally filled out when the JIRA is opened, but will likely need to be updated with final details when the issue is resolved.
    -  Do not set the following fields:
        - __Fix Version__ This is assigned by committers only when resolved.
        - __Target Version__ This is assigned by committers to indicate a PR has been accepted for possible fix by the target version.
    - Do not include a patch file; pull requests are used to propose the actual change.
- If the change is a large change, consider inviting discussion on the issue at dev@ first before proceeding to implement the change.

### Pull request
Before creating a pull request in Apache Wayang, it is important to check if tests can pass on your branch because our GitHub Actions workflows automatically run tests for your pull request/following commits and every run burdens the limited resources of GitHub Actions in Apache Wayang repository. Below steps will take your through the process.

1. Fork the GitHub repository at https://github.com/apache/incubator-wayang if you haven’t already
2. Go to “Actions” tab on your forked repository and enable “Build and test” and “Report test results” workflows
3. Clone your fork and create a new branch
4. Consider whether documentation or tests need to be added or updated as part of the change, and add them as needed.
    1.  When you add tests, make sure the tests are self-descriptive.
    2.  Also, you should consider writing a JIRA ID in the tests when your pull request targets to fix a specific issue. In practice, usually it is added when a JIRA type is a bug or a PR adds a couple of tests to an existing test class. See the examples below:

``` Java
@Test
public void testCase() {
  // WAYANG-12345: a short description of the test
```

5.  Consider whether benchmark results should be added or updated as part of the change, and add them as needed by Running benchmarks in your forked repository to generate benchmark results.
6.  Run all tests with in your build to verify that the code still compiles, passes tests, and passes style checks. If style checks fail, review the Code Style Guide below.
7.  Push commits to your branch. This will trigger “Build and test” and “Report test results” workflows on your forked repository and start testing and validating your changes.
8.  Open a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) against the master branch of apache/incubator-wayang. (Only in special cases would the PR be opened against other branches). This will trigger workflows “On pull request*” (on the Wayang repo) that will look/watch for successful workflow runs on “your” forked repository (it will wait if one is running).
    1. The PR title should be of the form [WAYANG-xxxx][COMPONENT] Title, where WAYANG-xxxx is the relevant JIRA number, COMPONENT is one of the PR categories and Title may be the JIRA’s title or a more specific title describing the PR itself.
    2. If the pull request is still a work in progress, and so is not ready to be merged, but needs to be pushed to GitHub to facilitate review, then add [WIP] after the component.
    3. Consider identifying committers or other contributors who have worked on the code being changed. Find the file(s) in GitHub and click “Blame” to see a line-by-line annotation of who changed the code last. You can add @username in the PR description to ping them immediately.
    4. Please state that the contribution is your original work and that you license the work to the project under the project’s open source license.
9. The related JIRA, if any, will be marked as “In Progress” and your pull request will automatically be linked to it. There is no need to be the Assignee of the JIRA to work on it, though you are welcome to comment that you have begun work.

### The review process
- Other reviewers, including committers, may comment on the changes and suggest modifications. Changes can be added by simply pushing more commits to the same branch.
- Lively, polite, rapid technical debate is encouraged from everyone in the community. The outcome may be a rejection of the entire change.
- Keep in mind that changes to more critical parts of Spark, like its core and SQL components, will be subjected to more review, and may require more testing and proof of its correctness than other changes.
- Reviewers can indicate that a change looks suitable for merging with a comment such as: “I think this patch looks good”. Wayang uses the LGTM convention for indicating the strongest level of technical sign-off on a patch: simply comment with the word “LGTM”. It specifically means: “I’ve looked at this thoroughly and take as much ownership as if I wrote the patch myself”. If you comment LGTM you will be expected to help with bugs or follow-up issues on the patch. Consistent, judicious use of LGTMs is a great way to gain credibility as a reviewer with the broader community.
- Sometimes, other changes will be merged which conflict with your pull request’s changes. The PR can’t be merged until the conflict is resolved. This can be resolved by, for example, adding a remote to keep up with upstream changes by git remote add upstream https://github.com/apache/incubator-wayang.git, running git fetch upstream followed by git rebase upstream/master and resolving the conflicts by hand, then pushing the result to your branch.
- Try to be responsive to the discussion rather than let days pass between replies

### Closing your pull request / JIRA
- If a change is accepted, it will be merged and the pull request will automatically be closed, along with the associated JIRA if any
    - Note that in the rare case you are asked to open a pull request against a branch besides master, that you will actually have to close the pull request manually
    - The JIRA will be Assigned to the primary contributor to the change as a way of giving credit. If the JIRA isn’t closed and/or Assigned promptly, comment on the JIRA.
- If your pull request is ultimately rejected, please close it promptly
    - … because committers can’t close PRs directly
    - Pull requests will be automatically closed by an automated process at Apache after about a week if a committer has made a comment like “mind closing this PR?” This means that the committer is specifically requesting that it be closed.
- If a pull request has gotten little or no attention, consider improving the description or the change itself and ping likely reviewers again after a few days. Consider proposing a change that’s easier to include, like a smaller and/or less invasive change.
- If it has been reviewed but not taken up after weeks, after soliciting review from the most relevant reviewers, or, has met with neutral reactions, the outcome may be considered a “soft no”. It is helpful to withdraw and close the PR in this case.
- If a pull request is closed because it is deemed not the right approach to resolve a JIRA, then leave the JIRA open. However if the review makes it clear that the issue identified in the JIRA is not going to be resolved by any pull request (not a problem, won’t fix) then also resolve the JIRA.

## Code style guide
Please follow the style of the existing codebase.

- For Python code, Apache Wayang follows [PEP 8](http://legacy.python.org/dev/peps/pep-0008/) with one exception: lines can be up to 100 characters in length, not 79.
- For R code, Apache Wayang follows [Google’s R Style Guide](https://google.github.io/styleguide/Rguide.xml) with three exceptions: lines can be up to 100 characters in length, not 80, there is no limit on function name but it has a initial lower case latter and S4 objects/methods are allowed.
- For Java code, Apache Wayang follows [Oracle’s Java code conventions](http://www.oracle.com/technetwork/java/codeconvtoc-136057.html) and Scala guidelines below. The latter is preferred.
- For Scala code, Apache Wayang follows the official [Scala style guide](http://docs.scala-lang.org/style/).

### If in doubt
If you’re not sure about the right style for something, try to follow the style of the existing codebase. Look at whether there are other examples in the code that use your feature. Feel free to ask on the dev@ list as well and/or ask committers.

## Code of conduct
The Apache Wayang project follows the Apache Software Foundation Code of Conduct. The code of conduct applies to all spaces managed by the Apache Software Foundation, including IRC, all public and private mailing lists, issue trackers, wikis, blogs, Twitter, and any other communication channel used by our communities. A code of conduct which is specific to in-person events (ie., conferences) is codified in the published ASF anti-harassment policy.

We expect this code of conduct to be honored by everyone who participates in the Apache community formally or informally, or claims any affiliation with the Foundation, in any Foundation-related activities and especially when representing the ASF, in any role.

This code is not exhaustive or complete. It serves to distill our common understanding of a collaborative, shared environment and goals. We expect it to be followed in spirit as much as in the letter, so that it can enrich all of us and the technical communities in which we participate.

For more information and specific guidelines, refer to the Apache Software Foundation Code of Conduct. 

This guide was originally released by [Apache Spark](https://spark.apache.org/contributing.html), the Apache Wayang project adapted the guide.
---
slug: kafka-meets-wayang-1
title: Apache Kafka meets Apache Wayang - Part 1
authors: kamir
tags: [wayang, ASF, release]
---

# How I failed to release Apache Wayang

## Intro
The ASF provides a robust infrastructure for open communities of software developers. We can share ideas, combine forces, contribute code, docs, review-energy, art work, and from time to time we can nail it down. A release defines an intermediate result of the continuous community work.

How we do such a release in the Apache Wayang team is an essential aspect towards graduation. First of all, there are some references to take into account, such as:

- https://www.apache.org/legal/release-policy.html
- https://maven.apache.org/maven-release/maven-release-plugin/

Assuming you are (P)PMC, and assuming that you have the right permissions for such a release, you can follow the path as described in this guide:

- https://plc4x.apache.org/developers/release/release.html

I tried to follow exactly this procedure, several times. I failed. Here I share the current status of my __release attempts__.

I plan a longer tour, and do not want to block the project for a long time.
Hence I create this draft, and I hope we can unblock this project as soon as possible.

## Status:
I am not able to conduct the _mvn release:perform_ step. 
Anything before worked, sometimes only after some digging, but it worked.

* We assume, that due to my membership in two ASF incubator projects I am not able to upload the artefacts to the Nexus repository (H1).

* It can be, that I have not the correct user and password in my _settings.xml_ file (H2).
  
But I tested a manual login to the nexus server https://repository.apache.org/service/local/staging/deploy/maven2 with success. And beyond that I have no idea how I can verify this detail alone.

## Idea / Proposal
(1) It would be great, if someone - who has done a release in any other ASF project or in Apache Wayang - could follow the steps I share, so that we can check where the problem hides itself. 

(2) As a follow-up task, I suggest to add a __Release Guide__ to the Apache Wayang project, including release manager onboarding steps, and checklists for the particular project, derived from the referenced sources which are listed above. 

But for now it is all about sharing the status (as I did serveral times on multiple chanels, including JIRA, Slack, Mailing lists) and finding a solution for Apache Wayang release 1.0.

## Latest Error:
```
mvn release:perform -X -DskipTests
```
```
[INFO] Caused by: org.eclipse.aether.deployment.DeploymentException: Failed to deploy artifacts: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): status code: 401, reason phrase: Unauthorized (401)
```

## Activity Log
```bash 
mvn release:clean
mvn versions:set -DnewVersion=1.0.0-RC2
mvn versions:commit
```

```bash 
mvn release:prepare -Darguments='-DskipTests=True'
```

```bash 
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-release-plugin:3.0.1:prepare (default-cli) on project wayang: You don't have a SNAPSHOT project in the reactor projects list. -> [Help 1]
```

```bash 
mvn versions:set -DnewVersion=1.0.0-RC2-SNAPSHOT
mvn versions:commit
```

```bash 
mvn release:prepare -Darguments='-DskipTests=True'
```

```bash 
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-release-plugin:3.0.1:prepare (default-cli) on project wayang: Cannot prepare the release because you have local modifications :
```

```bash 
git status
git add .
git commit -m "prepare for release 1.0.0-RC2-SNAPSHOT"
git push
```

```bash 
mvn release:prepare -Darguments='-DskipTests=True -Dresume=False' -DdryRun=true
mvn release:prepare -Darguments='-DskipTests=True -Dresume=False' -XXX
```

```bash 
Caused by: org.eclipse.aether.transfer.NoRepositoryConnectorException: Blocked mirror for repositories: [repository.jboss.org (http://repository.jboss.org/nexus/content/groups/public/, default, releases)]
```

### Dependency on JDK-11 during release
> FIXED with local JDK11 Setup
> 
```
brew install openjdk@11

curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

which java

which java
/Users/kamir/.sdkman/candidates/java/current/bin/java
➜  GITHUB.active export JAVA_HOME=/Users/kamir/.sdkman/candidates/java/current
➜  GITHUB.active mvn clean -XXX
export JAVA_HOME=
sdk install java 11.0.24-amzn
sdk home java 11.0.24-amzn

/usr/libexec/java_home -v 11

jenv add /Library/Java/JavaVirtualMachines/jdk-11.0.15.1.jdk/Contents/Home
jenv global 11.0
jenv shell 11.0
jenv local 11.0
java -version
```

### Manual update of release-version

During the release procedure, do I have to set the version here in this configuration section manually?

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-release-plugin</artifactId>
    <version>3.0.1</version>

    <configuration>
        <autoVersionSubmodules>true</autoVersionSubmodules>
        <autoResolveSnapshots>all</autoResolveSnapshots>
        <releaseProfiles>apache-release</releaseProfiles>
        <!--<pushChanges>false</pushChanges>-->
        <!--<dryRun>true</dryRun>-->
        <releaseVersion>0.7.1</releaseVersion>
        <updateWorkingCopyVersions>true</updateWorkingCopyVersions>
        <updateDependencies>true</updateDependencies>
        <tag>wayang-0.7.1</tag>
        <scmReleaseCommitComment>@{prefix} prepare release 0.7.1</scmReleaseCommitComment>
        <tagNameFormat>apache-@{project.artifactId}-@{project.version}-incubating</tagNameFormat>
        <tagNameFormat>v${project.version}</tagNameFormat>
    </configuration>
</plugin>
```

> It seems that these properties must be updated manually.

### Warning regarding "illegal reflective access operation"
```
[ERROR] WARNING: An illegal reflective access operation has occurred
[ERROR] WARNING: Illegal reflective access by org.codehaus.groovy.reflection.CachedClass (file:/Users/mkaempf/.m2/repository/org/codehaus/groovy/groovy-all/2.4.9/groovy-all-2.4.9.jar) to method java.lang.Object.finalize()
[ERROR] WARNING: Please consider reporting this to the maintainers of org.codehaus.groovy.reflection.CachedClass
[ERROR] WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
[ERROR] WARNING: All illegal access operations will be denied in a future release
```
> __This is still an OPEN ISSUE !__

### RAT Check fails
```
[INFO] [ERROR] Failed to execute goal org.apache.rat:apache-rat-plugin:0.13:check (license-check) on project wayang: Too many files with unapproved license: 1 See RAT report in: /Users/mkaempf/GITHUB.private/incubator-wayang/target/rat.txt -> [Help 1]
```

```cat /Users/mkaempf/GITHUB.private/incubator-wayang/target/rat.txt

*****************************************************

Printing headers for text files without a valid license header...
 
=====================================================
== File: .java-version
=====================================================
11.0
```
> _FIXED by adding .java-versions to .gitignore_

### Tag could not be created in SCM.

```
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-release-plugin:3.0.1:prepare (default-cli) on project wayang: Unable to tag SCM
[ERROR] Provider message:
[ERROR] The git-tag command failed.
[ERROR] Command output:
[ERROR] fatal: tag 'wayang-0.7.1' already exists
```

> FIXED by manual changes in pom.xml.

```xml

<scm>
<connection>scm:git:https://gitbox.apache.org/repos/asf/incubator-wayang.git</connection>
<developerConnection>scm:git:https://gitbox.apache.org/repos/asf/incubator-wayang.git</developerConnection>
<url>https://github.com/apache/incubator-wayang</url>
<tag>1.0.0-RC2-SNAPSHOT</tag>
</scm>
```

```xml
<configuration>
<autoVersionSubmodules>true</autoVersionSubmodules>
<autoResolveSnapshots>all</autoResolveSnapshots>
<releaseProfiles>apache-release</releaseProfiles>
<!--<pushChanges>false</pushChanges>-->
<!--<dryRun>true</dryRun>-->
<releaseVersion>1.0.0-RC2-SNAPSHOT</releaseVersion>
<updateWorkingCopyVersions>true</updateWorkingCopyVersions>
<updateDependencies>true</updateDependencies>
<tag>1.0.0-RC2-SNAPSHOT</tag>
<scmReleaseCommitComment>@{prefix} prepare release 1.0.0-RC2-SNAPSHOT</scmReleaseCommitComment>
<tagNameFormat>apache-@{project.artifactId}-@{project.version}-incubating</tagNameFormat>
<tagNameFormat>v${project.version}</tagNameFormat>
</configuration>
```



```
mvn release:prepare -Darguments='-DskipTests=True -Dresume=True'
```

```
mvn clean package

mvn release:perform -X -DskipTests

- you need your password for the keystore to sign the build artefacts.
```

> So far so good. But now the sun went down.

```
[INFO] [ERROR] Failed to execute goal org.apache.maven.plugins:maven-deploy-plugin:3.0.0-M1:deploy (default-deploy) on project wayang: ArtifactDeployerException: Failed to deploy artifacts: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): NullPointerException -> [Help 1]
[INFO] org.apache.maven.lifecycle.LifecycleExecutionException: Failed to execute goal org.apache.maven.plugins:maven-deploy-plugin:3.0.0-M1:deploy (default-deploy) on project wayang: ArtifactDeployerException
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:333)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] Caused by: org.apache.maven.plugin.MojoExecutionException: ArtifactDeployerException
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.deployProject (DeployMojo.java:201)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.execute (DeployMojo.java:159)
[INFO]     at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] Caused by: org.apache.maven.shared.transfer.artifact.deploy.ArtifactDeployerException: Failed to deploy artifacts: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): NullPointerException
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.Maven31ArtifactDeployer.deploy (Maven31ArtifactDeployer.java:126)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.DefaultArtifactDeployer.deploy (DefaultArtifactDeployer.java:79)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:190)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:134)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.deployProject (DeployMojo.java:193)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.execute (DeployMojo.java:159)
[INFO]     at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] Caused by: org.eclipse.aether.deployment.DeploymentException: Failed to deploy artifacts: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): NullPointerException
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:278)
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:202)
[INFO]     at org.eclipse.aether.internal.impl.DefaultRepositorySystem.deploy (DefaultRepositorySystem.java:393)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.Maven31ArtifactDeployer.deploy (Maven31ArtifactDeployer.java:122)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.DefaultArtifactDeployer.deploy (DefaultArtifactDeployer.java:79)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:190)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:134)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.deployProject (DeployMojo.java:193)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.execute (DeployMojo.java:159)
[INFO]     at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] Caused by: org.eclipse.aether.transfer.ArtifactTransferException: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): NullPointerException
[INFO]     at org.eclipse.aether.connector.basic.ArtifactTransportListener.transferFailed (ArtifactTransportListener.java:44)
[INFO]     at org.eclipse.aether.connector.basic.BasicRepositoryConnector$TaskRunner.run (BasicRepositoryConnector.java:417)
[INFO]     at org.eclipse.aether.connector.basic.BasicRepositoryConnector.put (BasicRepositoryConnector.java:297)
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:271)
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:202)
[INFO]     at org.eclipse.aether.internal.impl.DefaultRepositorySystem.deploy (DefaultRepositorySystem.java:393)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.Maven31ArtifactDeployer.deploy (Maven31ArtifactDeployer.java:122)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.DefaultArtifactDeployer.deploy (DefaultArtifactDeployer.java:79)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:190)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:134)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.deployProject (DeployMojo.java:193)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.execute (DeployMojo.java:159)
[INFO]     at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] Caused by: java.lang.NullPointerException
[INFO]     at java.util.concurrent.ConcurrentHashMap.putVal (ConcurrentHashMap.java:1011)
[INFO]     at java.util.concurrent.ConcurrentHashMap.put (ConcurrentHashMap.java:1006)
[INFO]     at org.apache.http.impl.client.BasicCredentialsProvider.setCredentials (BasicCredentialsProvider.java:62)
[INFO]     at org.eclipse.aether.transport.http.DeferredCredentialsProvider.getCredentials (DeferredCredentialsProvider.java:67)
[INFO]     at org.apache.http.client.protocol.RequestAuthCache.doPreemptiveAuth (RequestAuthCache.java:135)
[INFO]     at org.apache.http.client.protocol.RequestAuthCache.process (RequestAuthCache.java:110)
[INFO]     at org.apache.http.protocol.ImmutableHttpProcessor.process (ImmutableHttpProcessor.java:133)
[INFO]     at org.apache.http.impl.execchain.ProtocolExec.execute (ProtocolExec.java:184)
[INFO]     at org.apache.http.impl.execchain.RetryExec.execute (RetryExec.java:89)
[INFO]     at org.apache.http.impl.execchain.ServiceUnavailableRetryExec.execute (ServiceUnavailableRetryExec.java:85)
[INFO]     at org.apache.http.impl.execchain.RedirectExec.execute (RedirectExec.java:110)
[INFO]     at org.apache.http.impl.client.InternalHttpClient.doExecute (InternalHttpClient.java:185)
[INFO]     at org.apache.http.impl.client.CloseableHttpClient.execute (CloseableHttpClient.java:72)
[INFO]     at org.eclipse.aether.transport.http.HttpTransporter.execute (HttpTransporter.java:485)
[INFO]     at org.eclipse.aether.transport.http.HttpTransporter.implPut (HttpTransporter.java:469)
[INFO]     at org.eclipse.aether.spi.connector.transport.AbstractTransporter.put (AbstractTransporter.java:107)
[INFO]     at org.eclipse.aether.connector.basic.BasicRepositoryConnector$PutTaskRunner.runTask (BasicRepositoryConnector.java:564)
[INFO]     at org.eclipse.aether.connector.basic.BasicRepositoryConnector$TaskRunner.run (BasicRepositoryConnector.java:414)
[INFO]     at org.eclipse.aether.connector.basic.BasicRepositoryConnector.put (BasicRepositoryConnector.java:297)
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:271)
[INFO]     at org.eclipse.aether.internal.impl.DefaultDeployer.deploy (DefaultDeployer.java:202)
[INFO]     at org.eclipse.aether.internal.impl.DefaultRepositorySystem.deploy (DefaultRepositorySystem.java:393)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.Maven31ArtifactDeployer.deploy (Maven31ArtifactDeployer.java:122)
[INFO]     at org.apache.maven.shared.transfer.artifact.deploy.internal.DefaultArtifactDeployer.deploy (DefaultArtifactDeployer.java:79)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:190)
[INFO]     at org.apache.maven.shared.transfer.project.deploy.internal.DefaultProjectDeployer.deploy (DefaultProjectDeployer.java:134)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.deployProject (DeployMojo.java:193)
[INFO]     at org.apache.maven.plugins.deploy.DeployMojo.execute (DeployMojo.java:159)
[INFO]     at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
[INFO]     at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
[INFO]     at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
[INFO]     at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
[INFO]     at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
[INFO]     at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
[INFO]     at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
[INFO]     at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
[INFO]     at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
[INFO]     at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
[INFO]     at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
[INFO]     at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
[INFO]     at java.lang.reflect.Method.invoke (Method.java:566)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
[INFO]     at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[INFO] [ERROR]
[INFO] [ERROR]
[INFO] [ERROR] For more information about the errors and possible solutions, please read the following articles:
[INFO] [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
[INFO] [DEBUG] Shutting down adapter factory; available factories [file-lock, rwlock-local, semaphore-local, noop]; available name mappers [discriminating, file-gav, file-hgav, file-static, gav, static]
[INFO] [DEBUG] Shutting down 'file-lock' factory
[INFO] [DEBUG] Shutting down 'rwlock-local' factory
[INFO] [DEBUG] Shutting down 'semaphore-local' factory
[INFO] [DEBUG] Shutting down 'noop' factory
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for Apache Wayang (incubating) 1.0.0-RC3-SNAPSHOT:
[INFO]
[INFO] Apache Wayang (incubating) ......................... FAILURE [ 23.626 s]
[INFO] Wayang Commons ..................................... SKIPPED
[INFO] wayang-utils-profile-db ............................ SKIPPED
[INFO] Wayang Core ........................................ SKIPPED
[INFO] Wayang Basic ....................................... SKIPPED
[INFO] Wayang Platform .................................... SKIPPED
[INFO] Wayang Platform Java ............................... SKIPPED
[INFO] Wayang Platform Spark .............................. SKIPPED
[INFO] Wayang Platform JDBC Template ...................... SKIPPED
[INFO] Wayang Platform Postgres ........................... SKIPPED
[INFO] Wayang Platform SQLite3 ............................ SKIPPED
[INFO] Wayang Platform Giraph ............................. SKIPPED
[INFO] Wayang Platform Apache Flink ....................... SKIPPED
[INFO] Wayang Platform Generic Jdbc ....................... SKIPPED
[INFO] Wayang API ......................................... SKIPPED
[INFO] Wayang API Scala-Java .............................. SKIPPED
[INFO] Wayang Integration Test ............................ SKIPPED
[INFO] Wayang API Python .................................. SKIPPED
[INFO] wayang-api-sql ..................................... SKIPPED
[INFO] Wayang Profiler .................................... SKIPPED
[INFO] Wayang Extensions .................................. SKIPPED
[INFO] wayang-iejoin ...................................... SKIPPED
[INFO] Wayang - Common resources .......................... SKIPPED
[INFO] wayang-benchmark ................................... SKIPPED
[INFO] Wayang ML4all ...................................... SKIPPED
[INFO] Wayang Project Assembly ............................ SKIPPED
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  24.093 s
[INFO] Finished at: 2024-06-25T10:53:32+02:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-release-plugin:3.0.1:perform (default-cli) on project wayang: Maven execution failed, exit code: 1 -> [Help 1]
org.apache.maven.lifecycle.LifecycleExecutionException: Failed to execute goal org.apache.maven.plugins:maven-release-plugin:3.0.1:perform (default-cli) on project wayang: Maven execution failed, exit code: 1
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:333)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke (Method.java:566)
at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
Caused by: org.apache.maven.plugin.MojoExecutionException: Maven execution failed, exit code: 1
at org.apache.maven.plugins.release.PerformReleaseMojo.execute (PerformReleaseMojo.java:198)
at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke (Method.java:566)
at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
Caused by: org.apache.maven.shared.release.ReleaseExecutionException: Maven execution failed, exit code: 1
at org.apache.maven.shared.release.phase.AbstractRunGoalsPhase.execute (AbstractRunGoalsPhase.java:115)
at org.apache.maven.shared.release.phase.RunPerformGoalsPhase.runLogic (RunPerformGoalsPhase.java:127)
at org.apache.maven.shared.release.phase.RunPerformGoalsPhase.execute (RunPerformGoalsPhase.java:59)
at org.apache.maven.shared.release.DefaultReleaseManager.perform (DefaultReleaseManager.java:325)
at org.apache.maven.shared.release.DefaultReleaseManager.perform (DefaultReleaseManager.java:268)
at org.apache.maven.plugins.release.PerformReleaseMojo.execute (PerformReleaseMojo.java:196)
at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke (Method.java:566)
at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
Caused by: org.apache.maven.shared.release.exec.MavenExecutorException: Maven execution failed, exit code: 1
at org.apache.maven.shared.release.exec.InvokerMavenExecutor.executeGoals (InvokerMavenExecutor.java:129)
at org.apache.maven.shared.release.exec.AbstractMavenExecutor.executeGoals (AbstractMavenExecutor.java:70)
at org.apache.maven.shared.release.phase.AbstractRunGoalsPhase.execute (AbstractRunGoalsPhase.java:105)
at org.apache.maven.shared.release.phase.RunPerformGoalsPhase.runLogic (RunPerformGoalsPhase.java:127)
at org.apache.maven.shared.release.phase.RunPerformGoalsPhase.execute (RunPerformGoalsPhase.java:59)
at org.apache.maven.shared.release.DefaultReleaseManager.perform (DefaultReleaseManager.java:325)
at org.apache.maven.shared.release.DefaultReleaseManager.perform (DefaultReleaseManager.java:268)
at org.apache.maven.plugins.release.PerformReleaseMojo.execute (PerformReleaseMojo.java:196)
at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:126)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute2 (MojoExecutor.java:328)
at org.apache.maven.lifecycle.internal.MojoExecutor.doExecute (MojoExecutor.java:316)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:212)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:174)
at org.apache.maven.lifecycle.internal.MojoExecutor.access$000 (MojoExecutor.java:75)
at org.apache.maven.lifecycle.internal.MojoExecutor$1.run (MojoExecutor.java:162)
at org.apache.maven.plugin.DefaultMojosExecutionStrategy.execute (DefaultMojosExecutionStrategy.java:39)
at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:159)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:105)
at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:73)
at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:53)
at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:118)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:261)
at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:173)
at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:101)
at org.apache.maven.cli.MavenCli.execute (MavenCli.java:906)
at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:283)
at org.apache.maven.cli.MavenCli.main (MavenCli.java:206)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke (Method.java:566)
at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:283)
at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:226)
at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:407)
at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:348)
[ERROR]
[ERROR]
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
[DEBUG] Shutting down adapter factory; available factories [file-lock, rwlock-local, semaphore-local, noop]; available name mappers [discriminating, file-gav, file-hgav, file-static, gav, static]
[DEBUG] Shutting down 'file-lock' factory
[DEBUG] Shutting down 'rwlock-local' factory
[DEBUG] Shutting down 'semaphore-local' factory
[DEBUG] Shutting down 'noop' factory
```

The null pointer exception indicates problems in _settings.xml_. This could be fixed.
But now, the error changes with and I am still not able to stage the build results.

```
mvn release:perform -X -DskipTests
```
```
[INFO] Caused by: org.eclipse.aether.deployment.DeploymentException: Failed to deploy artifacts: Could not transfer artifact org.apache.wayang:wayang:pom:1.0.0-RC2 from/to apache.releases.https (https://repository.apache.org/service/local/staging/deploy/maven2): status code: 401, reason phrase: Unauthorized (401)
```


## Checklist for next iteration:

The error you're encountering indicates that there is a problem with deploying the artifacts using the `maven-deploy-plugin`. The root cause of the error is a `NullPointerException` during the deployment process, specifically related to the `org.eclipse.aether.transfer.ArtifactTransferException`.

Here's a step-by-step guide to troubleshoot and resolve this issue:

### 1. Check Maven Settings

Ensure that your Maven settings (`settings.xml`) are correctly configured for deployment. Verify that the repository settings and credentials are correctly specified.

__[DONE]__

### 2. Verify Repository URL

Make sure the repository URL in your `pom.xml` or `settings.xml` is correct and reachable. The URL should point to the correct staging repository for deployment.

_[OPEN]_ - I did not touch it, so I guess it is correct in the _pom.xml_.

### 3. Maven Version Compatibility

Verify that you are using a compatible version of Maven. Sometimes, upgrading or downgrading Maven can resolve such issues.

``` 
Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
Maven home: /usr/local/Cellar/maven/3.9.6/libexec
Java version: 11.0.15.1, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk-11.0.15.1.jdk/Contents/Home
Default locale: en_DE, platform encoding: US-ASCII
OS name: "mac os x", version: "13.2.1", arch: "x86_64", family: "mac"
```
__[DONE]__

### 4. Check for Network Issues

Ensure there are no network issues that might be causing problems in connecting to the repository. Sometimes, network configurations, firewalls, or proxy settings can interfere with the deployment process.

__[DONE]__

### 5. Update Maven Plugins

Ensure that you are using the latest versions of the Maven plugins. Sometimes, bugs in older versions can cause unexpected issues.

_[OPEN]_

### 6. Configure the `maven-deploy-plugin` in `pom.xml`

Make sure the `maven-deploy-plugin` is correctly configured in your `pom.xml`. Here's an example configuration:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-deploy-plugin</artifactId>
    <version>3.0.0-M1</version>
    <configuration>
        <repositoryId>apache.releases.https</repositoryId>
        <url>https://repository.apache.org/service/local/staging/deploy/maven2</url>
    </configuration>
</plugin>
```

### 7. Increase Verbose Logging

Enable verbose logging to get more details about the error. You can do this by adding the `-X` flag when running the Maven command:

```sh
mvn clean deploy -X
```
__[DONE]__

### 8. Retry with a Clean Local Repository

Sometimes, a corrupt local repository can cause issues. Try cleaning your local Maven repository and re-running the deployment:

```sh
mvn clean install -U
mvn deploy
```

_[OPEN]_ - Does not match to an authentication issue.

### 9. Check for Missing Credentials

Ensure that the credentials for the repository are correctly set up in your `settings.xml`:

```xml
<servers>
    <server>
        <id>apache.releases.https</id>
        <username>your-username</username>
        <password>your-password</password>
    </server>
</servers>
```

__[DONE]__

### 10. Review the Full Stack Trace

The full stack trace indicates a `NullPointerException`:

```plaintext
Caused by: java.lang.NullPointerException
    at java.util.concurrent.ConcurrentHashMap.putVal (ConcurrentHashMap.java:1011)
    at java.util.concurrent.ConcurrentHashMap.put (ConcurrentHashMap.java:1006)
    at org.apache.http.impl.client.BasicCredentialsProvider.setCredentials (BasicCredentialsProvider.java:62)
    at org.eclipse.aether.transport.http.DeferredCredentialsProvider.getCredentials (DeferredCredentialsProvider.java:67)
    at org.apache.http.client.protocol.RequestAuthCache.doPreemptiveAuth (RequestAuthCache.java:135)
    at org.apache.http.client.protocol.RequestAuthCache.process (RequestAuthCache.java:110)
    at org.apache.http.protocol.ImmutableHttpProcessor.process (ImmutableHttpProcessor.java:133)
    at org.apache.http.impl.execchain.ProtocolExec.execute (ProtocolExec.java:184)
    ...
```

This suggests that there might be an issue with how credentials are being handled. Double-check that the credentials are being correctly passed and processed.

__[DONE]__

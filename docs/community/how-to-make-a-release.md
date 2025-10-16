---
title: How to make a release
sidebar_position: 6
id: release
---

This guide documents the steps to be followed when making a release. 

**Disclaimer**: Steps were taken mostly from [here](https://plc4x.apache.org/plc4x/latest/developers/release/release.html) and thus sentences may have been copied.

**Convention**: The repository should be in a snapshot version of the next release. For instance, 1.0.1-SNAPSHOT means that the next release number should be 1.0.1.

The process in general is as follows. The release manager creates the right artifacts (source files) using maven commands. This forms a release candidate. Then the release candidate, which should be uploaded in the "development directory" of the apache svn server, goes for voting first in the PPMC and then in the general incubator list. Once accepted by the latter, the release can actually happen, where the artifacts are uploaded to the "release directory" of the apache svn server and populated in the maven repository. In the following, let's assume we are releasing version 1.0.0 and release candidate rc5.

**If any Maven step should fail**:
Please note that `mvn:release` commands eagerly commit directly to your working branch, if your command fails you may have to revert the last commit.

1. Clone the repo or pull latest changes:
``git pull`` 

2. Create release branch:
- (This step is only neccessary if you don't have write access to main branch)
   ``git checkout -b release-prep`` 
- ``mvn release:branch -DbranchName=rel/1.0.0-rc5``


3. Switch to branch:
``git checkout rel/1.0.0-rc5``

4. Set upstream of branch:
``git push -u <remote_name> <branch_name>``

5. Update RELEASE_NOTES and check NOTICE to have the correct year

6. Check if everything is working: 
    ``mvn clean install``


7. Check if there are no SNAPSHOT references: ``find . -type f -name 'pom.xml' -exec grep -l "SNAPSHOT" {} \;``

8. Run ``mvn release:clean``

9. Modify the tag in the root pom.xml file to contain the right version with the rc number:
`` <tag>v1.0.0-rc5</tag>`` (2 places in the file)

Now depending if it's the first time you do a release continue with the following steps, otherwise jump to step **16**.
The following steps ensure you can sign the release with your Apache credentials.

### First time release
=============================================

10. Add your Apache credentials in ~.m2/settings.xml

If you don’t have this directory or file, you should create a .m2 directory in your user home and inside that create a settings.xml file with at least this content:

```javascript
<?xml version="1.0" encoding="UTF-8"?>
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd" xmlns="http://maven.apache.org/SETTINGS/1.1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <servers>
    <!-- Apache Repo Settings -->
    <server>
        <id>apache.snapshots.https</id>
        <username>{user-id}</username>
        <password>{user-pass}</password>
    </server>
    <server>
        <id>apache.releases.https</id>
        <username>{user-id}</username>
        <password>{user-pass}</password>
    </server>
  </servers>
</settings>
```

The following is about key management. Details are described [here](https://pulsar.apache.org/contribute/create-gpg-keys/)

11. You need to generate a key with GnuPG
- Install GnuPG (e.g., ``brew install gnupg``)
- Run: ``gpg --full-generate-key``
- Export the public key: gpg --export --armor mygpgpublickey 

12. Install pinentry (e.g., brew install pinentry-mac) so that you can be promted to enter your credentials via command line

13. Configuration

    A. Make Apache the default key:
    ``APACHEID=your_asf_id``

    ``KEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: '{print $5}')``

    ``echo "default-key $KEY_ID" >> ~/.gnupg/gpg.conf``

    B. ``export GPG_TTY=$(tty)``

        ``echo $GPG_TTY``

    C. Configure gnupg to use standard DNS resolution

    ```
    # resolves common "gpg: keyserver receive failed: Network is unreachable" and
    # "gpg: keyserver receive failed: No keyserver available" errors
    echo "standard-resolver" >  ~/.gnupg/dirmngr.conf
    sudo pkill dirmngr
    ```

    D. Set configuration to use SHA512 keys by default:
    ```
    cat <<EOL >> ~/.gnupg/gpg.conf
    personal-digest-preferences SHA512
    cert-digest-algo SHA512
    default-preference-list SHA512 SHA384 SHA256 SHA224 AES256 AES192 AES CAST5 ZLIB BZIP2 ZIP Uncompressed
    EOL
    ```

14. Upload the key to one of the key servers

    ``gpg --keyserver keyserver.ubuntu.com --send-key $KEY_ID``

    ``gpg --keyserver keys.openpgp.org --send-key $KEY_ID``

    ``gpg --keyserver pgp.mit.edu --send-key $KEY_ID``

15. Make sure your public key is appended in the KEYS file found in the release server [here](https://dist.apache.org/repos/dist/release/incubator/wayang/)

=============================================

16. Run ``mvn release:prepare`` (you can skip tests with -Darguments='-DskipTests=True, if you have done this before)

17. Run ``mvn clean release:perform`` (This step will ask for your apache credentials, if everything related to the keys is configured properly.)

18. Go to: https://repository.apache.org, login, go to Staging Repositories and find the `orgapachewayang-{somenumber}` and close it with description "Apache Wayang (incubating) 1.0.0-rc5"

19. Make a directory structure as described below and copy the corresponding source files from the directory target/checkout/target. The structure should be:
```
./KEYS
./1.0.0/
./1.0.0/rc5
./1.0.0/rc5/README
./1.0.0/rc5/RELEASE_NOTES
./1.0.0/rc5/apache-wayang-incubating-1.0.0-source-release.zip
./1.0.0/rc5/apache-wayang-incubating-1.0.0-source-release.zip.asc
./1.0.0/rc5/apache-wayang-incubating-1.0.0-source-release.zip.sha12
```

Make sure the KEYS file contains your public key. The KEYS file can be found in [https://dist.apache.org/repos/dist/release/incubator/wayang/](https://dist.apache.org/repos/dist/release/incubator/wayang/)

20. ``cd 1.0.0``

    ``svn import rc5 https://dist.apache.org/repos/dist/dev/incubator/wayang/1.0.0/rc5 -m "Staging of rc5 of Wayang 1.0.0"``

21. Send the voting email to the dev list.

22. If the voting passes, send the voting email to the general list.

23. Once the voting in the general list passes, the staged artifacts can be released. This is done by moving them inside the Apache SVN:

    ``svn move -m "Release of Apache Wayang (incubating) 1.0.0" https://dist.apache.org/repos/dist/dev/incubator/wayang/1.0.0/rc5 https://dist.apache.org/repos/dist/release/incubator/wayang/1.0.0``

24. Then release the maven artifacts: In order to do this, the release manager logs into Nexus at https://repository.apache.org/, selects the staging repository and clicks on the Release button.

25. Bring all changes of the release branch to the main.

26. You can also remove 1.0.0 from the dev directory of the svn now that the release is out.

27. Create and upload the javadocs:\
    Go to the source code directory and run ``mvn compile javadoc:javadoc javadoc:aggregate``\
    The javadocs can then be found in the ``target`` directory\
    Upload the javadocs in the website: https://github.com/apache/incubator-wayang-website/tree/main/static/docs/api/javadocs

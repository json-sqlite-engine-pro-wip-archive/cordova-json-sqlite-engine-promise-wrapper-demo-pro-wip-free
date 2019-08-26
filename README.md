# Cordova json sqlite memory engine testapp PRO WIP free

XXX TBD XXX XXX

**AUTHOR:** [@brodybits (Christopher J. Brody aka Chris Brody)](https://github.com/brodybits)

**LICENSE:** GPL v3 or commercial

**IMPORTANT:** Whitelist and intent items are omitted from this test app.

## Dependencies

- Bootstrap (3.3.7) - included (MIT license)
- JQuery (3.3.1) - included (MIT license)
- `cordova-plugin-dialogs` - now specified in `package.json`
- `cordova-json-sqlite-memory-engine-pro-wip-free` - installed from: <https://gitlab.showgit.com/brodysoft/cordova-json-sqlite-memory-engine-pro-wip-free>

IMPORTANT NOTE: `cordova-plugin-dialogs` was added using the `--save` flag to ensure that this plugin would be tracked in `config.xml` for automatic installation. It is recommended to use the `--save` flag on Cordova pre-7.0 to track any other plugins added in `config.xml` (this is automatic starting with Cordova `7.0`). It is NOT recommended to commit `plugins` or `platforms` directories to git or any other form of source code control.

Additional note: `cordova-plugin-dialogs` does not currently support macOS ("osx"). As a workaround this project automatically uses `window.alert` if necessary.

## To add another plugin

```shell
cordova plugin add my-plugin-id --save
```

## How to run

* Add the desired platform(s), for example:

```shell
cordova platform add android
```

* Do `cordova prepare` (seems to be needed for "osx" (macOS) platform at this time):

```shell
cordova prepare
```

* Run it on your mobile emulator or device, for example:

```shell
cordova run android
```

## Functionality

- Upon startup: open a database and CREATE the test table
- Alert dialog test (native alert if possible)
- Location reload
- String test 1
- String test 2 (string as a SQL parameter)
- Show record count
- Add record
- Delete all records
- Follow link to page 2
- Change window.location to page 2

## Multi-page test

It is possible to switch between two pages using "follow link" buttons. The main page also has a button to go to page 2 by changing `window.location`. There is also a button on both pages to try `location.reload()`.

The sqlite plugin should continue to work after the user changes to another page or triggers `location.reload()`.

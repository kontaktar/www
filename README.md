Install packages

`yarn install`

Start development mode

`yarn dev`

Start development with emulator

Use the Firebase emulator, set `FIREBASE_EMULATOR=1` in `.env.local`
`yarn emulator` && `yarn dev`

Start storybook for component development

`yarn storybook`

Create a new component from a template\*

`yarn create`

\*You'll be promted to enter a name for the component, it'll then be intialized
in src/compontents/{componentName} with addional templates for tests and
storybook.

## Setup

- React
- Next.js
- Storybook
- Scss modules
- Jest & Enzyme
- Eslint & Prettier

### Storybook.

Note: Storybook is outdated an has not been updated in a while.

For the Jest intergration to work, a jest test has to be run to generate
`.jest-test-results.json`.

For propTables to be rendered in the README.md (only visible in Storybook), it
has to include `<!-- PROPS -->`

Accessing storybook on feature branch:
https://kontaktar-einar.kontaktar.now.sh/storybook/index.html

## Using the Next.js API Routes

See `src/pages/api/`, Next.js now offers folder based API routes. Use [ ] for
dynamic variables like `../api/user/[id].js` Visit
`http:localhost:3000/api/user/1` get the response.

## Database

Test instance running on AWS RDS:
`psql --host=kontaktardb.crpycooyf4pt.eu-west-2.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=kontaktar -U admin`

Prevent string injections. Never user ES6 literals for database queries.

## Auth

Mixture of firebase and iron-session.
Bypass firebase on localhost by setting `BYPASS_FIREBASE=1` in `.env.local`

### Firebase authentication emulator

Setup: https://firebase.google.com/docs/cli#sign-in-test-cli

Use the Firebase emulator, set `FIREBASE_EMULATOR=1` in `.env.local`
Start: `yarn emulator`

## API

### GET:

`/api/experiences`

`/api/search`

All published cards

`/api/search/[params]`

Finds cards by user_name, first_name, last_name, experience title, description
and published.

`/api/users`

`/api/users/[userId]`

`/api/users/[userId]/experiences`

`/api/users/[userId]/experiences/[experienceId]`

### POST:

`/api/users`

- body = { ssn, userName, firstName, lastName, email, website?, phoneNumber? ,
  postalCode?, streetName?, city?, country? }

`/api/users/[userId]/experiences`

- body = { title?, description?, years?, months?, published? }

### DELETE:

`/api/users/[userId]`

`/api/users/[userId]/experiences/[experienceId]`

### PUT:

`/api/users/[userId]`

- body = { ssn?, userName?, firstName?, lastName?, email?, website?,
  phoneNumber? , postalCode?, streetName?, city?, country? }

`/api/users/[userId]/experiences/[experienceId]`

- body = { title?, description?, years?, months?, published? }

### Store

- Sagas for side effects (i.e. API requests)

  An API request will have 3 actions: REQUEST, SUCCESS and FAILURE all with a
  seperated action type:

```
  { type: 'FETCH_USERS_REQUEST' }
  { type: 'FETCH_USERS_FAILURE', error: 'Failed' }
  { type: 'FETCH_USERS_SUCCESS', response: { ... } }
```

### TODO

Update Storybook to 6.0
I disabled to storybook build for the feature branch `"build": "next build && yarn storybook:build"`
Wasn't able to get it to build properly, next automatcly sets `"jsx": "preserve"` on every build and storybook wouldn't properly build typscript unless with `"jsx": "react"`.
Putting a tsconfig in the `.storybook` folder that extends the root config didn't work eiter.

Zero typescript config and other migrations notes:
https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#zero-config-typescript

# QA

### Logged out

- /
- /leit
- /askrift
- /{userName}
- /innskra
- /nyskra

### Logged in

- /
- /leit
- /{userName}
- /profill

## Auth process documentation

`LoginFormContainer`:

- There is a recaptcha hooked up to Firebase.
  `recaptchaVerifier` is stored in `window`
  `PhoneNumberForm`:
- User enters phonenumber
- User enters verification code they got from their phone.
- `window.recaptchaVerifier` used to `firebase.auth().signInWithPhoneNumber` then
  `confirmationResult` is added to `window`

  `VerificationCodeForm`:

- Phonenumber is checked in Firebase Authentication database.
- If phonenumber exists:
  [GO TO LOGIN](#login)
- Else:
- `CreateUser` endpoint called
- `mutateUser` for useSwr with instant revalidation.
- route pushed to REGISTER:`/nyskra`

### REGISTER

`onAuthStateChanged`:

- If errors: send to `/innskra`

`onSubmit`:

- Call `useAuth:register`, which calls `EditUser` endpoint.
- Push to `/profill`

### LOGIN

- Fetch `userData` from db with `GetUserByPhoneNumber`
- use `userData` to call `login` endpoint called with firebase token Authorization header
- `iron-session` set.
  - `updateAuthState` with `isLoggedIn` flag and `userData` object.
- endpoint adds to `iron-session` info about the user + db set.
- route pushed to `profile`

### LOGOUT

Destroy iron-session and firebase session.


# VARIOUS TODO:

-[] Create cleanup function that cleans up window stuff after succesful login / register


ACCESS CONTROL ON ENDPOINTS.

create cypress test for every endpoint,

all-usernames called multiple times

fix button loading state, onhover

fix carousel on in smaller screensizes.

Create cleanup function that cleans up window stuff after succesful login / register

dont need to save user info if nothing was changed, api being called for no chanegs

---

What happens if the firebase session stops and session storage userSession is still ongoing?
What happens if the user reacesh the register screen - clears the session storage and then refreshes and try again.

# Nice to have:

https://github.com/jellydn/next-swagger-doc

Make baseUrl dynamic for Cypress so I can run it with a "production" build - the test outcomes are to unstable with hotreload on. Random failures.

## Cypress tests to add:

User deletes himself.
User registers, logsout, logs in again.
Admin edits user.
Admin deletes users.

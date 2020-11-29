Install packages

`yarn install`

Start development mode

`yarn dev`

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
- /search
- /subscribe
- /user/{userName}
- /login
- /register

### Logged in

- /
- /search
- /user/{userName}
- /profile

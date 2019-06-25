# GIPHY

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configuration

### GIPHY_API_KEY

Before staring the app, you need to copy file `.env` into the `.env.local`, and assign GIPHY API key to the `REACT_APP_GIPHY_API_KEY` variable:

```bash
REACT_APP_GIPHY_API_KEY=<api_key>
```

## Usage

### Installing dependencies

```sh
yarn
```

### Staring the app

```sh
yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running tests and types checks

```sh
yarn test
```
Launches the test runner in the interactive watch mode.

```sh
yarn types
```

Launches TypeScript complier in dry run mode.


## Design considiration

The app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript). It has a pure [React](https://reactjs.org/docs/getting-started.html) application structure with [Hooks](https://reactjs.org/docs/hooks-intro.html) and [CSS Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet). For unit tests, it uses [Jest](https://jestjs.io) and [Enzyme](https://airbnb.io/enzyme/). For better code quality, it follows [Prettier](https://prettier.io) best practices.

## Room for improvement

### State management

For simple case of this app, there are no real value of adding popular state management libraries, such as [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/). However, in real life production application, adopting one of the popular state management tools will help handle increasing complexity, while keeping app structure clean and understandable.

### CSS preprocessors

Modern CSS, CSS Modules and [PostCSS](https://postcss.org/) library make using CSS preprocessors (such as [Sass](https://sass-lang.com/)) less attractive. The preprocessor's real value of handling lists of shared styles (such as brand colors), or handling complex responsive desing, lies beyond the scope of this project.

### Unit testing

More time should be invested in better test quality and test covarage. One of the next steps might be adopting [React Testing Library](https://testing-library.com/) for better and easier testing of React components and Hooks.

### Caching

One of the important sides of web application not covered in this project is caching and traffic optimisation. There are multiple paths to take to make user experience better. One of them — fetching next batches of images for infinite scroll in the background process of service worker. Another — store popular queries and pre-load expected images on the initial screen.

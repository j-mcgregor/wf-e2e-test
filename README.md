# Wiserfunding Platform Build

## Get Started

1. Install dependencies

```
yarn
```

2. Get dev site up and running locally

```
yarn dev
```

## Testing, workflow and CI/CD

Testing is done using the Jest framework and React Testing Library

There are several scripts and pre-scripts:

```bash
# basic test script
"test": "jest --silent --runInBand --watchAll=false",
# run in watch mode to save manually restarting tests
"test:watch": "jest --runInBand --watchAll",
# single run with coverage
"test:coverage": "yarn jest --coverage ",
# use this when committing instead of git commit -m '' - it enforces solid git commit messages making it easier to see past work
"commit-cli": "git-cz"
```

Husky is also implemented to run linting before committing and testing before pushing

# Testing outline documentation

### The tools

- [Jest](https://jestjs.io) - Powerful javascript testing framework developed by Facebook, and can be configured to provide total test coverage
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (RTL) - A bunch of plugins and tools to make testing React components painless and fun. It is a blend of unit testing & end-to-end testing

    > The more your tests resemble the way your software is used, the more confidence they can give you.

- [Cypress](https://www.cypress.io/)(advanced) - End-to-End testing that mimics the user journey in a more complete way than RTL, and has cross-browser support

### Pipelines

- Testing and pipelines go hand in hand. Depending on the project, the two best options in my experience are:
  - [Jenkins](https://www.jenkins.io/) - best for enterprise level software with a team behind it, since Jenkins is a powerful, but very complex, tool. Open Source and free
  - [CircleCI](https://circleci.com/pricing/) - free for public projects, easy to set up and intergrate, scaling options available.

Both of these options allow the developer to set up a pipeline to include stages like `build`, `test`, `deploy preview` and `deploy` so you can be sure that dodgy or vulnerable code doesn't make it through into production via a single commit

Furthermore, there's a tool called [SonarQube](https://www.sonarqube.org/) which is open-source software designed to catch vulnerabilities in the code itself and conform to best practices. Like Jenkins, you can download the software (Docker, zip etc) or you can opt to use a SAAS like [SonarCloud](https://sonarcloud.io) which uses the underlying technology in a paid, cloud-based service. Its convenient and powerful but can get expensive. 

Either way, the SonarQube technology is fantastic and can be integrated with Jenkins and CircleCI as part of the pipeline (eg `code-quality-check`)

### The setup

Several packages need to be installed and configure (eg `jest`, `testing-library/react`) as well as their declaration files and configuration files (eg `jest.config.js`). This will likely take less than an hour

If you go for the pipeline options then these will take a couple of hours to half a day to correctly set up, intergrate, add permissions etc, but is worth it down the line if your project will be complex.

I would also recommend using [Husky](https://www.npmjs.com/package/husky) as a commit tool, so you can run scripts (build, test etc) before the code is even pushed, potentially saving time

### Scope

When testing React projects there's a few things to consider:

- **Which components / pages are the most complex?**
  - You should always make a component as simple as it needs to be by extracting as much logic as possible to other components and unit test these
- **How do I balance React component testing with unit testing?**
  - It depends on the logic: simple pages and functions can be avoided if time is short, or snapshotted (more on that next). In my opinion, critical business logic should be extracted and thoroughly unit tested with the dumb component just testing that input and output is as expected
- **To snapshot or not to snapshot?**
  - Snapshots are best used for very simple, dumb components (components that don't rely on any internal or application level state changes). You give them X, they render X.
  - They're useful for detecting element attribute changes
- **How do I test pages in NextJS?**
  - The way NextJS is designed, anything in the `pages` folder will be created as a path so any tests for these will need to live in a separate test folder.
  - functions like `getStaticProps` can be mocked before the test is run
- **How much can I rely on Typescript to catch errors?**
  - Types are great way to catch errors but it isn't infalible, especially when dealing with Request-Response code. There will always be edge-cases that escape the tester and proper error handling goes a long way. In my opinion, Typescript is th first line of defense against bugs
- **Do I need to consider responsiveness?**
  - I can't answer this one, but if it's essential then Cypress and basic user testing become more important


### Coverage

100% test coverage is impossible, and tools that tell you it is are lying. However, the best defense is a good offense, so solid, well-documented user testing is essential. Everyone has their own opinion on how to best use software, and those closest to the code have larger blinkers on. Non-technical user testing is just as valuable as Technical tests.

#### **_Pages_**

Tests must live in a separate directory, usually at the root

* *_app* isn't necessary to test
* Pages with `getStaticProps`, `getServerSideProps` etc should be tested
* Dynamic pages should also be thoroughly tested since they can vary greatly depending on the query
* *api* files, especially ones that use various HTTP methods (GET, PUT etc) should be tested with mocks

A complex page like `index.tsx` might take a couple of hours to test since it uses many components

#### **_Hooks_**

Tests preferably in the same file

Hooks should definitely be tested but not necessarily exhaustively, since testing with RTL can check if the hooks are functioning as intended when integrated

Hook tests can be cumbersome to write, maybe an hour or two depending on the hook

#### **_Utils & lib_**

Tests preferably in the same file

Personally, I find great value (and enjoyment) in breaking down complex logic into bitsize chunks and unit testing them. It gives you greater confidence when integration testing, so I would recommend spending more time on these than hooks

The smaller the test, the faster and easier it is to write the test

#### **_Components_**

Tests preferably in the same file next to the component (either in their own subfolder or on the same level. Its personal preference)

The more simple the component, the less need there is to test it, and for simple components, snapshot testing is more than enough

Forms should take the highest priority, then containers, navs and layouts, then things like buttons and error messages. At the bottom, should be SVGs, Icons (which, by the way, [React-Icons](https://react-icons.github.io/react-icons/) might be a good one to look at)

Complex components can take around an hour to test if the pain points are properly identified, stories well written (eg "As a User, when I try to login with an incorrect password I should see an error message"). Snapshot testing, on the other hand, can be written in less than a minute.
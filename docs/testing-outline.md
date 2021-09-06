# Testing outline documentation

### The tools

- [Jest](https://jestjs.io) - Powerful javascript testing framework developed by Facebook, and can be configured to provide total test coverage
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (RTL) - A bunch of plugins and tools to make testing React components painless and fun. It is a blend of unit testing & end-to-end testing

    > The more your tests resemble the way your software is used, the more confidence they can give you.

- [Cypress](https://www.cypress.io/)(advanced) - End-to-End testing that mimics the user journey in a more complete way than RTL, and has cross-browser support. A cypress script can also be configured to test live, production code, not just development.

I would also recommend using [Husky](https://www.npmjs.com/package/husky) as a commit tool, so you can run scripts (build, test etc) before the code is even pushed, potentially saving time.

---

### Pipelines

- Testing and pipelines go hand in hand. Depending on the project, the two best options in my experience are:
  - [Jenkins](https://www.jenkins.io/) - best for enterprise level software with a team behind it, since Jenkins is a powerful, but very complex, tool. Open Source and free. Best in the long term.
  - [CircleCI](https://circleci.com/pricing/) - free for public projects, easy to set up and intergrate, scaling options available. Best in the short term

Both of these options allow the developer to set up a pipeline to include stages like `build`, `test`, `deploy preview` and `deploy` so you can be sure that dodgy or vulnerable code doesn't make it through into production via a single commit

Furthermore, there's a tool called [SonarQube](https://www.sonarqube.org/) which is open-source software designed to catch vulnerabilities in the code itself and encourage / enforce best practices. Like Jenkins, you can download the software (Docker, zip etc) or you can opt to use a SAAS like [SonarCloud](https://sonarcloud.io) which uses the underlying technology in a paid, cloud-based service. Its convenient and powerful but can get expensive depending on usage. Good if you plan on having different devs come in, because then you can be sure of a minimum bar

Either way, the SonarQube technology is fantastic and can be integrated with Jenkins and CircleCI as part of the pipeline (eg `code-quality-check`)

---

### The setup

Several packages need to be installed and configure (eg `jest`, `testing-library/react`, `cypress`) as well as their typings and configuration setup (eg `jest.config.js`). This will likely take less than an hour

If you go for the pipeline options then these will take a couple of hours to half a day to correctly set up, intergrate, add permissions etc, but it's worth it down the line if your project will be complex.

---

### Scope

When testing React projects there's a few things to consider:

- **Which components / pages are the most complex?**
  - You should always make a component as simple as it needs to be by extracting as much logic as possible to other components and unit test these. Components that depend on application level state (eg Redux, Context) are regarded as smart components
- **How do I balance React component testing with unit testing?**
  - It depends on the logic: simple pages and functions can be avoided if time is short, or snapshotted (more on that next). Critical business logic (eg Calculators) should be extracted and thoroughly unit tested outside of the component, with the actual rendering stories (input X, click Y, see Z) done with RTL
- **To snapshot or not to snapshot?**
  - Snapshots are best used for very simple, dumb components (components that don't rely on any internal or application level state changes). You give them X, they render X, otherwise known as Pure functional components
  - They're useful for detecting element attribute changes
- **How do I test pages in NextJS?**
  - The way NextJS is designed, anything in the `pages` folder will be created as a path so any tests for these will need to live in a separate test folder.
  - functions like `getStaticProps` can be mocked before the test is run
- **How much can I rely on Typescript to catch errors?**
  - Types are great way to catch errors but it isn't infalible, especially when dealing with Request-Response code. There will always be edge-cases that escape the tester and proper error handling goes a long way. In my opinion, Typescript is th first line of defense against bugs
- **Do I need to consider responsiveness?**
  - I can't answer this one, but if it's essential then Cypress and basic user testing become more important

---

### Coverage

100% test coverage is impossible, and tools that tell you it is are lying. However, the best defense is a good offense, so solid, well-documented user testing is essential. Everyone has their own opinion on how to best use software, and those closest to the code have larger blinkers on. Non-technical user testing is just as valuable as Technical tests.

Aiming for between 70-80% according to Jest's built-in coverage tool is usually sufficient. Pipeline stages can be rejected if coverage isn't over a certain threshold.

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

Files with simple constants / config / mocks can be ignored when testing. It doesn't add value.

Personally, I find great value (and enjoyment) in breaking down complex logic into bitsize chunks and unit testing them. It gives you greater confidence when integration testing, so I would recommend spending more time on these than hooks, since hooks can be verified when testing the components

The smaller the test, the faster and easier it is to write

`getServerSidePropsWithAuth` and other functions should be tested

#### **_Components_**

Tests should live in the same file next to the component (either in their own subfolder or on the same level. Its a personal preference)

The more simple / dumb the component, the less need there is to test it, and for simple components, snapshot testing is more than enough

Forms should take the highest priority, then containers, navs and layouts, then things like buttons and error messages. At the bottom, should be SVGs, Icons (which, by the way, [React-Icons](https://react-icons.github.io/react-icons/) might be a good one to look at)

Complex components can take around an hour to test if the pain points are properly identified, stories well written (eg "As a User, when I try to login with an incorrect password I should see an error message"). Snapshot testing, on the other hand, can be written in less than a minute.

##### **NOTES**

The `pages/report/[...id].tsx` is very glitchy when you add in extra dependencies to the useEffect in HashContainer which is odd. Disabling the warning is good enough for now, but good to know as an area of weakness. Sidenote, I like the look and feel of the scroll but I can't help but feel tabs would be easier to implement, maintain and test. Just my two cents. 

This HashContainer issue also applies to the Settings page, even without the extra dependencies. 

In general, the hash routes seems to be a point of concern

There's also a problem of navigating to anywhere else after you've been on the reports page after an error: the other links seem to break. You need to refresh the page in order to navigate elsewhere. Not sure if this is in the build version

---

## Summary

* Pages, Hooks, Utils (functions) and complex components (particularly forms and modals) should be prioritized as these are the largest potential pain points. You're likely looking at a couple of days work for these, including the basic setup and configuration
* Adding pipelines and code-quality software will add about half a day, perhaps up to a day. Any licenses should be obtained by the client first. Recommended if you have complex code and want to avoid any nasty surprises in production.
* Cypress End-to-End testing, if required, should be the last thing to be done, after all other tests are written
* Any testing work will include updated and detailed documentation in the README for any future devs
* Snapshots can be added for dumb components but should not be relied upon as an exhaustive method of testing because it does the bare minimum.
* The work will go faster if the developer has a clear understanding of the most vulnerable parts of the code. User Stories help greatly with this, even simple ones.
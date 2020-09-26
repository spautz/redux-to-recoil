# Contributing

Thanks for your interest in Redux-to-Recoil! You are very welcome to contribute.

By contributing to Redux-to-Recoil, you agree to abide by the [code of conduct](./CODE_OF_CONDUCT.md).

## Reporting Bugs and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/spautz/redux-to-recoil/issues)
to make sure your issue hasn't already been reported.

### New Features and Ideas

If you are proposing a new feature, make sure to [open an issue](https://github.com/spautz/redux-to-recoil/issues/new/choose)
to discuss your idea and make sure it is inline with the project goals.

## Setup and Development

1. Fork this repository to your own GitHub account and clone it to your local device:

   ```
   git clone https://github.com/your-name/redux-to-recoil.git
   cd redux-to-recoil
   git remote add upstream https://github.com/spautz/redux-to-recoil.git
   ```

2. Install the dependencies and ensure everything runs properly:

   ```
   yarn install
   yarn all
   ```

3. Create a new topic branch:

   ```
   git checkout -b my-topic-branch
   ```

4. To test your local dev version of `redux-to-recoil` in other projects, I recommend [Yalc](https://github.com/whitecolor/yalc).

5. After you have made your changes, submit a pull request. Issues and pull requests are monitored, and you should receive a reply.

## Code and Project Standards

Eslint, Typescript, and Prettier enforce most code standards. A pre-push hook will validate the project against those standards.

Running `yarn all` will check _everything_: tests, code standards, and the build itself.
Your pull request is more likely to be accepted if this passes for your branch.

## Overall Process

In general, the contribution workflow looks like this:

1. Open a new issue in the [Issue tracker](https://github.com/spautz/redux-to-recoil/issues).
2. Fork the repo and set up your local development environment.
3. Make changes in a branch in your fork.
4. Make sure all tests pass and there are no errors.
5. Submit a [pull request](https://github.com/spautz/redux-to-recoil/pulls), referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some
changes or improvements.

Thank you for contributing!

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.8.1](https://github.com/spautz/redux-to-recoil/compare/v0.8.0...v0.8.1) (2022-03-31)

- Confirm support for Recoil 0.6, and reconfirm support for React 18

## [0.8.0](https://github.com/spautz/redux-to-recoil/compare/v0.7.1...v0.8.0) (2021-11-04)

- Confirm support for Recoil 0.5

### [0.7.1](https://github.com/spautz/redux-to-recoil/compare/v0.7.0...v0.7.1) (2021-11-04)

This is a transitory release which supports both Recoil 0.4 and 0.5. Starting with v0.8.0, only Recoil 0.5+ will be tested and verified.

- Confirm support for Recoil 0.4 and 0.5
- Confirm support for Node 17

## [0.7.0](https://github.com/spautz/redux-to-recoil/compare/v0.6.0...v0.7.0) (2021-08-14)

- Confirm and document support for Recoil 0.4
- Support for additional options when constructing selectors: `options._recoilSelectorExtraOptions` for `atomFromRedux` and a new argument for `selectorFromReselect` ([#47](https://github.com/spautz/redux-to-recoil/issues/47)) ([b797ca2](https://github.com/spautz/redux-to-recoil/commit/b797ca26c349fc8896eb2c34732e0cbd23b141a5))

## [0.6.0](https://github.com/spautz/redux-to-recoil/compare/v0.5.1...v0.6.0) (2021-07-18)

- Add a standalone hook for rare cases when `SyncReduxToRecoil` isn't appropriate ([#46](https://github.com/spautz/redux-to-recoil/issues/46)) ([6060167](https://github.com/spautz/redux-to-recoil/commit/606016779848673f850e6877a3553451acb92f7b))
- Expanded docs and internal improvements

### [0.5.1](https://github.com/spautz/redux-to-recoil/compare/v0.5.0...v0.5.1) (2021-05-22)

- Confirm support for Recoil 0.3.x ([#38](https://github.com/spautz/redux-to-recoil/issues/38)) ([16d9054](https://github.com/spautz/redux-to-recoil/commit/16d905416aa24d52d321d6d28065597c49e444ea))
- Confirm support for Redux 4.1.x ([#37](https://github.com/spautz/redux-to-recoil/issues/37)) ([def58ca](https://github.com/spautz/redux-to-recoil/commit/def58ca0148b09a1e856e19a2c26adac1e43b0f8))
- Internal scripting and devDependency updates ([#39](https://github.com/spautz/redux-to-recoil/issues/39)) ([da8b2d8](https://github.com/spautz/redux-to-recoil/commit/da8b2d80bcba9d8d7fb8c1798351b559c0ad65b4))

## [0.5.0](https://github.com/spautz/redux-to-recoil/compare/v0.4.1...v0.5.0) (2021-04-22)

- Officially support Recoil 0.2.x ([#36](https://github.com/spautz/redux-to-recoil/issues/36)) ([13f8bd3](https://github.com/spautz/redux-to-recoil/commit/13f8bd36607b893eb224301181270b44ee96773f))
- Add ability to reset state between tests ([#36](https://github.com/spautz/redux-to-recoil/issues/36)) ([13f8bd3](https://github.com/spautz/redux-to-recoil/commit/13f8bd36607b893eb224301181270b44ee96773f))
- Build system and devDependency updates ([#35](https://github.com/spautz/redux-to-recoil/issues/35)) ([eec9c2b](https://github.com/spautz/redux-to-recoil/commit/eec9c2b72e1050c7986a7de93ad50435df144f95))

### [0.4.1](https://github.com/spautz/redux-to-recoil/compare/v0.4.0...v0.4.1) (2021-03-08)

- Publish multiple typesVersions ([#29](https://github.com/spautz/redux-to-recoil/issues/29)) ([de4991a](https://github.com/spautz/redux-to-recoil/commit/de4991ae79d37a515c48da2a20759d1216f45aa6))

## [0.4.0](https://github.com/spautz/redux-to-recoil/compare/v0.3.1...v0.4.0) (2020-10-31)

### Features

- Officially support Recoil 0.1.x ([#21](https://github.com/spautz/redux-to-recoil/issues/21)) ([25cc923](https://github.com/spautz/redux-to-recoil/commit/25cc9238faa2f30ecebb8034cfafa835f2f8bc6a))

### [0.3.1](https://github.com/spautz/redux-to-recoil/compare/v0.3.0...v0.3.1) (2020-10-25)

- Minor updates to docs and devDependencies

## [0.3.0](https://github.com/spautz/redux-to-recoil/compare/v0.2.2...v0.3.0) (2020-09-26)

### Features

- Add support for Recoil 0.0.13 ([#18](https://github.com/spautz/redux-to-recoil/issues/18)) ([f2c32c0](https://github.com/spautz/redux-to-recoil/commit/f2c32c0ed928ac17b46d73ba3bd50a8421f3a236))

### [0.2.2](https://github.com/spautz/redux-to-recoil/compare/v0.2.1...v0.2.2) (2020-08-13)

### Bug Fixes

- Don't mutate pending-changes array between syncs ([#16](https://github.com/spautz/redux-to-recoil/issues/16)) ([99a0464](https://github.com/spautz/redux-to-recoil/commit/99a04645a743ea3c4aaa4a9f79df2ecb0a49fe3d))

### [0.2.1](https://github.com/spautz/redux-to-recoil/compare/v0.2.0...v0.2.1) (2020-08-08)

### Features

- Host [demo on gh-pages](https://spautz.github.io/redux-to-recoil/) ([#13](https://github.com/spautz/redux-to-recoil/issues/13)) ([1c1add6](https://github.com/spautz/redux-to-recoil/commit/1c1add6020240a961217b62f9e3d055942b1f64d))
- Expand docs

## [0.2.0](https://github.com/spautz/redux-to-recoil/compare/v0.1.0...v0.2.0) (2020-08-06)

### Features

- Add options to control reads from and writes to Redux ([#12](https://github.com/spautz/redux-to-recoil/issues/12)) ([5bbe760](https://github.com/spautz/redux-to-recoil/commit/5bbe7609304e0ea9ec3e908e6a1a06ac935c937d))

## [0.1.0](https://github.com/spautz/redux-to-recoil/compare/v0.0.3...v0.1.0) (2020-08-01)

First production-ready public release.

### [0.0.3](https://github.com/spautz/redux-to-recoil/compare/v0.0.2...v0.0.3) (2020-08-01)

### Features

- Improve error detection when missing SyncReduxToRecoil ([#10](https://github.com/spautz/redux-to-recoil/issues/10)) ([c683d11](https://github.com/spautz/redux-to-recoil/commit/c683d11d54f7ca1bf34a652d13d6441627be05e7))

### [0.0.2](https://github.com/spautz/redux-to-recoil/compare/v0.0.1...v0.0.2) (2020-07-28)

### Features

- Optimize dependencies and types ([#6](https://github.com/spautz/redux-to-recoil/issues/6)) ([69cfb8b](https://github.com/spautz/redux-to-recoil/commit/69cfb8b96e02b77831fc1771518f1d26baa121d3))
- Sync Recoil changes back to Redux ([#7](https://github.com/spautz/redux-to-recoil/issues/7)) ([6a01e3e](https://github.com/spautz/redux-to-recoil/commit/6a01e3eeacd7efc025d81c794ed0da0faa704403))

### 0.0.1 (2020-07-27)

### Features

- Add basic todo-list demo ([#1](https://github.com/spautz/redux-to-recoil/issues/1)) ([2221db0](https://github.com/spautz/redux-to-recoil/commit/2221db03314a6b8086b6b0a6f420a99bb41167c1))
- Core functionality for read-only sync ([#5](https://github.com/spautz/redux-to-recoil/issues/5)) ([99ba8e8](https://github.com/spautz/redux-to-recoil/commit/99ba8e81682faba66846d99a5a03e32be0162539))

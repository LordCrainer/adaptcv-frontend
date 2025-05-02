## [1.59.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.59.0...v1.59.1) (2025-05-02)


### Bug Fixes

* adjust styling for OwnTemplate and ensure proper layout in preview page ([ad93e70](https://github.com/LordCrainer/adaptcv-frontend/commit/ad93e7068b4cb3097ee1453213d6ef305d6a7ba9))

# [1.59.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.58.0...v1.59.0) (2025-05-02)


### Features

* **builder:** implement builder pages and update routing, localization, and types ([71e6f7d](https://github.com/LordCrainer/adaptcv-frontend/commit/71e6f7d298de420d64420553355f1045073b1e66))

# [1.58.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.57.0...v1.58.0) (2025-05-01)


### Features

* **cv:** implement CV service and update shared types to support new structure ([e92bc75](https://github.com/LordCrainer/adaptcv-frontend/commit/e92bc7534ce27626bcb640e1cbed1e55027165fa))

# [1.57.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.56.0...v1.57.0) (2025-05-01)


### Features

* **auth:** refactor authentication logic and improve error handling; update auth service and store methods ([f37424a](https://github.com/LordCrainer/adaptcv-frontend/commit/f37424a1eb22ba755ddc00fffe94b4c15226e504))
* update axios plugin to provide Axios instance and add tsconfig.app.json for path resolution ([d8000f7](https://github.com/LordCrainer/adaptcv-frontend/commit/d8000f716da840f04e9cfb2424d8505d2324301b))

# [1.56.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.55.0...v1.56.0) (2025-04-30)


### Features

* add axios plugin with request and response interceptors for authentication ([5c5a723](https://github.com/LordCrainer/adaptcv-frontend/commit/5c5a72350f3603b800c2f2c1077208aa5ee9eb4f))
* implement authentication functionality with login, registration, and logout features; add auth service and store ([0224825](https://github.com/LordCrainer/adaptcv-frontend/commit/02248253f1517230d347626af276b6f793aa636e))
* **profile:** add components for user profile management including About Me, Education, Languages, Skills, and Work Experience ([d8484fa](https://github.com/LordCrainer/adaptcv-frontend/commit/d8484fab0571ac497e8fb83d9884ef12b88d12cf))

# [1.55.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.54.0...v1.55.0) (2025-04-30)


### Bug Fixes

* correct import path for CV store in OwnTemplate.vue ([7fa3e1c](https://github.com/LordCrainer/adaptcv-frontend/commit/7fa3e1c49b99cf7bb1b1130df94c93e50de6ae00))


### Features

* **dependencies:** add pinia-plugin-persistedstate for state persistence ([9e0b25c](https://github.com/LordCrainer/adaptcv-frontend/commit/9e0b25c0c67b3df7452aa391a5bed4c572fe50c4))

# [1.54.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.53.1...v1.54.0) (2025-04-29)


### Features

* **profile:** reorganize component structure and implement new profile features including user profile, work experience, and about me sections ([4bb9f4f](https://github.com/LordCrainer/adaptcv-frontend/commit/4bb9f4fe30034432688e054e62eb2f85a30e021f))
* **profile:** restructure profile components and implement work experience management ([e72b9cd](https://github.com/LordCrainer/adaptcv-frontend/commit/e72b9cd1fdda276f0f40632dad31a304447fe2e3))

## [1.53.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.53.0...v1.53.1) (2025-04-29)


### Bug Fixes

* update import paths for profile-related types to use absolute paths ([dfe7567](https://github.com/LordCrainer/adaptcv-frontend/commit/dfe7567c3b1af0fb38ee19ea3dc1c4c84bc4069f))

# [1.53.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.52.1...v1.53.0) (2025-04-29)


### Bug Fixes

* **Header:** set drawer initial state to false; update route props for builder and preview ([b57eec9](https://github.com/LordCrainer/adaptcv-frontend/commit/b57eec974d0cd1b43224f610e57b53cc0298dfa9))


### Features

* add profile management components including Education, Languages, Skills, and Work Experience ([ad3e993](https://github.com/LordCrainer/adaptcv-frontend/commit/ad3e9932d3ed164c3191e5e54d0336e1bfdb2a7c))
* **profile:** restructure profile routes and components; add profile builder and preview pages ([6c71e3f](https://github.com/LordCrainer/adaptcv-frontend/commit/6c71e3f0310540cd053c4bdd491412a561208268))

## [1.52.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.52.0...v1.52.1) (2025-04-29)


### Bug Fixes

* **toolbar:** update button color logic based on preview state ([9ee0524](https://github.com/LordCrainer/adaptcv-frontend/commit/9ee0524e8be4d7542260f586b3f40bfcc6a6c2d5))

# [1.52.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.51.0...v1.52.0) (2025-04-29)


### Bug Fixes

* **routes:** correct component import path for builder route ([cf8cdb9](https://github.com/LordCrainer/adaptcv-frontend/commit/cf8cdb9766e3ec5f1b8a6fc8f0ab339b23784067))


### Features

* **builder:** refactor builder page structure and add ProfileBuilderToolbar component ([9f10d19](https://github.com/LordCrainer/adaptcv-frontend/commit/9f10d19cb6b61a9375b20aa55ecb4c05cece6602))
* **routes:** update builder route icon and id for consistency ([f773a25](https://github.com/LordCrainer/adaptcv-frontend/commit/f773a259cbb61a7581c34cd0c115a3705313c8c3))
* **routes:** update route structure to use RouteExtended type and enhance props handling ([c7fe6c8](https://github.com/LordCrainer/adaptcv-frontend/commit/c7fe6c81ca06356816b63f626843820006e8c6b6))
* **toolbar:** add dynamic color to toolbar button based on preview state ([7e502fd](https://github.com/LordCrainer/adaptcv-frontend/commit/7e502fdf7fa044ea37f6e5a6388fe92fe39f33c7))

# [1.51.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.50.0...v1.51.0) (2025-04-29)


### Features

* **ui:** remove builder button and associated method from UserProfileForm ([a7b14db](https://github.com/LordCrainer/adaptcv-frontend/commit/a7b14db37d4d1cb99a82da251ecccd408a29b192))

# [1.50.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.49.0...v1.50.0) (2025-04-29)


### Features

* **i18n:** rename 'fillInformation' to 'builder' in UI and translations ([a1fb791](https://github.com/LordCrainer/adaptcv-frontend/commit/a1fb791d6a157f204377b888bdceb87183998cab))
* **ui:** update NavigationDrawer default state and create builder page layout ([3f2fde2](https://github.com/LordCrainer/adaptcv-frontend/commit/3f2fde2291d80f8e829391f8f060d4cb877473da))

# [1.49.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.48.0...v1.49.0) (2025-04-28)


### Features

* **ui:** enhance CardDefault and NavigationDrawer components, add preview action and translations ([4dda124](https://github.com/LordCrainer/adaptcv-frontend/commit/4dda1240d8244b0b90e6bf1a601053e7ab5320cd))

# [1.48.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.47.0...v1.48.0) (2025-04-28)


### Features

* **profile:** add About Me, Education, Languages, Skills, Work Experience sections with forms and management logic ([2439653](https://github.com/LordCrainer/adaptcv-frontend/commit/24396538dd2ac23215dec5e135cc12c08e358881))
* **profile:** update user profile handling and add publish action ([dfae81b](https://github.com/LordCrainer/adaptcv-frontend/commit/dfae81bd1f03a941b4a7fbc41a115792282928a8))
* **tabs:** update translation keys for profile tabs ([e82de46](https://github.com/LordCrainer/adaptcv-frontend/commit/e82de4699c8a6d9edd8f2d436dad4723f014bf89))

# [1.47.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.46.0...v1.47.0) (2025-04-26)


### Features

* **styles:** add base styles for profile photo and flex layout ([9e9f9fc](https://github.com/LordCrainer/adaptcv-frontend/commit/9e9f9fca47dd9632bc40dea1c01c443c7b975ca8))

# [1.46.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.45.1...v1.46.0) (2025-04-24)


### Features

* **TabsDinamycs:** update tab handling and progress calculation logic ([a521e9b](https://github.com/LordCrainer/adaptcv-frontend/commit/a521e9b7c2e80a44be9d69bd5231a07d51223fc0))

## [1.45.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.45.0...v1.45.1) (2025-04-22)


### Bug Fixes

* **Login:** add missing border property to card component ([c4bac08](https://github.com/LordCrainer/adaptcv-frontend/commit/c4bac0865fb18bddd3377d8a5c4eca9c2f20f9d4))

# [1.45.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.44.0...v1.45.0) (2025-04-22)


### Features

* **Login:** update password validation and enhance form styling with rounded inputs ([9e434e6](https://github.com/LordCrainer/adaptcv-frontend/commit/9e434e6b367ce9482bb3f0666b3cbf237bb2b1c6))

# [1.44.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.43.0...v1.44.0) (2025-04-22)


### Features

* **i18n:** add website translation keys for English and Spanish locales ([d770830](https://github.com/LordCrainer/adaptcv-frontend/commit/d770830b5bfb6a1b1004570bf4ae7591d0f2cb13))
* **Login:** enhance login form with improved layout, validation, and loading state ([3cc5073](https://github.com/LordCrainer/adaptcv-frontend/commit/3cc50731ddfb8e93b1aada920200944ca6ec9936))

# [1.43.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.42.0...v1.43.0) (2025-04-22)


### Bug Fixes

* **OwnTemplate:** add optional chaining to userProfile properties for safety ([deacfca](https://github.com/LordCrainer/adaptcv-frontend/commit/deacfca005322fabc29e537891c1bd9c703ac8a1))
* **UserProfile:** update validation rules to use required function directly ([be2ea77](https://github.com/LordCrainer/adaptcv-frontend/commit/be2ea7733447b90dc5c3d4c1c6d46457fbc1aac9))


### Features

* **AboutMe:** implement About Me section with form and localization support ([0c47ab0](https://github.com/LordCrainer/adaptcv-frontend/commit/0c47ab0176fc08692eff87d9e48a674ca93effec))
* **i18n:** add 'forgotPassword' translation key for English and Spanish locales ([9eab00f](https://github.com/LordCrainer/adaptcv-frontend/commit/9eab00fb7d62dd50cb7657318f84c14c12a1c44c))
* **i18n:** add new translation keys for 'dontHaveAccount' and 'signInWithGoogle' in English and Spanish locales ([c7c69ff](https://github.com/LordCrainer/adaptcv-frontend/commit/c7c69ff0209291319af7a5b212411935174eca22))
* **i18n:** add new translation keys for registration and update login title ([4b1b3a3](https://github.com/LordCrainer/adaptcv-frontend/commit/4b1b3a3b419c3361cc07e8f5d64a105b0aa4e100))
* **Login:** create login component with form validation and actions ([cb88723](https://github.com/LordCrainer/adaptcv-frontend/commit/cb88723b828c1e43102462882694455a76ecbfc5))
* **Login:** enhance login form with improved layout, validation, and password visibility toggle ([47c3aec](https://github.com/LordCrainer/adaptcv-frontend/commit/47c3aec83af464402cad97abc2ca33e36096bdce))
* **Profile:** integrate About Me section and update userProfile references ([41d0387](https://github.com/LordCrainer/adaptcv-frontend/commit/41d0387aaa024ab7699944029be9e0fe556c76b0))

# [1.42.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.41.0...v1.42.0) (2025-04-21)


### Features

* **OwnTemplate:** adjust user profile summary width for better layout ([5bb339f](https://github.com/LordCrainer/adaptcv-frontend/commit/5bb339f29b02847c5789fb8aa7399e4a6ae866d3))
* **OwnTemplate:** enhance layout with rounded dividers and improved experience/education sections ([490066f](https://github.com/LordCrainer/adaptcv-frontend/commit/490066fcaed3032143d6c09509be3f074567e9b8))

# [1.41.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.40.0...v1.41.0) (2025-04-21)


### Features

* **CVStore:** add user profile management and skill/language handling functions ([3e1a966](https://github.com/LordCrainer/adaptcv-frontend/commit/3e1a96688e81d2ff631e35defc5f9567517ba64b))
* **DateFormatting:** add utility functions for standard date formatting and date range formatting ([9114698](https://github.com/LordCrainer/adaptcv-frontend/commit/911469817136c4fa5b7e0d2aaa074c6887ca319e))
* **HarvardTemplate:** add new template for displaying user profiles with education, work experience, skills, and languages ([7817651](https://github.com/LordCrainer/adaptcv-frontend/commit/78176517280dc426e73beea4a126e8ab10326f17))
* **Languages:** integrate proficiency levels into LanguagesForm and useLanguages ([c6935c4](https://github.com/LordCrainer/adaptcv-frontend/commit/c6935c40e5140a4ef607dbd4067081cd97ecabca))
* **OwnTemplate:** add proficiency level indicators for languages using progress circulars ([658d193](https://github.com/LordCrainer/adaptcv-frontend/commit/658d193c96a85b0b4fd0c4876ff8129b71d25456))
* **OwnTemplate:** create new template for user profiles with contact, skills, and languages sections ([7db9484](https://github.com/LordCrainer/adaptcv-frontend/commit/7db9484cc6fc00b3ee5ea4acf2100a94d502cbb5))
* **OwnTemplate:** enhance user profile layout with additional personal info and experience sections ([e0e1310](https://github.com/LordCrainer/adaptcv-frontend/commit/e0e13106ea29a5a0d7f83a7537680be8b17e5e58))
* **Preview:** remove unused data fetching logic and enhance profile display with skills and languages ([7b93ba3](https://github.com/LordCrainer/adaptcv-frontend/commit/7b93ba31a9434cd1f5b7481fad0dfbc1ee20c80a))
* **Preview:** simplify profile display by removing unused data and integrating template selection ([e850dae](https://github.com/LordCrainer/adaptcv-frontend/commit/e850dae506b8882434641c54480753d023adb28e))
* **Profile:** add slogan field to user profile interface and include logo asset ([27eb2e2](https://github.com/LordCrainer/adaptcv-frontend/commit/27eb2e2ed9e73007c2ef73d2ba0c6041123b3d65))

# [1.40.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.39.0...v1.40.0) (2025-04-20)


### Features

* **Preview:** enhance profile display with work experience and education details ([6ac8f62](https://github.com/LordCrainer/adaptcv-frontend/commit/6ac8f621ec736e152eeca6e63fac06745b39a295))

# [1.39.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.38.0...v1.39.0) (2025-04-20)


### Bug Fixes

* **HeaderActionItems:** update tab component to include navigation paths ([b94cd7b](https://github.com/LordCrainer/adaptcv-frontend/commit/b94cd7bb162d6a30c0cc360ad1a0a2b00e04aaf2))


### Features

* **i18n:** add routes translations for English and Spanish locales ([350e4da](https://github.com/LordCrainer/adaptcv-frontend/commit/350e4dacf70cf2f9017b7913fdf35e8573c2ba3e))
* **i18n:** implement route translations in Header and Tabs components ([53bf5f5](https://github.com/LordCrainer/adaptcv-frontend/commit/53bf5f507440a58f3e04fb2a2569acfae633212a))

# [1.38.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.37.0...v1.38.0) (2025-04-20)


### Bug Fixes

* **profile:** adjust text styling for upload photo label in user profile ([e738838](https://github.com/LordCrainer/adaptcv-frontend/commit/e7388385fa22bf0ec32aa16e668f32e68fdad17d))
* **tabs:** update tab navigation logic to use string values and improve component registration ([06560e2](https://github.com/LordCrainer/adaptcv-frontend/commit/06560e245095e95ba4aebfb17823f128307c9e02))


### Features

* **layout:** pass APP_ROUTES to Header component for dynamic navigation ([4688f96](https://github.com/LordCrainer/adaptcv-frontend/commit/4688f96714701fbed3c7fb67776e99c205d46647))
* **tabs:** implement dynamic tab navigation with previous and next functionality ([3f71c2d](https://github.com/LordCrainer/adaptcv-frontend/commit/3f71c2d88a312344b1163e8131030a889928289c))

# [1.37.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.36.0...v1.37.0) (2025-04-15)


### Bug Fixes

* **profile:** add text styling to upload photo label in user profile ([6719e48](https://github.com/LordCrainer/adaptcv-frontend/commit/6719e4899cabf8c745da8f8caef6c5d462522e2f))
* **tabs:** adjust layout for better responsiveness and structure ([8de9788](https://github.com/LordCrainer/adaptcv-frontend/commit/8de97887bd1ec3ca6cace5df2becbf02e4a52230))
* **tabs:** disable previous button when on the first tab and simplify tab navigation logic ([f1b86f1](https://github.com/LordCrainer/adaptcv-frontend/commit/f1b86f180d8ae96b080b10b29ff53c0fb0db8bd4))
* **tabs:** rename tab variable to selectedTab for consistency and clarity ([480a2a5](https://github.com/LordCrainer/adaptcv-frontend/commit/480a2a538562dd73969f059933c2be89500f7fc1))


### Features

* **i18n:** add navigation action translations for English and Spanish ([7697deb](https://github.com/LordCrainer/adaptcv-frontend/commit/7697debcb4059cb745685a7f4442ecda97826a00))

# [1.36.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.35.0...v1.36.0) (2025-04-15)


### Features

* **profile:** implement dynamic tabs for user profile sections ([c14f61e](https://github.com/LordCrainer/adaptcv-frontend/commit/c14f61e83ab677720998e4250e26a93172e6ecc6))

# [1.35.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.34.0...v1.35.0) (2025-04-15)


### Bug Fixes

* **profile:** correct import path for UserProfile component in index.vue ([430b788](https://github.com/LordCrainer/adaptcv-frontend/commit/430b788bd0668bd9ba5d7030abd624178c1fb7e5))


### Features

* **cvStore:** refactor CV store to use state and actions for better data management ([65d5a63](https://github.com/LordCrainer/adaptcv-frontend/commit/65d5a63e2815c97b85381a03236b8fa7ca51e30b))
* **i18n:** update translation keys for saving images in English and Spanish ([89452f8](https://github.com/LordCrainer/adaptcv-frontend/commit/89452f8b27d0329f5c3f954713bc335db24642d5))
* **profile:** add IFileImage import to user profile type definitions ([6f63f5f](https://github.com/LordCrainer/adaptcv-frontend/commit/6f63f5f89979a2a3c84ed4e3002a8f62defaa6ab))
* **profile:** add UserPreviewPhoto component for image upload and preview functionality ([7016fb4](https://github.com/LordCrainer/adaptcv-frontend/commit/7016fb443d6ee4af5e47011452d51fbb2044361e))
* **profile:** implement user profile management and image upload functionality ([17400f5](https://github.com/LordCrainer/adaptcv-frontend/commit/17400f5ac594d408f60f90540dc44496d1ef1447))
* **profile:** refactor WorkExperienceForm and index components for improved data handling and UI consistency ([5ed71ba](https://github.com/LordCrainer/adaptcv-frontend/commit/5ed71ba60e50e7b2fa1907f0b75fa72fde04dc74))
* **profile:** restructure user profile components and add user profile management functionality ([f55afc3](https://github.com/LordCrainer/adaptcv-frontend/commit/f55afc382414fb6616bfb7c3538587d506cfbc1d))

# [1.34.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.33.1...v1.34.0) (2025-04-14)


### Features

* **profile:** refactor IUserProfile interface and add cvStore for managing CV data ([1d1fd08](https://github.com/LordCrainer/adaptcv-frontend/commit/1d1fd08e4a19dd9131f27e35a2659150bae855ee))

## [1.33.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.33.0...v1.33.1) (2025-04-13)


### Bug Fixes

* **navigation-drawer:** remove unnecessary modelValue display in NavigationDrawer template ([#1](https://github.com/LordCrainer/adaptcv-frontend/issues/1)) ([5cfe298](https://github.com/LordCrainer/adaptcv-frontend/commit/5cfe29858177e6ffaac9abe2fc4c1a919af83c2d))

# [1.33.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.32.0...v1.33.0) (2025-04-12)


### Features

* **header:** enhance HeaderActionItems with tab titles and update NavigationDrawer structure ([c6ab9f3](https://github.com/LordCrainer/adaptcv-frontend/commit/c6ab9f3c6b0f3e432bf52a24b660b0e5b394d7e0))

# [1.32.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.31.0...v1.32.0) (2025-04-12)


### Bug Fixes

* **header:** correct toggleDrawer function name and update NavigationDrawer binding ([f2821b8](https://github.com/LordCrainer/adaptcv-frontend/commit/f2821b828281d3afa144670df34cea1c189c73e7))


### Features

* **navigation:** update NavigationDrawer items to use path instead of value ([2d3b620](https://github.com/LordCrainer/adaptcv-frontend/commit/2d3b620064d2010b1b83e9b9fecd7b275e602135))

# [1.31.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.30.0...v1.31.0) (2025-04-12)


### Features

* **header:** add navigation drawer and toggle functionality in header ([10fd5ab](https://github.com/LordCrainer/adaptcv-frontend/commit/10fd5ab534d1334548a908051430b233f31399da))

# [1.30.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.29.0...v1.30.0) (2025-04-12)


### Features

* **header:** implement header component with action items and settings menu ([407f082](https://github.com/LordCrainer/adaptcv-frontend/commit/407f082540cc9ff410d45b93a5031fcd64fcc9c9))

# [1.29.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.28.0...v1.29.0) (2025-04-12)


### Features

* **i18n:** add strategy configuration for internationalization ([780d947](https://github.com/LordCrainer/adaptcv-frontend/commit/780d947c477a7feb4966a18dd97beb6624b5cbf0))

# [1.28.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.27.0...v1.28.0) (2025-04-12)


### Bug Fixes

* **i18n:** correct syntax for Vuetify translations in Spanish locale ([be50c84](https://github.com/LordCrainer/adaptcv-frontend/commit/be50c8480aa1c036d93a6828619b9ea01b0626f3))


### Features

* **language:** add language toggle menu for English and Spanish ([4a42d51](https://github.com/LordCrainer/adaptcv-frontend/commit/4a42d51abe936f7eef3ab071538b1d559c8615cc))
* **theme:** add HeaderOverflowMenu component for theme toggling ([9dc767e](https://github.com/LordCrainer/adaptcv-frontend/commit/9dc767e6daf551d941e071a38e28f9b210d8759f))
* **theme:** implement theme toggle functionality in HeaderOverflow Menu ([ecd707c](https://github.com/LordCrainer/adaptcv-frontend/commit/ecd707c5c345769d8d458d4548e1fe3be46d77ef))

# [1.27.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.26.0...v1.27.0) (2025-04-12)


### Features

* **profile:** add 'uploadPhoto' translation to Spanish locale ([7224bb6](https://github.com/LordCrainer/adaptcv-frontend/commit/7224bb6559b4215405cf23216485d5277b841cf1))

# [1.26.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.25.0...v1.26.0) (2025-04-12)


### Features

* **profile:** enhance UploadImage component with localization and styling improvements ([6dc98cc](https://github.com/LordCrainer/adaptcv-frontend/commit/6dc98ccf4e0dc6cc3426f0a8cbe1edc24978b335))

# [1.25.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.24.0...v1.25.0) (2025-04-12)


### Features

* **profile:** implement UploadImage component and update UserInformationForm for image handling ([e1ab3bb](https://github.com/LordCrainer/adaptcv-frontend/commit/e1ab3bb518abecb179e6ba4681e7b01ad32864c8))

# [1.24.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.23.2...v1.24.0) (2025-04-11)


### Features

* **profile:** add areasProfession constant and update FormData interface ([e30d231](https://github.com/LordCrainer/adaptcv-frontend/commit/e30d231394d40bfe65d00ba0369604995e08feb8))
* **profile:** add UserInformationForm component for user profile input ([34ce986](https://github.com/LordCrainer/adaptcv-frontend/commit/34ce986f61e9c09932fd7216c8d3496afff155ad))

## [1.23.2](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.23.1...v1.23.2) (2025-04-11)


### Bug Fixes

* **Locales:** update locale files to use defineI18nLocale for better structure and maintainability ([f421e64](https://github.com/LordCrainer/adaptcv-frontend/commit/f421e64278b8d7f09c716fcd3d8c5529efe79e37))

## [1.23.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.23.0...v1.23.1) (2025-04-10)


### Bug Fixes

* correct property name for years of experience and update translations for education and skills ([9d8bd1b](https://github.com/LordCrainer/adaptcv-frontend/commit/9d8bd1bcb29ffa62a5f652245795073293cfdac9))

# [1.23.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.22.0...v1.23.0) (2025-04-10)


### Features

* add initial launch configuration for debugging in VSCode ([30aa366](https://github.com/LordCrainer/adaptcv-frontend/commit/30aa36682af178ee985297b421be4ee331f6de71))

# [1.22.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.21.0...v1.22.0) (2025-04-10)


### Features

* **Education:** refactor education management logic and improve dialog handling ([8a740d9](https://github.com/LordCrainer/adaptcv-frontend/commit/8a740d9d553d491b059df544270996d02828a753))

# [1.21.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.20.0...v1.21.0) (2025-04-10)


### Features

* **locales:** add missing education degree translations in English and Spanish ([ff624cb](https://github.com/LordCrainer/adaptcv-frontend/commit/ff624cb54055e46b85b15a83de7b4f77beb7dd6b))

# [1.20.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.19.0...v1.20.0) (2025-04-10)


### Features

* **locales:** update language proficiency terms and add missing translations for skills and languages ([0ea85e7](https://github.com/LordCrainer/adaptcv-frontend/commit/0ea85e7f1328ba372f31f3b9395e1ec7854f90bb))

# [1.19.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.18.0...v1.19.0) (2025-04-10)


### Features

* **locales:** update profile translations for English and Spanish ([4ae6233](https://github.com/LordCrainer/adaptcv-frontend/commit/4ae623344fd6cbb1237183aa55873db93ce0974b))

# [1.18.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.17.0...v1.18.0) (2025-04-10)


### Features

* **profile:** add profile localization for English and Spanish ([e7bcba6](https://github.com/LordCrainer/adaptcv-frontend/commit/e7bcba66741c3a3cf0b991e940d08650fe98e3bd))

# [1.17.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.16.0...v1.17.0) (2025-04-10)


### Features

* **profile:** refactor education management with new EducationForm component and update user profile view ([f398163](https://github.com/LordCrainer/adaptcv-frontend/commit/f3981639cf52c41ff9a887d88e61f371147406e5))
* **skills:** update skill form and localization for experience options ([78267f4](https://github.com/LordCrainer/adaptcv-frontend/commit/78267f4ca9cde8f1e33d015eb8153223ea19f8d8))

# [1.16.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.15.0...v1.16.0) (2025-04-10)


### Features

* **languages:** refactor language management to use useLanguages composable ([83279fa](https://github.com/LordCrainer/adaptcv-frontend/commit/83279fa3ec7cb603440d0a5f85ebd3642a442632))

# [1.15.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.14.0...v1.15.0) (2025-04-10)


### Features

* **profile:** implement user profile, work experience, education, languages, and skills management ([eef74ce](https://github.com/LordCrainer/adaptcv-frontend/commit/eef74cec47e0670eb20a98ab0405157f15d192b0))

# [1.14.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.13.0...v1.14.0) (2025-04-10)


### Features

* **languages:** refactor LanguagesForm and index to improve language management ([f8ebcc2](https://github.com/LordCrainer/adaptcv-frontend/commit/f8ebcc27feb2d71cf76325c84cd0224cfa6e4476))

# [1.13.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.12.0...v1.13.0) (2025-04-09)


### Bug Fixes

* **pre-commit:** add missing newline at end of file ([a77811f](https://github.com/LordCrainer/adaptcv-frontend/commit/a77811f3e35eebad51b48986aa44bf6e62b23cfe))
* **prettier:** add endOfLine option to Prettier configuration ([141fa4e](https://github.com/LordCrainer/adaptcv-frontend/commit/141fa4e16d1ceccf6f6ffc505e32c9e85c452761))


### Features

* **languages:** enhance language form with close event and improve dialog handling ([d511866](https://github.com/LordCrainer/adaptcv-frontend/commit/d51186653f03c3188f34b5b594eed8f5af403f3d))
* **languages:** replace text field with autocomplete for language selection ([a23a467](https://github.com/LordCrainer/adaptcv-frontend/commit/a23a4671801f659c06d17a8d622caf6910f3c7d9))
* **lint:** add lint and lint:fix scripts to package.json ([31c9298](https://github.com/LordCrainer/adaptcv-frontend/commit/31c92984f3ffbe7bf49ea3a4fd0606da3a963fb1))
* **skills:** refactor skill form and add skills list management ([2b8bd35](https://github.com/LordCrainer/adaptcv-frontend/commit/2b8bd35713afbbe8d8e9f4d0a6e1486c52ff0e1d))

# [1.12.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.11.0...v1.12.0) (2025-04-08)


### Bug Fixes

* **import:** update Languages component import path and remove unused Languages.vue file ([5728ad7](https://github.com/LordCrainer/adaptcv-frontend/commit/5728ad710c49e87693680c0f29207ed0e2452eaa))


### Features

* **languages:** add LanguagesForm and index components for language management ([ab07883](https://github.com/LordCrainer/adaptcv-frontend/commit/ab07883fcb5a1b93e078e9dc2824575793ea5fae))

# [1.11.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.10.0...v1.11.0) (2025-04-08)


### Bug Fixes

* **import:** update Skills component import path to use index.vue ([a430b19](https://github.com/LordCrainer/adaptcv-frontend/commit/a430b195852050454cba7e0a7f08db2cff8cd56a))


### Features

* **profile:** add skill form component with job, experience, and skills selection ([1dd503e](https://github.com/LordCrainer/adaptcv-frontend/commit/1dd503ed368b1594b865329a98a258464d1a203a))
* **profile:** add Skills component with data table and form handling ([f9c1de3](https://github.com/LordCrainer/adaptcv-frontend/commit/f9c1de3dd61e85c6a7e61ddd17bdeb1be3946580))
* **profile:** add TypeScript interfaces for Skill and SkillForm ([96d3057](https://github.com/LordCrainer/adaptcv-frontend/commit/96d30572af27c091a7d8d11bd5259db2a1490984))

# [1.10.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.9.0...v1.10.0) (2025-04-05)


### Features

* **profile:** refactor Skills component to improve state management and simplify form handling ([d2fc561](https://github.com/LordCrainer/adaptcv-frontend/commit/d2fc5615ad346af83a416fa393b307221c14bf33))

# [1.9.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.8.0...v1.9.0) (2025-04-05)


### Features

* **profile:** refactor Skills component to use reactive state management ([a3cd827](https://github.com/LordCrainer/adaptcv-frontend/commit/a3cd82711171f58e1f95bc641c245cdee3537c57))

# [1.8.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.7.0...v1.8.0) (2025-04-05)


### Features

* **i18n:** add 'noData' translation key to English locale ([46feeb0](https://github.com/LordCrainer/adaptcv-frontend/commit/46feeb0bb4169550d1da399010ed1bf6ca80120e))
* **profile:** implement Skills component with add, edit, and delete functionality ([11d1db1](https://github.com/LordCrainer/adaptcv-frontend/commit/11d1db15020f513cbefa538efcd59075519e007f))
* **profile:** update WorkExperience component to use localized description header ([cdaefd3](https://github.com/LordCrainer/adaptcv-frontend/commit/cdaefd3571bc3af3f7dd7adbf6414ca8fdddf8b4))

# [1.7.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.6.0...v1.7.0) (2025-04-04)


### Features

* **card:** update CardDefault component layout and styling ([1a61f7d](https://github.com/LordCrainer/adaptcv-frontend/commit/1a61f7d865402f9ec70410d352d2eda5b9601e98))
* **header:** add theme toggle functionality to Header component ([feac8f1](https://github.com/LordCrainer/adaptcv-frontend/commit/feac8f160baf839299ddab7c753ac9102757e9ff))
* **layout:** create default layout with header and footer components ([ca00ed9](https://github.com/LordCrainer/adaptcv-frontend/commit/ca00ed9bd9c0c5eb41f59fe48870eaa8138af268))
* **profile:** add validation rules for required fields in UserProfile and WorkExperience components ([ca6ab5b](https://github.com/LordCrainer/adaptcv-frontend/commit/ca6ab5b86b1ac9b8dc0b0b7f6fcfe1a5fc0b65f2))
* **profile:** enhance UserProfile and WorkExperience components with improved layout and new summary field ([ab80940](https://github.com/LordCrainer/adaptcv-frontend/commit/ab80940c64bb56dd14ce65cef42111cd7241fac0))

# [1.6.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.5.0...v1.6.0) (2025-04-04)


### Bug Fixes

* **card:** use raw title instead of translation for card title display ([6f2ac0c](https://github.com/LordCrainer/adaptcv-frontend/commit/6f2ac0c6a1b38bbb43c2b6423e3d3a9619a0e8d1))


### Features

* **deps:** add dragon-editor package and update related configurations ([4360892](https://github.com/LordCrainer/adaptcv-frontend/commit/43608924612bd2cb1bcc0e9be0056bbf20e67831))
* **i18n:** integrate Vuetify locale support and add 'Tecnology' key in English and Spanish translations ([2a38659](https://github.com/LordCrainer/adaptcv-frontend/commit/2a38659de776b709660e7de52b626b0dc7369cec))
* **i18n:** update English translations to include new keys and modify existing ones ([31ce307](https://github.com/LordCrainer/adaptcv-frontend/commit/31ce30717e36c495e21f9b35bba8e1b364ec7eaf))
* **i18n:** update translation keys for personal info and restructure profile section in Spanish ([8c178af](https://github.com/LordCrainer/adaptcv-frontend/commit/8c178af489273a21c5b6547546462e792f12f299))
* **layout:** create default layout with header and footer components ([5c80772](https://github.com/LordCrainer/adaptcv-frontend/commit/5c80772442c059357c38aaf0f836926ec3262007))
* **profile:** add AboutMe component with summary textarea for user input ([c4f69d2](https://github.com/LordCrainer/adaptcv-frontend/commit/c4f69d211b7e22f8d4504009d186699a537fad32))
* **profile:** enhance WorkExperience form layout and integrate DragonEditor for description input ([d43f6d8](https://github.com/LordCrainer/adaptcv-frontend/commit/d43f6d84838b968e62489adf1baced85c0cd018c))
* **profile:** redesign UserProfile form with improved layout and dynamic profession selection ([13fc2b0](https://github.com/LordCrainer/adaptcv-frontend/commit/13fc2b05bf807fa55f9cfc522a1bbfa987522523))
* **profile:** simplify layout by consolidating profile sections and updating titles ([c6b0979](https://github.com/LordCrainer/adaptcv-frontend/commit/c6b097914ce60075b8b3cffc85e6d11a81239133))

# [1.5.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.4.0...v1.5.0) (2025-04-03)


### Features

* **i18n:** restructure translation keys for user profile, experience, education, skills, and languages ([ca78a0d](https://github.com/LordCrainer/adaptcv-frontend/commit/ca78a0d52218b0a1febb3b90b74107365fff9f80))
* **i18n:** update translation keys for user profile components and improve layout responsiveness ([669b966](https://github.com/LordCrainer/adaptcv-frontend/commit/669b966f46ec8f9d55f24665cf2e0c419233cff0))
* **release:** add @semantic-release/npm plugin for improved package management ([aa98cbd](https://github.com/LordCrainer/adaptcv-frontend/commit/aa98cbd15f94a5d271a35c5433e01e19edaef80f))

# [1.4.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.3.1...v1.4.0) (2025-04-03)


### Features

* **card:** add CardDefault component with customizable title, icon, and color ([3b41168](https://github.com/LordCrainer/adaptcv-frontend/commit/3b411681cbf052e6998b0a9e382d3cf51295ab20))
* **i18n:** add comprehensive translation keys for actions, common terms, and CV details in English and Spanish locales ([a7bbbd3](https://github.com/LordCrainer/adaptcv-frontend/commit/a7bbbd3a823515062d728a7177966b151eea4933))
* **i18n:** enhance translation keys for English and Spanish locales ([2306efd](https://github.com/LordCrainer/adaptcv-frontend/commit/2306efd6938b39b3ff7eda1f058ec617ee82eb65))
* **i18n:** expand translation keys for actions, common terms, and CV details in English and Spanish locales ([b376581](https://github.com/LordCrainer/adaptcv-frontend/commit/b37658132b5ecfc39bb3be81fd1d21d9e912d42c))
* **layout:** add Header and Footer components to default layout ([e4ce9f0](https://github.com/LordCrainer/adaptcv-frontend/commit/e4ce9f0a80a20f3f14bdc737dc875eb9e9a486a6))
* **profile:** add components for user profile, education, work experience, skills, and languages ([4ecf726](https://github.com/LordCrainer/adaptcv-frontend/commit/4ecf726eee24a9a340765b5d0ce3169c6b346e71))
* **vuetify:** add icon sets configuration for Material Design and Font Awesome ([0045121](https://github.com/LordCrainer/adaptcv-frontend/commit/0045121ba92c9a22a8742b062f0f82351f69cefa))

# [1.4.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.3.1...v1.4.0) (2025-04-03)


### Features

* **card:** add CardDefault component with customizable title, icon, and color ([3b41168](https://github.com/LordCrainer/adaptcv-frontend/commit/3b411681cbf052e6998b0a9e382d3cf51295ab20))
* **i18n:** add comprehensive translation keys for actions, common terms, and CV details in English and Spanish locales ([a7bbbd3](https://github.com/LordCrainer/adaptcv-frontend/commit/a7bbbd3a823515062d728a7177966b151eea4933))
* **i18n:** enhance translation keys for English and Spanish locales ([2306efd](https://github.com/LordCrainer/adaptcv-frontend/commit/2306efd6938b39b3ff7eda1f058ec617ee82eb65))
* **i18n:** expand translation keys for actions, common terms, and CV details in English and Spanish locales ([b376581](https://github.com/LordCrainer/adaptcv-frontend/commit/b37658132b5ecfc39bb3be81fd1d21d9e912d42c))
* **layout:** add Header and Footer components to default layout ([e4ce9f0](https://github.com/LordCrainer/adaptcv-frontend/commit/e4ce9f0a80a20f3f14bdc737dc875eb9e9a486a6))
* **profile:** add components for user profile, education, work experience, skills, and languages ([4ecf726](https://github.com/LordCrainer/adaptcv-frontend/commit/4ecf726eee24a9a340765b5d0ce3169c6b346e71))
* **vuetify:** add icon sets configuration for Material Design and Font Awesome ([0045121](https://github.com/LordCrainer/adaptcv-frontend/commit/0045121ba92c9a22a8742b062f0f82351f69cefa))

## [1.3.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.3.0...v1.3.1) (2025-04-03)


### Bug Fixes

* **husky:** improve pre-commit hook messages for better user feedback ([85df6eb](https://github.com/LordCrainer/adaptcv-frontend/commit/85df6eb3b2f2a761c68b8060a1680202960f9afa))

## [1.3.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.3.0...v1.3.1) (2025-04-03)


### Bug Fixes

* **husky:** improve pre-commit hook messages for better user feedback ([85df6eb](https://github.com/LordCrainer/adaptcv-frontend/commit/85df6eb3b2f2a761c68b8060a1680202960f9afa))

# [1.3.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.8...v1.3.0) (2025-04-03)


### Features

* **i18n:** add English and Spanish translations and configure i18n support ([9e9418a](https://github.com/LordCrainer/adaptcv-frontend/commit/9e9418aa4cf1e0a6385ec3a052f54b447c76e1bf))
* **layout:** replace NuxtRouteAnnouncer and NuxtWelcome with NuxtLayout and NuxtPage ([239f2e1](https://github.com/LordCrainer/adaptcv-frontend/commit/239f2e10a82068213b57392d4815fe2f353ae3ee))
* **package:** add publishConfig for GitHub npm registry ([57fd1b5](https://github.com/LordCrainer/adaptcv-frontend/commit/57fd1b54b73bdfe5be8f9bc7fd86a460e92b20ed))

# [1.3.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.8...v1.3.0) (2025-04-03)


### Features

* **i18n:** add English and Spanish translations and configure i18n support ([9e9418a](https://github.com/LordCrainer/adaptcv-frontend/commit/9e9418aa4cf1e0a6385ec3a052f54b447c76e1bf))
* **layout:** replace NuxtRouteAnnouncer and NuxtWelcome with NuxtLayout and NuxtPage ([239f2e1](https://github.com/LordCrainer/adaptcv-frontend/commit/239f2e10a82068213b57392d4815fe2f353ae3ee))
* **package:** add publishConfig for GitHub npm registry ([57fd1b5](https://github.com/LordCrainer/adaptcv-frontend/commit/57fd1b54b73bdfe5be8f9bc7fd86a460e92b20ed))

## [1.2.8](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.7...v1.2.8) (2025-04-03)


### Bug Fixes

* **husky:** remove remote changes verification from pre-commit hook ([f6dbbfc](https://github.com/LordCrainer/adaptcv-frontend/commit/f6dbbfce4bf48335bc661721b70ef0c69108057a))

## [1.2.8](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.7...v1.2.8) (2025-04-03)


### Bug Fixes

* **husky:** remove remote changes verification from pre-commit hook ([f6dbbfc](https://github.com/LordCrainer/adaptcv-frontend/commit/f6dbbfce4bf48335bc661721b70ef0c69108057a))

## [1.2.7](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.6...v1.2.7) (2025-04-03)


### Bug Fixes

* **husky:** add blank line for improved readability in pre-commit hook ([34ffd7f](https://github.com/LordCrainer/adaptcv-frontend/commit/34ffd7f55d7f681e93adab859a29e296a7b940b8))
* **husky:** remove unnecessary blank line in pre-commit hook ([5e6deec](https://github.com/LordCrainer/adaptcv-frontend/commit/5e6deecf438aeb20751cc4b175264c0a23d4ce73))
* **husky:** simplify pre-commit hook by removing local changes stashing and using direct pull ([f02b216](https://github.com/LordCrainer/adaptcv-frontend/commit/f02b216eda4242e5b7a2eddc8f34d53ced4789b6))

## [1.2.7](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.6...v1.2.7) (2025-04-03)


### Bug Fixes

* **husky:** add blank line for improved readability in pre-commit hook ([34ffd7f](https://github.com/LordCrainer/adaptcv-frontend/commit/34ffd7f55d7f681e93adab859a29e296a7b940b8))
* **husky:** remove unnecessary blank line in pre-commit hook ([5e6deec](https://github.com/LordCrainer/adaptcv-frontend/commit/5e6deecf438aeb20751cc4b175264c0a23d4ce73))
* **husky:** simplify pre-commit hook by removing local changes stashing and using direct pull ([f02b216](https://github.com/LordCrainer/adaptcv-frontend/commit/f02b216eda4242e5b7a2eddc8f34d53ced4789b6))

## [1.2.6](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.5...v1.2.6) (2025-04-03)


### Bug Fixes

* **husky:** remove local changes stashing from pre-commit hook ([ae68857](https://github.com/LordCrainer/adaptcv-frontend/commit/ae688572754da1ce6bc2b34b33c639f2e150477d))

## [1.2.6](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.5...v1.2.6) (2025-04-03)


### Bug Fixes

* **husky:** remove local changes stashing from pre-commit hook ([ae68857](https://github.com/LordCrainer/adaptcv-frontend/commit/ae688572754da1ce6bc2b34b33c639f2e150477d))

## [1.2.5](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.4...v1.2.5) (2025-04-03)


### Bug Fixes

* **husky:** improve pre-commit hook to handle local changes before pulling ([2acb31d](https://github.com/LordCrainer/adaptcv-frontend/commit/2acb31d75735c9438d957e137de977aca5aec058))

## [1.2.5](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.4...v1.2.5) (2025-04-03)


### Bug Fixes

* **husky:** improve pre-commit hook to handle local changes before pulling ([2acb31d](https://github.com/LordCrainer/adaptcv-frontend/commit/2acb31d75735c9438d957e137de977aca5aec058))

## [1.2.4](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.3...v1.2.4) (2025-04-03)


### Bug Fixes

* **husky:** enhance pre-commit hook to auto-stash and reapply local changes ([c40e35e](https://github.com/LordCrainer/adaptcv-frontend/commit/c40e35eea5091da935e3c2fff761602e01d412b4))

## [1.2.4](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.3...v1.2.4) (2025-04-03)


### Bug Fixes

* **husky:** enhance pre-commit hook to auto-stash and reapply local changes ([c40e35e](https://github.com/LordCrainer/adaptcv-frontend/commit/c40e35eea5091da935e3c2fff761602e01d412b4))

## [1.2.3](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.2...v1.2.3) (2025-04-03)


### Bug Fixes

* **husky:** remove success message from pre-commit hook ([38de027](https://github.com/LordCrainer/adaptcv-frontend/commit/38de027d3d5881e54bd7390fbe6c3b9a1eaede82))

## [1.2.3](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.2...v1.2.3) (2025-04-03)


### Bug Fixes

* **husky:** remove success message from pre-commit hook ([38de027](https://github.com/LordCrainer/adaptcv-frontend/commit/38de027d3d5881e54bd7390fbe6c3b9a1eaede82))

## [1.2.2](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.1...v1.2.2) (2025-04-03)


### Bug Fixes

* **husky:** remove unnecessary comment from pre-commit hook ([f619214](https://github.com/LordCrainer/adaptcv-frontend/commit/f61921427be364819446f465d6bf9846ee27b37d))

## [1.2.2](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.1...v1.2.2) (2025-04-03)


### Bug Fixes

* **husky:** remove unnecessary comment from pre-commit hook ([f619214](https://github.com/LordCrainer/adaptcv-frontend/commit/f61921427be364819446f465d6bf9846ee27b37d))

## [1.2.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.0...v1.2.1) (2025-04-03)


### Bug Fixes

* **husky:** remove shebang from pre-commit hook script ([cbf12ec](https://github.com/LordCrainer/adaptcv-frontend/commit/cbf12ecd4ea618bf66b1e37fec999b48dca0c41e))

## [1.2.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.2.0...v1.2.1) (2025-04-03)


### Bug Fixes

* **husky:** remove shebang from pre-commit hook script ([cbf12ec](https://github.com/LordCrainer/adaptcv-frontend/commit/cbf12ecd4ea618bf66b1e37fec999b48dca0c41e))

# [1.2.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.1.1...v1.2.0) (2025-04-03)


### Features

* **husky:** enhance pre-commit hook to perform git pull with conflict handling ([44af0f5](https://github.com/LordCrainer/adaptcv-frontend/commit/44af0f5366c7911034b1c2bbb44bbcd750dd627e))

# [1.2.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.1.1...v1.2.0) (2025-04-03)


### Features

* **husky:** enhance pre-commit hook to perform git pull with conflict handling ([44af0f5](https://github.com/LordCrainer/adaptcv-frontend/commit/44af0f5366c7911034b1c2bbb44bbcd750dd627e))

## [1.1.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.1.0...v1.1.1) (2025-04-03)


### Bug Fixes

* **release:** improve cache key and conditional installation for semantic-release ([861f099](https://github.com/LordCrainer/adaptcv-frontend/commit/861f099e51aec41e2adf6fd7ec0aad9a59dc5243))

## [1.1.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.1.0...v1.1.1) (2025-04-03)


### Bug Fixes

* **release:** improve cache key and conditional installation for semantic-release ([861f099](https://github.com/LordCrainer/adaptcv-frontend/commit/861f099e51aec41e2adf6fd7ec0aad9a59dc5243))

# [1.1.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.7...v1.1.0) (2025-04-03)


### Features

* **husky:** add pre-commit hook to pull latest changes and configure husky ([72cebea](https://github.com/LordCrainer/adaptcv-frontend/commit/72cebea99fe4d932005c4ed0df21f15c7bacede0))

# [1.1.0](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.7...v1.1.0) (2025-04-03)


### Features

* **husky:** add pre-commit hook to pull latest changes and configure husky ([72cebea](https://github.com/LordCrainer/adaptcv-frontend/commit/72cebea99fe4d932005c4ed0df21f15c7bacede0))

## [1.0.7](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.6...v1.0.7) (2025-04-03)


### Bug Fixes

* **release:** update cache step identifiers and keys for clarity and consistency ([8a1a4ff](https://github.com/LordCrainer/adaptcv-frontend/commit/8a1a4ffa476394126fe7652b8678466ce99a6e3f))

## [1.0.7](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.6...v1.0.7) (2025-04-03)


### Bug Fixes

* **release:** update cache step identifiers and keys for clarity and consistency ([8a1a4ff](https://github.com/LordCrainer/adaptcv-frontend/commit/8a1a4ffa476394126fe7652b8678466ce99a6e3f))

## [1.0.6](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.5...v1.0.6) (2025-04-03)


### Bug Fixes

* **release:** format cache paths for consistency in release workflow ([9e377aa](https://github.com/LordCrainer/adaptcv-frontend/commit/9e377aa82f949314ba8188bcfb24018cdb8174b5))

## [1.0.6](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.5...v1.0.6) (2025-04-03)


### Bug Fixes

* **release:** format cache paths for consistency in release workflow ([9e377aa](https://github.com/LordCrainer/adaptcv-frontend/commit/9e377aa82f949314ba8188bcfb24018cdb8174b5))

## [1.0.5](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.4...v1.0.5) (2025-04-03)


### Bug Fixes

* **release:** update cache step name for clarity in release workflow ([c106ef6](https://github.com/LordCrainer/adaptcv-frontend/commit/c106ef613fcec402aa187eef3af5bf8c301c740a))

## [1.0.5](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.4...v1.0.5) (2025-04-03)


### Bug Fixes

* **release:** update cache step name for clarity in release workflow ([c106ef6](https://github.com/LordCrainer/adaptcv-frontend/commit/c106ef613fcec402aa187eef3af5bf8c301c740a))

## [1.0.4](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.3...v1.0.4) (2025-04-03)


### Bug Fixes

* **release:** rename job from version_and_publish to version_publish for consistency ([e5457c6](https://github.com/LordCrainer/adaptcv-frontend/commit/e5457c6fec0d42fbb3f16eea3efc3e272ae8476c))
* **release:** update cache configuration to include node_modules and improve clarity ([c43532c](https://github.com/LordCrainer/adaptcv-frontend/commit/c43532c3b9fc2e39036178eaf8ae39cddc0066a8))

## [1.0.4](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.3...v1.0.4) (2025-04-03)


### Bug Fixes

* **release:** rename job from version_and_publish to version_publish for consistency ([e5457c6](https://github.com/LordCrainer/adaptcv-frontend/commit/e5457c6fec0d42fbb3f16eea3efc3e272ae8476c))
* **release:** update cache configuration to include node_modules and improve clarity ([c43532c](https://github.com/LordCrainer/adaptcv-frontend/commit/c43532c3b9fc2e39036178eaf8ae39cddc0066a8))

## [1.0.3](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.2...v1.0.3) (2025-04-03)


### Bug Fixes

* **release:** optimize Bun cache configuration in release workflow ([c01af84](https://github.com/LordCrainer/adaptcv-frontend/commit/c01af84f0d5936e9994f2947c5956a8f2769033a))
* **release:** update step numbers in release workflow for clarity ([981d73d](https://github.com/LordCrainer/adaptcv-frontend/commit/981d73dd1afb259c7eea753fdacb59f23a408f83))

## [1.0.3](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.2...v1.0.3) (2025-04-03)


### Bug Fixes

* **release:** optimize Bun cache configuration in release workflow ([c01af84](https://github.com/LordCrainer/adaptcv-frontend/commit/c01af84f0d5936e9994f2947c5956a8f2769033a))
* **release:** update step numbers in release workflow for clarity ([981d73d](https://github.com/LordCrainer/adaptcv-frontend/commit/981d73dd1afb259c7eea753fdacb59f23a408f83))

## [1.0.2](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.1...v1.0.2) (2025-04-03)


### Bug Fixes

* **release:** update release workflow to cache Bun dependencies and improve installation steps ([a1ddbd4](https://github.com/LordCrainer/adaptcv-frontend/commit/a1ddbd42a72b75f92caa9fc0c833e965c9dce04c))

## [1.0.2](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.1...v1.0.2) (2025-04-03)


### Bug Fixes

* **release:** update release workflow to cache Bun dependencies and improve installation steps ([a1ddbd4](https://github.com/LordCrainer/adaptcv-frontend/commit/a1ddbd42a72b75f92caa9fc0c833e965c9dce04c))

## [1.0.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.0...v1.0.1) (2025-04-03)


### Bug Fixes

* **release:** update permissions in release workflow for write access ([fc86d31](https://github.com/LordCrainer/adaptcv-frontend/commit/fc86d31ec63fa68fbc8d1679a0b0c81740c95340))

## [1.0.1](https://github.com/LordCrainer/adaptcv-frontend/compare/v1.0.0...v1.0.1) (2025-04-03)


### Bug Fixes

* **release:** update permissions in release workflow for write access ([fc86d31](https://github.com/LordCrainer/adaptcv-frontend/commit/fc86d31ec63fa68fbc8d1679a0b0c81740c95340))

# 1.0.0 (2025-04-03)


### Bug Fixes

* **release:** change semantic-release action to run command in release workflow ([4e4ad79](https://github.com/LordCrainer/adaptcv-frontend/commit/4e4ad79cd5a9ab1970275f626cf964b655372443))
* **release:** switch from npm to bun for dependency installation in release workflow ([b0e3cd8](https://github.com/LordCrainer/adaptcv-frontend/commit/b0e3cd8bf81b008e3e0cdf7479eeff076ea00fa1))


### Features

* **init:** initialize Nuxt.js project with TypeScript, ESLint, and basic configuration files ([37217ea](https://github.com/LordCrainer/adaptcv-frontend/commit/37217eae998d95e782a7f4c225099e0b854985f3))
* **npm:** add .npmignore to exclude unnecessary files from npm package ([f747fca](https://github.com/LordCrainer/adaptcv-frontend/commit/f747fcae3bd92dac9d43585867f895f6cf79520a))
* **release:** add GitHub Actions workflow for automated releases ([a670b78](https://github.com/LordCrainer/adaptcv-frontend/commit/a670b788e6fa1b3da746d4c5e2f41f1dae13aa51))
* **release:** add semantic-release and plugins installation to release workflow ([fd04bf9](https://github.com/LordCrainer/adaptcv-frontend/commit/fd04bf9bc7cb86e8e4c1bc187dbe79935eaf16b6))
* **release:** update release workflow to use bun for dependency installation and semantic-release ([156e739](https://github.com/LordCrainer/adaptcv-frontend/commit/156e73934a07446b764e8a05041a8664626a396f))
* **release:** update release workflow to use oven-sh/setup-bun for dependency installation ([b1c4715](https://github.com/LordCrainer/adaptcv-frontend/commit/b1c47157c67051a30e80c17ff097d1114c0a5352))

# 1.0.0 (2025-04-03)


### Bug Fixes

* **release:** change semantic-release action to run command in release workflow ([4e4ad79](https://github.com/LordCrainer/adaptcv-frontend/commit/4e4ad79cd5a9ab1970275f626cf964b655372443))
* **release:** switch from npm to bun for dependency installation in release workflow ([b0e3cd8](https://github.com/LordCrainer/adaptcv-frontend/commit/b0e3cd8bf81b008e3e0cdf7479eeff076ea00fa1))


### Features

* **init:** initialize Nuxt.js project with TypeScript, ESLint, and basic configuration files ([37217ea](https://github.com/LordCrainer/adaptcv-frontend/commit/37217eae998d95e782a7f4c225099e0b854985f3))
* **npm:** add .npmignore to exclude unnecessary files from npm package ([f747fca](https://github.com/LordCrainer/adaptcv-frontend/commit/f747fcae3bd92dac9d43585867f895f6cf79520a))
* **release:** add GitHub Actions workflow for automated releases ([a670b78](https://github.com/LordCrainer/adaptcv-frontend/commit/a670b788e6fa1b3da746d4c5e2f41f1dae13aa51))
* **release:** add semantic-release and plugins installation to release workflow ([fd04bf9](https://github.com/LordCrainer/adaptcv-frontend/commit/fd04bf9bc7cb86e8e4c1bc187dbe79935eaf16b6))
* **release:** update release workflow to use bun for dependency installation and semantic-release ([156e739](https://github.com/LordCrainer/adaptcv-frontend/commit/156e73934a07446b764e8a05041a8664626a396f))
* **release:** update release workflow to use oven-sh/setup-bun for dependency installation ([b1c4715](https://github.com/LordCrainer/adaptcv-frontend/commit/b1c47157c67051a30e80c17ff097d1114c0a5352))

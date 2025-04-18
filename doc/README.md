# Dev documentation

If you are a developper, this is your entry point.

>This documentation is about the `simple-plant-card` custom dashboard card. If you are looking for information about the `simple-plant` custom device integration, take a look at [@ndesgranges/simple-plant](https://github.com/ndesgranges/simple-plant)

## Files and folders

This project contains the following files and folders

| path              | description                                           |
| ------------------| ----------------------------------------------------- |
| .github/          | Contains Github Actions (CI)                          |
| dist/             | Contains the Exported / bundled code __*__            |
| doc/              | This folder, contains dev documentation               |
| src/              | Contains the source code                              |
| .gitignore        | Files never to commit                                 |
| hacs.json         | HACS configuration                                    |
| LICENCE           | Licence file of the repository                        |
| package-lock.json | All NPM dependencies installed, never modify manually |
| package.json      | List all dependencies and bundle config               |
| preview.png       | Preview image of the card into a dashboard            |
| README.md         | Entry repository description & instructions           |
| tsconfig.json     | Typescript Configuration                              |

> __*__ Do not modify `dist/` sources directly, it may be overwritten, modify sources in `src/`

## Introduction

This card is designed to be used with `simple-plant` integration.
The code is intented to be as understandable as possible.

[Parcel](https://parceljs.org/) is used as
bundler (what basically creates `dist/` from `src/`)

It is coded in typescript for type awarness instead of vanilla javascript.
But the goal is not to bloat the code, but to keep it simple and clean.

# What's next

See [source code documentation](../src/README.md)

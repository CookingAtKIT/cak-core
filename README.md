# Cooking at KIT

This is the NodeJS backend for the Cooking at KIT application

## Usage

**First up**, make sure you have a proper `config.yaml` in place. Take a look at `config.yaml.example` if not.

Then, use yarn to install the required modules. **Please do not use `npm install`**. (Install yarn via `npm -g i yarn` and then do `yarn`)

Use yarn commands `dev`, `build` and `start`.

- `dev` runs the code with `ts-node` (does not update files in the `out` dir)
- `build` transpiles the code to javascript (outputs to the `out` dir)
- `start` runs the javascript in the `out` dir

Always run `build` before `start`. It is recommended to configure your IDE to do this for you.

Make sure you have the `prettier` plugin installed on your IDE for code formatting.

## Contributing

If you spot a bug, an error or have an idea for a feature, you may create a [new issue][new-issue].

Pull-requests are welcome and necessary.

- Call your branches (before requesting to pull) something like `feature/...`, `fix/...` or `docs/...`.
- No request will be merged without commented **code-reviews**.
- Better choose **2+ reviewers**.
- Branches will be deleted after a pull-request is merged.

You will need a GitHub account ([create one][joingithub]) to collaborate.

## Project definition

**Versioning:** [Semantic versioning](https://semver.org/) - `Major.Minor.Patch`

**Technologies:** NodeJS, TypeScript, MongoDB, express

### Code style

Enforced via the `prettier` plugin. Make sure you have it installed (available for VS Code and IntelliJ [...])

## License

Private for now, likely [MIT](https://choosealicense.com/licenses/mit/), once
we make the repository public (likely around `v1.0.0`).

[new-issue]: https://github.com/CookingAtKIT/cak-core/issues/new
[joingithub]: https://github.com/join

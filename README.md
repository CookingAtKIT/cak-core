# Cooking at KIT

This is the core repository of the Cooking at KIT project.
It is supposed to contain a deployable core web-application.

## Contributing

If you help us testing the app and spot a bug, an error or have an idea for a
feature, you may create a [new issue][new-issue].

Pull-requests are welcome and necessary.

+ Call your branches (before requesting to pull) something like `feature/...`, `fix/...` or `docs/...`.
+ No request will be merged without commented **code-reviews**.
+ Better choose **2+ reviewers**.
+ Branches will be deleted after a pull-request is merged.

You will need a GitHub account ([create one][joinGitHub]) to collaborate.

## Project definition

**Versioning:** [Semantic versioning](https://semver.org/) - `Major.Minor.Patch`

**Backend:** NodeJS backend connected to a MariaDB server (MySQL)

**Frontend:** Angular JS, styles with Bootstrap

### The platform

**User logins:** KIT Shibboleth (if possible -> ask SCC) or using `uxxxx@student.kit.edu` mails.

**General Content:** Markdown formatting (-> we need a md-parser)

**Languages:** Recepies in German and English. Automatic translations with google?

### Code style

+ Everything code-related has to be in English (except for issues and docs)

+ curly braces always like this:

```
... {
  ...
}
```

+ space between if and curly braces: `if() {`

## License

Private for now, likely [MIT](https://choosealicense.com/licenses/mit/), once
we make the repository public (likely around `v1.0.0`).

  [new-issue]: https://github.com/CookingAtKIT/cak-core/issues/new
  [joinGitHub]: https://github.com/join

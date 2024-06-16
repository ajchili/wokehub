# wokehub

Silly little rating website for github users.

## How are ratings determined?

User ratings are determined based their publicly visible repositories. Repos are considered **woke** with branch names such as `mainline` or `main`, **sus** with branch names such as `master`, and **okay** for any other branch name.

### a hub cil command can work
```
gh api repos/Hacksore/annie-cam/branches/master/rename -f new_name=main
```

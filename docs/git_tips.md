Git is an awesome piece of software used to track changes in any set of files, between multiple collaborators.

#### Some good reads
* [Start here, if you are new](https://try.github.io/)
* [Git Cheat sheet](https://www.git-tower.com/blog/git-cheat-sheet/)


#### The .gitconfig file

The `.gitconfig` file saves all the local user preferences. You can use use `git config --global -e` to bring up if you are not sure where it is placed. (Typically it is in `~/.gitconfig`)

Below is a sample configuration. I like to define aliases here. Turning on autocorrect is also a good idea.

````
[color]
        ui = auto
[filter "lfs"]
        smudge = git-lfs smudge %f
        required = true
        clean = git-lfs clean %f
[core]
        excludesfile = ~/.gitignore_global
[help]
        autocorrect = 1
[alias]
        ci = commit
        st = status
        co = checkout
        oneline = log --pretty=oneline
        br = branch
        la = log --pretty="format:%ad %h (%an): %s" --date=short
[user]
        name = Bajal, M
        email = xxx@xxx.com
````


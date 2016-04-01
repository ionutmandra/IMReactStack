Assuming you have forked and cloned the repository

1. Update your origin master branch
	2. `git checkout master`
	3. `git fetch upstream master`
  4. `git rebse upstream/master`
	5. `git push origin master`
2. Create feature branch from origin master `git checkout -b <feature-branch-name>`
3. If you need to add new icons follow [the guide on fonts](link-to-fonts)
4. Finish work on feature branch
5. Update master branch as in 1
6. Apply your branch commits on top of the updated master
	7. `git checkout <feature-branch-name>`
	8. `git rebase master`
9. Finish rebase
10. Push branch to repository `git push origin <feature-branch-name>`
11. Go to [github](www.github.com)
12. Create [Pull Request](https://help.github.com/articles/creating-a-pull-request/)
	13. In the description of the Pull Request add a link to the task in Jira
14. Finish Creating Pull Request
15. Add flag to task in Jira and let the task in Dev Progress

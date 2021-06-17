// 在 git commit 时调用，用来检测commit的格式是否符合要求

const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /^((revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: |Merge).{1,200}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`git commit 提交的信息无效`)}\n\n` +
      chalk.red(`  请参考 .github/commit-convention.md 中的例子，如:\n\n`) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  你可以使用 ${chalk.cyan(`npm run commit`)} 来方便制定你 git commit 提交的信息.\n`)
  )
  process.exit(1)
}

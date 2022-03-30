/*
 * @Author: will
 * @Date: 2022-03-30 11:59:53
 * @LastEditTime: 2022-03-30 15:18:45
 * @LastEditors: will
 * @Description:
 */
const chalk = require('chalk');
const path = require('path');
const msgPaths = path.resolve('.git/COMMIT_EDITMSG');
console.log('msgPaths', msgPaths);
let msg = require('fs').readFileSync(msgPaths, 'utf-8').trim();
console.log('===', msg);
const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|types|revert|build)(\(.+\))?: .{1,50}/;
if (msg.includes('Merge branch')) {
  // 自动合并不加验证
} else {
  if (!commitRE.test(msg)) {
    console.error(
      `\n  ${chalk.bgRed.white('ERROR: ')} ${chalk.red(`boss，您的提交信息不符合规范`)}\n\n` +
        chalk.red(`  为了最终生成好的CHANGELOG，请按规范提交信息\n\n`) +
        `  ${chalk.green(`例如 :类型表情(可选):[类型] 本次提交主题`)}\n\n` +
        chalk.red(`  可以运行 ${chalk.cyan(`npm run commit`)}按照提示生成提交信息\n`),
    );
    process.exit(1);
  } else {
    console.log(`${chalk.green('恭喜提交通过√')}`);
  }
}
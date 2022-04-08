module.exports = {
  // 可选类型
  types: [
    { value: 'init', name: 'init:      初始提交' },
    { value: 'feat', name: 'feat:      新功能' },
    { value: 'fix', name: 'fix:       修复bug' },
    { value: 'ui', name: 'ui:        更新ui' },
    { value: 'docs', name: 'docs:      修改文档' },
    { value: 'style', name: 'style:     样式修改' },
    { value: 'refactor', name: 'refactor:  代码重构' },
    { value: 'pref', name: 'pref:      性能优化' },
    { value: 'test', name: 'test:      增加测试' },
    { value: 'chore', name: 'chore:     更改配置文件' },
    { value: 'add', name: 'add:       添加依赖' },
    { value: 'del', name: 'del:       删除代码或文件' },
    { value: 'revert', name: 'revert:    版本回退' },
    { value: 'build', name: 'build:     打包发布' },
  ],

  // 步骤
  messages: {
    type: '请选择提交的类型；',
    scope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请选择要关闭的issue（可选）',
    confirmCommit: '确认提交？（y/n）',
  },

  // 跳过步骤
  skipQuestions: ['scope', 'body', 'footer'],

  // 默认长度
  subjectLimit: 100,
};

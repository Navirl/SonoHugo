const remark = require('remark');
const frontmatter = require('remark-frontmatter');

remark()
  .use(frontmatter, ['yaml']) // YAML形式のfrontmatterを解析
  .process('---\ntags: [obsidian/tag/nested]\n---\nContent', (err, file) => {
    console.log(file);
  });

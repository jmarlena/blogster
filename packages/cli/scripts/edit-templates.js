'use strict';

const path = require('path');
const fs = require('fs-extra');
const { editPackageJson } = require('./edit/package-json');
const { editAstroConfig } = require('./edit/astro-config');
const { copySharedLibSeo } = require('./edit/shared-lib-seo');
const { copySharedLibMarkdoc } = require('./edit/shared-lib-markdoc');

async function editTemplate(theme) {
  process.stdout.write('\n');
  console.log(`...Editing template: ${theme}`);

  // edit package.json name
  await editPackageJson(theme);
  // copy astro.config.mjs
  await editAstroConfig(theme);
  // copy seo.ts and edit imports
  await copySharedLibSeo(theme);
  // copy markdoc dir and edit imports
  await copySharedLibMarkdoc(theme);

  console.log(`✅ Edited template: ${theme}`);
  process.stdout.write('\n');
}

(async () => {
  await fs.ensureDirSync(
    path.join(path.normalize(`${__dirname}/../templates`))
  );
  const themes = ['minimal', 'sleek'];
  // edit all templates - copy from shared packages and edit file imports
  for (const theme of themes) {
    await editTemplate(theme);
  }
})();
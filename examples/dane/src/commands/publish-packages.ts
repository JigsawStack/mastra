import chalk from 'chalk';

import { mastra } from '../mastra/index.js';

export async function publishPackages() {
  console.log(chalk.green("Hi! I'm Dane!"));
  console.log(chalk.green('Let me publish your packages..\n'));

  const workflow = mastra.getWorkflow('packagePublisher');

  const result = await workflow.execute();

  console.log(result);
}
import fs from 'node:fs';
import path from 'node:path';

import yaml from 'yaml';

const filePath = path.join(process.cwd(), 'config.yml');
let cachedConfig: Config | null = null;

// Listen for changes to the config file
let debounceTimeout: NodeJS.Timeout | null = null;
fs.watch(filePath, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    cachedConfig = null;
  }, 100); // 100ms debounce
});

export const getConfig = (): Config => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const parsedConfig = yaml.parse(fileContents) as Config;

  // Validate the config format
  if (!parsedConfig) {
    throw new Error('Invalid config format');
  }

  cachedConfig = parsedConfig;
  return cachedConfig;
};

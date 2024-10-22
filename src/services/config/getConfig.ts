import { Config } from '@/types';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export const getConfig = (): Config => {
  const filePath = path.join(process.cwd(), 'config.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const config = yaml.parse(fileContents) as Config;
  return config;
};

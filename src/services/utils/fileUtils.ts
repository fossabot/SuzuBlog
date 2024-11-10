import fs from 'node:fs';
import path from 'node:path';

// Define the path to the config file
const filePath = path.join(process.cwd(), 'config.yml');

// Check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Watch the config file with debounce
let debounceTimeout: NodeJS.Timeout | null = null;
function watchConfigFile(callback: () => void): void {
  fs.watch(filePath, () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      callback();
    }, 100);
  });
}

// Format date and time to 'YYYY-MM-DD HH:mm:ss'
function formatDateTime(dateTime: string): string {
  const [date, time] = dateTime.includes(' ')
    ? dateTime.split(' ')
    : [dateTime, ''];
  return `${/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : ''} ${/^\d{2}:\d{2}:\d{2}$/.test(time) ? time : '00:00:00'}`;
}

export { fileExists, filePath, formatDateTime, watchConfigFile };

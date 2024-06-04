import {exec} from 'child_process';

export function getYarnCachePath() {
  return new Promise<string>((resolve, reject) => {
    exec('yarn config get cacheFolder', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error.message);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return reject(stderr);
      }

      return resolve(stdout.trim());
    });
  });
}

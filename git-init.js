const git = require('./CampusConnect/frontend/node_modules/isomorphic-git');
const fs = require('fs');
const path = require('path');

const repoDir = 'D:/campusconnect';

async function initAndCommit() {
  try {
    const gitDir = path.join(repoDir, '.git');
    if (!fs.existsSync(gitDir)) {
      console.log('Initializing repository at:', repoDir);
      await git.init({ fs, dir: repoDir, defaultBranch: 'main' });
    }

    console.log('Listing and staging files...');
    const statusMatrix = await git.statusMatrix({
      fs,
      dir: repoDir,
      filter: f => !f.includes('node_modules') && !f.includes('target') && !f.includes('.git')
    });

    for (const [filepath, head, workdir, stage] of statusMatrix) {
      if (workdir !== 0) {
        await git.add({ fs, dir: repoDir, filepath });
      } else if (head === 1 && workdir === 0) {
        await git.remove({ fs, dir: repoDir, filepath });
      }
    }

    console.log('Committing changes...');
    const sha = await git.commit({
      fs,
      dir: repoDir,
      author: {
        name: 'CampusConnect User',
        email: 'user@campusconnect.local',
      },
      message: 'Initial commit: Complete CampusConnect application with Railway and Vercel configs'
    });

    console.log('SUCCESS: Committed with SHA:', sha);
  } catch (err) {
    console.error('Git operation failed:', err);
  }
}

initAndCommit();

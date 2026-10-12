const git = require('./CampusConnect/frontend/node_modules/isomorphic-git');
const http = require('./CampusConnect/frontend/node_modules/isomorphic-git/http/node');
const fs = require('fs');

const repoDir = 'D:/campusconnect';

// Set these when running or pass via command line:
// node push-to-github.js <GITHUB_URL> <GITHUB_TOKEN_OR_PASSWORD> <GITHUB_USERNAME>
const remoteUrl = process.argv[2];
const token = process.argv[3];
const username = process.argv[4] || 'git';

async function push() {
  if (!remoteUrl || !token) {
    console.log('Usage: node push-to-github.js <REMOTE_URL> <GITHUB_TOKEN> [USERNAME]');
    console.log('Example: node push-to-github.js https://github.com/myuser/campusconnect.git ghp_xxxx myuser');
    process.exit(1);
  }

  try {
    console.log('Pushing to GitHub remote:', remoteUrl);
    await git.push({
      fs,
      http,
      dir: repoDir,
      remote: 'origin',
      ref: 'main',
      url: remoteUrl,
      force: true,
      onAuth: () => ({
        username: username,
        password: token,
      }),
    });
    console.log('✅ Successfully pushed main branch to GitHub!');
  } catch (err) {
    console.error('❌ Push failed:', err);
  }
}

push();

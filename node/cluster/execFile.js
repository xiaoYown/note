// function doExecFile () {
//   const { execFile } = require('child_process');
//   const child = execFile('node', ['server.js'], (error, stdout, stderr) => {
//     if (error) {
//       throw error;
//     }
//     console.log(stdout);
//   });
// }
const cluster = require("cluster");

function createClient () {
  const { spawn } = require('child_process');

  const subprocess = spawn('node', ['server.js'], {
    detached: true,
    // stdio: 'ignore'
  });

  subprocess.unref();
}

function spawnFile () {
  console.log(process.argv[2]);

  switch (process.argv[2]) {
    case 'start':
      createClient();
      break;
    case 'stop':
      break;
    default:
      console.log('no actiion');
  }
}

spawnFile();

// console.log(cluster.isMaster)
// if (cluster.isMaster) {
//   cluster.fork();
//   process.exit(0);
// } else {
//   spawnFile();
// }

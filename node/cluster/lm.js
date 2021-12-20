// function doExecFile () {
//   const { execFile } = require('child_process');
//   const child = execFile('node', ['server.js'], (error, stdout, stderr) => {
//     if (error) {
//       throw error;
//     }
//     console.log(stdout);
//   });
// }
// const cluster = require("cluster");

function createClient () {
  const { spawn } = require('child_process');

  const subprocess = spawn('node', ['repeater.js'], {
    detached: true,
    stdio: 'ignore'
  });

  subprocess.unref();
}

function spawnFile () {
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

// spawnFile();

// process.env.Z_S = 1;

console.log(process.env);

// console.log(cluster.isMaster)
// if (cluster.isMaster) {
//   cluster.fork();
//   process.exit(0);
// } else {
//   spawnFile();
// }

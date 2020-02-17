const exec = require('child_process').exec;
const path = require('path');
const Axios = require('axios');
const { promisify } = require('util');

const execAsync = promisify(exec);

const data = `Running 15s test @ http://localhost:3004
50 threads and 50 connections
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    18.13ms    8.67ms  72.81ms   67.81%
  Req/Sec    55.81     17.85   130.00     74.35%
42038 requests in 15.10s, 20.41MB read
Requests/sec:   2784.28
Transfer/sec:      1.35MB`;

function parseWrkResponse(data) {
  const totalRequests = parseInt(data.match(/\d+ requests/gi)[0].split(' ')[0]);
  const requestsPerSecond = parseFloat(
    data
      .match(/requests\/sec: +\d+\.*\d*/gi)[0]
      .replace(/ {2,}/gi, ' ')
      .split(' ')[1]
  );
  return { totalRequests, requestsPerSecond };
}

async function main() {
  await runTest('express-server');
  await runTest('fastify-server');
  await runTest('koa-server');
  await runTest('nest-express-server');
  await runTest('nest-fastify-server');
  await runTest('nodejs-raw-server');
}

async function runTest(folder) {
  console.time(`${folder} built`);
  await execAsync(`cd ${path.join(__dirname, '..', folder)} && docker build . -t ${folder}:1`);
  console.timeEnd(`${folder} built`);

  console.time(`${folder} started`);
  await execAsync(`docker run --rm -d -p 3000:3000 -e PORT=3000 --name ${folder} ${folder}:1`);
  console.timeEnd(`${folder} started`);

  console.time(`${folder} echo OK`);
  await echoCheck(3000, folder);
  console.timeEnd(`${folder} echo OK`);

  console.log(`${folder} testing run...`);
  const resultIndex = await runBenchmark(3000, '/');
  const resultJson = await runBenchmark(3000, '/json');

  console.log(folder, '/', resultIndex);
  console.log(folder, '/json', resultJson);

  console.time(`${folder} killed`);
  await execAsync(`docker kill ${folder}`);
  console.timeEnd(`${folder} killed`);
}

async function echoCheck(port, label) {
  for (let i = 0; i < 10; i++) {
    try {
      await Axios.get(`http://localhost:${port}/echo`);
      return;
    } catch (e) {
      console.log(`${label}: failed ${i + 1}`);
      await sleepAsync(1000);
    }
  }
  throw new Error('Unable to continue');
}

function sleepAsync(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function runBenchmark(port, path) {
  const { stdout } = await execAsync(`wrk -c 50 -t 50 -d 15 http://localhost:${port}${path}`);
  let totalRps = 0;
  let totalReqs = 0;
  for (let i = 0; i < 10; i++) {
    const { stdout } = await execAsync(`wrk -c 50 -t 50 -d 15 http://localhost:${port}${path}`);
    const data = parseWrkResponse(stdout);
    totalRps += data.requestsPerSecond;
    totalReqs += data.totalRequests;
  }
  return {
    totalRps: totalRps / 10,
    totalReqs: totalReqs / 10,
  };
}

main().catch(console.error);

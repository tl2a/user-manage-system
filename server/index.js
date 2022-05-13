const fs = require('fs');

let rawdata = fs.readFileSync('./DB/user-data.json');
let data = JSON.parse(rawdata);

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('@fastify/cors'), { 
  // put your options here
})

fastify.get('/', async (request, reply) => {
  reply.send(data)
})

fastify.post('/', async (request, reply) => {
  let data = JSON.stringify(request.body);
  fs.writeFileSync('./DB/user-data.json', data);

  return reply.send('Updated')
})


const start = async () => {
  try {
    await fastify.listen(3002, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
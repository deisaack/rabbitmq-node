const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'deisaacktest';
// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        channel.assertQueue(QUEUE_NAME);
        // Step 4: Receive Messages
        channel.consume(QUEUE_NAME, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
    })
})
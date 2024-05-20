import { assert } from "chai";
import { io } from "socket.io-client";
const serverUrl = 'http://localhost:3000';

describe('Socket.io test', function() {
  let client1, client2;
  
  before(function(done) {
    // Connect to the server
    client1 = io.connect(serverUrl);
    client2 = io.connect(serverUrl);
    done();
  });

  after(function(done) {
    // Disconnect from the server
    client1.disconnect();
    client2.disconnect();
    done();
  });

  it('Should be able to send and receive messages', function(done) {
    client1.emit('message', 'Hello, world!');
    client2.on('message', function(msg) {
      assert.equal(msg, 'Hello, world!');
      done();
    });
  });
});
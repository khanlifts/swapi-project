var expect = require('expect');

var {generateMessage} = require('./message');

describe('New message generator', () => {
  it('should generate a correct new message', () => {
    var text = "You shall not pass";
    var message = generateMessage(text);
    
    expect(message.text).toBe(text);
  });
});

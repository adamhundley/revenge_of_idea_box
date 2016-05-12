//= require editIdeas

describe('truncateBody', function () {
  it('truncates strings over 100 characters to the nearest word', function () {

    var over100String = 'Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.';

    var result = 'Four score and seven years ago our fathers brought forth on this continent a new nation, conceived...';

    expect(result).to.equal(truncateBody(over100String));
  });

});

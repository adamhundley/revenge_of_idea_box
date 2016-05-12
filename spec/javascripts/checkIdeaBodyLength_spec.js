//= require home

describe('checkIdeaBodyLength', function () {
  it('checks the body length and returns the same if lentgth under 100', function () {

    var string = 'Four score and seven years ago our fathers';

    var result = 'Four score and seven years ago our fathers';

    expect(result).to.equal(checkIdeaBodyLength(string));
  });

});

describe('checkIdeaBodyLength', function () {
  it('checks the body length and returns truncated body if length over 100', function () {

    var string = 'Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war.';

    var result = 'Four score and seven years ago our fathers brought forth on this continent a new nation, conceived...';

    expect(result).to.equal(checkIdeaBodyLength(string));
  });

});

'use strict';

require('react-dom');
require('should');
const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');
const InputWithButton =
  require('../../../src/client/js/components/InputWithButton').default;

describe('Tests for InputWithButton component', () => {
  it('should render correct submit text', () => {
    const testTitle = 'testTitle';
    const component = TestUtils
      .renderIntoDocument(<InputWithButton submitTitle={testTitle}/>);
    const submitButton = TestUtils
      .findRenderedDOMComponentWithClass(component, 'btn-submit');

    submitButton.textContent.should.equal(testTitle);
  });

  it('should render input field', () => {
    const component = TestUtils.renderIntoDocument(<InputWithButton/>);
    TestUtils.findRenderedDOMComponentWithTag(component, 'input');
  });

  it('should register submit handler', () => {
    const onSubmit = sinon.spy();
    const testInput = 'testInput';

    const component = TestUtils
      .renderIntoDocument(<InputWithButton onSubmit={onSubmit}/>);
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    const submitButton = TestUtils
      .findRenderedDOMComponentWithClass(component, 'btn-submit');

    input.value = testInput;
    TestUtils.Simulate.change(input);
    TestUtils.Simulate.click(submitButton);

    onSubmit.called.should.equal(true);
    onSubmit.getCall(0).args[0].should.equal(testInput);
  });

});

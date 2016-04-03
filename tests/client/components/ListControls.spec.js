'use strict';

require('react-dom');
require('should');
const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');

const InputWithButton =
  require('../../../src/client/js/components/InputWithButton').default;
const ListControls =
  require('../../../src/client/js/components/ListControls').default;

describe('Tests for EntryList component', () => {
  it('should render input for adding new entry', () => {
    const component = TestUtils
      .renderIntoDocument(<ListControls/>);
    const renderedInputElements = TestUtils
      .scryRenderedComponentsWithType(component, InputWithButton);

    renderedInputElements.length.should.equal(1);
  });

  it('should register submit button events handler', () => {
    const handler = sinon.spy();

    const component = TestUtils
      .renderIntoDocument(
        <ListControls onAddEntry={handler}/>
      );

    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    const submitButton = TestUtils
      .findRenderedDOMComponentWithClass(component, 'btn-submit');

    input.value = 'someval';
    TestUtils.Simulate.change(input);
    TestUtils.Simulate.click(submitButton);

    handler.called.should.equal(true);
  });

});

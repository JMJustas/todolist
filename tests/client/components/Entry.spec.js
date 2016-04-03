'use strict';

require('should');
const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');


const Entry = require('../../../src/client/js/components/Entry').default;

const testData = [
  {id: '1', title: 'title1', completed: false},
  {id: '2', title: 'title2', completed: true}
];


describe('Tests for Entry component', () => {
  it('should render title', () => {
    const entry = testData[0];
    const component = TestUtils.renderIntoDocument(<Entry entry={entry}/>);
    const title = TestUtils
      .findRenderedDOMComponentWithClass(component, 'entry-title');

    title.textContent.should.equal(entry.title);
  });

  it('should render "complete" button if todo entry is not completed', () => {
    const component = TestUtils
      .renderIntoDocument(<Entry entry={testData[0]}/>);

    const buttons = TestUtils
      .scryRenderedDOMComponentsWithClass(component, 'btn-complete');

    buttons.length.should.equal(1);
  });

  it('should NOT render "complete" button if todo entry is completed', () => {
    const component = TestUtils
      .renderIntoDocument(<Entry entry={testData[1]}/>);

    const buttons = TestUtils
      .scryRenderedDOMComponentsWithClass(component, 'btn-complete');

    buttons.length.should.equal(0);

  });

  it ('should call "onComplete" on "complete" button click', () => {
    const entry = testData[0];
    const onComplete = sinon.spy();

    const component = TestUtils
      .renderIntoDocument(<Entry entry={entry} onComplete={onComplete}/>);

    const completeButton = TestUtils
      .findRenderedDOMComponentWithClass(component, 'btn-complete');

    TestUtils.Simulate.click(completeButton);

    onComplete.called.should.equal(true);
    onComplete.callCount.should.equal(1);
    onComplete.getCall(0).args.length.should.equal(1);
    onComplete.getCall(0).args[0].should.equal(entry.id);

  });
});

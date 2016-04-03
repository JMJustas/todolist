'use strict';

require('should');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react/lib/ReactTestUtils');

const ListControls =
  require('../../../src/client/js/components/ListControls').default;
const EntriesList =
  require('../../../src/client/js/components/EntriesList').default;

const TodosApp =
  require('../../../src/client/js/components/TodosApp').default;

let entryServiceStub = null;

describe('Tests for TodosApp component', () => {
  beforeEach(() => {
    entryServiceStub = {
      data: [],
      load: function () {},
      create: function () {},
      complete: function () {},
      register: function () {},
      unregister: function () {}
    };
  });

  it('should render ListControls', () => {
    const component = TestUtils
      .renderIntoDocument(<TodosApp entryService={entryServiceStub}/>);
    const listControls = TestUtils
      .findRenderedComponentWithType(component, ListControls);

    listControls.props.onAddEntry.should.equal(entryServiceStub.create);
  });

  it('should render EntriesList', () => {
    const component = TestUtils
      .renderIntoDocument(<TodosApp entryService={entryServiceStub}/>);
    const entriesList = TestUtils
      .findRenderedComponentWithType(component, EntriesList);

    entriesList.props.onComplete.should.equal(entryServiceStub.complete);
    entriesList.props.entries.length.should.equal(0);
  });

  it ('on mount should register with entriesService for data updates', () => {
    const register = sinon.spy(entryServiceStub, 'register');
    TestUtils.renderIntoDocument(<TodosApp entryService={entryServiceStub}/>);

    register.called.should.equal(true);
  });

  it ('on unmount should unregister from entriesService', () => {
    const unregister = sinon.spy(entryServiceStub, 'unregister');

    const container = document.createElement('div');
    ReactDOM.render(<TodosApp entryService={entryServiceStub}/>, container);
    ReactDOM.unmountComponentAtNode(container);

    unregister.called.should.equal(true);
  });

  it ('on mount should start loading data from backend', () => {
    const loadEntries = sinon.spy(entryServiceStub, 'load');
    TestUtils.renderIntoDocument(<TodosApp entryService={entryServiceStub}/>);

    loadEntries.called.should.equal(true);
  });

  it ('should update entries list on data update', () => {
    const testData = [{id: '1', title: 'test', completed: false}];

    const component = TestUtils
      .renderIntoDocument(<TodosApp entryService={entryServiceStub}/>);
    const entriesList = TestUtils
      .findRenderedComponentWithType(component, EntriesList);

    entryServiceStub.data = testData;
    component.dataUpdated();
    entriesList.props.entries.should.equal(entryServiceStub.data);
  });

});

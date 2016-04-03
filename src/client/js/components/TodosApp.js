import React from 'react';
import ListControls from './ListControls';
import EntriesList from './EntriesList';

/**
 * Manages todos list state and listens for data changes
 */
export default class TodosApp extends React.Component {

  constructor(props) {
    super(props);
    this.entryService = this.props.entryService;
    this.state = {entries: []};
    this.dataUpdated = this.dataUpdated.bind(this);
  }

  static get propTypes() {
    return {
      entryService: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    this.entryService.register(this.dataUpdated);
    this.entryService.load();
  }

  dataUpdated() {
    this.setState({entries: this.entryService.data});
  }

  componentWillUnmount() {
    this.entryService.unregister(this.dataUpdated);
  }

  render() {
    return (
        <div className="Todos-App">
          <ListControls onAddEntry={this.entryService.create}/>
          <EntriesList entries={this.state.entries}
                       onComplete={this.entryService.complete}
            />
        </div>
      );
  }
}

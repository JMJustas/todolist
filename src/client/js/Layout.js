/**
* Layout for the whole page
*/

import React from 'react';

import EntryService from './services/EntryService';
import Header from './Header';
import TodosApp from './components/TodosApp';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="full-height">
         <Header heading="A simple TODO app"/>
         <div className="container full-height">
           <div className="row">
             <TodosApp entryService={new EntryService()}/>
           </div>
         </div>
      </div>
    );
  }
}

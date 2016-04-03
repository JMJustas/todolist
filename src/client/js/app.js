'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TodosApp from './components/TodosApp';
import EntryService from './services/EntryService';

const app = document.getElementById('app');
ReactDOM.render(<TodosApp entryService={new EntryService}/>, app);

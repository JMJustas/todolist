'use strict';
import axios from 'axios';
import EventEmitter from 'events';

/**
 * This class is responsible for managing Entry data. It will notify all
 * registered observers that are registered for a "dataUpdated" event when data
 * changes.
 */

class EntryService extends EventEmitter {
  constructor() {
    super();
    this.data = [];
    this.load = this.load.bind(this);
    this.create = this.create.bind(this);
    this.complete = this.complete.bind(this);
  }

  /**
   * registers listener for "dataUpdated" event
   * @param {Function} listener noargs function that will be called on data
   * change
   *
   * @return {*} nothing
   */
  register(listener) {
    this.on('dataUpdated', listener);
  }

  /**
   * unregisters listener from "dataUpdated" event
   * @param {Function} listener noargs function that will be called on data
   * change
   *
   * @return {*} nothing
   */
  unregister(listener) {
    this.removeListener('dataUpdated', listener);
  }


  /**
   * notifies registered listeners about data changes
   *
   * @return {*} nothing
   */
  dataUpdated() {
    this.emit('dataUpdated');
  }

  /**
   * Loads entries data from backend and notifies observers about data change
   * @return {*} promise for operation completion
   */
  load() {
    return axios.get('/entries?completed=false')
      .then((resp) => {
        this.data = resp.data;
        this.dataUpdated();
      })
      .catch(console.error);
  }

  /**
   * Creates a new entry in backend and notifies observers about data change
   * @param {String} title entry title
   * @return {*} promise for operation completion
   */
  create(title) {
    if (!title)
      throw new Error('No title provided!');

    return axios.post('/entries', {title})
      .then((resp) => {
        this.data.push(resp.data);
        this.dataUpdated();
      })
      .catch(console.error);
  }

  /**
   * Marks an entry as completed in backend and notifies observers about data
   * change
   * @param {String} id entry id
   * @return {*} promise for operation completion
   */
  complete(id) {
    if (!id)
      throw new Error('No id provided!');

    const entry = this.data.filter((el) => el.id === id)[0];
    if (!entry)
      throw new Error(`Unknown entry id: ${id}`);

    const payload = {id, title: entry.title, completed: true};
    return axios.put(`/entries/${id}`, payload)
      .then(() => {
        entry.completed = true;
        this.dataUpdated();
      })
      .catch(console.error);
  }


}

export default EntryService;

import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../db/constants/AppConstants';

const CHANGE_EVENT = 'change';

let _models = [];
let _selectedModel = {};
let _loadingError = null;
let _isLoading = true;

function formatModel(model) {
  return {
    id: model._id,
    name: model.name,
  };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getModels() {
    return _models;
  },

  getSelectedModel() {
    return _selectedModel;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  console.log("store register");
  switch (action.type) {
    case AppConstants.LOAD_MODELS_REQUEST: {
      _isLoading = true;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_MODELS_SUCCESS: {
      _isLoading = false;
      _models = action.models.map(formatModel);
      _loadingError = null;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_MODELS_FAIL: {
      _loadingError = action.error;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_MODEL_SUCCESS: {
      _isLoading = false;
      _selectedModel = action.model;
      _loadingError = null;

      TasksStore.emitChange();
      action.callback();
      break;
    }

    default: {
      console.log('No such handler');
    }
  }
});

export default TasksStore;

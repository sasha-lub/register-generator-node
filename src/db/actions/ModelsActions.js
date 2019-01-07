import AppDispatcher from '../../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ModelActions = {
    loadModels() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_MODELS_REQUEST
        });
        api.listModels()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MODELS_SUCCESS,
                models: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MODELS_FAIL,
                error: err
            })
        );
    },

  loadSingleModel(name, callback) {
    api.findModel(name)
      .then(({ data }) =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_MODEL_SUCCESS,
          model: data,
          callback: callback
        }),
      )
      .catch(err =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_MODELS_FAIL,
          error: err
        })
      );
    },

    createModel(model) {
      api.createModel(model)
        .catch(err =>
            console.error(err)
        );
    },

    deleteModel(modelId) {
        api.deleteModel(modelId)
        .then(() =>
            this.loadModels()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default ModelActions;

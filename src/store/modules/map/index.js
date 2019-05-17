import { mapGettersFromStates } from "../../helpers";
import {
  SET_BASELAYER_VISIBILITY,
  SET_LAYER_VISIBILITY,
  SET_MULTI_INFO,
  SET_DRAW_TYPE,
  SET_SELECTED_FEATURE,
  SET_ACTIVE_TREE_ITEM,
  SET_ACTIVE_LAYER,
  SET_MEASURE_OUTPUT
} from "../mutation-types";
import { baseLayers, layers, utilityLayers } from "./mapLayers";
const state = {
  baseLayersList: Object.keys(baseLayers),
  baseLayers,
  layersList: Object.keys(layers),
  layers,
  utilityLayersList: Object.keys(utilityLayers),
  utilityLayers,
  drawType: undefined,
  measureOutput: "",
  selectedFeature: [],
  activeTreeItem: [],
  multiInfo: false,
  activeLayer: null
};
const getters = {
  ...mapGettersFromStates({
    states: state
  })
};

const mutations = {
  [SET_BASELAYER_VISIBILITY](state, { id, value }) {
    state.baseLayers[id].visible = value;
  },
  [SET_LAYER_VISIBILITY](state, { id, value }) {
    state.layers[id].visible = value;
  },
  [SET_MULTI_INFO](state, payload) {
    state.multiInfo = payload;
  },
  [SET_DRAW_TYPE](state, payload) {
    state.drawType = payload;
  },
  [SET_SELECTED_FEATURE](state, payload) {
    state.selectedFeature = payload;
  },
  [SET_ACTIVE_TREE_ITEM](state, payload) {
    state.activeTreeItem = payload;
  },
  [SET_ACTIVE_LAYER](state, { value }) {
    state.activeLayer = value;
  },
  [SET_MEASURE_OUTPUT](state, payload) {
    state.measureOutput = payload;
  }
};
const actions = {
  UPDATE_VISIBILITY({ commit }, { id, value }) {
    if (state.baseLayersList.includes(id)) {
      /* first find and change Clicked Base Layer Visibility */
      commit("SET_BASELAYER_VISIBILITY", { id, value });
      /* then find and change other Base Layers Visibility*/
      Object.keys(state.baseLayers).forEach(i => {
        if (i !== id) {
          commit("SET_BASELAYER_VISIBILITY", { id: i, value: !value });
        }
      });
      /* handle other layers */
    } else if (!state.baseLayersList.includes(id)) {
      commit("SET_LAYER_VISIBILITY", { id, value });
    }
  },
  UPDATE_DRAW_TYPE({ commit }, payload) {
    commit("SET_DRAW_TYPE", payload);
  },
  UPDATE_SELECTED_FEATURE({ commit }, payload) {
    commit("SET_SELECTED_FEATURE", payload);
  },
  UPDATE_ACTIVE_TREE_ITEM({ commit }, payload) {
    commit("SET_ACTIVE_TREE_ITEM", payload);
  },
  UPDATE_MULTI_INFO({ commit }, payload) {
    commit("SET_MULTI_INFO", payload);
  },
  UPDATE_ACTIVE_LAYER({ commit }, payload) {
    commit("SET_ACTIVE_LAYER", payload);
  },
  UPDATE_MEASURE_OUTPUT({ commit }, payload) {
    commit("SET_MEASURE_OUTPUT", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

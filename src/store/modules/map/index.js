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
  baseLayersList: state => state.baseLayersList,
  baseLayers: state => state.baseLayers,
  layersList: state => state.layersList,
  layers: state => state.layers,
  utilityLayersList: state => state.utilityLayersList,
  utilityLayers: state => state.utilityLayers,
  drawType: state => state.drawType,
  selectedFeature: state => state.selectedFeature,
  multiInfo: state => state.multiInfo,
  activeTreeItem: state => state.activeTreeItem,
  activeLayer: state => state.activeLayer,
  measureOutput: state => state.measureOutput
};
const mutations = {
  SET_LAYER_VISIBILITY(state, { item, value }) {
    Object.assign(item, { visible: value });
  },
  SET_NULL_LAYER(state, item) {
    Object.assign(item, { loaded: false });
    console.log(item);
  },
  SET_MULTI_INFO(state, payload) {
    state.multiInfo = payload;
  },
  SET_DRAW_TYPE(state, payload) {
    state.drawType = payload;
  },
  SET_SELECTED_FEATURE(state, payload) {
    state.selectedFeature = payload;
  },
  SET_ACTIVE_TREE_ITEM(state, payload) {
    state.activeTreeItem = payload;
  },
  SET_ACTIVE_LAYER(state, { value }) {
    state.activeLayer = value;
  },
  SET_MEASURE_OUTPUT(state, payload) {
    state.measureOutput = payload;
  }
};
const actions = {
  UPDATE_VISIBILITY({ commit }, { id, value }) {
    let item;
    if (state.baseLayersList.includes(parseInt(id))) {
      /* first find and change Clicked Base Layer Visibility */
      item = state.baseLayers[id];
      commit("SET_LAYER_VISIBILITY", { item, value });
      /* then find and change other Base Layers Visibility*/
      Object.keys(state.baseLayers).forEach(i => {
        if (i !== id) {
          item = state.baseLayers[i];
          let value = false; //! mutation is BAD!!!
          commit("SET_LAYER_VISIBILITY", { item, value });
        }
      });
      /* handle other layers */
    } else if (!state.baseLayersList.includes(parseInt(id))) {
      item = state.layers[id];
      commit("SET_LAYER_VISIBILITY", { item, value });
    }
  },
  NULL_LAYER({ commit }, { id }) {
    let item = state.layers[id];
    console.log(item);
    commit("SET_NULL_LAYER", item);
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

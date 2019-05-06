import { loadingBBox } from "vuelayers/lib/ol-ext";
import { defaultStyle, drawStyle, NaturaStyleFunc } from "./styles";

const state = {
  baseLayersList: [100, 101, 102],
  baseLayers: {
    100: {
      name: "osm",
      title: "OpenStreetMap",
      visible: true
    },
    // 101: {
    //   name: "sputnik",
    //   title: "Sputnik Maps",
    //   visible: false
    // },
    102: {
      name: "bingmaps",
      title: "Bing Maps",
      apiKey:
        "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
      imagerySet: "AerialWithLabelsOnDemand",
      visible: false
    }
  },
  layersList: [200, 201, 202],
  layers: {
    200: {
      title: "Bird Directive Sites",
      cmp: "vl-layer-vector",
      visible: true,
      renderMode: "image",
      source: {
        cmp: "vl-source-vector",
        features: [],
        url:
          "https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer/7/query?where=COUNTRY_CODE+%3D+%27GR%27&outFields=*&f=geojson"
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: NaturaStyleFunc
        }
      ]
    },
    201: {
      title: "Habitats Directive Sites",
      cmp: "vl-layer-vector",
      visible: true,
      renderMode: "image",
      source: {
        cmp: "vl-source-vector",
        features: [],
        url:
          "https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer/3/query?where=COUNTRY_CODE+%3D+%27GR%27&outFields=*&f=geojson"
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: NaturaStyleFunc
        }
      ]
    },
    203: {
      title: "Όρια Δήμων (Καλλικράτης)",
      cmp: "vl-layer-vector",
      visible: false,
      renderMode: "image",
      source: {
        cmp: "vl-source-vector",
        features: [],
        url(extent, resolution, projection) {
          return (
            "http://geodata.gov.gr/geoserver/ows?service=WFS&" +
            "&request=GetFeature&version=2.0.0" +
            "&outputFormat=json&srsName=" +
            projection +
            "&typeNames=geodata.gov.gr:c7b5978b-aca9-4d74-b8a5-d3a48d02f6d0" +
            "&bbox=" +
            extent.join(",") +
            "," +
            projection
          );
        },
        strategyFactory() {
          return loadingBBox;
        }
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: defaultStyle
        }
      ]
    }
  },
  utilityLayersList: [1000],
  utilityLayers: {
    1000: {
      ref: "draw",
      id: "draw-target",
      title: "Draw",
      cmp: "vl-layer-vector",
      visible: true,
      source: {
        cmp: "vl-source-vector"
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: drawStyle
        }
      ]
    }
  },
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

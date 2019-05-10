import { loadingBBox } from "vuelayers/lib/ol-ext";
import { defaultStyle, drawStyle, NaturaStyleFunc } from "./utils";

import { loaderFactory as loader } from "./utils";

const baseLayers = {
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
  101: {
    name: "bingmaps",
    title: "Bing Maps",
    apiKey: "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
    imagerySet: "AerialWithLabelsOnDemand",
    visible: false
  }
  // 102: {
  //   name: "wms",
  //   title: "ktimanet",
  //   cmp: "vl-layer-tile",
  //   visible: true,
  //   source: {
  //     cmp: "vl-source-wms",
  //     url: "http://gis.ktimanet.gr/wms/wmsopen/wmsserver.aspx?",
  //     layers: "KTBASEMAP",
  //     extParams: { TILED: true }
  //     // serverType: 'geoserver',
  //   }
  // }
};
const layers = {
  200: {
    title: "Bird Directive Sites [EN]",
    cmp: "vl-layer-vector",
    visible: false,
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
    title: "Habitats Directive Sites [EN]",
    cmp: "vl-layer-vector",
    visible: false,
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
  202: {
    title: "Municipality boundaries (Kallikratis) [EL]",
    cmp: "vl-layer-vector",
    visible: false,
    renderMode: "image",
    source: {
      cmp: "vl-source-vector",
      features: [],
      url(extent, resolution, projection) {
        return (
          "https://geodata.gov.gr/geoserver/ows?service=WFS&" +
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
      },
      loaderFactory: loader
    },
    style: [
      {
        cmp: "vl-style-func",
        factory: defaultStyle
      }
    ]
  },
  203: {
    name: "wms",
    title: "Corine Land Cover 2012",
    cmp: "vl-layer-tile",
    visible: true,
    source: {
      cmp: "vl-source-wms",
      url:
        "http://copernicus.discomap.eea.europa.eu/arcgis/services/Corine/CLC2012/MapServer/WMSServer?request=GetMap",
      layers: "Corine Land Cover 2012 raster",
      extParams: { TILED: true },
      serverType: "mapserver"
    }
  }
};
const utilityLayers = {
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
};
export { baseLayers, layers, utilityLayers };

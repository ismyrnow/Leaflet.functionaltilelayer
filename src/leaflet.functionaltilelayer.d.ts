declare namespace L {

  export namespace TileLayer {
    export interface FunctionalStatic extends L.TileLayer {

        new(urlTemplate: string, options?: L.TileLayerOptions): L.TileLayer.FunctionalStatic;
        new(urlTemplate: (view: L.TileLayer.IView) => Promise<string>, options?: L.TileLayerOptions): L.TileLayer.FunctionalStatic;
    }
    export var Functional: FunctionalStatic;


    export interface IView {
        tile: ITile;
        zoom: number;
        subdomain: string;
    }

    export interface ITile {
        column: number;
        row: number;
    }
  }
}

declare module 'leaflet.functionaltilelayer' {
	export = L;
}

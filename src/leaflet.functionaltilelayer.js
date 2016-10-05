L.TileLayer.Functional = L.TileLayer.extend({

  _tileFunction: null,

  initialize: function (tileFunction, options) {
    this._tileFunction = tileFunction;
    L.TileLayer.prototype.initialize.call(this, null, options);
  },

  getTileUrl: function (tilePoint) {
    var map = this._map,
      crs = map.options.crs,
      tileSize = this.options.tileSize,
      zoom = tilePoint.z,
      nwPoint = tilePoint.multiplyBy(tileSize),
      sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
      nw = crs.project(map.unproject(nwPoint, zoom)),
      se = crs.project(map.unproject(sePoint, zoom)),
      bbox = [nw.x, se.y, se.x, nw.y].join(',');

    // Setup object to send to tile function.
    var view = {
      bbox: bbox,
      width: tileSize,
      height: tileSize,
      zoom: zoom,
      tile: {
        row: this.options.tms ? this._tileNumBounds.max.y - tilePoint.y : tilePoint.y,
        column: tilePoint.x
      },
      subdomain: this._getSubdomain(tilePoint)
    };

    return this._tileFunction(view);
  },

  createTile: function (coords, done) {
    var tile = document.createElement('img');

    L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
    L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

    if (this.options.crossOrigin) {
      tile.crossOrigin = '';
    }

    /*
     Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
     http://www.w3.org/TR/WCAG20-TECHS/H67
    */
    tile.alt = '';

    var tileUrl = this.getTileUrl(coords);

    if (typeof tileUrl === 'string') {
      tile.src = tileUrl;
      this.fire('tileloadstart', {
        tile: tile,
        url: tile.src
      });
    } else if (typeof tileUrl.then === 'function') {
      // Assume we are dealing with a promise.
      var self = this;
      tileUrl.then(function (tileUrl) {
        tile.src = tileUrl;
        self.fire('tileloadstart', {
          tile: tile,
          url: tile.src
        });
      });
    }

    return tile;
  }
});

L.tileLayer.functional = function (tileFunction, options) {
  return new L.TileLayer.Functional(tileFunction, options);
};

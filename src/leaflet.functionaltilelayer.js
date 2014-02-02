L.TileLayer.Functional = L.TileLayer.extend({

  _tileFunction: null,

  initialize: function (tileFunction, options) {
    this._tileFunction = tileFunction;
    L.TileLayer.prototype.initialize.call(this, null, options);
  },

  getTileUrl: function (coords) {
    var map = this._map,
      crs = map.options.crs,
      tileSize = this.options.tileSize,
      zoom = this._getZoomForUrl(),
      nwPoint = coords.multiplyBy(tileSize),
      sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
      nw = crs.project(map.unproject(nwPoint, zoom)),
      se = crs.project(map.unproject(sePoint, zoom)),
      bbox = [nw.x, se.y, se.x, nw.y].join(',');

    // Setup object to send to tile function.
    var view = {
      retina: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0,
      bbox: bbox,
      width: tileSize,
      height: tileSize,
      zoom: zoom,
      tile: {
        row: this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y,
        column: coords.x
      },
      subdomain: this._getSubdomain(coords)
    };

    return this._tileFunction(view);
  },

  createTile: function (coords, done) {
    var tile = document.createElement('img');
    var url = this.getTileUrl(coords);

    if (typeof url === 'string') {

      // Regular tile url.
      tile.onload = L.bind(this._tileOnLoad, this, done, tile);
      tile.onerror = L.bind(this._tileOnError, this, done, tile);
      tile.src = url;

    } else if (typeof url.then === 'function') {

      // Assume we are dealing with a promise.
      var promise = url;
      var self = this;
      promise.then(function (url) {
        tile.src = url;
        done(null, tile);
      }, function (err) {
        done(err, tile);
      });

    }

    return tile;
  }
});

L.tileLayer.functional = function (tileFunction, options) {
  return new L.TileLayer.Functional(tileFunction, options);
};
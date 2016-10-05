Leaflet.functionaltilelayer
===========================

For use with Leaflet 1.0.1.

Leaflet tile layer with functionally defined URL and support for promises.

A typical use case is fetching tiles asynchronously, with an ajax request or 
IndexedDB query.

## Usage

Use it like any other tile layer, but instead of providing a `urlTemplate` as
the first argument, provide a function. The function should return either the
tile URL as a string, or a promise which resolves to a string.

```javascript
var funcLayer = new L.TileLayer.Functional(function (view) {
      var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        .replace('{z}', view.zoom)
        .replace('{y}', view.tile.row)
        .replace('{x}', view.tile.column)
        .replace('{s}', view.subdomain);

    return url;
});
```

The function is given a view object with the following properties:

```javascript
view = {
  bbox,
  width,
  height,
  zoom,
  tile: {
    row,
    column
  },
  subdomain
};
```

For an example of the code above, see the [basic example]
(example/basic.html).

For an example of using promises, see the [promise example]
(example/promise.html).

## Typescript

Brings a very basic Typescript-Definition. Feel free to improve and create a pull-Request.

## Thanks

Thanks to @ismyrnow for original version. See [ismyrnow/Leaflet.functionaltilelayer](https://github.com/ismyrnow/Leaflet.functionaltilelayer)

Thanks to @ryanttb and [jQuery Geo](http://jquerygeo.com/)'s service objects, 
which were the inspiration for this plugin.

## License

Leaflet.functionaltilelayer is free software, and may be redistributed under 
the MIT-LICENSE.

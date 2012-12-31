Leaflet.functionaltilelayer
===========================

Leaflet tile layer with functionally defined URL and support for jQuery 
deferreds.

*Does not require jQuery, unless you are using the deferred functionality*

## Usage
Use it like any other tile layer, but instead of providing a `urlTemplate` as 
the first argument, provide a function. The function should return either the 
tile URL as a string, or a deferred object which resolves to a string.

```javascript
var funcLayer = new L.TileLayer.Functional(function (view) {
    var url = 'http://otile{3}.mqcdn.com/tiles/1.0.0/map/{0}/{1}/{2}.jpg'
        .replace('{0}', view.zoom)
        .replace('{1}', view.tile.row)
        .replace('{2}', view.tile.column)
        .replace('{3}', view.subdomain);
    
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
(http://ismyrnow.github.com/Leaflet.functionaltilelayer/example/basic.html).

A more useful example, which demonstrates the deferred functionality, can be 
seen [here]
(http://ismyrnow.github.com/Leaflet.functionaltilelayer/example/deferred.html).

Because your URL is defined by a function, you can use it to show different 
tile sets at different levels, or for different bounding boxes.

## Thanks

Thanks to @ryanttb and [jQuery Geo](http://jquerygeo.com/)'s service objects, 
which were the inspiration for this plugin.

## License

Leaflet.functionaltilelayer is free software, and may be redistributed under 
the MIT-LICENSE.
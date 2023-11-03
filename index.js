var vectorLayer, vectorSource, map, popup;

$(function () {

    generateMap();

    Fancybox.bind('[data-fancybox]', {
    });
});


function generateMap() {

    var coordinates = [];
    var count = 0;

    coordinates.push([-49.21200, -16.61236], [-49.31525, -16.74104], [-49.38735, -16.69112]);

    vectorSource = new ol.source.Vector({});


    coordinates.forEach(f => {
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(f))
        });

        feature.setId(count);

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'http://maps.google.com/mapfiles/ms/micons/blue.png', // Caminho para o ícone do marcador
                scale: 0.5 // Escala do ícone do marcador
            })
        });

        feature.setStyle(iconStyle);

        vectorSource.addFeature(feature);
        count++;
    });

    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
            debugger;
            style.getText().setText(feature.get('label'));
            return style;
        }
    });


    // Configurações do mapa
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(coordinates[0]), // Coordenadas do centro do mapa
            zoom: 5 // Nível de zoom inicial
        })
    });


    // Criação do popup
    popup = new ol.Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    // Adiciona o popup ao mapa
    map.addOverlay(popup);

}

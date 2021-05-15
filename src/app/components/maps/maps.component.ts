import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import  'leaflet-fullscreen';
import 'leaflet.locatecontrol';
import { SpectacleDto } from 'src/app/model/spectacle-dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit, OnDestroy {

  // global map variable
  private map;
  // spectacleDto
  spectacleDto: SpectacleDto;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

     // map settings
        // @ts-ignore
        this.map = new L.Map('map',  {maxZoom: 17, minZoom: 4, fullscreenControl: true}).setView(
          [46, 25], 4
        );

        // map attribution
        this.map.attributionControl
          .setPrefix("")
          .addAttribution(
            'Powered by <a href="http://localhost:4200/" target="_blank">TouristZone</a> | © Mapbox'
          );

        // mapbox
        L.mapboxGL({
          style: 'mapbox://styles/mapbox/streets-v11',
          accessToken: environment.mapboxKey
        }).addTo(this.map);

        // marker icon
        var marker = L.icon({
          iconUrl: './assets/img/pins/navigation_pin.png',
          iconSize: [20, 20],
        })

    // get spectacleDto url from backend
    this.http.get<SpectacleDto[]>("http://localhost:8080/api/v1/spectacles/spectacledto")
    .subscribe(
      (response: SpectacleDto[]) =>  {

        L.Marker.prototype.options.icon = marker;

        // show location
        // @ts-ignore
        L.control.locate({
          showPopup: false,
          flyTo: false,
          locateOptions: {
            enableHighAccuracy: true
          }
        }).addTo(this.map);

        // natural marker settings
        var markersNatural = L.markerClusterGroup({
          iconCreateFunction: function(cluster) {
            return new L.DivIcon({
              html: "<div style='background: green;" +
                                "border-radius: 20px; width: 25px;" +
                                "height: 25px; margin-left: 5px;" +
                                "margin-top: 5px;" +
                                "text-align: center;" +
                                "border-radius: 15px;'>" +
                                                     "<span style='line-height: 25px;" +
                                                                     "color: #fff;'>" +
                                                                      cluster.getChildCount() +
                                                      "</span>" +
                        "</div>",
              className: "customMarkerCluster countNatural",
              iconSize: new L.Point(40, 40)
            });
          }
        });

        // cultural marker settings
        var markersCultural = L.markerClusterGroup({
          iconCreateFunction: function(cluster) {
            return new L.DivIcon({
              html: "<div style='background: red;" +
                          "border-radius: 20px; width: 25px;" +
                          "height: 25px; margin-left: 5px;" +
                          "margin-top: 5px;" +
                          "text-align: center;" +
                          "border-radius: 15px;" +
                          "font-weight: bold;'>" +
                                   "<span style='line-height: 25px;" +
                                                   "color: #fff;'>" +
                                                    cluster.getChildCount() +
                                    "</span>" +
                      "</div>",
              className: "customMarkerCluster countCultural",
              iconSize: new L.Point(40, 40)
            });
          }
        });

        // historical marker settings
        var markersHistorical = L.markerClusterGroup({
          iconCreateFunction: function(cluster) {
            return new L.DivIcon({
              html: "<div style='background: brown;" +
                          "border-radius: 20px; width: 25px;" +
                          "height: 25px; margin-left: 5px;" +
                          "margin-top: 5px;" +
                          "text-align: center;" +
                          "border-radius: 15px;" +
                          "font-weight: bold;'>" +
                                  "<span style='line-height: 25px;" +
                                                  "color: #fff;'>" +
                                                    cluster.getChildCount() +
                                    "</span>" +
                    "</div>",
              className: "customMarkerCluster countHistorical",
              iconSize: new L.Point(40, 40)
            });
          }
        });

        // spectacleDto forloop
        for(const spectacle of response) {
          // if the spectacle is natural
          if(spectacle?.pin?.id == 2) {
                let markerIconNatural = L.icon({
                  iconUrl: spectacle?.pin?.image,
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                  popupAnchor: [0, -28]
                });

                var naturalMarker = L.marker(new L.LatLng(spectacle?.lat, spectacle?.lon), {icon: markerIconNatural});
                naturalMarker.bindPopup('<div style="display: flex; align-items: center; flex-direction: column; width: 100px;" id=spectacle-popup' + spectacle?.id + '>' +
                '<a style="text-decoration: none; color: blue; text-align: center;" href="/spectacles/' + spectacle?.id + '">' + spectacle?.name +
                "<div><img src='data:image/JPG;base64," + spectacle?.cover?.data + "' alt=spectacle' width='80'></a><div>" +
                '</div>');

                markersNatural.addLayer(naturalMarker);
          }
          // if the spectacle is cultural
          else if(spectacle?.pin?.id == 1) {
              let markerIconCultural = L.icon({
                iconUrl: spectacle?.pin?.image,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -28]
              });

              var culturalMarker = L.marker(new L.LatLng(spectacle?.lat, spectacle?.lon), {icon: markerIconCultural});
              culturalMarker.bindPopup('<div style="display: flex; align-items: center; flex-direction: column; width: 100px;" id=spectacle-popup' + spectacle?.id + '>' +
              '<a style="text-decoration: none; color: blue; text-align: center;" href="/spectacles/' + spectacle?.id + '">' + spectacle?.name +
              "<div><img src='data:image/JPG;base64," + spectacle?.cover?.data + "' alt=spectacle' width='80'></a><div>" +
              '</div>');

              markersCultural.addLayer(culturalMarker);

            }
            // if the spectacle is historical
            else if(spectacle?.pin?.id == 3) {
                let markerIconHistorical = L.icon({
                  iconUrl: spectacle?.pin?.image,
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                  popupAnchor: [0, -28]
                });

                var historicalMarker = L.marker(new L.LatLng(spectacle?.lat, spectacle?.lon), {icon: markerIconHistorical});
                historicalMarker.bindPopup('<div style="display: flex; align-items: center; flex-direction: column; width: 100px;" id=spectacle-popup' + spectacle?.id + '>' +
                '<a style="text-decoration: none; color: blue; text-align: center;" href="/spectacles/' + spectacle?.id + '">' + spectacle?.name +
                "<div><img src='data:image/JPG;base64," + spectacle?.cover?.data + "' alt=spectacle' width='80'></a><div>" +
                '</div>');

                markersHistorical.addLayer(historicalMarker);
              }
        }
            // add markers to layer
            this.map.addLayer(markersNatural);
            this.map.addLayer(markersCultural);
            this.map.addLayer(markersHistorical);

            // overlay
            var overlayMaps = {
              "<span style='color: green;'>Természeti</span>": markersNatural,
              "<span style='color: red;'>Kulturális</span>": markersCultural,
              "<span style='color: brown;'>Történelmi</span>": markersHistorical
          };

          // overlay on map
          L.control.layers(null, overlayMaps, {position: 'bottomleft', collapsed: false}).addTo(this.map);

          const options = { profile: "mapbox/driving" };

          // navigation control
          var control = L.Routing.control({
            routeWhileDragging: true,
            autoRoute: true,
            // @ts-ignore
            geocoder: L.Control.Geocoder.nominatim(),
            show: false,
            collapsible: true,
            router: L.Routing.mapbox(environment.mapboxKey, options),
            // @ts-ignore
            lineOptions: {
              styles: [{color: 'orange', opacity: 1, weight: 5}]
          },
          showAlternatives: false
        }).addTo(this.map);

        var navCollapseBtn =  document.getElementsByClassName("leaflet-routing-collapse-btn") as HTMLCollectionOf<HTMLElement>;
        var container = document.getElementsByClassName("leaflet-routing-container") as HTMLCollectionOf<HTMLElement>;
        navCollapseBtn[0].style.setProperty('top', '2px');
        navCollapseBtn[0].style.setProperty('left', '2px');
        navCollapseBtn[0].style.setProperty('cursor', 'pointer');
        container[0].style.setProperty('padding', '0');

        L.Routing.errorControl(control, {
          header: 'Hibás útvonal',
          formatMessage(error) {
              if (error.status < 0) {
                  return 'Számításaink alapján nem kivitelezhető ez az útvonal. Technical description follows:  <code><pre>' +
                      error.message + '</pre></code';
              } else {
                  return 'Számításaink alapján nem kivitelezhető ez az útvonal. ' +
                      error.message;
              }
          }
        }).addTo(this.map);
      },
      (error: any) => console.log(error));
  }

  ngOnDestroy() {

  }
}

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { IonicPage, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  markers = [];
  message = "";
  counter = 0;
  
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems:any;

  loading: any;
  geocoder: any;
  
  constructor(
    public navCtrl: NavController,
    private device: Device,
    private zone: NgZone,
    public platform: Platform,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      this.initMap();
    });

    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad(){
    this.initMap();
  }
  
  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      
      this.addMarker(updatelocation, true);
      this.setMapOnAll(this.map);
    });
  }

  newRequest() { 
     let alert = this.alertCtrl.create({
      title: 'Localização',
      message: 'Você confirmar que o endereço da solicitação é',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não');
          }
        },
        {
          text: 'É o endereço!',
          handler: () => {
            console.log('É o endereço!');
          }
        }        
      ]
    });
    alert.present();
  }

  tryGeolocation(){
    this.loading.present();
    this.clearMarkers();//remove previous markers
    this.geolocation.getCurrentPosition().then((resp) => {
      let marker = new google.maps.Marker({
        position: resp.coords,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(resp.coords);
      this.loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
  }

  addMarker(location, isDraggable) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: isDraggable
    });
    this.markers.push(marker);
  }
  
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
}
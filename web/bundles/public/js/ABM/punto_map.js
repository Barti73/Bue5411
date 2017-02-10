/* Javascript Functions */

function FxRenderAddMapJS()
{
	var strSelfLatLng = $('#hiddenDefaultAddressLatLng').val();
	var selfCoords = strSelfLatLng.split(',');
	var strLat = selfCoords[0]*1;
	var strLng = selfCoords[1]*1;
	var strZoomlevel = 11;
	
	var map = new google.maps.Map(document.getElementById('divGoogleMap'), {
		center: {lat: strLat, lng: strLng},
		zoom: strZoomlevel
	});
	
	autocomplete.bindTo('bounds', map);
	
	var marker = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		anchorPoint: new google.maps.Point(0, -29)
	});

	marker.addListener('drag', function (event) {
		$('#txtLatitudPunto').val(this.getPosition().lat());
		$('#txtLongitudPunto').val(this.getPosition().lng());
	});

	autocomplete.addListener('place_changed', function() {
		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry)
		{
			window.alert("Autocomplete's returned place contains no geometry");
			return;
		}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport)
		{
			map.fitBounds(place.geometry.viewport);
			map.setZoom(16);
		}
		else
		{
			map.setCenter(place.geometry.location);
			map.setZoom(16);
		}

		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
	});
	
}

function FxRenderEditMapJS()
{
	var strSelfLatLng = $('#hiddenDefaultAddressLatLng').val();
	var selfCoords = strSelfLatLng.split(',');
	strLat = selfCoords[0]*1;
	strLng = selfCoords[1]*1;
	var strZoomlevel = 16;
	
	map = new google.maps.Map(document.getElementById('divGoogleMap'), {
		center: {lat: strLat, lng: strLng},
		zoom: strZoomlevel
	});
	
	autocomplete.bindTo('bounds', map);
	
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		anchorPoint: new google.maps.Point(0, -29),
		position: new google.maps.LatLng(strLat, strLng)
	});

	marker.addListener('drag', function (event) {
		$('#txtLatitudPunto').val(this.getPosition().lat());
		$('#txtLongitudPunto').val(this.getPosition().lng());
	});

	autocomplete.addListener('place_changed', function() {
		marker.setVisible(false);
		var place = autocomplete.getPlace();

		if (!place.geometry)
		{
			window.alert("Autocomplete's returned place contains no geometry");
			return;
		}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport)
		{
			map.fitBounds(place.geometry.viewport);
			map.setZoom(16);
		}
		else
		{
			map.setCenter(place.geometry.location);
			map.setZoom(16);
		}
		
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
	});

	//Este listener se gatilla cuando el mapa esta completamente renderizado.
	//Debido a que los mapas no se pueden crean en divs ocultos (como este caso con divs colapsables)...es que se espera hasta que el mapa
	//este completamente renderizado para activar el acordeon.
	google.maps.event.addListener(map, 'tilesloaded', function() {
	   console.log('mapReady');
	   FxCollapseSetupJS();
	   //Eliminamos el listener...se necesita solo una vez
	   google.maps.event.clearListeners(map, 'tilesloaded');
	});
	
}

function FxCollapseSetupJS()
{
	//Collapse
	//Esto hace que se cierre el acordeon. Se requiere que este abierto de entrada...ya que se necesita un div con width/height mayor a cero para que se pueda renderizar el map...
	$('#colapseDataPunto').trigger('click');
	//Loading Div Hide ()
	//Se espera que se cierre el acordeon que tiene un tiempo de 500 ms
	setTimeout(function(){
		$('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow');
	}, 500);
}

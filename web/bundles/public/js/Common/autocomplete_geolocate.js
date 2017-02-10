/* ******************* */
/* Search Autocomplete */
/* ******************* */

var placeSearch, autocomplete;
var componentForm = {
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	postal_code: 'short_name'	
};

function initAutocomplete()
{
	// Create the autocomplete object, restricting the search to geographical
	// location types.
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
		{types: ['geocode']});

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	var lat = place.geometry.location.lat();
	var lng = place.geometry.location.lng();
	
	for (var component in componentForm)
	{
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}

	// Get each component of the address from the place details
	// and fill the corresponding field on the form.
	for (var i = 0; i < place.address_components.length; i++)
	{
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType])
		{
			var val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
	}
  //Para Puntos
	$('#txtLatitudPunto').val(lat);
	$('#txtLongitudPunto').val(lng);
  //Para Puntos Pickit
	$('#txtLatitudPuntoPickit').val(lat);
	$('#txtLongitudPuntoPickit').val(lng);
  //Para Sucursal
	$('#txtLatitudSucursal').val(lat);
	$('#txtLongitudSucursal').val(lng);
  //Para Dropoff
	$('#txtLatitudDropoff').val(lat);
	$('#txtLongitudDropoff').val(lng);
	//Set Provincia ??
  //Para Puntos
	$('#labelLatitudPunto').addClass('active');
	$('#labelLongitudPunto').addClass('active');
	//Active TextBox
	$('#label_locality').addClass('active');
	$('#label_postal_code').addClass('active');
  //Para Puntos Pickit
	$('#labelLatitudPuntoPickit').addClass('active');
	$('#labelLongitudPuntoPickit').addClass('active');
  //Para Sucursal
	$('#labelLatitudSucursal').addClass('active');
	$('#labelLongitudSucursal').addClass('active');
  //Para Dropoff
	$('#labelLatitudDropoff').addClass('active');
	$('#labelLongitudDropoff').addClass('active');
}

function geolocate()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position){
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}


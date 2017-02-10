/* Common Javascript Functions */

function FxOpenModalPopupJS(entityId)
{
	jsonArray = { "entityId": entityId };
	var URL = $('#UrlAjaxPopup').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupJS);
	
}

function FxSetPopupJS(result)
{
    $('#divResponseAjaxPopupModal').html(result);
    
	$('#modalPopup').openModal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		ready: function() { }, // Callback for Modal open
		complete: function() { } // Callback for Modal close
	});
	//Convertir Combos
	$('.selectForm').material_select();
	//ToolTip
	$('.tooltipped').tooltip({delay: 50});
	//DatePickers
	FxSetDatepicker();	
	//Tabs
	$('ul.tabs').tabs();
}

function FxGetGridJS()
{
	//Ocultamos botones
	$('#divBotonesABM').hide();
	
	jsonArray = { };
	var URL = $('#UrlAjaxGrid').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divGridAjax';
	exeAjaxCallBack(URL, strData, strDivResponse, FxShowBotones);
}

function FxGetGridUsersJS()
{
	//Ocultamos botones
	$('#divBotonesABM').hide();
	
	jsonArray = { "entityId": $('#hiddenEntityId').val() }; //PuntoPickitId/CadenaId/Retailer...etc
	var URL = $('#UrlAjaxGrid').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divGridAjax';
	exeAjaxCallBack(URL, strData, strDivResponse, FxShowBotones);
}

function FxShowBotones()
{
	//Mostramos botones
	$('#divBotonesABM').show();
}

function FxOpenModalPopupWithAutocompleteJS(entityId)
{
	jsonArray = { "entityId": entityId };
	var URL = $('#UrlAjaxPopup').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupWithAutocompleteJS);
}

function FxSetPopupWithAutocompleteJS()
{
	$('#modalPopup').openModal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		ready: function() { }, // Callback for Modal open
		complete: function() { } // Callback for Modal close
	});
	//Convertir Combos
	$('.selectForm').material_select();
	//ToolTip
	$('.tooltipped').tooltip({delay: 50});
	//Set checkbox Estado Punto y Estado Servicio (Solo para ABM Punto Pickit...Sucursal...Dropoff)
	if (typeof FxCheckEstadoPunto == 'function')
	{
		FxCheckEstadoPunto();
	}
	//Inicializar Autocomplete
	initAutocomplete();
}

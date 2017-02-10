/* Javascript Functions */


function FxOpenPopupDesdeExistenteJS()
{
	var URL = $('#UrlAjaxPopupDesdeExistente').val();

	jsonArray = { "entidad": $('#HiddenEntidadName').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxOpenPopupDesdeExistentePostOperacionesJS);
}

function FxOpenPopupDesdeExistentePostOperacionesJS(result)
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
	//customSearch
	$('#selectPuntosBase').customselect();
}

function FxGetDataPuntoJS()
{
	if ( $('#selectPuntosBase').val() == '' )
	{
		$('#divResponsePunto').html('');
		return false;
	}
	
	jsonArray = { "baseId": $('#selectPuntosBase').val(),
				  "entidad": $('#HiddenEntidadName').val() };
				  
	var URL = $('#UrlAjaxPopupDataPuntoExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponsePunto';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetDataPuntoPostOperacionesJS);
}

function FxGetDataPuntoPostOperacionesJS()
{
	//Verificamos la respuesta...si viene algun error...se despliega en un sweet alert
	var errorStatus = $('#HiddenErrorStatus').val();
	
	if (errorStatus)
	{
		//Enviamos alert
		sweetAlert('Error', errorStatus, 'warning');
		//Limpiamos bloque donde se cargan los datos del punto seleccionado
		$('#divResponsePunto').html('');
		return false;
	}
	
	//Se setean los combos dinamicos de cadena y retailer
	//Si existe la cadena para el punto base...se selecciona el combo dinamico de cadena...y se deja disabled
	var cadenaId = $('#hiddenCadenaExistente').val()
	var retailerId = $('#hiddenRetailerExistente').val()
	if (cadenaId)
	{
		$('#selectCadenaExistente').val(cadenaId);
		$('#selectCadenaExistente').prop('disabled', true);
	}
	if (retailerId)
	{
		$('#selectRetailerExistente').val(retailerId);
		$('#selectRetailerExistente').prop('disabled', true);
	}
	
	$('.selectForm').material_select(); //Se construyen combos existentes
	
}

function FxSaveDesdeExistenteJS()
{
	//Validaciones Genericas
	if ($('#selectPuntosBase').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar un punto.', 'error');
		return false;
	}
	
	//Validaciones de acuerdo a tipo de entidad que se esta creando
	switch ( $('#HiddenEntidadName').val() )
	{
		case 'PuntoPickit':
			if (!FxValidacionesPuntoPickit()) { return false; }
			break;
		case 'Sucursal':
			if (!FxValidacionesSucursal()) { return false; }
			break;
		case 'DropOff':
			if (!FxValidacionesDropOff()) { return false; }
			break;
	}	
	
	//Validacion Especial Para Creacion de Punto Pickit desde Sucursal
	var saveStatus = FxValidacionEspecialPuntoSucursal();

	if (saveStatus) { FxSavePuntoJS(); }
}

function FxSavePuntoJS()
{
	//Obtenemos data dinamica de cada entidad
	var dataPuntoPickit = FxGetFormDataPuntoPickit();
	var dataSucursal = FxGetFormDataSucursal();
	var dataDropOff = FxGetFormDataDropOff();
	
	jsonArray = { "puntoBaseId": $('#selectPuntosBase').val(),
				  "dataPuntoPickit": dataPuntoPickit,
				  "dataSucursal": dataSucursal,
				  "dataDropOff": dataDropOff,
				  "whoAmI": $('#HiddenEntidadName').val() };
	console.log(jsonArray);

	var URL = $('#UrlAjaxSavePuntoExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
}

function FxValidacionesPuntoPickit()
{
	//Email
	if ($('#txtEmailExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	//Cadena
	if ($('#selectCadenaExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la cadena.', 'error');
		return false;
	}
	//Tipo Punto Pickit
	if ($('#selectTipoPuntoPickitExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el tipo de punto pickit.', 'error');
		return false;
	}
	//Zona Punto Pickit
	if ($('#selectZonaPuntoPickitExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la zona geográfica del punto pickit.', 'error');
		return false;
	}
	//Valor Maximo
	if ($('#txtValorMaximoExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el valor máximo del punto pickit.', 'error');
		return false;
	}
	//Capacidad
	if ($('#txtCapacidadExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad del punto pickit.', 'error');
		return false;
	}

    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesExistente').val() != '' && $('#txtValorMaximoProductosExistente').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesExistente').val() == '' && $('#txtValorMaximoProductosExistente').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesExistente').val() != '' && $('#txtValorMaximoProductosExistente').val() != '') && 
		 ($('#txtValorMaximoTransaccionesExistente').val()*1 > $('#txtValorMaximoProductosExistente').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}	
	
	return true;
}

function FxValidacionEspecialPuntoSucursal()
{
	/* [INICIO] - VALIDACION ESPECIAL */
	/* Esta validacion se realiza cuando se esta dando de alta un punto pickit desde una sucursal existente...y esta tiene un retailer que no esta asociado a ninguna cadena */
	/* Esta validacion aplica si y solo si...el punto base seleccionado es una sucursal (existe como sucursal...no importa si tambien existe como dropoff) */
	
	//Verificamos que se esta creando un punto pickit desde una sucursal (servicio store pickup en 1)
	if ( $('#HiddenEntidadName').val() == 'PuntoPickit' && $('#hiddenServicioStorePickup').val() )
	{
		//Verificamos si el retailer de la sucursal...no tiene una cadena asociada
		if ( $('#txtCadenaExistente').val() == '' )
		{
			swal({
				title: "",
				text: "La cadena seleccionada quedará asociada al retailer. ¿Desea grabar?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Grabar",
				closeOnConfirm: true
			}, 
			function(isConfirm){
				if (isConfirm) {
					FxSavePuntoJS();
				} else {
				}
			});
			//Retorna false...para que no grabe nada hasta la confirmacion
			return false;
		}
		else
		{
			return true;
		}
	}
	//Verificamos que se esta creando una sucursal desde un punto pickit (servicio pickit en 1)
	if ( $('#HiddenEntidadName').val() == 'Sucursal' && $('#hiddenServicioPickit').val() )
	{
		//Verificamos si la cadena del punto pickit...no tiene un retailer asociado
		if ( $('#txtRetailerExistente').val() == '' )
		{
			swal({
				title: "",
				text: "El retailer seleccionado quedará asociado a la cadena. ¿Desea grabar?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Grabar",
				closeOnConfirm: true
			}, 
			function(isConfirm){
				if (isConfirm) {
					FxSavePuntoJS();
				} else {
				}
			});
			//Retorna false...para que no grabe nada hasta la confirmacion
			return false;
		}
		else
		{
			return true;
		}
	}
	//Todo ok
	return true;
	/* [FIN] - VALIDACION ESPECIAL */
}

function FxValidacionesSucursal()
{
	//Email
	if ($('#txtEmailExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	//Retailer
	if ($('#selectRetailerExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el retailer.', 'error');
		return false;
	}
	//Capacidad
	if ($('#txtCapacidadExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad del punto pickit.', 'error');
		return false;
	}

    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesExistente').val() != '' && $('#txtValorMaximoProductosExistente').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesExistente').val() == '' && $('#txtValorMaximoProductosExistente').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesExistente').val() != '' && $('#txtValorMaximoProductosExistente').val() != '') && 
		 ($('#txtValorMaximoTransaccionesExistente').val()*1 > $('#txtValorMaximoProductosExistente').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	
	return true;
}

function FxValidacionesDropOff()
{
	//No existen campos dinamicos para drop off
	return true;	
}

function FxGetFormDataPuntoPickit()
{
	//Tipo Producto
	var arrayTipoProducto = [];
	$('.classTipoProductoExistente').each( function(){
		arrayTipoProducto.push( $(this).val() );
	});
	//Acepta Devoluciones
	var aceptaDevoluciones = ($('#chkAceptaDevolucionesExistente').prop('checked')) ? 1 : 0;
	
	var dataPuntoPickit;
	dataPuntoPickit = { "txtEmail": $('#txtEmailExistente').val(),
						"selectCadena": $('#selectCadenaExistente').val(),
						"selectTipoPuntoPickit": $('#selectTipoPuntoPickitExistente').val(),
						"selectZonaPuntoPickit": $('#selectZonaPuntoPickitExistente').val(),
						"arrayTipoProducto": arrayTipoProducto,
						"txtValorMaximo": $('#txtValorMaximoExistente').val(),
						"txtCapacidad": $('#txtCapacidadExistente').val(),
						"txtValorMaximoTransacciones": $('#txtValorMaximoTransaccionesExistente').val(),
						"txtValorMaximoProductos": $('#txtValorMaximoProductosExistente').val(),
						"txtValorMaximoVolumen": $('#txtValorMaximoVolumenExistente').val(),
						"txtDiasVencimiento": $('#txtDiasVencimientoExistente').val(),
						"chkAceptaDevoluciones": aceptaDevoluciones };
	return dataPuntoPickit;
}

function FxGetFormDataSucursal()
{
	//Acepta Devoluciones
	var aceptaDevoluciones = ($('#chkAceptaDevolucionesExistente').prop('checked')) ? 1 : 0;
	
	var dataSucursal;
	dataSucursal = { "txtEmail": $('#txtEmailExistente').val(),
					 "selectRetailer": $('#selectRetailerExistente').val(),
					 "txtCapacidad": $('#txtCapacidadExistente').val(),
					 "txtValorMaximoTransacciones": $('#txtValorMaximoTransaccionesExistente').val(),
					 "txtValorMaximoProductos": $('#txtValorMaximoProductosExistente').val(),
					 "txtDiasVencimiento": $('#txtDiasVencimientoExistente').val(),
					 "chkAceptaDevoluciones": aceptaDevoluciones };
	return dataSucursal;
}

function FxGetFormDataDropOff()
{
	//Drop Off no tiene data dinamica
	var dataDropOff;
	dataDropOff = { "dummyData": 0 };
	
	return dataDropOff;
}


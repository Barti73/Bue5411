/* Javascript Functions */

function FxOpenPuntoAddJS()
{
	window.location.href = $('#UrlAddPunto').val();
}

function FxOpenPuntoEditJS(puntoBaseIdHashed)
{
	window.location.href = $('#UrlEditPunto').val() + '/' + puntoBaseIdHashed;
}

function FxOpenPuntoUsersJS(puntoBaseIdHashed)
{
	window.location.href = $('#UrlUsersPunto').val() + '/' + puntoBaseIdHashed;
}

function FxGetGridUsersPuntoJS()
{
	//Ocultamos botones
	$('#divBotonesABM').hide();
	
	jsonArray = { "entityId": $('#hiddenEntityId').val() };
	var URL = $('#UrlAjaxGrid').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divGridAjax';
	exeAjaxCallBack(URL, strData, strDivResponse, FxShowBotones);
}

function FxSaveUsuarioPuntoJS()
{
	if ($('#txtEmailUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe ingresar el e-mail.', 'error'); return false; }
	if (!isValidEmail( $('#txtEmailUsuarioPunto').val() ) ) { sweetAlert('Error', 'Debe ingresar un email válido.', 'error'); return false; }
	if ($('#txtNombreUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe ingresar el nombre.', 'error'); return false; }
	if ($('#txtApellidoUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe ingresar el apellido.', 'error'); return false; }
	//Es usuario nuevo...debe ingresar password
	if ($('#hiddenUsuarioPuntoId').val() == '' && $('#txtPasswordUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe ingresar el password.', 'error'); return false; }
	if ($('#txtPasswordUsuarioPunto').val() != '' || $('#txtRePasswordUsuarioPunto').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioPunto').val() == '' || $('#txtRePasswordUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error'); return false; }
		if ($('#txtPasswordUsuarioPunto').val() != $('#txtRePasswordUsuarioPunto').val()) { sweetAlert('Error', 'Las passwords no coinciden.', 'error'); return false; }
	}
	if ($('#selectRolUsuarioPunto').val() == '') { sweetAlert('Error', 'Debe seleccionar el rol.', 'error'); return false; }
	
	var usuarioPuntoEstado = ($('#chkEstadoUsuarioPunto').prop('checked')) ? 1 : 0;
	
	jsonArray = { "usuarioPuntoId": $('#hiddenUsuarioPuntoId').val(),
				  "usuarioPuntoIdPunto": $('#hiddenEntityId').val(),
				  "usuarioPuntoRolId": $('#selectRolUsuarioPunto').val(),
				  "usuarioPuntoNombre": $('#txtNombreUsuarioPunto').val(),
				  "usuarioPuntoApellido": $('#txtApellidoUsuarioPunto').val(),
				  "usuarioPuntoEmail": $('#txtEmailUsuarioPunto').val(),
				  "usuarioPuntoPassword": $('#txtPasswordUsuarioPunto').val(),
				  "usuarioPuntoEstado": usuarioPuntoEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

function FxSavePuntoJS(callbackFx)
{
	if ($('#txtNombrePunto').val() == '') { sweetAlert('Error', 'Debe ingresar el nombre del punto.', 'error'); return false; }
	if ($('#txtResponsablePunto').val() == '') { sweetAlert('Error', 'Debe ingresar el responsable.', 'error'); return false; }
	if ($('#txtTelefonoPunto').val() == '') { sweetAlert('Error', 'Debe ingresar el teléfono.', 'error'); return false; }
	if ($('#selectProvinciaPunto').val() == '') { sweetAlert('Error', 'Debe seleccionar la provincia.', 'error'); return false; }
	if ($('#autocomplete').val() == '') { sweetAlert('Error', 'Debe ingresar la dirección del punto.', 'error');  return false; }
	if ($('#locality').val() == '') { sweetAlert('Error', 'Debe ingresar la localidad del punto.', 'error');  return false; }
	if ($('#postal_code').val() == '') { sweetAlert('Error', 'Debe ingresar el código postal del punto.', 'error'); return false; }
	if ($('#txtLatitudPunto').val() == '') { sweetAlert('Error', 'Debe ingresar la latitud del punto.', 'error');  return false; }
	if ($('#txtLongitudPunto').val() == '') { sweetAlert('Error', 'Debe ingresar la longitud del punto.', 'error'); return false; }
	if ($('#txtDireccionCustomPunto').val() == '') { sweetAlert('Error', 'Debe ingresar la dirección custom del punto.', 'error'); return false; }
	if ($('#txtDireccionCustomPunto').val().length > 50)  { sweetAlert('Error', 'La dirección custom del punto no debe superar los 50 caracteres.', 'error'); return false; }
	
	var puntoEstado = ($('#chkEstadoPunto').prop('checked')) ? 1 : 0;
	
	jsonArray = { "puntoBaseIdHashed": $('#hiddenPuntoBaseIdHashed').val(),
				  "puntoNombre": $('#txtNombrePunto').val(),
				  "puntoResponsable": $('#txtResponsablePunto').val(),
				  "puntoTelefono": $('#txtTelefonoPunto').val(),
				  "puntoProvinciaId": $('#selectProvinciaPunto').val(),
				  "puntoDireccion": $('#autocomplete').val(),
				  "puntoLocalidad": $('#locality').val(),
				  "puntoCodigoPostal": $('#postal_code').val(),
				  "puntoLatitud": $('#txtLatitudPunto').val(),
				  "puntoLongitud": $('#txtLongitudPunto').val(),
				  "puntoDireccionCustom": $('#txtDireccionCustomPunto').val(),
				  "puntoEstado": puntoEstado };
	
	var URL = $('#UrlAjaxSavePunto').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, callbackFx);
	
}

function FxSavePickitJS(callbackFx)
{
	if ($('#selectCadenaPickit').val() == '') { sweetAlert('Error', 'Debe seleccionar la cadena.', 'error'); return false; }
	if ($('#selectTipoPuntoPickit').val() == '') { sweetAlert('Error', 'Debe seleccionar el tipo de punto pickit.', 'error'); return false; }
	if ($('#selectZonaPuntoPickit').val() == '') { sweetAlert('Error', 'Debe seleccionar la zona geográfica del punto pickit.', 'error'); return false; }
	if ($('#txtEmailPickit').val() == '') { sweetAlert('Error', 'Debe ingresar el email.', 'error');  return false; }
	if (!isValidEmail( $('#txtEmailPickit').val() ) ) { sweetAlert('Error', 'Debe ingresar un email válido.', 'error'); return false; }
	if ($('#txtValorMaximoPickit').val() == '') { sweetAlert('Error', 'Debe ingresar el valor máximo del pedido.', 'error'); return false; }
	if ($('#txtCapacidadPickit').val() == '') { sweetAlert('Error', 'Debe ingresar el volumen máximo del pedido.', 'error'); return false; }
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesPickit').val() != '' && $('#txtValorMaximoProductosPickit').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesPickit').val() == '' && $('#txtValorMaximoProductosPickit').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesPickit').val() != '' && $('#txtValorMaximoProductosPickit').val() != '') && ($('#txtValorMaximoTransaccionesPickit').val()*1 > $('#txtValorMaximoProductosPickit').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	
	var pickitAceptaDevoluciones = ($('#chkAceptaDevolucionesPickit').prop('checked')) ? 1 : 0;
	var pickitAceptaCambios = ($('#chkAceptaCambiosPickit').prop('checked')) ? 1 : 0;

	var pickitEstado = ($('#chkEstadoPickit').prop('checked')) ? 1 : 0;
	
	//Tipo Producto
	var arrayTipoProducto = [];
	$('.classPickitTipoProducto').each( function(){
		if ($(this).prop('checked'))
		{
			arrayTipoProducto.push( $(this).val() );
		}
	});
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosDataJS('tableHorariosPickit');
	
	
	//Atributos
	var arrayAtributos = [];
	$('.checkAtributoPickit').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "puntoBaseIdHashed": $('#hiddenPuntoBaseIdHashed').val(),
				  "pickitCadenaId": $('#selectCadenaPickit').val(),
				  "pickitTipoPuntoPickitId": $('#selectTipoPuntoPickit').val(),
				  "pickitZonaPuntoPickitId": $('#selectZonaPuntoPickit').val(),
				  "pickitEmail": $('#txtEmailPickit').val(),
				  "pickitValorMaximo": $('#txtValorMaximoPickit').val(),
                  "pickitValorMaximoTransacciones": $('#txtValorMaximoTransaccionesPickit').val(),
                  "pickitValorMaximoProductos": $('#txtValorMaximoProductosPickit').val(),
                  "pickitValorMaximoVolumen": $('#txtValorMaximoVolumenPickit').val(),
                  "pickitDiasVencimiento": $('#txtDiasVencimientoPickit').val(),
				  "pickitCapacidad": $('#txtCapacidadPickit').val(),
				  "pickitAceptaDevoluciones": pickitAceptaDevoluciones,
				  "pickitAceptaCambios": pickitAceptaCambios,
				  "pickitEstado": pickitEstado,
				  "pickitTipoProducto": arrayTipoProducto,
				  "pickitHorarios": arrayHorarios,
				  "pickitAtributos": arrayAtributos };

	var URL = $('#UrlAjaxSavePickit').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, callbackFx);
	
}

function FxSaveStorePickupJS(callbackFx)
{
	if ($('#selectRetailerStorePickup').val() == '') { sweetAlert('Error', 'Debe seleccionar el retailer.', 'error'); return false; }
	if ($('#txtEmailStorePickup').val() == '') { sweetAlert('Error', 'Debe ingresar el email.', 'error'); return false; }
	if (!isValidEmail( $('#txtEmailStorePickup').val() ) ) { sweetAlert('Error', 'Debe ingresar un email válido.', 'error'); return false; }
	if ($('#txtCapacidadStorePickup').val() == '') { sweetAlert('Error', 'Debe ingresar la capacidad del store pickup.', 'error'); return false; }
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesStorePickup').val() != '' && $('#txtValorMaximoProductosStorePickup').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesStorePickup').val() == '' && $('#txtValorMaximoProductosStorePickup').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesStorePickup').val() != '' && $('#txtValorMaximoProductosStorePickup').val() != '') && ($('#txtValorMaximoTransaccionesStorePickup').val()*1 > $('#txtValorMaximoProductosStorePickup').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}

	
	var storePickupAceptaDevoluciones = ($('#chkAceptaDevolucionesStorePickup').prop('checked')) ? 1 : 0;
	
	var storePickupEstado = ($('#chkEstadoStorePickup').prop('checked')) ? 1 : 0;
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosDataJS('tableHorariosStorePickup');
	
	
	//Atributos
	var arrayAtributos = [];
	$('.checkAtributoStorePickup').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "puntoBaseIdHashed": $('#hiddenPuntoBaseIdHashed').val(),
				  "storePickupRetailerId": $('#selectRetailerStorePickup').val(),
				  "storePickupEmail": $('#txtEmailStorePickup').val(),
                  "storePickupValorMaximoTransacciones": $('#txtValorMaximoTransaccionesStorePickup').val(),
                  "storePickupValorMaximoProductos": $('#txtValorMaximoProductosStorePickup').val(),
                  "storePickupDiasVencimiento": $('#txtDiasVencimientoStorePickup').val(),
				  "storePickupCapacidad": $('#txtCapacidadStorePickup').val(),
				  "storePickupAceptaDevoluciones": storePickupAceptaDevoluciones,
				  "storePickupEstado": storePickupEstado,
				  "storePickupHorarios": arrayHorarios,
				  "storePickupAtributos": arrayAtributos };
	
	var URL = $('#UrlAjaxSaveStorePickup').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, callbackFx);
	
}

function FxSaveDropoffJS(callbackFx)
{
	var dropoffEstado = ($('#chkEstadoDropoff').prop('checked')) ? 1 : 0;
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosDataJS('tableHorariosDropoff');
	
	//Atributos
	var arrayAtributos = []
	$('.checkAtributoDropoff').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "puntoBaseIdHashed": $('#hiddenPuntoBaseIdHashed').val(),
				  "dropoffEstado": dropoffEstado,
				  "dropoffHorarios": arrayHorarios,
				  "dropoffAtributos": arrayAtributos };

	var URL = $('#UrlAjaxSaveDropoff').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, callbackFx);
	
}

function FxShowMessageAddPuntoJS()
{
	swal({
		title: "",
		text: "El punto fue creado satisfactoriamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: true },
		function(){
				var puntoBaseIdHashed = $('#divResponseABM').html();
				FxOpenPuntoEditJS(puntoBaseIdHashed); //Open modo edicion
		});
		
}

function FxShowMessageEditPuntoJS()
{
	swal({
		title: "",
		text: "La operación fue realizada satisfactoriamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: true },
		function(){
				var puntoBaseIdHashed = $('#hiddenPuntoBaseIdHashed').val();
				FxOpenPuntoEditJS(puntoBaseIdHashed);
		});
		
}

function FxAddHorarioJS(strSuffix)
{
	if ($('#txtHorarioAdd' + strSuffix).val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el día.', 'error');
		return false;
	}
	
	var texto = $('#txtHorarioAdd' + strSuffix).val();
	var horaDesde = $('#selectHoraDesde' + strSuffix).val();
	var horaHasta = $('#selectHoraHasta' + strSuffix).val();
	var minutoDesde = $('#selectMinutoDesde' + strSuffix).val();
	var minutoHasta = $('#selectMinutoHasta' + strSuffix).val();
	var desde = horaDesde + ':' + minutoDesde;
	var hasta = horaHasta + ':' + minutoHasta;

	//Add <tr>
	var trCount = $('#hiddenTablaHorarioCount' + strSuffix).val()*1 + 1;
	var newTr = '<tr id="trTablaHorario' + strSuffix + '_' + trCount + '">' +
				'	<td class="center">' + texto + '</td>' + 
				'	<td class="center">' + desde + '</td>' + 
				'	<td class="center">' + hasta + '</td>' + 
				'	<td class="center">' + 
				'		<a class="btn-floating waves-effect waves-light black right" href="javascript:FxDeleteTableRowHorariosJS(\'' + strSuffix + '\', ' + trCount + ')">' + 
				'			<i class="material-icons">close</i>' + 
				'		</a>' +
				'	</td>' + 
				'</tr>';
	$('#tableHorarios' + strSuffix).append(newTr);
	
	//Clear
	$('#txtHorarioAdd' + strSuffix).val('');
	
	FxRecalcularTableRowHorariosJS(strSuffix);
}

function FxRecalcularTableRowHorariosJS(strSuffix)
{
	var rowCount = $('#tableHorarios' + strSuffix + ' tbody tr').length;
	$('#hiddenTablaHorarioCount' + strSuffix).val(rowCount);
}

function FxDeleteTableRowHorariosJS(strSuffix, trId)
{
	$('#trTablaHorario' + strSuffix + '_' + trId).remove();
	FxRecalcularTableRowHorariosJS(strSuffix);
}

function FxGetTableHorariosDataJS(objTable)
{
	var arrayHorario=[], arrayDias=[], arrayDesde=[], arrayHasta=[];

	$('#' + objTable + ' tbody tr td:nth-child(1)').each( function(){
		arrayDias.push( $(this).text() );
	});
	$('#' + objTable + ' tbody tr td:nth-child(2)').each( function(){
		arrayDesde.push( $(this).text() );       
	});
	$('#' + objTable + ' tbody tr td:nth-child(3)').each( function(){
		arrayHasta.push( $(this).text() );       
	});
	
	arrayHorario.push(arrayDias);
	arrayHorario.push(arrayDesde);
	arrayHorario.push(arrayHasta);
	
	
	return arrayHorario;
}

function FxHabilitarEdicionMasivaJS()
{
	//Si la grila no esta visible...o esta cargando...return false
	if ( $('.classChkEdicionMasiva').length === 0 ) { return false; }

	//Desplegamos botones
	$('.classChkEdicionMasiva').fadeToggle(2000, 'swing');
	
	//Switch del botones
	//Ocultamos Habilitar
	$('#btnHabilitarMasiva').hide();
	//Mostramos Editar Seleccionado
	$('#btnEditarSeleccionados').fadeIn(3000, 'swing');
}

function FxSeleccionarEdicionMasivaJS()
{
	//Puntos Seleccionados
	var arrayPuntosBase = [];
	$('.checkEdicionMasiva').each( function(){
		if ($(this).prop('checked'))
		{
			arrayPuntosBase.push( $(this).val() );
		}
	});
	//Validamos que se haya seleccionado al menos un punto
	if (!arrayPuntosBase.length)
	{
		sweetAlert('Error', 'Debe seleccionar los puntos a editar.', 'error');
		return false;
	}
	
	
	jsonArray = { "arrayPuntosBase": arrayPuntosBase };
	var URL = $('#UrlPopupEdicionMasiva').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';

	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupEdicionMasivaJS);
	
}

function FxGridPuntoExcelExportJS()
{
	selectedFilters = FxGetFilterJS();
    dataExport = FxGetDataExportJS();
	jsonArray = { "selectedFilters": selectedFilters,
				  "dataExport" : dataExport
				};
	var URL = $('#UrlAjaxGridExportExcel').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divExcelExport';

	exeAjaxCallBack(URL, strData, strDivResponse, FxShowDownloadMessage);

}

function FxShowDownloadMessage()
{

	swal({
			title: "",
			text: "El archivo fue generado satisfactoriamente.",
			type: "success",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Descargar",
			cancelButtonText: "Cancelar",
			closeOnConfirm: true
		},
		function(){
			document.getElementById('hrefExcelExport').click();
		});
}



function FxSetPopupEdicionMasivaJS(result)
{
	$('#divResponseAjaxPopupModal').html(result);
    
	$('#modalPopup').openModal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		ready: function() { }, // Callback for Modal open
		complete: function() { FxCloseToastJS(); } // Callback for Modal close
	});
	//Convertir Combos
	$('.selectForm').material_select();
	//ToolTip
	$('.tooltipped').tooltip({delay: 50});
	
}

function FxEnableInputJS(objInput)
{
	objId = $(objInput).prop('id')
	var arrayField = objId.split('_')

	/* arrayField[1] contiene el nombre del elemento a habilitar/deshabilitar */
	
	if ($('#' + objId).prop('checked')) //Esta check...se habilita
	{
		//Habilitar
		$('#' + arrayField[1]).prop('disabled', false);
	}
	else
	{
		$('#' + arrayField[1]).val(''); //Elimina data textbox
		$('#' + arrayField[1]).prop('checked', false); //Uncheck
		$('#label_' + arrayField[1]).removeClass('active'); //Remueve class "active"
		$('#' + arrayField[1]).prop('disabled', true); //Deshabilita input
	}

}

function FxEnableHorariosJS()
{
	$('#tableHorariosMasiva').toggle(600);
}

function FxSaveEdicionMasivaJS()
{
	//Validaciones
	//Algun servicio seleccionado
	if ( !$('#chkServicioPickit').prop('checked') &&
		 !$('#chkServicioStorePickup').prop('checked') &&
		 !$('#chkServicioDropoff').prop('checked') )
	{
		sweetAlert('Error', 'Debe seleccionar algún servicio a editar.', 'error'); 
		return false;
	}
	//Se validan los items obligatorios "(*)" y que esten activados con el check correspondiente
	if ($('#enable_txtValorMaximoMasiva').prop('checked')) //Esta check...se valida
	{
		if ( $('#txtValorMaximoMasiva').val() == '' ) { sweetAlert('Error', 'Debe ingresar el valor máximo del pedido.', 'error'); return false; }
	}
	if ( $('#enable_txtCapacidadMasiva').prop('checked') ) //Esta check...se valida
	{
		if ( $('#txtCapacidadMasiva').val() == '' ) { sweetAlert('Error', 'Debe ingresar el volumen máximo del pedido.', 'error'); return false; }
	}
	
	//Validamos que al menos se haya seleccionado un campo a editar
	if ( !$('#enable_txtValorMaximoMasiva').prop('checked') &&
		 !$('#enable_txtCapacidadMasiva').prop('checked') &&
		 !$('#enable_txtValorMaximoTransaccionesMasiva').prop('checked') &&
		 !$('#enable_txtValorMaximoProductosMasiva').prop('checked') &&
		 !$('#enable_txtValorMaximoVolumenMasiva').prop('checked') &&
		 !$('#enable_txtDiasVencimientoMasiva').prop('checked') &&
		 !$('#enable_chkAceptaDevolucionesMasiva').prop('checked') &&
		 !$('#enable_tableHorariosMasiva').prop('checked')  )
	{
		sweetAlert('Error', 'Debe seleccionar algún campo a editar.', 'error'); 
		return false;
	}
	
	//Puntos Base
	var arrayPuntosBase = $('#hiddenArrayPuntosBase').val();
	//Servicios a Editar
	var chkServicioPickit = ($('#chkServicioPickit').prop('checked')) ? 1 : 0;
	var chkServicioStorePickup = ($('#chkServicioStorePickup').prop('checked')) ? 1 : 0;
	var chkServicioDropoff = ($('#chkServicioDropoff').prop('checked')) ? 1 : 0;
	
	//Campos Habilitados
	var enable_txtValorMaximoMasiva = ($('#enable_txtValorMaximoMasiva').prop('checked')) ? 1 : 0;
	var enable_txtCapacidadMasiva = ($('#enable_txtCapacidadMasiva').prop('checked')) ? 1 : 0;
	var enable_txtValorMaximoTransaccionesMasiva = ($('#enable_txtValorMaximoTransaccionesMasiva').prop('checked')) ? 1 : 0;
	var enable_txtValorMaximoProductosMasiva = ($('#enable_txtValorMaximoProductosMasiva').prop('checked')) ? 1 : 0;
	var enable_txtValorMaximoVolumenMasiva = ($('#enable_txtValorMaximoVolumenMasiva').prop('checked')) ? 1 : 0;
	var enable_txtDiasVencimientoMasiva = ($('#enable_txtDiasVencimientoMasiva').prop('checked')) ? 1 : 0;
	var enable_chkAceptaDevolucionesMasiva = ($('#enable_chkAceptaDevolucionesMasiva').prop('checked')) ? 1 : 0;
	var enable_tableHorariosMasiva = ($('#enable_tableHorariosMasiva').prop('checked')) ? 1 : 0;

	//Valores 
	var txtValorMaximoMasiva = $('#txtValorMaximoMasiva').val();
	var txtCapacidadMasiva = $('#txtCapacidadMasiva').val();
	var txtValorMaximoTransaccionesMasiva = $('#txtValorMaximoTransaccionesMasiva').val();
	var txtValorMaximoProductosMasiva = $('#txtValorMaximoProductosMasiva').val();
	var txtValorMaximoVolumenMasiva = $('#txtValorMaximoVolumenMasiva').val();
	var txtDiasVencimientoMasiva = $('#txtDiasVencimientoMasiva').val();
	var chkAceptaDevolucionesMasiva = ($('#chkAceptaDevolucionesMasiva').prop('checked')) ? 1 : 0;
	var tableHorariosMasiva = FxGetTableHorariosDataJS('tableHorariosMasiva');
	
	//Horarios
	
	
	jsonArray = { "arrayPuntosBase": arrayPuntosBase,
				  "chkServicioPickit": chkServicioPickit,
				  "chkServicioStorePickup": chkServicioStorePickup,
				  "chkServicioDropoff": chkServicioDropoff,	
				  "enable_txtValorMaximoMasiva": enable_txtValorMaximoMasiva,
				  "enable_txtCapacidadMasiva": enable_txtCapacidadMasiva,
				  "enable_txtValorMaximoTransaccionesMasiva": enable_txtValorMaximoTransaccionesMasiva,
                  "enable_txtValorMaximoProductosMasiva": enable_txtValorMaximoProductosMasiva,
                  "enable_txtValorMaximoVolumenMasiva": enable_txtValorMaximoVolumenMasiva,
                  "enable_txtDiasVencimientoMasiva": enable_txtDiasVencimientoMasiva,
				  "enable_chkAceptaDevolucionesMasiva": enable_chkAceptaDevolucionesMasiva,
				  "enable_tableHorariosMasiva": enable_tableHorariosMasiva,
				  "txtValorMaximoMasiva": txtValorMaximoMasiva,
				  "txtCapacidadMasiva": txtCapacidadMasiva,
				  "txtValorMaximoTransaccionesMasiva": txtValorMaximoTransaccionesMasiva,
                  "txtValorMaximoProductosMasiva": txtValorMaximoProductosMasiva,
                  "txtValorMaximoVolumenMasiva": txtValorMaximoVolumenMasiva,
                  "txtDiasVencimientoMasiva": txtDiasVencimientoMasiva,
				  "chkAceptaDevolucionesMasiva": chkAceptaDevolucionesMasiva,
				  "tableHorariosMasiva": tableHorariosMasiva };
	
	var URL = $('#UrlSaveEdicionMasiva').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageMasivaSuccessJS);
	
}

function FxShowMessageMasivaSuccessJS()
{
	swal({
		title: "",
		text: "La edición masiva fue realizada satisfactoriamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: true },
		function(){
				$('#modalPopup').closeModal(); //Close Popup
				FxCloseToastJS(); //Close toast
		});
}

function FxPopupVerPuntosToastJS()
{
	FxCloseToastJS(); //Cerramos toast abiertos
	var nombresPuntos = $('#hiddenNombresPuntosBase').val();
	var $toastContent = nombresPuntos.replace(/\|/g, '<br/>');
	Materialize.toast($toastContent, 60000);	
}

function FxCloseToastJS()
{
	$('#toast-container').html('');
}

function FxGetFilterJS()
{
	//Capturamos Filtros
	//Nombre
	var filterNombre = $('#txtNombre').val();
	//Cadena
	var filterCadena = $('#txtCadena').val();
	//Retailer
	var filterRetailer = $('#txtRetailer').val();
	//Usuario
	var filterUsuarios = $('#txtUsers').val();

	var selectedFilters = { 'filterNombre': filterNombre,
		'filterCadena': filterCadena,
		'filterRetailer': filterRetailer,
		'filterUsuarios': filterUsuarios,
	};

	return selectedFilters;

}
function FxGetDataExportJS()
{
	var servPickit, servStorePickUp, servDO, servEstadoPunto;
	var idHashed;
	var tableData = new Array();
    $('tbody tr:visible').each(function(row, tr) {
        idHashed =$.trim($(this).find('td:eq(11)').text());

        servPickit = $.trim($(this).find('td:eq(5)').text());
        servStorePickUp = $.trim($(this).find('td:eq(6)').text());
        servDO = $.trim($(this).find('td:eq(7)').text());
        servEstadoPunto = $.trim($(this).find('td:eq(8)').text());
        if(servPickit == "check_circle"){
            servPickit = "1";
        }else if(servPickit == "remove_circle"){
            servPickit = "-1";
        }else{
            servPickit = "0";
        }

        if(servStorePickUp == "check_circle"){
            servStorePickUp = "1";
        }else if(servStorePickUp == "remove_circle"){
            servStorePickUp = "-1";
        }else{
            servStorePickUp = "0";
        }

        if(servDO == "check_circle"){
            servDO = "1";
        }else if(servDO == "remove_circle"){
            servDO = "-1";
        }else{
            servDO = "0";
        }

        if(servEstadoPunto == "check_circle"){
            servEstadoPunto = "1";
        }else if(servEstadoPunto == "remove_circle"){
            servEstadoPunto = "-1";
        }else{
            servEstadoPunto = "0";
        }

		tableData[row]= {
			"nombre": $.trim($(this).find('td:eq(0)').text()),
			"CUIT": $.trim($(this).find('td:eq(1)').text()),
			"nombreCadena": $.trim($(this).find('td:eq(2)').text()),
			"nombreRetailer": $.trim($(this).find('td:eq(3)').text()),
			"servPickit": servPickit,
			"servStorePickUp": servStorePickUp,
			"servDO": servDO,
			"servEstadoPunto": servEstadoPunto,
			"idHashed": idHashed,
		}
    });
	return tableData;

}

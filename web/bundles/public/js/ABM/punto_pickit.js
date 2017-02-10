/* Javascript Functions */

function FxAddPuntoPickitHorarioJS()
{
	if ($('#txtPuntoPickitHorarioAdd').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el día.', 'error');
		return false;
		}
	
	var texto = $('#txtPuntoPickitHorarioAdd').val();
	var horaDesde = $('#selectPuntoPickitHoraDesde').val();
	var horaHasta = $('#selectPuntoPickitHoraHasta').val();
	var minutoDesde = $('#selectPuntoPickitMinutoDesde').val();
	var minutoHasta = $('#selectPuntoPickitMinutoHasta').val();
	var desde = horaDesde + ':' + minutoDesde;
	var hasta = horaHasta + ':' + minutoHasta;

	//Add <tr>
	var trCount = $('#hiddenTablaHorarioCount').val()*1 + 1;
	var newTr = '<tr id="trTablaHorario_' + trCount + '">' +
				'	<td class="center">' + texto + '</td>' + 
				'	<td class="center">' + desde + '</td>' + 
				'	<td class="center">' + hasta + '</td>' + 
				'	<td class="center">' + 
				'		<a class="btn-floating waves-effect waves-light black right hrefTablaHorariosPuntoPickit" href="javascript:FxDeleteTableRowHorariosPuntoPickit(' + trCount + ')">' + 
				'			<i class="material-icons">close</i>' + 
				'		</a>' +
				'	</td>' + 
				'</tr>';
	$('#tablePuntoPickitHorarios').append(newTr);
	
	//Clear
	$('#txtPuntoPickitHorarioAdd').val('');
	
	FxRecalcularTableRowHorariosPuntoPickit();
}

function FxRecalcularTableRowHorariosPuntoPickit()
{
	var rowCount = $('#tablePuntoPickitHorarios tbody tr').length;
	$('#hiddenTablaHorarioCount').val(rowCount);
}

function FxDeleteTableRowHorariosPuntoPickit(trId)
{
	$('#trTablaHorario_' + trId).remove();
	FxRecalcularTableRowHorariosPuntoPickit();
	
}

function FxSavePuntoPickitJS()
{
	if ($('#txtNombrePuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#selectCadenaPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la cadena.', 'error');
		return false;
	}
	if ($('#selectTipoPuntoPickitPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el tipo de punto pickit.', 'error');
		return false;
	}
	if ($('#selectZonaPuntoPickitPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la zona geográfica del punto pickit.', 'error');
		return false;
	}
	if ($('#txtResponsablePuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el responsable.', 'error');
		return false;
	}
	if ($('#txtEmailPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#autocomplete').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección del punto pickit.', 'error');
		return false;
	}
	if ($('#selectProvinciaPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la provincia del punto pickit.', 'error');
		return false;
	}
	if ($('#locality').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la localidad del punto pickit.', 'error');
		return false;
	}
	if ($('#postal_code').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el código postal del punto pickit.', 'error');
		return false;
	}
	if ($('#txtLatitudPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la latitud del punto pickit.', 'error');
		return false;
	}
	if ($('#txtLongitudPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la longitud del punto pickit.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección custom del punto pickit.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomPuntoPickit').val().length > 50)
	{
		sweetAlert('Error', 'La dirección custom del punto pickit no debe superar los 50 caracteres.', 'error');
		return false;
	}
	if ($('#txtValorMaximoPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el valor máximo del punto pickit.', 'error');
		return false;
	}
	if ($('#txtCapacidadPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad del punto pickit.', 'error');
		return false;
	}
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesPuntoPickit').val() != '' && $('#txtValorMaximoProductosPuntoPickit').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesPuntoPickit').val() == '' && $('#txtValorMaximoProductosPuntoPickit').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesPuntoPickit').val() != '' && $('#txtValorMaximoProductosPuntoPickit').val() != '') && ($('#txtValorMaximoTransaccionesPuntoPickit').val()*1 > $('#txtValorMaximoProductosPuntoPickit').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	
	//[INICIO] - Validacion para cambio de cadena (SOLO EDICION)
	//Al editar el campo cadena de un punto pickit, si la cadena no esta asociada a ningún retailer, permite realizar el cambio.
	//En caso contrario debe mostrar un alert indicando que debe desasociarse la cadena y el retailer para realizar la modificación.
	if ( $('#hiddenPuntoPickitId').val() ) //Si existe el id del punto pickit...es edicion
	{
		//Comparamos la cadena original versus la cadena del combo...si son distintas...se valida que no tenga retailer asociado
		if ( $('#hiddenCadenaOriginalId').val() != $('#selectCadenaPuntoPickit').val() )
		{
			//Se intenta cambiar la cadena...se pregunta si esa cadena esta asociada a un retailer...
			//Si el campo 'txtRetailerPuntoPickit' tiene data...entonces el punto pickit tiene retailer
			if ( $('#txtRetailerPuntoPickit').val() != '' )
			{
				sweetAlert('Error', 'Para realizar la modificación de la cadena, primero debe desasociarla del retailer.', 'warning');
				return false;
			}
		}
	}
	//[FIN] - Validacion para cambio de cadena (SOLO EDICION)
	
	
	var puntoPickitAceptaDevoluciones = ($('#chkAceptaDevolucionesPuntoPickit').prop('checked')) ? 1 : 0;
	var servicioEstado = ($('#chkEstadoServicioPuntoPickit').prop('checked')) ? 1 : 0;
	var puntoEstado = ($('#chkEstadoPuntoPuntoPickit').prop('checked')) ? 1 : 0;
	
	//Tipo Producto
	var arrayTipoProducto = [];
	for (i = 1; i <= $('#hiddenTipoProductoCount').val(); i++)
	{
		if ($('#puntoPickitTipoProducto_' + i).prop('checked'))
		{
			arrayTipoProducto.push( $('#puntoPickitTipoProducto_' + i).val() );
		}
	}
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosPuntoPickitData();
	
	//Atributos
	var arrayAtributos = [];
	$('.checkAtributoPuntoPickit').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "puntoPickitId": $('#hiddenPuntoPickitId').val(),
				  "puntoPickitNombre": $('#txtNombrePuntoPickit').val(),
				  "puntoPickitCadenaId": $('#selectCadenaPuntoPickit').val(),
				  "puntoPickitTipoPuntoPickitId": $('#selectTipoPuntoPickitPuntoPickit').val(),
				  "puntoPickitZonaPuntoPickitId": $('#selectZonaPuntoPickitPuntoPickit').val(),
				  "puntoPickitResponsable": $('#txtResponsablePuntoPickit').val(),
				  "puntoPickitEmail": $('#txtEmailPuntoPickit').val(),
				  "puntoPickitTelefono": $('#txtTelefonoPuntoPickit').val(),
				  "puntoPickitDireccion": $('#autocomplete').val(),
				  "puntoPickitProvinciaId": $('#selectProvinciaPuntoPickit').val(),
				  "puntoPickitLocalidad": $('#locality').val(),
				  "puntoPickitCodigoPostal": $('#postal_code').val(),
				  "puntoPickitLatitud": $('#txtLatitudPuntoPickit').val(),
				  "puntoPickitLongitud": $('#txtLongitudPuntoPickit').val(),
				  "puntoPickitDireccionCustom": $('#txtDireccionCustomPuntoPickit').val(),
				  "puntoPickitValorMaximo": $('#txtValorMaximoPuntoPickit').val(),
                  "puntoPickitValorMaximoTransacciones": $('#txtValorMaximoTransaccionesPuntoPickit').val(),
                  "puntoPickitValorMaximoProductos": $('#txtValorMaximoProductosPuntoPickit').val(),
                  "puntoPickitValorMaximoVolumen": $('#txtValorMaximoVolumenPuntoPickit').val(),
                  "puntoPickitDiasVencimiento": $('#txtDiasVencimientoPuntoPickit').val(),
				  "puntoPickitCapacidad": $('#txtCapacidadPuntoPickit').val(),
				  "puntoPickitAceptaDevoluciones": puntoPickitAceptaDevoluciones,
				  "puntoPickitServicioEstado": servicioEstado,
				  "puntoPickitPuntoEstado": puntoEstado,
				  "puntoPickitTipoProducto": arrayTipoProducto,
				  "puntoPickitHorarios": arrayHorarios,
				  "puntoPickitAtributos": arrayAtributos };

	
	
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxSaveUsuarioPuntoPickitJS()
{
	if ($('#txtEmailUsuarioPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el e-mail.', 'error');
		return false;
	}
	if ($('#txtNombreUsuarioPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtApellidoUsuarioPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el apellido.', 'error');
		return false;
	}
	if ($('#hiddenUsuarioPuntoPickitId').val() == '' && $('#txtPasswordUsuarioPuntoPickit').val() == '') //Es usuario nuevo...debe ingresar password
	{
		sweetAlert('Error', 'Debe ingresar el password.', 'error');
		return false;
	}
	if ($('#txtPasswordUsuarioPuntoPickit').val() != '' || $('#txtRePasswordUsuarioPuntoPickit').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioPuntoPickit').val() == '' || $('#txtRePasswordUsuarioPuntoPickit').val() == '')
		{
			sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error');
			return false;
		}
		if ($('#txtPasswordUsuarioPuntoPickit').val() != $('#txtRePasswordUsuarioPuntoPickit').val())
		{
			sweetAlert('Error', 'Las passwords no coinciden.', 'error');
			return false;
		}
	}
	if ($('#selectRolUsuarioPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el rol.', 'error');
		return false;
	}
	($('#chkEstadoUsuarioPuntoPickit').prop('checked')) ? usuarioPuntoPickitEstado = 1 : usuarioPuntoPickitEstado = 0;
	
	jsonArray = { "usuarioPuntoPickitId": $('#hiddenUsuarioPuntoPickitId').val(),
				  "usuarioPuntoPickitIdPuntoPickit": $('#hiddenEntityId').val(),
				  "usuarioPuntoPickitRolId": $('#selectRolUsuarioPuntoPickit').val(),
				  "usuarioPuntoPickitNombre": $('#txtNombreUsuarioPuntoPickit').val(),
				  "usuarioPuntoPickitApellido": $('#txtApellidoUsuarioPuntoPickit').val(),
				  "usuarioPuntoPickitEmail": $('#txtEmailUsuarioPuntoPickit').val(),
				  "usuarioPuntoPickitPassword": $('#txtPasswordUsuarioPuntoPickit').val(),
				  "usuarioPuntoPickitEstado": usuarioPuntoPickitEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

function FxOpenPuntoPickitUsersJS(puntoPickitId)
{
	window.location.href = $('#UrlUsersPuntoPickit').val() + '/' + puntoPickitId;
}

function FxGetTableHorariosPuntoPickitData()
{
	var arrayHorario=[], arrayDias=[], arrayDesde=[], arrayHasta=[];

	$('#tablePuntoPickitHorarios tbody tr td:nth-child(1)').each( function(){
		arrayDias.push( $(this).text() );
	});
	$('#tablePuntoPickitHorarios tbody tr td:nth-child(2)').each( function(){
		arrayDesde.push( $(this).text() );       
	});
	$('#tablePuntoPickitHorarios tbody tr td:nth-child(3)').each( function(){
		arrayHasta.push( $(this).text() );       
	});
	
	arrayHorario.push(arrayDias);
	arrayHorario.push(arrayDesde);
	arrayHorario.push(arrayHasta);
	
	
	return arrayHorario;
}

function FxOpenModalPopupPuntoPickitDesdeExistenteJS()
{
	var URL = $('#UrlAjaxPopupDesdeExistente').val();
	var strData = { };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxGetSucursalesFromCadenaJS()
{
	if ($('#selectCadenaPuntoPickitExistente').val() == '')
	{
		$('#divResponseRetailer').html('');
		return false;
	}
	
	jsonArray = { "cadenaId": $('#selectCadenaPuntoPickitExistente').val() };
				  
	var URL = $('#UrlAjaxPopupComboSucursalPuntoPickitExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseCadena';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetSucursalesFromCadenaPostOperacionesJS);
}

function FxGetSucursalesFromCadenaPostOperacionesJS()
{
	$('.selectForm').material_select('destroy');
	$('.selectForm').material_select();
}

function FxSetSucursalDataJS()
{
	if ($('#selectSucursalPuntoPickitExistente').val() == '')
	{
		$('#divResponseSucursal').html('');
		return false;
	}
	
	jsonArray = { "sucursalId": $('#selectSucursalPuntoPickitExistente').val() };
				  
	var URL = $('#UrlAjaxPopupDataSucursalPuntoPickitExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseSucursal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetSucursalesFromCadenaPostOperacionesJS);
}

function FxSavePuntoPickitDesdeExistenteJS()
{
	if ($('#txtEmailPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#selectCadenaPuntoPickitExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la cadena.', 'error');
		return false;
	}
	if ($('#selectTipoPuntoPickitPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el tipo de punto pickit.', 'error');
		return false;
	}
	if ($('#selectZonaPuntoPickitPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la zona geográfica del punto pickit.', 'error');
		return false;
	}
	if ($('#txtValorMaximoPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el valor máximo del punto pickit.', 'error');
		return false;
	}
	if ($('#txtCapacidadPuntoPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad del punto pickit.', 'error');
		return false;
	}
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesPuntoPickit').val() != '' && $('#txtValorMaximoProductosPuntoPickit').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesPuntoPickit').val() == '' && $('#txtValorMaximoProductosPuntoPickit').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesPuntoPickit').val() != '' && $('#txtValorMaximoProductosPuntoPickit').val() != '') && ($('#txtValorMaximoTransaccionesPuntoPickit').val()*1 > $('#txtValorMaximoProductosPuntoPickit').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	
	var puntoPickitAceptaDevoluciones = ($('#chkAceptaDevolucionesPuntoPickit').prop('checked')) ? 1 : 0;
	
	//Tipo Producto
	var arrayTipoProducto = [];
	for (i = 1; i <= $('#hiddenTipoProductoCount').val(); i++)
	{
		if ($('#puntoPickitTipoProducto_' + i).prop('checked'))
		{
			arrayTipoProducto.push( $('#puntoPickitTipoProducto_' + i).val() );
		}
	}
	
	jsonArray = { "puntoPickitSucursalId": $('#selectSucursalPuntoPickitExistente').val(),
				  "puntoPickitCadenaId": $('#selectCadenaPuntoPickitExistente').val(),
				  "puntoPickitTipoPuntoPickitId": $('#selectTipoPuntoPickitPuntoPickit').val(),
				  "puntoPickitZonaPuntoPickitId": $('#selectZonaPuntoPickitPuntoPickit').val(),
				  "puntoPickitEmail": $('#txtEmailPuntoPickit').val(),
				  "puntoPickitValorMaximo": $('#txtValorMaximoPuntoPickit').val(),
                  "puntoPickitValorMaximoTransacciones": $('#txtValorMaximoTransaccionesPuntoPickit').val(),
                  "puntoPickitValorMaximoProductos": $('#txtValorMaximoProductosPuntoPickit').val(),
                  "puntoPickitValorMaximoVolumen": $('#txtValorMaximoVolumenPuntoPickit').val(),
                  "puntoPickitDiasVencimiento": $('#txtDiasVencimientoPuntoPickit').val(),
				  "puntoPickitCapacidad": $('#txtCapacidadPuntoPickit').val(),
				  "puntoPickitAceptaDevoluciones": puntoPickitAceptaDevoluciones,
				  "puntoPickitTipoProducto": arrayTipoProducto };

	var URL = $('#UrlAjaxSavePuntoPickitExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxCheckEstadoPunto()
{
	if ($('#chkEstadoPuntoPuntoPickit').prop('checked'))
	{
		$('#chkEstadoServicioPuntoPickit').prop('disabled', false);
	}
	else
	{
		$('#chkEstadoServicioPuntoPickit').prop('checked', false);
		$('#chkEstadoServicioPuntoPickit').prop('disabled', true);
	}
}
/* Javascript Functions */

function FxAddSucursalHorarioJS()
{
	if ($('#txtSucursalHorarioAdd').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el día.', 'error');
		return false;
		}
	
	var texto = $('#txtSucursalHorarioAdd').val();
	var horaDesde = $('#selectSucursalHoraDesde').val();
	var horaHasta = $('#selectSucursalHoraHasta').val();
	var minutoDesde = $('#selectSucursalMinutoDesde').val();
	var minutoHasta = $('#selectSucursalMinutoHasta').val();
	var desde = horaDesde + ':' + minutoDesde;
	var hasta = horaHasta + ':' + minutoHasta;

	//Add <tr>
	var trCount = $('#hiddenTablaHorarioCount').val()*1 + 1;
	var newTr = '<tr id="trTablaHorario_' + trCount + '">' +
				'	<td class="center">' + texto + '</td>' + 
				'	<td class="center">' + desde + '</td>' + 
				'	<td class="center">' + hasta + '</td>' + 
				'	<td class="center">' + 
				'		<a class="btn-floating waves-effect waves-light black right hrefTablaHorariosSucursal" href="javascript:FxDeleteTableRowHorariosSucursal(' + trCount + ')">' + 
				'			<i class="material-icons">close</i>' + 
				'		</a>' +
				'	</td>' + 
				'</tr>';
	$('#tableSucursalHorarios').append(newTr);
	
	//Clear
	$('#txtSucursalHorarioAdd').val('');
	
	FxRecalcularTableRowHorariosSucursal();
}

function FxRecalcularTableRowHorariosSucursal()
{
	var rowCount = $('#tableSucursalHorarios tbody tr').length;
	$('#hiddenTablaHorarioCount').val(rowCount);
}

function FxDeleteTableRowHorariosSucursal(trId)
{
	$('#trTablaHorario_' + trId).remove();
	FxRecalcularTableRowHorariosSucursal();
	
}

function FxSaveSucursalJS()
{
	if ($('#txtNombreSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#selectRetailerSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el retailer.', 'error');
		return false;
	}
	if ($('#txtResponsableSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el responsable.', 'error');
		return false;
	}
	if ($('#txtEmailSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#autocomplete').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección de la sucursal.', 'error');
		return false;
	}
	if ($('#selectProvinciaSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la provincia de la sucursal.', 'error');
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
	if ($('#txtLatitudSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la latitud de la sucursal.', 'error');
		return false;
	}
	if ($('#txtLongitudSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la longitud de la sucursal.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección custom de la sucursal.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomSucursal').val().length > 50)
	{
		sweetAlert('Error', 'La dirección custom de la sucursal no debe superar los 50 caracteres.', 'error');
		return false;
	}
	if ($('#txtValorMaximoSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el valor máximo de la sucursal.', 'error');
		return false;
	}
	if ($('#txtCapacidadSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad de la sucursal.', 'error');
		return false;
	}
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesSucursal').val() != '' && $('#txtValorMaximoProductosSucursal').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesSucursal').val() == '' && $('#txtValorMaximoProductosSucursal').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesSucursal').val() != '' && $('#txtValorMaximoProductosSucursal').val() != '') && ($('#txtValorMaximoTransaccionesSucursal').val()*1 > $('#txtValorMaximoProductosSucursal').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}

	//[INICIO] - Validacion para cambio de retailer (SOLO EDICION)
	//Al editar el campo retailer de una sucursal, si el retailer no esta asociado a ninguna cadena, permite realizar el cambio.
	//En caso contrario debe mostrar un alert indicando que debe desasociarse el retailer y la cadena para realizar la modificación.
	if ( $('#hiddenSucursalId').val() ) //Si existe el id del punto pickit...es edicion
	{
		//Comparamos el retailer original versus el retailer del combo...si son distintos...se valida que no tenga cadena asociada
		if ( $('#hiddenRetailerOriginalId').val() != $('#selectRetailerSucursal').val() )
		{
			//Se intenta cambiar el retailer...se pregunta si esa retailer esta asociado a una cadena...
			//Si el campo 'txtCadenaSucursal' tiene data...entonces la sucursal tiene cadena
			if ( $('#txtCadenaSucursal').val() != '' )
			{
				sweetAlert('Error', 'Para realizar la modificación del retailer, primero debe desasociarlo de la cadena.', 'warning');
				return false;
			}
		}
	}
	//[FIN] - Validacion para cambio de cadena (SOLO EDICION)

	
	var sucursalAceptaDevoluciones = ($('#chkAceptaDevolucionesSucursal').prop('checked')) ? 1 : 0;
	var servicioEstado = ($('#chkEstadoServicioSucursal').prop('checked')) ? 1 : 0;
	var puntoEstado = ($('#chkEstadoPuntoSucursal').prop('checked')) ? 1 : 0;
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosSucursalData();
	
	//Atributos
	var arrayAtributos = []
	$('.checkAtributoSucursal').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "sucursalId": $('#hiddenSucursalId').val(),
				  "sucursalNombre": $('#txtNombreSucursal').val(),
				  "sucursalRetailerId": $('#selectRetailerSucursal').val(),
				  "sucursalResponsable": $('#txtResponsableSucursal').val(),
				  "sucursalEmail": $('#txtEmailSucursal').val(),
				  "sucursalTelefono": $('#txtTelefonoSucursal').val(),
				  "sucursalDireccion": $('#autocomplete').val(),
				  "sucursalProvinciaId": $('#selectProvinciaSucursal').val(),
				  "sucursalLocalidad": $('#locality').val(),
				  "sucursalCodigoPostal": $('#postal_code').val(),
				  "sucursalLatitud": $('#txtLatitudSucursal').val(),
				  "sucursalLongitud": $('#txtLongitudSucursal').val(),
				  "sucursalDireccionCustom": $('#txtDireccionCustomSucursal').val(),
                  "sucursalValorMaximoTransacciones": $('#txtValorMaximoTransaccionesSucursal').val(),
                  "sucursalValorMaximoProductos": $('#txtValorMaximoProductosSucursal').val(),
                  "sucursalDiasVencimiento": $('#txtDiasVencimientoSucursal').val(),
				  "sucursalCapacidad": $('#txtCapacidadSucursal').val(),
				  "sucursalAceptaDevoluciones": sucursalAceptaDevoluciones,
				  "sucursalServicioEstado": servicioEstado,
				  "sucursalPuntoEstado": puntoEstado,
				  "sucursalHorarios": arrayHorarios,
				  "sucursalAtributos": arrayAtributos };

	
	
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxSaveUsuarioSucursalJS()
{
	if ($('#txtEmailUsuarioSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el e-mail.', 'error');
		return false;
	}
	if ($('#txtNombreUsuarioSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtApellidoUsuarioSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el apellido.', 'error');
		return false;
	}
	if ($('#hiddenUsuarioSucursalId').val() == '' && $('#txtPasswordUsuarioSucursal').val() == '') //Es usuario nuevo...debe ingresar password
	{
		sweetAlert('Error', 'Debe ingresar el password.', 'error');
		return false;
	}
	if ($('#txtPasswordUsuarioSucursal').val() != '' || $('#txtRePasswordUsuarioSucursal').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioSucursal').val() == '' || $('#txtRePasswordUsuarioSucursal').val() == '')
		{
			sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error');
			return false;
		}
		if ($('#txtPasswordUsuarioSucursal').val() != $('#txtRePasswordUsuarioSucursal').val())
		{
			sweetAlert('Error', 'Las passwords no coinciden.', 'error');
			return false;
		}
	}
	if ($('#selectRolUsuarioSucursal').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el rol.', 'error');
		return false;
	}
	($('#chkEstadoUsuarioSucursal').prop('checked')) ? usuarioSucursalEstado = 1 : usuarioSucursalEstado = 0;
	
	jsonArray = { "usuarioSucursalId": $('#hiddenUsuarioSucursalId').val(),
				  "usuarioSucursalIdSucursal": $('#hiddenEntityId').val(),
				  "usuarioSucursalRolId": $('#selectRolUsuarioSucursal').val(),
				  "usuarioSucursalNombre": $('#txtNombreUsuarioSucursal').val(),
				  "usuarioSucursalApellido": $('#txtApellidoUsuarioSucursal').val(),
				  "usuarioSucursalEmail": $('#txtEmailUsuarioSucursal').val(),
				  "usuarioSucursalPassword": $('#txtPasswordUsuarioSucursal').val(),
				  "usuarioSucursalEstado": usuarioSucursalEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

function FxOpenSucursalUsersJS(sucursalId)
{
	window.location.href = $('#UrlUsersSucursal').val() + '/' + sucursalId;
}

function FxGetTableHorariosSucursalData()
{
	var arrayHorario=[], arrayDias=[], arrayDesde=[], arrayHasta=[];

	$('#tableSucursalHorarios tbody tr td:nth-child(1)').each( function(){
		arrayDias.push( $(this).text() );
	});
	$('#tableSucursalHorarios tbody tr td:nth-child(2)').each( function(){
		arrayDesde.push( $(this).text() );       
	});
	$('#tableSucursalHorarios tbody tr td:nth-child(3)').each( function(){
		arrayHasta.push( $(this).text() );       
	});
	
	arrayHorario.push(arrayDias);
	arrayHorario.push(arrayDesde);
	arrayHorario.push(arrayHasta);
	
	
	return arrayHorario;
}


function FxOpenModalPopupSucursalesDesdeExistenteJS()
{
	var URL = $('#UrlAjaxPopupDesdeExistente').val();
	var strData = { };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxGetPuntosPickitFromRetailerJS()
{
	if ($('#selectRetailerSucursalExistente').val() == '')
	{
		$('#divResponseRetailer').html('');
		return false;
	}
	
	jsonArray = { "retailerId": $('#selectRetailerSucursalExistente').val() };
				  
	var URL = $('#UrlAjaxPopupComboPuntoPickitSucursalExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseRetailer';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetPuntosPickitFromRetailerPostOperacionesJS);
}

function FxGetPuntosPickitFromRetailerPostOperacionesJS()
{
	$('.selectForm').material_select('destroy');
	$('.selectForm').material_select();
}

function FxSetPuntoPickitDataJS()
{
	if ($('#selectPuntoPickitSucursalExistente').val() == '')
	{
		$('#divResponsePuntoPickit').html('');
		return false;
	}
	
	jsonArray = { "puntoPickitId": $('#selectPuntoPickitSucursalExistente').val() };
				  
	var URL = $('#UrlAjaxPopupDataPuntoPickitSucursalExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponsePuntoPickit';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetPuntosPickitFromRetailerPostOperacionesJS);
}

function FxSaveSucursalDesdeExistenteJS()
{
	if ($('#selectCadenaSucursalExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la cadena.', 'error');
		return false;
	}
	if ($('#selectPuntoPickitSucursalExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el punto pickit.', 'error');
		return false;
	}
	if ($('#selectRetailerSucursalExistente').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el retailer.', 'error');
		return false;
	}
	if ($('#txtEmailSucursalExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#txtCapacidadSucursalExistente').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la capacidad de la sucursal.', 'error');
		return false;
	}
    
    //Validaciones maximos...
	//Se ingresa valor maximo de transacciones y no se ingresa valor maximo de productos
	var msgError = 'La cantidad de productos debe ser mayor o igual a la cantidad de transacciones';
	if ($('#txtValorMaximoTransaccionesSucursalExistente').val() != '' && $('#txtValorMaximoProductosSucursalExistente').val() == '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresa valor maximo de productos y no se ingresa valor maximo de transacciones
	if ($('#txtValorMaximoTransaccionesSucursalExistente').val() == '' && $('#txtValorMaximoProductosSucursalExistente').val() != '')
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	//Se ingresan valores maximos de transacciones y productos...pero productos es menor que transacciones
	if ( ($('#txtValorMaximoTransaccionesSucursalExistente').val() != '' && $('#txtValorMaximoProductosSucursalExistente').val() != '') && 
		 ($('#txtValorMaximoTransaccionesSucursalExistente').val()*1 > $('#txtValorMaximoProductosSucursalExistente').val())*1 ) 
	{
		sweetAlert('Error', msgError, 'error');
		return false;
	}
	
	var sucursalAceptaDevoluciones = ($('#chkAceptaDevolucionesSucursalExistente').prop('checked')) ? 1 : 0;

	jsonArray = { "sucursalCadenaId": $('#selectCadenaSucursalExistente').val(),
				  "sucursalPuntoPickitId": $('#selectPuntoPickitSucursalExistente').val(),
				  "sucursalRetailerId": $('#selectRetailerSucursalExistente').val(),
				  "sucursalEmail": $('#txtEmailSucursalExistente').val(),
				  "sucursalCapacidad": $('#txtCapacidadSucursalExistente').val(),
                  "sucursalValorMaximoTransacciones": $('#txtValorMaximoTransaccionesSucursalExistente').val(),
                  "sucursalValorMaximoProductos": $('#txtValorMaximoProductosSucursalExistente').val(),
                  "sucursalDiasVencimiento": $('#txtDiasVencimientoSucursalExistente').val(),
				  "sucursalAceptaDevoluciones": sucursalAceptaDevoluciones };

	
	
	var URL = $('#UrlAjaxSaveSucursalExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxCheckEstadoPunto()
{
	if ($('#chkEstadoPuntoSucursal').prop('checked'))
	{
		$('#chkEstadoServicioSucursal').prop('disabled', false);
	}
	else
	{
		$('#chkEstadoServicioSucursal').prop('checked', false);
		$('#chkEstadoServicioSucursal').prop('disabled', true);
	}
}
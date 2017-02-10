/* Javascript Functions */

function FxAddDropoffHorarioJS()
{
	if ($('#txtDropoffHorarioAdd').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el día.', 'error');
		return false;
	}
	
	var texto = $('#txtDropoffHorarioAdd').val();
	var horaDesde = $('#selectDropoffHoraDesde').val();
	var horaHasta = $('#selectDropoffHoraHasta').val();
	var minutoDesde = $('#selectDropoffMinutoDesde').val();
	var minutoHasta = $('#selectDropoffMinutoHasta').val();
	var desde = horaDesde + ':' + minutoDesde;
	var hasta = horaHasta + ':' + minutoHasta;

	//Add <tr>
	var trCount = $('#hiddenTablaHorarioCount').val()*1 + 1;
	var newTr = '<tr id="trTablaHorario_' + trCount + '">' +
				'	<td class="center">' + texto + '</td>' + 
				'	<td class="center">' + desde + '</td>' + 
				'	<td class="center">' + hasta + '</td>' + 
				'	<td class="center">' + 
				'		<a class="btn-floating waves-effect waves-light black right hrefTablaHorariosDropoff" href="javascript:FxDeleteTableRowHorariosDropoff(' + trCount + ')">' + 
				'			<i class="material-icons">close</i>' + 
				'		</a>' +
				'	</td>' + 
				'</tr>';
	$('#tableDropoffHorarios').append(newTr);
	
	//Clear
	$('#txtDropoffHorarioAdd').val('');
	
	FxRecalcularTableRowHorariosDropoff();
}

function FxRecalcularTableRowHorariosDropoff()
{
	var rowCount = $('#tableDropoffHorarios tbody tr').length;
	$('#hiddenTablaHorarioCount').val(rowCount);
}

function FxDeleteTableRowHorariosDropoff(trId)
{
	$('#trTablaHorario_' + trId).remove();
	FxRecalcularTableRowHorariosDropoff();
	
}

function FxSaveDropoffJS()
{
	if ($('#txtNombreDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtResponsableDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el responsable.', 'error');
		return false;
	}
	if ($('#autocomplete').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección del drop off.', 'error');
		return false;
	}
	if ($('#selectProvinciaDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la provincia del drop off.', 'error');
		return false;
	}
	if ($('#locality').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la localidad del drop off.', 'error');
		return false;
	}
	if ($('#postal_code').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el código postal del drop off.', 'error');
		return false;
	}
	if ($('#txtLatitudDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la latitud del drop off.', 'error');
		return false;
	}
	if ($('#txtLongitudDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la longitud del drop off.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección custom del drop off.', 'error');
		return false;
	}
	if ($('#txtDireccionCustomDropoff').val().length > 50)
	{
		sweetAlert('Error', 'La dirección custom del drop off no debe superar los 50 caracteres.', 'error');
		return false;
	}
	
	var servicioEstado = ($('#chkEstadoServicioDropoff').prop('checked')) ? 1 : 0;
	var puntoEstado = ($('#chkEstadoPuntoDropoff').prop('checked')) ? 1 : 0;
	
	//Horarios
	var arrayHorarios = FxGetTableHorariosDropoffData();
	
	//Atributos
	var arrayAtributos = []
	$('.checkAtributoDropoff').each( function(){
		if ($(this).prop('checked'))
		{
			arrayAtributos.push( $(this).val() );
		}
	});
	
	jsonArray = { "dropoffId": $('#hiddenDropoffId').val(),
				  "dropoffNombre": $('#txtNombreDropoff').val(),
				  "dropoffResponsable": $('#txtResponsableDropoff').val(),
				  "dropoffTelefono": $('#txtTelefonoDropoff').val(),
				  "dropoffDireccion": $('#autocomplete').val(),
				  "dropoffProvinciaId": $('#selectProvinciaDropoff').val(),
				  "dropoffLocalidad": $('#locality').val(),
				  "dropoffCodigoPostal": $('#postal_code').val(),
				  "dropoffLatitud": $('#txtLatitudDropoff').val(),
				  "dropoffLongitud": $('#txtLongitudDropoff').val(),
				  "dropoffDireccionCustom": $('#txtDireccionCustomDropoff').val(),
				  "dropoffServicioEstado": servicioEstado,
				  "dropoffPuntoEstado": puntoEstado,
				  "dropoffHorarios": arrayHorarios,
				  "dropoffAtributos": arrayAtributos };

	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxSaveUsuarioDropoffJS()
{
	if ($('#txtEmailUsuarioDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el e-mail.', 'error');
		return false;
	}
	if ($('#txtNombreUsuarioDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtApellidoUsuarioDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el apellido.', 'error');
		return false;
	}
	if ($('#hiddenUsuarioDropoffId').val() == '' && $('#txtPasswordUsuarioDropoff').val() == '') //Es usuario nuevo...debe ingresar password
	{
		sweetAlert('Error', 'Debe ingresar el password.', 'error');
		return false;
	}
	if ($('#txtPasswordUsuarioDropoff').val() != '' || $('#txtRePasswordUsuarioDropoff').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioDropoff').val() == '' || $('#txtRePasswordUsuarioDropoff').val() == '')
		{
			sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error');
			return false;
		}
		if ($('#txtPasswordUsuarioDropoff').val() != $('#txtRePasswordUsuarioDropoff').val())
		{
			sweetAlert('Error', 'Las passwords no coinciden.', 'error');
			return false;
		}
	}
	if ($('#selectRolUsuarioDropoff').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el rol.', 'error');
		return false;
	}
	($('#chkEstadoUsuarioDropoff').prop('checked')) ? usuarioDropoffEstado = 1 : usuarioDropoffEstado = 0;
	
	jsonArray = { "usuarioDropoffId": $('#hiddenUsuarioDropoffId').val(),
				  "usuarioDropoffIdDropoff": $('#hiddenEntityId').val(),
				  "usuarioDropoffRolId": $('#selectRolUsuarioDropoff').val(),
				  "usuarioDropoffNombre": $('#txtNombreUsuarioDropoff').val(),
				  "usuarioDropoffApellido": $('#txtApellidoUsuarioDropoff').val(),
				  "usuarioDropoffEmail": $('#txtEmailUsuarioDropoff').val(),
				  "usuarioDropoffPassword": $('#txtPasswordUsuarioDropoff').val(),
				  "usuarioDropoffEstado": usuarioDropoffEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

function FxOpenDropoffUsersJS(dropoffId)
{
	window.location.href = $('#UrlUsersDropoff').val() + '/' + dropoffId;
}

function FxGetTableHorariosDropoffData()
{
	var arrayHorario=[], arrayDias=[], arrayDesde=[], arrayHasta=[];

	$('#tableDropoffHorarios tbody tr td:nth-child(1)').each( function(){
		arrayDias.push( $(this).text() );
	});
	$('#tableDropoffHorarios tbody tr td:nth-child(2)').each( function(){
		arrayDesde.push( $(this).text() );       
	});
	$('#tableDropoffHorarios tbody tr td:nth-child(3)').each( function(){
		arrayHasta.push( $(this).text() );       
	});
	
	arrayHorario.push(arrayDias);
	arrayHorario.push(arrayDesde);
	arrayHorario.push(arrayHasta);
	
	
	return arrayHorario;
}

function FxSetPuntoPickitDataJS()
{
	if ($('#selectPuntoPickitDropoffExistente').val() == '')
	{
		$('#divResponsePuntoPickit').html('');
		return false;
	}
	
	jsonArray = { "puntoPickitId": $('#selectPuntoPickitDropoffExistente').val() };
				  
	var URL = $('#UrlAjaxPopupDataPuntoPickitDropoffExistente').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponsePuntoPickit';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxGetPuntosPickitFromRetailerPostOperacionesJS);
}

function FxCheckEstadoPunto()
{
	if ($('#chkEstadoPuntoDropoff').prop('checked'))
	{
		$('#chkEstadoServicioDropoff').prop('disabled', false);
	}
	else
	{
		$('#chkEstadoServicioDropoff').prop('checked', false);
		$('#chkEstadoServicioDropoff').prop('disabled', true);
	}
}
/* Javascript Functions */

function FxRetailerAddJS()
{
	window.location.href = $('#UrlAddRetailer').val();
}

function FxRetailerEditJS(retailerIdHashed)
{
	window.location.href = $('#UrlEditRetailer').val() + '/' + retailerIdHashed;
}

function FxApiKeyRetailerRenewJS()
{
	jsonArray = { "retailerId": $('#hiddenRetailerId').val() };
	var URL = $('#UrlAjaxApiKeyRetailerRenew').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseNewApiKey';
	exeAjax(URL, strData, strDivResponse);
	
}

function FxUploadLogoRetailerJS(formId)
{
	var formData = new FormData( $('#' + formId)[0] ); //Esto es equivalente a document.getElementById(formId)
	formData.append("retailerId", $('#hiddenRetailerId').val());
	formData.append("esLoadingGif", 0);

	var URL = $('#UrlAjaxUploadLogoRetailer').val();
	//var strData = { value: jsonArray };	
	var strData = formData;
	var strDivResponse = 'divResponseABM';
	exeAjaxUploadFileCallBack(URL, strData, strDivResponse, FxShowMessageAddFileSuccess);
}

function FxUploadLoadingGifRetailerJS(formId)
{
	var formData = new FormData( $('#' + formId)[0] ); //Esto es equivalente a document.getElementById(formId)
	formData.append("retailerId", $('#hiddenRetailerId').val());
	formData.append("esLoadingGif", 1);

	var URL = $('#UrlAjaxUploadLogoRetailer').val();
	//var strData = { value: jsonArray };	
	var strData = formData;
	var strDivResponse = 'divResponseABM';
	exeAjaxUploadFileCallBack(URL, strData, strDivResponse, FxShowMessageAddFileSuccess);
}

function FxUploadMatrixAjaxJS(formId, matrizDestino)
{
	var formData = new FormData( $('#' + formId)[0] ); //Esto es equivalente a document.getElementById(formId)
	formData.append("retailerId", $('#hiddenRetailerId').val());
	formData.append("matrizDestino", matrizDestino);

	var URL = $('#UrlAjaxMatrizPricing').val();
	//var strData = { value: jsonArray };	
	var strData = formData;
	var strDivResponse = 'divResponseABM';
	exeAjaxUploadFileCallBack(URL, strData, strDivResponse, FxShowMessageAddFileSuccess);
}

function FxMatrizPricingShow(tipoMatriz, divResponse)
{
	jsonArray = { "retailerId": $('#hiddenRetailerId').val(),
				  "matrizDestino": tipoMatriz};
	var URL = $('#UrlAjaxMatrizPricingView').val();
	var strData = { value: jsonArray };
	var strDivResponse = divResponse;
	exeAjax(URL, strData, strDivResponse);
	
}

function FxSaveRetailerJS()
{
	if ($('#txtNombreRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	/*
	if ($('#txtCuitRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el CUIT.', 'error');
		return false;
	}
	*/
	if ($('#txtRazonSocialRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la razón social.', 'error');
		return false;
	}
	if ($('#selectTipoProductoRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el tipo de producto por default.', 'error');
		return false;
	}
	if ($('#autocomplete').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección.', 'error');
		return false;
	}
	if ($('#selectProvinciaRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar la provincia del retailer.', 'error');
		return false;
	}
	if ($('#locality').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la localidad del retailer.', 'error');
		return false;
	}
	if ($('#postal_code').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el código postal del retailer.', 'error');
		return false;
	}
	if ($('#txtNombreResponsableRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre del responsable.', 'error');
		return false;
	}
	if ($('#txtTelefonoResponsableRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el teléfono del responsable.', 'error');
		return false;
	}
	if ($('#txtEmailResponsableRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el e-mail del responsable.', 'error');
		return false;
	}
	($('#chkEstadoRetailer').prop('checked')) ? retailerEstado = 1 : retailerEstado = 0;
	
    var notificaciones = JSON.parse($('#HiddenNotificaciones').val());
    
    for (i = 0; i < notificaciones.length; i++) { 
        if(notificaciones[i].Configurable)
            notificaciones[i].Estado = $('#txtEstadoNotificacion_' + notificaciones[i].Id).is(":checked");
    }
	
	var arrayPricing = FxGetTablePricingDataJS();
	
	
	jsonArray = { "retailerId": $('#hiddenRetailerId').val(),
				  "retailerNombre": $('#txtNombreRetailer').val(),
				  "retailerCuit": $('#txtCuitRetailer').val(),
				  "retailerRazonSocial": $('#txtRazonSocialRetailer').val(),
				  "retailerTipoProductoId": $('#selectTipoProductoRetailer').val(),
				  "retailerCadenaId": $('#selectCadenaRetailer').val(),
				  "retailerDireccion": $('#autocomplete').val(),
				  "retailerProvinciaId": $('#selectProvinciaRetailer').val(),
				  "retailerLocalidad": $('#locality').val(),
				  "retailerCodigoPostal": $('#postal_code').val(),
				  "retailerDireccionCustom": $('#txtDireccionCustomRetailer').val(),
				  "retailerSitioWeb": $('#txtSitioWebRetailer').val(),
				  "retailerNombreResponsable": $('#txtNombreResponsableRetailer').val(),
				  "retailerTelefonoResponsable": $('#txtTelefonoResponsableRetailer').val(),
				  "retailerEmailResponsable": $('#txtEmailResponsableRetailer').val(),
				  "retailerTarifaPlana": $('#txtTarifaPlanaRetailer').val(),
				  "retailerLogo": $('#txtLogoRetailer').val(),
				  "retailerCssFile": $('#txtCssFileRetailer').val(),
				  "retailerTokenId": $('#txtTokenIdRetailer').val(),
				  "retailerApiKey": $('#txtApiKeyRetailer').val(),
				  "retailerIpsPermitidas": $('#txtIpsPermitidasRetailer').val(),
				  "retailerObservaciones": $('#txtObservacionesRetailer').val(),
                  "notificaciones" : notificaciones,
				  "retailerColorPrimario": $('#colorPickerRetailerPrimario').val(),
				  "retailerColorSecundario": $('#colorPickerRetailerSecundario').val(),
				  "retailerColorFont": $('#colorPickerRetailerFont').val(),
				  "retailerPricing": arrayPricing,
				  "retailerEstado": retailerEstado };
				  
	var callbackFx = ( !$('#hiddenRetailerId').val() ) ? FxSuccessEdit : FxSuccessGrid ;

	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, callbackFx);
	
}

function FxSaveRetailerEdicionMasivaJS()
{

	swal({
		title: "",
		text: "Atención. Se modificará el pricing para todos los retailers seleccionados. ¿Desea continuar?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Guardar",
		closeOnConfirm: false
		}, 
		function(){
			
			var arrayPricing = FxGetTablePricingDataJS();
			
			jsonArray = { "arrayRetailer": $('#hiddenRetailers').val(),
						  "arrayPricing": arrayPricing };
			var URL = $('#UrlAjaxSaveEdicionMasiva').val();
			var strData = { value: jsonArray };
			var strDivResponse = 'divResponseABM';
			exeAjaxCallBackLoading(URL, strData, strDivResponse, FxSuccessGrid);
			
		});

}

function FxSuccessEdit()
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
				FxRetailerEditJS( $('#divResponseABM').html() );
		});	
}

function FxSuccessGrid()
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
				window.location.href = $('#UrlMenuRetailer').val();
		});	
}

function FxSaveUsuarioRetailerJS()
{
	if ($('#txtEmailUsuarioRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el e-mail.', 'error');
		return false;
	}
	if ($('#txtNombreUsuarioRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtApellidoUsuarioRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el apellido.', 'error');
		return false;
	}
	if ($('#hiddenUsuarioRetailerId').val() == '' && $('#txtPasswordUsuarioRetailer').val() == '') //Es usuario nuevo...debe ingresar password
	{
		sweetAlert('Error', 'Debe ingresar el password.', 'error');
		return false;
	}
	if ($('#txtPasswordUsuarioRetailer').val() != '' || $('#txtRePasswordUsuarioRetailer').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioRetailer').val() == '' || $('#txtRePasswordUsuarioRetailer').val() == '')
		{
			sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error');
			return false;
		}
		if ($('#txtPasswordUsuarioRetailer').val() != $('#txtRePasswordUsuarioRetailer').val())
		{
			sweetAlert('Error', 'Las passwords no coinciden.', 'error');
			return false;
		}
	}
	if ($('#selectRolUsuarioRetailer').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el rol.', 'error');
		return false;
	}
	($('#chkEstadoUsuarioRetailer').prop('checked')) ? usuarioRetailerEstado = 1 : usuarioRetailerEstado = 0;
	
	jsonArray = { "usuarioRetailerId": $('#hiddenUsuarioRetailerId').val(),
				  "usuarioRetailerIdRetailer": $('#hiddenEntityId').val(),
				  "usuarioRetailerRolId": $('#selectRolUsuarioRetailer').val(),
				  "usuarioRetailerNombre": $('#txtNombreUsuarioRetailer').val(),
				  "usuarioRetailerApellido": $('#txtApellidoUsuarioRetailer').val(),
				  "usuarioRetailerEmail": $('#txtEmailUsuarioRetailer').val(),
				  "usuarioRetailerPassword": $('#txtPasswordUsuarioRetailer').val(),
				  "usuarioRetailerEstado": usuarioRetailerEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

function FxShowMessageAddFileSuccess()
{
	swal({
		title: "",
		text: "El archivo fue procesado satisfactoriamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: true },
		function(){
				//FxGetGridMatrizPricingJS();//Reload Matiz
		});
}

function FxOpenRetailerUsersJS(retailerId)
{
	window.location.href = $('#UrlUsersRetailer').val() + '/' + retailerId;
}

function FxChangePickierColorJS()
{
	$('#colorPickerRetailerPrimarioHEX').html( $('#colorPickerRetailerPrimario').val() );
	$('#colorPickerRetailerSecundarioHEX').html( $('#colorPickerRetailerSecundario').val() );
	$('#colorPickerRetailerFontHEX').html( $('#colorPickerRetailerFont').val() );
}
	
function FxColoresLogoLoadingBackToDefaultJS()
{
	jsonArray = { "retailerId": $('#hiddenRetailerId').val() };
	var URL = $('#UrlAjaxTemplateDefault').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageRestoreTemplateSuccess);
	
}

function FxShowMessageRestoreTemplateSuccess()
{
	swal({
		title: "",
		text: "El template fue reestablecido satisfactoriamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: true },
		function(){
				FxColoresBackToDefautlJS();
		});
}

function FxColoresBackToDefautlJS()
{
	var defaultColors = JSON.parse( $('#hiddenDefaultColors').val() );
	
	$('#colorPickerRetailerPrimario').val(defaultColors.primario);
	$('#colorPickerRetailerSecundario').val(defaultColors.secundario);
	$('#colorPickerRetailerFont').val(defaultColors.font);
}

function FxAddPricingJS()
{
	//Si se ha seleccionado una unidad de medida...se debe ingresar el rango...
	/*
	if ($('#selectPricingUnidadMedida').val() != 0)
	{
		if ($('#txtPricingDesde').val() == '') { sweetAlert('Error', 'Debe ingresar el rango.', 'error'); return false; }
		if ($('#txtPricingHasta').val() == '') { sweetAlert('Error', 'Debe ingresar el rango.', 'error'); return false; }
	}
	*/
	//Valor de pricing
	if ($('#txtPricingValor').val() == '') { sweetAlert('Error', 'Debe ingresar el valor.', 'error'); return false; }
	
	var servicioId = $('#selectPricingServicio').val();
	var servicioText = $('#selectPricingServicio option:selected').text();
	var workflowId = $('#selectPricingWorkflow').val();
	var workflowText = $('#selectPricingWorkflow option:selected').text();
	var puntoId = $('#selectPricingPunto').val();
	var puntoText = $('#selectPricingPunto option:selected').text();
	var zonaId = $('#selectPricingZona').val();
	var zonaText = $('#selectPricingZona option:selected').text();
	var tipoProductoId = $('#selectPricingTipoProducto').val();
	var tipoProductoText = $('#selectPricingTipoProducto option:selected').text();
	var slaId = $('#selectPricingSLA').val();
	var slaText = $('#selectPricingSLA option:selected').text();
	var unidadId = $('#selectPricingUnidadMedida').val();
	var unidadText = $('#selectPricingUnidadMedida option:selected').text();
	var desde = $('#txtPricingDesde').val();
	var hasta = $('#txtPricingHasta').val();
	var valor = $('#txtPricingValor').val();
	var descripcion = $('#txtPricingDescripcion').val();
	
	//Add <tr>
	var trCount = $('#hiddenTablaPricingRetailer').val()*1 + 1;
	var newTr = '<tr id="trTablaPricing_' + trCount + '">' +
				'	<td class="" style="padding-left: 18px;">' + servicioText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + workflowText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + puntoText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + zonaText + '</td>' + 
				'	<td class="" style="padding-left: 18px; display: none;">' + tipoProductoText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + slaText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + unidadText + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + desde + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + hasta + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + valor + '</td>' + 
				'	<td class="" style="padding-left: 18px;">' + descripcion + '</td>' + 
				'	<td class="center">' + 
				'		<a class="rowUp" href="javascript: void(0);">' + 
				'			<i class="material-icons">arrow_upward</i>' + 
				'		</a>' + 
				'		<a class="rowDown" href="javascript: void(0);">' + 
				'			<i class="material-icons">arrow_downward</i>' + 
				'		</a>' + 
				'	</td>' + 
				'	<td class="center">' + 
				'		<a class="btn-floating waves-effect waves-light black right" href="javascript:FxDeleteTableRowPricingJS(' + trCount + ')">' + 
				'			<i class="material-icons">close</i>' + 
				'		</a>' +
				'	</td>' + 
				'	<input type="hidden" id="pricingServicioId_' + trCount + '" value="' + servicioId + '">' + 
				'	<input type="hidden" id="pricingWorkflowId_' + trCount + '" value="' + workflowId + '">' + 
				'	<input type="hidden" id="pricingPuntoId_' + trCount + '" value="' + puntoId + '">' + 
				'	<input type="hidden" id="pricingZonaId_' + trCount + '" value="' + zonaId + '">' + 
				'	<input type="hidden" id="pricingTipoProductoId_' + trCount + '" value="' + tipoProductoId + '">' + 
				'	<input type="hidden" id="pricingSlaId_' + trCount + '" value="' + slaId + '">' + 
				'	<input type="hidden" id="pricingUnidadId_' + trCount + '" value="' + unidadId + '">' + 
				'	<input type="hidden" id="pricingDesde_' + trCount + '" value="' + desde + '">' + 
				'	<input type="hidden" id="pricingHasta_' + trCount + '" value="' + hasta + '">' + 
				'	<input type="hidden" id="pricingValor_' + trCount + '" value="' + valor + '">' + 
				'	<input type="hidden" id="pricingDescripcion_' + trCount + '" value="' + descripcion + '">' +
				'</tr>';
	$('#tablePricing').append(newTr);
	
	//Clear
	$('#txtPricingDesde').val('');
	$('#txtPricingHasta').val('');
	$('#txtPricingValor').val('');
	$('#txtPricingDescripcion').val('');

	FxSetRowUpDownJS();
	
	FxRecalcularTableRowPricingJS();
}

function FxRecalcularTableRowPricingJS()
{
	var rowCount = $('#tablePricing tbody tr').length;
	$('#hiddenTablaPricingRetailer').val(rowCount);
}

function FxDeleteTableRowPricingJS(trId)
{
	$('#trTablaPricing_' + trId).remove();
	FxRecalcularTableRowPricingJS();
}

function FxGetTablePricingDataJS()
{
	var arrayPricing=[];
	var arrayServicio=[], arrayWorkflow=[], arrayPunto=[], arrayZona=[];
	var arrayTipoProducto=[], arraySla=[], arrayUnidad=[];
	var arrayDesde=[], arrayHasta=[], arrayValor=[], arrayDescripcion=[];
	
	//var rowCount = $('#tablePricing tbody tr').length;

	//Almacenamos data de grilla en arrays
	$('#tablePricing tbody tr').each( function(){
		var trId = $(this).attr('id');
		var arrayId = trId.split('_');
		var i = arrayId[1]; //Id numerico tr

		arrayServicio.push( $('#pricingServicioId_' + i).val() );
		arrayWorkflow.push( $('#pricingWorkflowId_' + i).val() );
		arrayPunto.push( $('#pricingPuntoId_' + i).val() );
		arrayZona.push( $('#pricingZonaId_' + i).val() );
		arrayTipoProducto.push( $('#pricingTipoProductoId_' + i).val() );
		arraySla.push( $('#pricingSlaId_' + i).val() );
		arrayUnidad.push( $('#pricingUnidadId_' + i).val() );
		arrayDesde.push( $('#pricingDesde_' + i).val() );
		arrayHasta.push( $('#pricingHasta_' + i).val() );
		arrayValor.push( $('#pricingValor_' + i).val() );
		arrayDescripcion.push( $('#pricingDescripcion_' + i).val() );
		
	});
		
	//Almacenamos arrays con data de grilla en array mayor
	arrayPricing.push(arrayServicio);
	arrayPricing.push(arrayWorkflow);
	arrayPricing.push(arrayPunto);
	arrayPricing.push(arrayZona);
	arrayPricing.push(arrayTipoProducto);
	arrayPricing.push(arraySla);
	arrayPricing.push(arrayUnidad);
	arrayPricing.push(arrayDesde);
	arrayPricing.push(arrayHasta);
	arrayPricing.push(arrayValor);
	arrayPricing.push(arrayDescripcion);
	
	return arrayPricing;
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
	//Retailers Seleccionados
	var arrayRetailer = [];
	$('.checkEdicionMasiva').each( function(){
		if ($(this).prop('checked'))
		{
			arrayRetailer.push( $(this).val() );
		}
	});
	//Validamos que se haya seleccionado al menos un punto
	if (!arrayRetailer.length)
	{
		sweetAlert('Error', 'Debe seleccionar los retailers a editar.', 'error');
		return false;
	}
	
	
	jsonArray = { "arrayRetailer": arrayRetailer };
	var URL = $('#UrlAjaxSetRetailersEdicionMasiva').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxRetailerEdicionMasivaJS);
	
}

function FxRetailerEdicionMasivaJS()
{
	window.location.href = $('#UrlRetailersEdicionMasiva').val();
}

function FxVerRetailersToastJS()
{
	FxCloseToastJS(); //Cerramos toast abiertos
	var nombresRetailers = $('#hiddenRetailersNombres').val();
	var $toastContent = nombresRetailers.replace(/\|/g, '<br/>');
	Materialize.toast($toastContent, 60000);	
}

function FxCloseToastJS()
{
	$('#toast-container').html('');
}

function FxSetRowUpDownJS()
{
	//Add funcion para mover rows
    $('.rowUp,.rowDown').click(function(){
        var row = $(this).parents("tr:first");
        if ($(this).is('.rowUp'))
		{
            row.insertBefore(row.prev());
        }
		else
		{
           row.insertAfter(row.next());
        }
    });
}
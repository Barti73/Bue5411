/* Javascript Functions */

function FxSaveCadenaJS()
{
	if ($('#txtNombreCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtRazonSocialCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la razón social.', 'error');
		return false;
	}
	/*
	if ($('#txtCuitCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el CUIT.', 'error');
		return false;
	}
	*/
	if ($('#txtResponsableCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el responsable.', 'error');
		return false;
	}
	if ($('#txtEmailCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#txtTelefonoCadena').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el teléfono.', 'error');
		return false;
	}
	
	($('#chkEstado').prop('checked')) ? cadenaEstado = 1 : cadenaEstado = 0;
	
	jsonArray = { "cadenaId": $('#hiddenCadenaId').val(),
				  "cadenaNombre": $('#txtNombreCadena').val(),
				  "cadenaRazonSocial": $('#txtRazonSocialCadena').val(),
				  "cadenaCuit": $('#txtCuitCadena').val(),
				  "cadenaResponsable": $('#txtResponsableCadena').val(),
				  "cadenaEmail": $('#txtEmailCadena').val(),
				  "cadenaTelefono": $('#txtTelefonoCadena').val(),
				  "cadenaEstado": cadenaEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBack(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}


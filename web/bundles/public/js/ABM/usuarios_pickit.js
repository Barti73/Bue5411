/* Javascript Functions */

function FxSaveUsuarioPickitJS()
{
	if ($('#txtEmailUsuarioPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if(!isValidEmail( $('#txtEmailUsuarioPickit').val() ) )
	{
		sweetAlert('Error', 'Debe ingresar un email válido.', 'error');
		return false;
	}
	if ($('#txtNombreUsuarioPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtApellidoUsuarioPickit').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el apellido.', 'error');
		return false;
	}
	
    if ($('#txtPasswordUsuarioPickit').val() == '') //Se ingreso password o re-password
	{
        sweetAlert('Error', 'Debe ingresar el password.', 'error');
        return false;
    }

	if ($('#txtPasswordUsuarioPickit').val() != '' || $('#txtRePasswordUsuarioPickit').val() != '') //Se ingreso password o re-password
	{
		if ($('#txtPasswordUsuarioPickit').val() == '' || $('#txtRePasswordUsuarioPickit').val() == '')
		{
			sweetAlert('Error', 'Debe ingresar y re-ingresar el password.', 'error');
			return false;
		}
		if ($('#txtPasswordUsuarioPickit').val() != $('#txtRePasswordUsuarioPickit').val())
		{
			sweetAlert('Error', 'Las passwords no coinciden.', 'error');
			return false;
		}
	}
    
	if ($('#selectRolUsuarioPickit').val() == '')
	{
		sweetAlert('Error', 'Debe seleccionar el rol.', 'error');
		return false;
	}
	($('#chkEstadoUsuarioPickit').prop('checked')) ? usuarioPickitEstado = 1 : usuarioPickitEstado = 0;
	
	jsonArray = { "usuarioPickitId": $('#hiddenUsuarioPickitId').val(),
				  "usuarioPickitRolId": $('#selectRolUsuarioPickit').val(),
				  "usuarioPickitNombre": $('#txtNombreUsuarioPickit').val(),
				  "usuarioPickitApellido": $('#txtApellidoUsuarioPickit').val(),
				  "usuarioPickitEmail": $('#txtEmailUsuarioPickit').val(),
				  "usuarioPickitPassword": $('#txtPasswordUsuarioPickit').val(),
				  "usuarioPickitEstado": usuarioPickitEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBack(URL, strData, strDivResponse, FxShowMessageABMUsersSuccess);
	
}

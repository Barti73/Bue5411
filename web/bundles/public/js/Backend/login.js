/* Seguridad Javascript Functions *  web/bundles/public/js  de webapppickit */

function FxLogin() 
{
	if ($('#txtUser').val() == '' || $('#txtPass').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el usuario y contraseña', 'error');
		return false;
	}
	
	var jsonArray = { "txtUser": $('#txtUser').val(),
					  "txtPass": $('#txtPass').val()
					};
	var URL = $('#UrlAjaxLoginCheck').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponse';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxLoginResponse);
}
function FxLoginResponse()
{
	if ( $('#divResponse').html() == '1' )
	{
		window.location = $('#UrlNews').val();
	}
	else
	{
		sweetAlert('Error', 'Email y/o contraseña incorrectos.', 'error');
	}
}

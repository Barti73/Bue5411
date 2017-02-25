/* User Function */

function FxChangePasswordJS()
{
	//Validaciones
	//Ingreso Pass
	if ($('#txtPassOld').val() == '' || $('#txtPassNew').val() == '' || $('#txtPassReNew').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el las contraseñas', 'error');
		return false;
	}
	//Pass coincidan
	if ( $('#txtPassNew').val() != $('#txtPassReNew').val() )
	{
		sweetAlert('Error', 'Las contraseñas no coinciden', 'error');
		return false;
	}
	
	var jsonArray = { "passwordOld": $('#txtPassOld').val(),
					  "passwordNew": $('#txtPassNew').val(),
					  "passwordReNew": $('#txtPassReNew').val() 
				    };
	var URL = $('#UrlAjaxPopupEditPassSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponse';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxChangePasswordPostJS);
}

function FxChangePasswordPostJS()
{
	var response = $('#divResponse').html();
	if (response == 'ok') //Todo bien
	{
		swal({
			title: "",
			text: "El cambio de contraseña fue realizado satisfactoriamente.\n\nDebe volver a realizar el login.",
			type: "success",
			showCancelButton: false,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "OK",
			allowEscapeKey: false,
			closeOnConfirm: true },
			function(){
				window.location = $('#UrlLogin').val();
			});
	}
	else
	{
		swal({
			title: "",
			text: "Ocurrió un error realizando la operación de cambio de contraseña.\n\nError: " + response,
			type: "error",
			showCancelButton: false,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "OK",
			allowEscapeKey: false,
			closeOnConfirm: true },
			function(){
			});
	}
}

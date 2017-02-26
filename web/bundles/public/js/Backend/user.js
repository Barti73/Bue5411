/* User Function */

function FxOpenModalUserAddEditJS(userIdHashed)
{
	var jsonArray = { "userIdHashed": userIdHashed };
	var URL = $('#UrlAjaxPopupUserAddEdit').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxGetGridPage(pageNumber)
{
	var jsonArray = { "pageNumber": pageNumber };
	var URL = $('#UrlAjaxGetGridUserPage').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divAjaxGridUser';
	
	exeAjaxLoading(URL, strData, strDivResponse);
}

function FxOpenModalEditUserPassJS()
{
	var jsonArray = {  };
	var URL = $('#UrlAjaxPopupEditPassOpen').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxSaveUserJS()
{
	//Validaciones
	if ($('#txtUsername').val() == '') { sweetAlert('Error', 'Debe ingresar el usuario', 'error'); return false; }
	if ($('#txtNombre').val() == '') { sweetAlert('Error', 'Debe ingresar el nombre', 'error'); return false; }
	
	var perfil = ($('#radioUsuario').prop('checked')) ? 2 : 1;
	var estado = ($('#chkEstado').prop('checked')) ? 1 : 0;
	
	//Ajax Call
	var jsonArray = { "userIdHashed": $('#hiddenUserIdHashed').val(),
					  "userUsername": $('#txtUsername').val(),
					  "userNombre": $('#txtNombre').val(),
					  "userPerfil": perfil,
					  "userEstado": estado };
	var URL = $('#UrlAjaxSaveUser').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponse';
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSaveUserPostJS);
}

function FxSaveUserPostJS()
{
	var response = $('#divResponse').html();
	if (response == 'ok') //Todo bien
	{
		FxGetGridPage( $('#pageActual').val() );	
		FxShowMessageSuccess();
	}
	else
	{
		swal({
			title: "",
			text: "Ocurrió un error al grabar el usuario.\n\nError: " + response,
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

/* Seguridad Javascript Functions *  web/bundles/public/js  de webapppickit */

function FxLogin() 
{
	if ($('#txtEmail').val() == '' || $('#txtPass').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email y contraseña', 'error');
		return false;
	}
	
	if(!isValidEmail( $('#txtEmail').val() ) )
	{ 
		sweetAlert('Error', 'Debe ingresar un email válido', 'error');
		return false;
	}
	$('#loginForm').submit();
}

function FxLoginFailed()
{
	sweetAlert('Error', 'Email y/o contraseña incorrectos.', 'error');
}

function FxLimpiarPassMsg(msgId)
{
    FxRedirectLogin();
    /*sweetAlert('', 'Las instrucciones para la recuperación de constraseña fueron enviadas a su email.', 'success');*/
}

function FxLimpiarPass()
{
	if ($('#txtEmail').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar un email', 'error');
		return false;
	}
	
	$('#cleanPass').submit();
}

function FxModificar()
{
	if ($("#txtPassword" ).val() == '' || $( "#txtPasswordRep" ).val() == '')
	{
		sweetAlert('Error', 'La contraseña no puede estar en blanco.', 'error');
		return false;
	}
	
    if ($("#txtPassword" ).val() != $( "#txtPasswordRep" ).val())
    {
		sweetAlert('Error', 'Las contraseñas no coinciden.', 'error');
		return false;
    }
	$('#modificarPass').submit();
}

function FxNoHash()
{
	swal({
		title: "Ocurrió un problema !!",
		text: "No se pudo gestionar la recuperación de contraseña\n\nDeberá solicitar una nueva gestión de recuperación de contraseña.",
		type: "warning",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: false },
		function(){
				window.location = $('#redirectUrl').val();
		});
}

function FxRedirectLogin()
{
	swal({
		title: "",
		text: "Las instrucciones para la recuperación de constraseña fueron enviadas a su email.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: false },
		function(){
				window.location = 'LoginPickit';
		});
}

function FxRedirectLoginFromPass()
{
	swal({
		title: "",
		text: "La contraseña cambió correctamente.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "OK",
		allowEscapeKey: false,
		closeOnConfirm: false },
		function(){
				window.location = 'LoginPickit';
		});
}


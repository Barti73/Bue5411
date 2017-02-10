/* Javascript Functions */

function FxValidaLogin()
{
	if ($('#txtUser').val() == '')
	{
		alert('Debe ingresar el login.');
		$('#txtUser').focus();
		return false;
	}
	if ($('#txtPass').val() == '')
	{
		alert('Debe ingresar el password.');
		$('#txtPass').focus();
		return false;
	}
	$('#SingIn').val('1');
	$('#frmLogin').submit();
}
/* Alerts */

function FxShowMessageSuccess()
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
		});
		
}

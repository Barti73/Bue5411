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

function FxShowMessageABMSuccess(response)
{

	var respuesta = JSON.parse(response);

	if(respuesta.Id == 0)
	{
		sweetAlert('Error', respuesta.Error, 'error');
	}
	else
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
				$('#modalPopup').closeModal(); //Close Popup
				FxGetGridJS();//Reload Grid
			});
	}
		
}

function FxShowMessageABMUsersSuccess($response)
{

    $respuesta = JSON.parse($response);
    
    if($respuesta.Id == 0)
        {
           sweetAlert('Error', $respuesta.Error, 'error'); 
        }
    else
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
                    $('#modalPopup').closeModal(); //Close Popup
                    FxGetGridUsersJS();//Reload Grid
            });    
        }
}

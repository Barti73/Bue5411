/* Javascript Functions */

function FxSaveConfigParameterJS(parameterId)
{
	swal({
		title: "",
		text: "¿Está seguro que desea modificar el parámetro de configuración de sistema?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Grabar",
		closeOnConfirm: false
		}, 
		function(){
			jsonArray = { "configParameterId": parameterId,
						  "configParameterValor": $('#txtValorConfig_' + parameterId).val(),
						  "configParameterDescripcion": $('#txtDescripcionConfig_' + parameterId).val() };
			var URL = $('#UrlAjaxSave').val();
			var strData = { value: jsonArray };
			var strDivResponse = 'divResponseABM';
			exeAjaxCallBack(URL, strData, strDivResponse, FxShowMessageSuccess);
		});
}


/* Javascript Functions */

function FxSaveCourierJS()
{
	if ($('#txtNombreCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el nombre.', 'error');
		return false;
	}
	if ($('#txtRazonSocialCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la razón social.', 'error');
		return false;
	}
	if ($('#txtCuitCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el CUIT.', 'error');
		return false;
	}
	if ($('#txtDireccionCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar la dirección.', 'error');
		return false;
	}
	if ($('#txtResponsableCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el responsable.', 'error');
		return false;
	}
	if ($('#txtTelefonoCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el teléfono.', 'error');
		return false;
	}
	if ($('#txtEmailCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el email.', 'error');
		return false;
	}
	if ($('#txtValorBaselCourier').val() == '')
	{
		sweetAlert('Error', 'Debe ingresar el valor base.', 'error');
		return false;
	}
	var validWorkflow = 1;
	$('.workflowFields').each( function(){
		if ( !$(this).val() )
		{
			validWorkflow = 0;
		}
	});

	if (!validWorkflow)
	{
		sweetAlert('Error', 'Debe ingresar los datos del web service para los workflows.', 'error');
		return false;
	}

	//Data Workflows
	var workflowData = FxCourierWorkflowData();
	
	($('#chkEstado').prop('checked')) ? courierEstado = 1 : courierEstado = 0;

	jsonArray = { "courierId": $('#hiddenCourierId').val(),
				  "courierNombre": $('#txtNombreCourier').val(),
				  "courierRazonSocial": $('#txtRazonSocialCourier').val(),
				  "courierCuit": $('#txtCuitCourier').val(),
				  "courierDireccion": $('#txtDireccionCourier').val(),
				  "courierResponsable": $('#txtResponsableCourier').val(),
				  "courierTelefono": $('#txtTelefonoCourier').val(),
				  "courierEmail": $('#txtEmailCourier').val(),
				  "courierValorBase": $('#txtValorBaseCourier').val(),
				  "courierWorkflowData": workflowData,
				  "courierUrlTracking": $('#txtUrlTrackingCourier').val(),
				  "courierTokenId": $('#txtTokenIdCourier').val(),
				  "courierEstado": courierEstado };
				  
	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);
	
}

function FxCourierWorkflowData()
{
	/*
		//Esta funcion construye un array (objeto)
		array = array('worflowId' => 1,
					  'data' => array('ws' => xxxx,
									  'user' => xxxx,
									  'pass' => xxxx,
									  'codigo_cliente' => xxxx,
									  'acuerdo_producto' => xxxx
									  )
					  );
	*/
	
	var fullData = [];
	//Recorremos los workflows
	$('.workflowList').each( function(){
		
		//Id del workflow (Solicitud, Devolucion, Vencimiento, Cancelacion)
		var workflowId = $(this).attr('data-workflow-id-header');
		
		//Agregamos el workflow al array
		var arrayData = {};
		arrayData['workflowId'] = workflowId;
		
		//Recorremos los textbox...y capturamos solo los del workflow correspondiente
		var dataWorkflow = {};
		$('.workflowFields').each( function(){
			var workflowIdItem = $(this).attr('data-workflow-id-item');
			if (workflowId == workflowIdItem)
			{
				var itemKey = $(this).attr('data-array-key');
				var itemValue = $(this).val();
				//Agregamos data del elemento
				dataWorkflow[itemKey] = itemValue;
			}
		});
		arrayData['data'] = dataWorkflow;
		fullData.push(arrayData);
	});
	return fullData;
}


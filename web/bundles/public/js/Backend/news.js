/* Javascript Functions */

function FxOpenModalPopupNewsJS(noticiaIdHashed)
{
	var jsonArray = { "noticiaIdHashed": noticiaIdHashed };
	var URL = $('#UrlAjaxPopup').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxPopupModalReady()
{
	//Capturamos modulo original
	var btnMarcado = $('#btnModuleSelected').val();
	//Limpiamos modulo
	$('#btnModuleSelected').val('');

	var objModule = $('#' + btnMarcado);
	FxSelectNoticiaModulo(objModule);
}

function FxGetGridPage(pageNumber)
{
	var jsonArray = { "pageNumber": pageNumber };
	var URL = $('#UrlAjaxGetGridPage').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divAjaxGridNews';
	
	exeAjaxLoading(URL, strData, strDivResponse);
}

function FxSelectNoticiaModulo(obj)
{
	//Actual marcado
	var btnMarcado = $('#btnModuleSelected').val();
	//Removemos el color boton marcado
	$('.btnModule').removeClass('pink darken-3').addClass('blue darken-3'); //Removemos pink..add azul
	//Agregamos pink al click
	$(obj).removeClass('blue darken-3').addClass('pink darken-3'); //Removemos azul
	//Almacenamos el boton del click
	$('#btnModuleSelected').val( $(obj).prop('id') );
	
	//Si se le hizo click al marcado...se elimina el pink
	if ( $(obj).prop('id') == btnMarcado )
	{
		//Agregamos pink al click
		$(obj).removeClass('pink darken-3').addClass('blue darken-3'); //Removemos pink
		//Limpiamos el seleccionado
		$('#btnModuleSelected').val('');
	}
}

function FxSetNoticiaModuloClass()
{
	
}
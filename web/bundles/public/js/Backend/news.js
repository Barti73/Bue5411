/* Javascript Functions */

function FxOpenModalNewsViewJS(noticiaIdHashed)
{
	var jsonArray = { "noticiaIdHashed": noticiaIdHashed };
	var URL = $('#UrlAjaxPopupNewsView').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxOpenModalNewsAddEditJS(noticiaIdHashed)
{
	var jsonArray = { "noticiaIdHashed": noticiaIdHashed };
	var URL = $('#UrlAjaxPopupNewsAddEdit').val();
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

function FxSaveNewsJS()
{
	//Validaciones
	if ($('#txtTitulo').val() == '') { sweetAlert('Error', 'Debe ingresar el título de la noticia', 'error'); return false; }
	if ($('#txtTexto').val() == '') { sweetAlert('Error', 'Debe ingresar el texto de la noticia', 'error'); return false; }
	
	//Obtenemos posicion
	var btnModule = $('#btnModuleSelected').val();
	var posicion = (btnModule) ? btnModule.substr(-1) : '';

	//Form Data
	var formData = new FormData( $('#formUploadImage')[0] ); //Esto es equivalente a document.getElementById(formId)
	formData.append("noticiaIdHashed", $('#hiddenNoticiaIdHashed').val());
	formData.append("titulo", $('#txtTitulo').val());
	formData.append("texto", $('#txtTexto').val());
	formData.append("posicion", posicion);

	//Ajax Call
	var URL = $('#UrlAjaxSaveNews').val();
	var strData = formData;
	var strDivResponse = 'divResponse';
	exeAjaxUploadFileCallBack(URL, strData, strDivResponse, FxSaveNewsPostJS);
}

function FxSaveNewsPostJS()
{
	FxGetGridPage( $('#pageActual').val() );
	FxShowMessageSuccess();
}

function FxPublishNewsJS()
{
	var jsonArray = { "noticiaIdHashed": $('#hiddenNoticiaIdHashed').val() };
	var URL = $('#UrlAjaxPublishNews').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponse';
	
	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxSaveNewsPostJS);
}


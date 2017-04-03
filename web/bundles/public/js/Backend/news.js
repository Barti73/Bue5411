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
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetNewsPopupJS);
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
	var URL = $('#UrlAjaxGetGridNewsPage').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divAjaxGridNews';
	
	exeAjaxLoading(URL, strData, strDivResponse);
}

function FxSelectNoticiaModulo(obj)
{
	//Actual marcado
	var btnMarcado = $('#btnModuleSelected').val();
	//Removemos el color boton marcado
	$('.btnModule').removeClass('codigo54411MainColor').addClass('blue darken-3'); //Removemos pink..add azul
	//Agregamos pink al click
	$(obj).removeClass('blue darken-3').addClass('codigo54411MainColor'); //Removemos azul
	//Almacenamos el boton del click
	$('#btnModuleSelected').val( $(obj).prop('id') );
	
	//Si se le hizo click al marcado...se elimina el pink
	if ( $(obj).prop('id') == btnMarcado )
	{
		//Agregamos pink al click
		$(obj).removeClass('codigo54411MainColor').addClass('blue darken-3'); //Removemos pink
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
	//Convertir a B/N
	var blackWhite = ( $('#chkGrayscale').prop('checked') ) ? 1: 0;

	//Form Data
	var formData = new FormData( $('#formUploadImage')[0] ); //Esto es equivalente a document.getElementById(formId)
	formData.append("noticiaIdHashed", $('#hiddenNoticiaIdHashed').val());
	formData.append("titulo", $('#txtTitulo').val());
	formData.append("texto", tinyMCE.activeEditor.getContent());
	formData.append("posicion", posicion);
	formData.append("blackWhite", blackWhite);

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

function FxDeleteNews(noticiaIdHashed)
{
	swal({
		title: "",
		text: "¿Está seguro que desea eliminar el borrador?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ad1457",
		confirmButtonText: "Eliminar",
		cancelButtonText: "Cancelar",
			closeOnConfirm: false
		}, 
		function(){
			var jsonArray = { "noticiaIdHashed": noticiaIdHashed };
			var URL = $('#UrlAjaxDeleteNews').val();
			var strData = { value: jsonArray };
			var strDivResponse = 'divResponse';
			
			exeAjaxCallBackLoading(URL, strData, strDivResponse, FxSaveNewsPostJS);
		});	
	
}



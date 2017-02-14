/* AJAX Javascript Functions */

function exeAjax(URL, strData, strDivResponse)
{
	var divResponse = $('#' + strDivResponse);
	
    //console.log(URL);
    //console.log(strData);
    //console.log(divResponse);
	
	divResponse.html('<span style="font-style: italic">Procesando...</span>');
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
        //console.log(result);
		divResponse.html(result);
      },
      error: function() {
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
		  $('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow'); //Loading Div Hide
      }
    });
}

function exeAjaxLoading(URL, strData, strDivResponse)
{
	ShowLoading('divLoading');
	var divResponse = $('#' + strDivResponse);
	
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
          HideLoading('divLoading');
          divResponse.html(result);
      },
      error: function() {
          HideLoading('divLoading');
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
      }
    });
}

function exeAjaxCallBackLoading(URL, strData, strDivResponse, functionCallback)
{
	ShowLoading('divLoading');

    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
        HideLoading('divLoading');
        functionCallback(result);
      },
      error: function() {
          HideLoading('divLoading');
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
      }
    });
}

function exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, functionCallback)
{
	ShowLoading('divLoading');
    divResponse = $('#' + strDivResponse);
    
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
        HideLoading('divLoading');
        divResponse.html(result);
        functionCallback(result);
      },
      error: function() {
          HideLoading('divLoading');
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
      }
    });
}

function exeAjaxCallBack(URL, strData, strDivResponse, functionCallback)
{
	var divResponse = $('#' + strDivResponse);
	
	divResponse.html('<span style="font-style: italic">Procesando...</span>');
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
		divResponse.html(result);
        functionCallback(result);
      },
      error: function() {
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
		  $('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow'); //Loading Div Hide
      }
    });
}

function exeAjaxUploadFileCallBack(URL, strData, strDivResponse, functionCallback)
{
	ShowLoading('divLoading');
	var divResponse = $('#' + strDivResponse);
	
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
	  contentType: false,       // The content type used when sending data to the server.
	  cache: false,             // To unable request pages to be cached
	  processData:false,        // To send DOMDocument or non processed data file it is set to false	  
      success: function(result) {
		  HideLoading('divLoading');
		  divResponse.html(result);
		  functionCallback(result);
      },
      error: function() {
		  HideLoading('divLoading');
		  sweetAlert('Error', 'Ocurrió un error al intentar realizar la subida del archivo seleccionado.', 'error');
      }
    });
}

function ShowLoading(strDiv)
{
    var divResponse = $('#' + strDiv);
    divResponse.html('<div style="z-index:2000;" class="modalLoading"></div>');
}

function HideLoading(strDiv)
{
    var divResponse = $('#' + strDiv);
    divResponse.html('');
}

function exeAjaxCallBackCustom(URL, strData, strDivResponse, customFunctionCallback)
{
	var divResponse = $('#' + strDivResponse);
	
	divResponse.html('<span style="font-style: italic">Procesando...</span>');
    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
		console.log(result);
		divResponse.html(result);
		eval(customFunctionCallback);
      },
      error: function() {
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
		  $('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow'); //Loading Div Hide
      }
    });
}

function exeAjaxSync(URL, app, strData)
{
    return $.ajax({
            type: 'POST',
            url: URL,
            data: strData,
            xhrFields: { withCredentials: true },
            headers: { },
            complete: function(result) {
                result['appName'] = app;
                window.ajaxResults[window.ajaxResults.length] = result;
            }
        });
}

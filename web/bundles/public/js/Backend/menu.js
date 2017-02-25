/* Menu Function */

function FxOpenModalEditUserPassJS()
{
	var jsonArray = {  };
	var URL = $('#UrlAjaxPopupEditPassOpen').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}


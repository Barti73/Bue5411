/* Javascript Functions */

function FxOpenModalNewsViewJS(newsIdHashed)
{
	var jsonArray = { "newsIdHashed": newsIdHashed };
	var URL = $('#UrlAjaxPopupPortalNewsView').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseAjaxPopupModal';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPopupJS);
}

function FxGetGridPage(pageNumber)
{
	var jsonArray = { "pageNumber": pageNumber,
					  "txtSearch": $('#txtSearch').val() };
	var URL = $('#UrlAjaxGetGridOtherNewsPage').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divOtherNewsGrid';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxOtherNewsGridPagePostJS);
}

function FxOtherNewsGridPagePostJS()
{
	$('.ellipsisText').dotdotdot({
		after: "a.readMore",
		watch: "window",
	});		
}

function FxAjaxSearchJS()
{
	var jsonArray = { "txtSearch": $('#txtSearch').val() };
	var URL = $('#UrlAjaxGetGridOtherNewsPaginator').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponse';
	
	exeAjaxCallBackLoadingSetResult(URL, strData, strDivResponse, FxSetPaginator);
	
}

function FxSetPaginator()
{
	$('#divOtherNewsGrid').html(''); //Clear Results
	$('#divPaginator').html(''); //Clear Paginator
	
	$('#pageCount').val( $('#divResponse').html() );
	//Si no hay resultados...return
	if ( $('#pageCount').val() == 0 ) { return false; }
	
	//Set Paginator
	$('#divPaginator').materializePagination({
		align: 'center',
		lastPage: $('#pageCount').val(),
		firstPage: 1,
		useUrlParameter: false,
		onClickCallback: function(requestedPage) {
			FxGetGridPage(requestedPage);
			$('#pageActual').val(requestedPage); //Almacenamos pagina actual
		}
	});
}

$(document).ready(function(){
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();
	$('select').material_select();
	$('.slider').slider({full_width: true, indicators: false});
	$('.tooltipped').tooltip({delay: 50});
	$('.collapsible').collapsible();
	$('.carousel.carousel-slider').carousel({full_width: true});
	$('.button-collapse').sideNav();
	
	$('.ellipsisText').dotdotdot({
		after: "a.readMore",
		watch: "window",
	});		
});


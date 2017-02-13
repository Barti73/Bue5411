/* Common Javascript Functions */

function FxSetPopupJS(result)
{
    $('#divResponseAjaxPopupModal').html(result);

	$('#modalPopup').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%', // Ending top style attribute
		ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			FxPopupModalReady();
			},
		complete: function() {
			} // Callback for Modal close
	});
    
	$('#modalPopup').modal('open');
	
	//Convertir Combos
	$('.selectForm').material_select();
	//ToolTip
	$('.tooltipped').tooltip({delay: 50});
	//DatePickers
	FxSetDatepicker();	
	//Tabs
	$('ul.tabs').tabs();
	//TextArea
	$('.materialize-textarea').trigger('autoresize');
}

//Materialize Initialization
$(function() {
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();
	$('select').material_select();
	$('.slider').slider({full_width: true, indicators: false});
	$('.tooltipped').tooltip({delay: 50});
	$('.collapsible').collapsible();
	$('.carousel.carousel-slider').carousel({full_width: true});
	$('.button-collapse').sideNav();
});	 

//Paginator
$(function() {
	$('#divPaginator').materializePagination({
		align: 'center',
		lastPage: $('#pageCount').val(),
		firstPage: 1,
		useUrlParameter: false,
		onClickCallback: function(requestedPage) {
			FxGetGridPage(requestedPage);
			//console.log('Requested page from #pagination-long: ' + requestedPage);
		}
	});
});	 


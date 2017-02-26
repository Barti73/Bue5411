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
	//Collapsibles
	$('.collapsible').collapsible();
}

function FxSetNewsPopupJS(result)
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
				iframeInsideModal = $('#modalPopup iframe') //Capturamos iframes dentro del modal para poder destruirlos cuando se cierre el modal.
			},
		complete: function() {
				//Destroy tinyMCE
				tinymce.EditorManager.editors = [];
				//Se destruye cualquier iframe contenido dentro del modal
				$(iframeInsideModal).each(function(index, iframe){
					$(iframe).attr('src', $(iframe).attr('src'));
				});			
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
	//Collapsibles
	$('.collapsible').collapsible();
	//TinyMCE
	tinymce.EditorManager.editors = []; 
	tinymce.init({
	  selector: '#mceContainer',
	  theme: 'modern',
	  height: 300,
	  menubar: false,
	  plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table contextmenu paste code'
	  ],
	  toolbar: 'undo redo | insert | styleselect | fontselect bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
	  content_css: '//www.tinymce.com/css/codepen.min.css'
	});
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
			$('#pageActual').val(requestedPage); //Almacenamos pagina actual
		}
	});
});	 


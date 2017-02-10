/* Instasearch */

function FxABMInstantSearch()
{
	searchValues = $('#arraySearchValues').val(); //Needle
	searchFields = $('#arraySearchFields').val(); //Haystack
	
	arraySearchValues = searchValues.split(','); //Needle Array
	arraySearchFields = searchFields.split(','); //HayStack Array

	$('#divGridAjax').hide();
	
	//Mostramos todo por defecto
	$('.' + arraySearchFields[0]).each(function(){
		$(this).closest('tr').show();
	});
	
	//Recorremos Needles y buscamos en su correspondiente array de Haystack
	$.each(arraySearchValues, function(indexNeedle, value){ // each para campos de busqueda
	
		searchValue = $('#' + value).val(); //Needle
		
		$('.' + arraySearchFields[indexNeedle]).each(function(){ //Needle en su correspondiente Haystack
			
			//$(this).closest('tr').hide();
			if (searchValue != '')
			{
				if ($(this).text().toLowerCase().indexOf(searchValue.toLowerCase()) == -1) //Not Found
				{
					$(this).closest('tr').hide();
				}
			}
		});
	});
	$('#divGridAjax').show();

}


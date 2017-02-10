/* Javascript Functions */
function FxOpenCuitPuntoJS(cuitIdHashed)
{
    window.location.href = $('#UrlEditCuitPunto').val() + '/' + cuitIdHashed;
}

function FxOpenPopupValidarCuitJS()
{
    var URL = $('#UrlValidaCuit').val();
    var strData = { };
    var strDivResponse = 'divResponseAjaxPopupModal';

    exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDivResponse, FxSetPopupJS);
}
function FxOpenCuitRetailerJS(cuitIdHashed)
{
    window.location.href = $('#UrlEditCuitRetailer').val() + '/' + cuitIdHashed;
}

function FxOpenCuitCadenaJS(cuitIdHashed)
{
    window.location.href = $('#UrlEditCuitCadena').val() + '/' + cuitIdHashed;
}

function FxSaveCuitJS()
{
    var nroCuit = $('#txtCuitNro').val();
	if (nroCuit == '')
	{
		sweetAlert('Error', 'Debe ingresar el CUIT.', 'error');
		return false;
	}
	if(!esCUITValida(nroCuit)){
        sweetAlert('Error', 'El CUIT ingresado es inválido.', 'error');
        return false;
    }
	($('#chkEstado').prop('checked')) ? cuitEstado = 1 : cuitEstado  = 0;

	jsonArray = { "cuitId": $('#hiddenCuitId').val(),
                  "cuitNro": nroCuit,
				  "cuitEstado": cuitEstado  };

	var URL = $('#UrlAjaxSave').val();
	var strData = { value: jsonArray };
	var strDivResponse = 'divResponseABM';

	exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessageABMSuccess);

}

function FxCheckEstadoRadioJS()
{
    //Recorremos todas las cadenas
    $('.cadenasFull').each( function(){
        var cadenaId = $(this).val();
        //Por cada cadena...recorremos sus puntos pickit
        var todasOn = 1;
        var todasOff = 1;
        var algunasOnOff = 0;
        $('.checkCadena_' + cadenaId).each( function(){
            //Verificamos si estan todas on, off, algunas
            if ( $(this).prop('checked') ) //Esta en "ON"
            {
                todasOff = 0;
            }
            else //Esta en "OFF"
            {
                todasOn = 0;
            }
        });
        //Se verifica si hay solo algunas en "ON"
        if (!todasOn && !todasOff)
        {
            algunasOnOff = 1;
        }
        //console.log('todasOn: ' + todasOn);
        //console.log('algunasOnOff: ' + algunasOnOff);
        //console.log('todasOff: ' + todasOff);
        //Se setean los radios...
        //if (todasOn) { $('#chkCadenaTodos_' + cadenaId).prop('checked', true); }
        (todasOn) ? $('#chkCadenaTodos_' + cadenaId).prop('checked', true) : $('#chkCadenaTodos_' + cadenaId).prop('checked', false);
        (algunasOnOff) ? $('#chkCadenaAlgunos_' + cadenaId).prop('checked', true) : $('#chkCadenaAlgunos_' + cadenaId).prop('checked', false);
        //if (todasOff) { $('#chkCadenaNinguno_' + cadenaId).prop('checked', true); }
        (todasOff) ? $('#chkCadenaNinguno_' + cadenaId).prop('checked', true) : $('#chkCadenaNinguno_' + cadenaId).prop('checked', false);
    });
}

function FxSaveCuitPuntosJS()
{
    //Save
    var arrayPuntos = [];
    $('.checkPuntosPickit').each( function(){
        if ( $(this).prop('checked') )
        {
            var arrayId = $(this).attr('id').split('_'); //split text
            arrayPuntos.push(arrayId[1]);
        }
    });

    jsonArray = { "cuitIdHashed": $('#hiddenCuitIdHashed').val(),
        "arrayPuntos": arrayPuntos};
    var URL = $('#UrlAjaxSave').val();
    var strData = { value: jsonArray };
    var strDivResponse = 'divNull';

    exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessagePuntosSuccess);
}


function FxSaveCuitRetailerJS()
{
    //Save
    var arrayRetailer = [];
    $('.checkRetailer').each( function(){
        if ( $(this).prop('checked') )
        {
            var arrayId = $(this).attr('id').split('_'); //split text
            arrayRetailer.push(arrayId[1]);
        }
    });

    jsonArray = { "cuitIdHashed": $('#hiddenCuitIdHashed').val(),
        "arrayRetailer": arrayRetailer};
    var URL = $('#UrlAjaxSave').val();
    var strData = { value: jsonArray };
    var strDivResponse = 'divNull';

    exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessagePuntosSuccess);
}


function FxSaveCuitCadenaJS()
{
    //Save
    var arrayCadena = [];
    $('.checkCadena').each( function(){
        if ( $(this).prop('checked') )
        {
            var arrayId = $(this).attr('id').split('_'); //split text
            arrayCadena.push(arrayId[1]);
        }
    });

    jsonArray = { "cuitIdHashed": $('#hiddenCuitIdHashed').val(),
        "arrayCadena": arrayCadena};
    var URL = $('#UrlAjaxSave').val();
    var strData = { value: jsonArray };
    var strDivResponse = 'divNull';

    exeAjaxCallBackLoading(URL, strData, strDivResponse, FxShowMessagePuntosSuccess);
}


function FxShowMessagePuntosSuccess()
{
    swal({
            title: "",
            text: "La operación fue realizada satisfactoriamente.",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            allowEscapeKey: false,
            closeOnConfirm: true
    },
    function(){
        window.location.href = $('#UrlMenuCuit').val();
    });
}
/* Common Javascript Functions */

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

function exeAjaxCallBackLoading(URL, strData, strDiv, functionCallback)
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

function exeAjaxCallBackLoadingSetDivOnResult(URL, strData, strDiv, functionCallback)
{
	ShowLoading('divLoading');
    divResponse = $('#' + strDiv);
    
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

function exeAjaxCallBack(URL, strData, strDiv, functionCallback)
{
	var divResponse = $('#' + strDiv);
	
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
        functionCallback(result);
      },
      error: function() {
          sweetAlert('Error', 'Ocurrió un error al intentar hacer la operación solicitada.', 'error');
		  $('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow'); //Loading Div Hide
      }
    });
}

function exeAjaxUploadFileCallBack(URL, strData, strDiv, functionCallback)
{
	var divResponse = $('#' + strDiv);
	
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
	  contentType: false,       // The content type used when sending data to the server.
	  cache: false,             // To unable request pages to be cached
	  processData:false,        // To send DOMDocument or non processed data file it is set to false	  
      success: function(result) {
		//console.log(result);
		divResponse.html(result);
        functionCallback(result);
      },
      error: function() {
          sweetAlert('Error', 'Ocurrió un error al intentar realizar la subida del archivo seleccionado.', 'error');
		  $('#ajaxLoadingDiv').removeClass('ajaxLoadingDivShow'); //Loading Div Hide
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

function exeAjaxCallBackCustom(URL, strData, strDiv, customFunctionCallback)
{
	var divResponse = $('#' + strDiv);
	
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

function winResize(w,h)
{
    window.resizeTo(w, h);
    var winl = (screen.width-w)/2;
    var wint = (screen.height-h)/2;
    window.moveTo(winl,wint);
}

function myPopup(url, ancho, alto)
{
   myleft=(screen.width)?(screen.width-ancho)/2:100;
   mytop=(screen.height)?(screen.height-alto)/2:100;
   mytop = mytop-25;
   PopupWin = window.open(url,"PopupWin","resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=no,width="+ancho+",height="+alto+",left="+myleft+",top="+mytop);
   PopupWin.focus();
}

function Popup(url,ancho,alto)
{
   myleft=(screen.width)?(screen.width-ancho)/2:100;
   mytop=(screen.height)?(screen.height-alto)/2:100;
   mytop = mytop-25;
   settings='top=' + mytop + ',left=' + myleft + ',width='+ancho+',height='+alto+',location=no,directories=no,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=no,fullscreen=no'
   PopupWin=window.open(url,'PopupWin', settings);
   PopupWin.focus();
}

function PopupNew(url,ancho,alto)
{
   myleft=(screen.width)?(screen.width-ancho)/2:100;mytop=(screen.height)?(screen.height-alto)/2:100;
   mytop = mytop-25;
   settings='top=' + mytop + ',left=' + myleft + ',width='+ancho+',height='+alto+',location=no,directories=no,menubar=no,toolbar=no,status=yes,scrollbars=yes,resizable=no,fullscreen=no'
   var popupName = new Date().getSeconds();
   popupName = 'PopupWin' + popupName;
   PopupWin=window.open(url,popupName, settings);
   PopupWin.focus();
}

function FxIsNaN (valor)
{
    valor = valor.replace(",", ".");
    if (isNaN(valor))
    {
        return true;
    }
    return false;
}

function esCUITValida(inputValor)
{
    inputString = inputValor.toString();
    if (inputString.length == 11) {
        var Caracters_1_2 = inputString.charAt(0) + inputString.charAt(1);
        if (Caracters_1_2 == "20" || Caracters_1_2 == "23" || Caracters_1_2 == "24" || Caracters_1_2 == "27" || Caracters_1_2 == "30" || Caracters_1_2 == "33" || Caracters_1_2 == "34") {
            var Count = inputString.charAt(0) * 5 + inputString.charAt(1) * 4 + inputString.charAt(2) * 3 + inputString.charAt(3) * 2 + inputString.charAt(4) * 7 + inputString.charAt(5) * 6 + inputString.charAt(6) * 5 + inputString.charAt(7) * 4 + inputString.charAt(8) * 3 + inputString.charAt(9) * 2 + inputString.charAt(10) * 1;
            Division = Count / 11;
            if (Division == Math.floor(Division)) {
                return true;
            }
        }
    }
    return false;
}

function verifyNumber(evt)
{
	var nav4 = window.Event ? true : false;
	var key = nav4 ? evt.which : evt.keyCode;
	return (key <= 13 || (key >= 48 && key <= 57) || key == 46);
}

function FxObjectDestroyJS(arrayObj)
{
	//arrayObj = string de objetos separados por ","
	var objectsArray = arrayObj.split(',');

	$.each(objectsArray, function(index, value) { 
		$('#' + value).html("");
	});	
}

function FxOpenUrl(strUrl)
{
	var win = window.open(strUrl, '_blank');
}

function validaFechaDDMMAAAA(fecha)
{
    var dtCh= "/";
    var minYear=1900;
    var maxYear=2100;
    function isInteger(s)
    {
        var i;
        for (i = 0; i < s.length; i++)
        {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag)
    {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++)
        {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary (year)
    {
        return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
    }
    function DaysArray(n)
    {
        for (var i = 1; i <= n; i++)
        {
            this[i] = 31
            if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
            if (i==2) {this[i] = 29}
        }
        return this
    }
    function isDate(dtStr)
    {
        var daysInMonth = DaysArray(12)
        var pos1=dtStr.indexOf(dtCh)
        var pos2=dtStr.indexOf(dtCh,pos1+1)
        var strDay=dtStr.substring(0,pos1)
        var strMonth=dtStr.substring(pos1+1,pos2)
        var strYear=dtStr.substring(pos2+1)
        strYr=strYear
        if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
        if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
        for (var i = 1; i <= 3; i++)
        {
            if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
        }
        month=parseInt(strMonth)
        day=parseInt(strDay)
        year=parseInt(strYr)
        if (pos1==-1 || pos2==-1)
        {
            return false
        }
        if (strMonth.length<1 || month<1 || month>12)
        {
            return false
        }
        if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month])
        {
            return false
        }
        if (strYear.length != 4 || year==0 || year<minYear || year>maxYear)
        {
            return false
        }
        if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false)
        {
            return false
        }
        return true
    }
    if(isDate(fecha))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isValidEmail(emailAddress)
{
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function FxSetDatepicker(onCloseCallback)
{
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year
		firstDay: true,
		today: 'Hoy',
		clear: 'Limpiar',
		close: 'Cerrar',
		monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		labelMonthNext: 'Mes siguiente',
        labelMonthPrev: 'Mes anterior',
		labelMonthSelect: 'Seleccione un mes',
        labelYearSelect: 'Seleccione un año',
		weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
		format: 'dd/mm/yyyy',
		closeOnSelect: true,
		closeOnClear: false,
		onClose: function() {
			if (onCloseCallback) { onCloseCallback(); }
		}
	});
}

function GetBrowserDetails()
{
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var browserVersion = 0;
 
	// If Internet Explorer, return version number
	if (msie > 0)
		browserVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
		//return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
	// If Internet Explorer 11 handling differently because UserAgent string updated by Microsoft
	else if (!!navigator.userAgent.match(/Trident\/7\./))
		browserVersion = 11;
		//return 11;
	else
		//If another browser just returning  0
		browserVersion = 0;
		//return 0

	$('#browserVersion').val(browserVersion);
	return browserVersion;
}


function FxDateToMilisecondsJS(strDate)
{
	//Formato Input...dd/mm/yyyy
	if (strDate == '') { return ''; }
	var arrayDate = strDate.split('/');
	var objDate = new Date(arrayDate[2], arrayDate[1]-1, arrayDate[0]); //-1 al mes...porque en JS...los meses son de 0...11
	var msDate = objDate.getTime();
	return msDate;
}

jQuery.fn.extend({
	insertAtCaret: function(myValue){
		return this.each(function(i) {
			if (document.selection) {
				//For browsers like Internet Explorer
				this.focus();
				var sel = document.selection.createRange();
				sel.text = myValue;
				this.focus();
			}
			else if (this.selectionStart || this.selectionStart == '0') {
				//For browsers like Firefox and Webkit based
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				var scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
				this.focus();
				this.selectionStart = startPos + myValue.length;
				this.selectionEnd = startPos + myValue.length;
				this.scrollTop = scrollTop;
			}
			else {
				this.value += myValue;
				this.focus();
			}
		});
	}
});

function hexToRgb(hex)
{
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b)
{
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	
	if (max == min)
	{
		h = s = 0;
	} 
	else
	{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max)
		{
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];
}


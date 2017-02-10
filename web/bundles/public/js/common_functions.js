/* Common Javascript Functions */

function exeAjax(URL, strData, strDivResponse)
{
	divResponse = $('#' + strDivResponse);
	
    //console.log(URL);
    //console.log(strData);
    //console.log(divResponse);
	
	ShowLoading('divLoading');
	
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
          customAlert('sError', 'Ocurrió un error al intentar hacer la operación solicitada.', 0);
      }
    });
}

function exeAjaxCallback(URL, strData, strDivResponse, callbackFx)
{
	divResponse = $('#' + strDivResponse);
	
    //console.log(URL);
    //console.log(strData);
    //console.log(divResponse);
	
	ShowLoading('divLoading');

    $.ajax({
      type: 'POST',
      url: URL,
      data: strData,
      xhrFields: { withCredentials: true },
      headers: { },
      success: function(result) {
		HideLoading('divLoading');
		divResponse.html(result);
		callbackFx();
      },
      error: function() {
          HideLoading('divLoading');
		  customAlert('sError', 'Ocurrió un error al intentar hacer la operación solicitada.', 0);
      }
    });
}

function customAlert(strImg, strMsg, callbackFx)
{
    //JQuery Alerts
    strMsg = '&nbsp;' + strMsg + '&nbsp;&nbsp;';
    var sInfo        = '<img src="/HeroGym/web/bundles/public/images/info.png">';
    var sSuccess     = '<img src="/HeroGym/web/bundles/public/images/success.png">';
    var sError       = '<img src="/HeroGym/web/bundles/public/images/error.png">';
    var sImportant   = '<img src="/HeroGym/web/bundles/public/images/important.gif">';
    var sHelp        = '<img src="/HeroGym/web/bundles/public/images/help.gif">';
    var iniSpan     = '<span style="display: table-cell; vertical-align: middle; white-space: nowrap;">&nbsp;';
    var endSpan     = '</span>';
    var sTitle       = 'HeroGym';
    var fx = (callbackFx) ? "function(){window.close();}" : 'function(){return true;}';
    $.alerts.dialogClass = 'style_1'; //Defino Estilo
    var str = "jAlert(iniSpan + eval(strImg) + endSpan + iniSpan + strMsg + endSpan, sTitle, " + fx + ");";
    eval(str);
    //jAlert(iniSpan + eval(strImg) + endSpan + iniSpan + strMsg + endSpan, sTitle, function(){window.close();});
}

function customAlertCallback(strImg, strMsg, callbackFx)
{
    //JQuery Alerts
    strMsg = '&nbsp;' + strMsg + '&nbsp;&nbsp;';
    var sInfo        = '<img src="/HeroGym/web/bundles/public/images/info.png">';
    var sSuccess     = '<img src="/HeroGym/web/bundles/public/images/success.png">';
    var sError       = '<img src="/HeroGym/web/bundles/public/images/error.png">';
    var sImportant   = '<img src="/HeroGym/web/bundles/public/images/important.gif">';
    var sHelp        = '<img src="/HeroGym/web/bundles/public/images/help.gif">';
    var iniSpan     = '<span style="display: table-cell; vertical-align: middle; white-space: nowrap;">&nbsp;';
    var endSpan     = '</span>';
    var sTitle       = 'HeroGym';
    var fx = (callbackFx) ? 'function(){' + callbackFx + '}' : 'function(){return true;}';
    //var fx = (callbackFx) ? 'function(){window.location = "cotizacion_search.php";}' : 'function(){return true;}';
    $.alerts.dialogClass = 'style_1'; //Defino Estilo
    var str = "jAlert(iniSpan + eval(strImg) + endSpan + iniSpan + strMsg + endSpan, sTitle, " + callbackFx + ");";
    eval(str);
    //jAlert(iniSpan + eval(strImg) + endSpan + iniSpan + strMsg + endSpan, sTitle, function(){window.close();});
}

function customConfirm(strMsg, fxFunction)
{
    //JQuery Alerts
    strMsg = '&nbsp;' + strMsg + '&nbsp;&nbsp;';
    var iniSpan     = '<span style="display: table-cell; vertical-align: middle; white-space: nowrap;">&nbsp;';
    var endSpan     = '</span>';
    var sHelp = '<img src="/HeroGym/web/bundles/public/images/help.png">';
    $.alerts.dialogClass = 'style_1'; //Defino Estilo

    jConfirm(iniSpan + strMsg + endSpan + iniSpan + sHelp + endSpan, 'HeroGym', function(r) {
        //customAlert('sInfo', r, 0);
        if (r == true)
        {
            eval(fxFunction);
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
   myleft=(screen.width)?(screen.width-ancho)/2:100;mytop=(screen.height)?(screen.height-alto)/2:100;
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


/* Javascript Functions */

function FxGetGridAccesoAlumnosJS()
{
	URL = $('#UrlAjaxGridAccesoAlumnos').val();
	jsonArray = { "strRutHuella": $('#txtBuscar').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'accesoGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxSetFixedTable(strHeight)
{
	if (!strHeight) { strHeight = '129'; }
    $('.tblFixed').fixedHeaderTable({ width: '100%', height: strHeight, footer: false, cloneHeadToFoot: false, altClass: 'odd', themeClass: 'fancyTable', autoShow: false });
    $('.tblFixed').fixedHeaderTable('show', 250);
}

function FxRegistrarAccesoAlumnoJS(inscripcionProgramaIdHashed, horarioIdHashed)
{

	URL = $('#UrlAjaxSaveRegistroAcceso').val();
	jsonArray = { "inscripcionProgramaIdHashed": inscripcionProgramaIdHashed,
				  "horarioIdHashed": horarioIdHashed,
				  "claseAviso": $('#hiddenClaseAviso').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'divNull';
	exeAjaxCallback(URL, strData, strDivResponse, FxRegistrarAccesoAlumnoPostOperacionesJS);
	
}

function FxAccesoClaseAvisoJS()
{
	URL = $('#UrlAjaxClaseAvisoAlumno').val();
	jsonArray = { "strRut": $('#txtBuscar').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'accesoGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxRegistrarAccesoAlumnoPostOperacionesJS()
{
	customAlert("sSuccess", "El acceso se registró satisfactoriamente.", 1);
	//limpiamos grilla
	$('#accesoGrid').html('');
}


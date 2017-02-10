/* Javascript Functions */

function FxReportAsistenciaGenerarJS()
{
	if ($('#cmbMonth').val() == '')
	{
        customAlert('sInfo', 'Debe seleccionar el mes.', 0);
        return false;
	}
	if ($('#cmbYear').val() == '')
	{
        customAlert('sInfo', 'Debe seleccionar el año.', 0);
        return false;
	}
	if ($('#cmbInstructorDisciplina').val() == '')
	{
        customAlert('sInfo', 'Debe seleccionar el instructor y disciplina.', 0);
        return false;
	}

	URL = $('#UrlAjaxGridReport').val();
	jsonArray = { "cmbMonth": $('#cmbMonth').val(),
				  "cmbYear": $('#cmbYear').val(),
				  "cmbInstructorDisciplina": $('#cmbInstructorDisciplina').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'reportGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxReportVigentesNoVigentesGenerarJS()
{
	if ($('#cmbInstructorDisciplina').val() == '')
	{
        customAlert('sInfo', 'Debe seleccionar el instructor y disciplina.', 0);
        return false;
	}

	URL = $('#UrlAjaxGridReport').val();
	jsonArray = { "cmbInstructorDisciplina": $('#cmbInstructorDisciplina').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'reportGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxReportPagosGenerarJS()
{
	URL = $('#UrlAjaxGridReport').val();
	jsonArray = { "fechaInicio": $('#txtFechaInicio').val(),
				  "fechaTermino": $('#txtFechaTermino').val(),
				  "cmbInstructorDisciplina": $('#cmbInstructorDisciplina').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'reportGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxReportAccesosGenerarJS()
{
	if ( $('#txtFecha').val() == '')
	{
        customAlert('sInfo', 'Debe ingresar una fecha.', 0);
        return false;
	}
	URL = $('#UrlAjaxGridReport').val();
	jsonArray = { "fecha": $('#txtFecha').val(),
				  "cmbInstructorDisciplina": $('#cmbInstructorDisciplina').val(),
				  "cmbHorario": $('#cmbHorario').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'reportGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxReportAccesosCmbInstructorDisciplinaJS()
{
	$('#reportGrid').html(''); //Limpiamos Grid
	URL = $('#UrlAjaxCmbInstructorDisciplina').val();
	jsonArray = { "fecha": $('#txtFecha').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'divCmbInstructorDisciplina';
	exeAjaxCallback(URL, strData, strDivResponse, FxReportAccesosCmbHorarioJS);
}

function FxReportAccesosCmbHorarioJS()
{
	$('#reportGrid').html(''); //Limpiamos Grid
	URL = $('#UrlAjaxCmbHorario').val();
	jsonArray = { "fecha": $('#txtFecha').val(),
				  "cmbInstructorDisciplina": $('#cmbInstructorDisciplina').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'divCmbHorario';
	exeAjax(URL, strData, strDivResponse);
}

function FxSetFixedTable(strHeight)
{
	if (!strHeight) { strHeight = '386'; }
    $('.tblFixed').fixedHeaderTable({ width: '100%', height: strHeight, footer: false, cloneHeadToFoot: false, altClass: 'odd', themeClass: 'fancyTable', autoShow: false });
    $('.tblFixed').fixedHeaderTable('show', 250);
}



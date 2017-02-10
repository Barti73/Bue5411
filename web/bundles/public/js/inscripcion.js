/* Javascript Functions */

function FxGetGridPlanesAlumnosJS()
{
	if ($('#txtBuscar').val() == '')
	{
        customAlert('sInfo', 'Debe ingresar el rut del alumno.', 0);
        return false;
	}
	URL = $('#UrlAjaxGridPlanesAlumnos').val();
	jsonArray = { "strRut": $('#txtBuscar').val() };
	var strData = { value: jsonArray };
	var strDivResponse = 'inscripcionGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxSetFixedTable(strHeight)
{
	if (!strHeight) { strHeight = '386'; }
    $('.tblFixed').fixedHeaderTable({ width: '100%', height: strHeight, footer: false, cloneHeadToFoot: false, altClass: 'odd', themeClass: 'fancyTable', autoShow: false });
    $('.tblFixed').fixedHeaderTable('show', 250);
}

function FxAddProgramaJS()
{
	//Validaciones
    if ($('#cmbPrograma').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar el programa.', 0);
        return false;
    }
	
	if ($('#txtFechaInicio').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar la fecha de inicio.', 0);
        return false;
    }
	
	var beca = 0;
	if ($('#txtPorcentajeBeca').val() != '')
	{
		beca = $('#txtPorcentajeBeca').val();
	}

	URL = $('#UrlGetProgramaData').val();
	jsonArray = { "programaId": $('#cmbPrograma').val(),
				  "fechaInicio": $('#txtFechaInicio').val(),
				  "beca": beca };
	
	var strData = { value: jsonArray };
	var strDivResponse = 'divProgramaDataResponse';
	exeAjaxCallback(URL, strData, strDivResponse, FxPostAddPrograma);

}

function FxPostAddPrograma()
{
	var programa = JSON.parse($('#divProgramaDataResponse').html());
	FxAddRowTablaInscripcion(programa);
}

function FxAddRowTablaInscripcion(programa)
{
	$('#tablaProgramas tbody').append(
		'<tr>' +
		'<td align="left" class="tdProgramaId" style="display: none;">' + programa.programaId + '</td>' + 
		'<td align="left" class="tdTablaInscripcion">' + programa.programaNombre + '</td>' + 
		'<td align="left" class="tdTablaInscripcion">' + programa.disciplinaNombre + '</td>' + 
		'<td align="left" class="tdTablaInscripcion">' + programa.instructorNombre + ' ' + programa.instructorApellido + '</td>' + 
		'<td align="center" class="tdTablaInscripcion">' + programa.programaDuracion + ' meses</td>' + 
		'<td align="center" class="tdTablaInscripcion">' + programa.programaSesiones + '</td>' + 
		'<td align="center" class="tdTablaInscripcion tdFechaInicio">' + programa.programaFechaInicio + '</td>' + 
		'<td align="center" class="tdTablaInscripcion tdBeca">' + programa.programaBeca + '</td>' + 
		'<td align="center" class="tdTablaInscripcion tdValor">' + programa.programaValor + '</td>' + 
		'<td align="center" class="tdTablaInscripcion tdFechaVigencia">' + programa.programaFechaVigencia + '</td>' + 
		'<td align="center" class="tdTablaInscripcion">' +
		'	<a href="javascript:void(0)" onclick="FxDeleteRowTablaInscripcion(this)" style="display: block; margin-top: 2px;">' + 
		'	<img src="/Herogym/web/bundles/public/images/error.png" border="0" alt=""></a>' + 
		'</td>' + 
		'</tr>'
	);
	$('#cmbPrograma').val('');
	$('#txtPorcentajeBeca').val('');
	
	FxCalcularTotales();
}

function FxDeleteRowTablaInscripcion(row)
{
	$(row).closest('tr').remove();
	FxCalcularTotales();
}

function FxCalcularTotales()
{
	var cantidadProgramas = 0;
	var beca = 0;
	var valor = 0;
	var total = 0;
	var descuento = 0;
	var totalPagar = 0;
	
	//Total
	$('.tdValor').each( function(){
		valor = valor + $(this).text()*1;
		cantidadProgramas++;
	});
	total = $('#txtValorMatricula').val()*1 + valor;
	$('#txtTotal').val(total);
	
	//Beca
	$('.tdBeca').each( function(){
		beca = beca + $(this).text()*-1;
	});
	$('#txtBeca').val(beca);
	
	//Descuento Multiplan
	if (cantidadProgramas > 1)
	{
		descuento = valor * $('#txtDescuentoMultiplan').val() / 100 *-1;
	}
	$('#txtDescuento').val(descuento);
	
	//Total Pagar
	totalPagar = total + beca + descuento;
	$('#txtTotalPagar').val(totalPagar);
	
	//Si no hay programas...todo en cero
	if (cantidadProgramas == 0)
	{
		$('#txtTotal').val('0');
		$('#txtBeca').val('0');
		$('#txtDescuento').val('0');
		$('#txtTotalPagar').val('0');
	}
}

function FxInscripcionCancelJS()
{
	location.href = $('#menuInscripcion').attr('href');
}

function FxInscripcionSaveJS()
{
	var hashedAlumnoId = $('#hiddenHashedAlumnoId').val();
	var hashedInscripcionId = $('#hiddenHashedInscripcionId').val();
	var matricula = $('#txtValorMatricula').val();
	var fechaMatricula = $('#txtFechaMatricula').val();
	var vigencia = $('#txtVigencia').val();
	
	var programas = [];
	var programaId = [];
	var programaFechaInicio = [];
	var programaBeca = [];
	var programaValor = [];
	var programaFechaVigencia = [];

	//ProgramaId
	$('.tdProgramaId').each( function(){
		programaId.push( $(this).text() );
	});
	//Fecha Inicio
	$('.tdFechaInicio').each( function(){
		programaFechaInicio.push( $(this).text() );
	});
	//Beca
	$('.tdBeca').each( function(){
		programaBeca.push( $(this).text() );
	});
	//Valor
	$('.tdValor').each( function(){
		programaValor.push( $(this).text() );
	});
	//Fecha Vigencia
	$('.tdFechaVigencia').each( function(){
		programaFechaVigencia.push( $(this).text() );
	});
	
	//Push Array Programas
	programas.push(programaId, programaFechaInicio, programaBeca, programaValor, programaFechaVigencia);

	URL = $('#UrlInscripcionSave').val();
	jsonArray = { "hashedAlumnoId": hashedAlumnoId,
				  "hashedInscripcionId": hashedInscripcionId,
				  "matricula": matricula,
				  "fechaMatricula": fechaMatricula,
				  "vigencia": vigencia,
				  "arrayProgramas": programas };
	
	var strData = { value: jsonArray };
	var strDivResponse = 'divNull';
	exeAjaxCallback(URL, strData, strDivResponse, FxInscripcionSavePostOperacionesJS);
	
}

function FxInscripcionSavePostOperacionesJS()
{
	customAlertCallback("sSuccess", "La inscripción fue realizada satisfactoriamente.", 'FxInscripcionCancelJS');	
}

function FxRegistrarNewJS(alumnoId)
{
	location.href = 'Add/' + alumnoId;
}
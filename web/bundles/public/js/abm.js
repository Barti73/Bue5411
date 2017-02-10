/* Javascript Functions */

function FxSetRadio(rdSelector, URL)
{
	radioValue = $('input[name=' + rdSelector + ']:checked').val();
	jsonArray = { "radioValue": radioValue };
	//console.log('FxSetRadio');
	//console.log(jsonArray);
	//return false;
	
	var strData = { value: jsonArray };
	var strDivResponse = 'abmGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetFixedTable);
}

function FxHorarioGrid()
{
	URL = $('#txtUrlHorarioGrid').val();
	jsonArray = { "disciplinaId": $('#txtDisciplinaId').val() };
	
	var strData = { value: jsonArray };
	var strDivResponse = 'horariosGrid';
	exeAjaxCallback(URL, strData, strDivResponse, FxSetHorarioGrid);
}

function FxSetHorarioGrid()
{
	FxSetFixedTable(242);
	$('.fancyTable thead tr th').css('font-size', '10px');

	//Eliminamos todas las celdas vacias
	$('.divTdHorario').each( function(){
		if ( $(this).html() == '' )
		{
			elemId = $(this).attr('id');
			ids = elemId.split('-');
			newElement = 'parent-'+ids[1];
			$('#'+newElement).remove();
			console.log(newElement);
		}
	});
	
	//Limpiamos formulario
    $('#cmbHorarioDia').val('');
    $('#txtHorarioInicio').val('');
    $('#txtHorarioTermino').val('');
    $('#cmbHorarioTurno').val('');
}

function FxSetFixedTable(strHeight)
{
	if (!strHeight) { strHeight = '386'; }
    $('.tblFixed').fixedHeaderTable({ width: '100%', height: strHeight, footer: false, cloneHeadToFoot: false, altClass: 'odd', themeClass: 'fancyTable', autoShow: false });
    $('.tblFixed').fixedHeaderTable('show', 250);
}

function FxSaveInstructorJS()
{
    //validamos que el campo no este vacio y no tenga solo espacios en blanco
    if ($('#txtNombre').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el nombre del instructor.', 0);
        return false;
    }

    if ($('#txtApellido').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el apellido del instructor.', 0);
        return false;
    }

    if ($('#txtCodigo').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el código del instructor.', 0);
        return false;
    }

	//Disciplinas
	var disciplinasIds = '';
	var disciplinasNoIds = '';
	$('.classCheckboxDisciplina').each(function()
	{
		if($(this).prop('checked'))
		{
			disciplinasIds = disciplinasIds + $(this).val() + '_';
		}	
		else
		{
			disciplinasNoIds = disciplinasNoIds + $(this).val() + '_';
		}	
		
	});
	disciplinasIds = disciplinasIds.substr(0,disciplinasIds.length-1);
	disciplinasNoIds = disciplinasNoIds.substr(0,disciplinasNoIds.length-1);
	$('#txtArrayDisciplinas').val(disciplinasIds);
	$('#txtArrayDisciplinasNo').val(disciplinasNoIds);
    $('#frmInstructorAddEdit').submit();
}

function FxSaveDisciplinaJS()
{
    //validamos que el campo no este vacio y no tenga solo espacios en blanco
    if ($('#txtNombre').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el nombre de la disciplina.', 0);
        return false;
    }

    if ($('#txtCodigo').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el código de la disciplina.', 0);
        return false;
    }

    $('#frmDisciplinaAddEdit').submit();
}

function FxSaveProgramaJS()
{
    //validamos que el campo no este vacio y no tenga solo espacios en blanco
    if ($('#txtNombre').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el nombre del instructor.', 0);
        return false;
    }

    if ($('#txtCodigo').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el código del instructor.', 0);
        return false;
    }

    if ($('#cmbDisciplinaInstructor').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar la disciplina/instructor del programa.', 0);
        return false;
    }

    if ($('#cmbPeriodicidad').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar la periodicidad del programa.', 0);
        return false;
    }

	if ($('#txtDuracion').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar la duración del instructor.', 0);
        return false;
    }

	if ($('#txtSesiones').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar la cantidad de sesiones.', 0);
        return false;
    }
	
	if ($('#txtValor').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el valor del instructor.', 0);
        return false;
    }
	
    $('#frmProgramaAddEdit').submit();
}

function FxSetCheckBox(chkName)
{
	if (!chkName) { chkName = 'chkActivo'; }
	if ($('#' + chkName).prop('checked'))
	{
		$('#' + chkName).val('1');
	}
	else
	{
		$('#' + chkName).val('0');
	}
}

function FxHorarioSaveJS()
{
    if ($('#cmbHorarioDia').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar el día.', 0);
        return false;
    }

    if ($('#txtHorarioInicio').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el horario de inicio.', 0);
        return false;
    }

    if ($('#txtHorarioTermino').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el horario de término.', 0);
        return false;
    }

    if ($('#cmbHorarioTurno').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar el turno.', 0);
        return false;
    }

	URL = $('#txtUrlHorarioSave').val();
	jsonArray = { "disciplinaId": $('#txtDisciplinaId').val(),
				  "diaId": $('#cmbHorarioDia').val(),
				  "horarioInicio": $('#txtHorarioInicio').val(),	
				  "horarioTermino": $('#txtHorarioTermino').val(),	
				  "turno": $('#cmbHorarioTurno').val() };
	
	var strData = { value: jsonArray };
	var strDivResponse = 'div_null';
	exeAjaxCallback(URL, strData, strDivResponse, FxHorarioGrid);
	
}

function FxHorarioDeleteJS(disciplinaHorarioId)
{
	URL = $('#txtUrlHorarioDelete').val();
	jsonArray = { "disciplinaHorarioId": disciplinaHorarioId };
	
	var strData = { value: jsonArray };
	var strDivResponse = 'div_null';
	exeAjaxCallback(URL, strData, strDivResponse, FxHorarioGrid);
}

function FxSaveAlumnoJS()
{
    //validamos que el campo no este vacio y no tenga solo espacios en blanco
    if ($('#txtNombre').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el nombre del alumno.', 0);
        return false;
    }

    if ($('#txtRut').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el rut del alumno.', 0);
        return false;
    }

    if ($('#txtEdad').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar la edad del alumno.', 0);
        return false;
    }

	if ($('#txtTelefono').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el teléfono del alumno.', 0);
        return false;
    }

	if ($('#txtEmail').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el email del alumno.', 0);
        return false;
    }

	if ($('#txtObjetivo').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el objetivo del alumno.', 0);
        return false;
    }

	if ($('#txtContactoEmergencia').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el contacto de emergencia del alumno.', 0);
        return false;
    }

	if ($('#txtCondicionesMedicas').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar las condiciones médicas del alumno.', 0);
        return false;
    }

	if ($('#txtCentroMedicoPreferencia').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el centro médico de preferencia del alumno.', 0);
        return false;
    }

	if ($('#txtFechaIngreso').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar la fecha de ingreso del alumno.', 0);
        return false;
    }

	if ($('#txtRegistroHuella').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el registro de huella del alumno.', 0);
        return false;
    }

	/*
	if ($('#txtFoto').val() == '')
    {
        customAlert('sInfo', 'Debe seleccionar la foto del alumno.', 0);
        return false;
    }
	*/

	if ($('#txtEmail').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el email del alumno.', 0);
        return false;
    }
	
    $('#frmAlumnoAddEdit').submit();
}

function FxSaveUsuarioJS()
{
    if ($('#txtNombre').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el nombre del usuario.', 0);
        return false;
    }

	if ($('#txtUsername').val() == '')
    {
        customAlert('sInfo', 'Debe ingresar el username del usuario.', 0);
        return false;
    }

	if ( $('#txtUsuarioId').val() == '' ) //Add
	{
		//Insert...debe ingresar pass
		if ($('#txtPassword').val() == '' || $('#txtPasswordConfirm').val() == '')
		{
			customAlert('sInfo', 'Debe ingresar y confirmar el password para el usuario.', 0);
			return false;
		}
	}
	
	//Si ambos no vacios...pero distintos...error
	if ( ($('#txtPassword').val() != '' && $('#txtPasswordConfirm').val() != '') &&
		 ( $('#txtPassword').val() != $('#txtPasswordConfirm').val() )
	   )
	{
		customAlert('sInfo', 'Los passwords no coinciden.', 0);
		return false;
	}
	

    $('#frmUsuarioAddEdit').submit();
}

<?php

namespace AppBundle\Constants;

class Bue54Constants 
{
    const DEFAULT_TEST = "Constante de test";
    const TOTAL_ROWS = 12;
    const PERIODICIDAD = '1,2,3,4,5';
    const DIAS = '1_Lunes,2_Martes,3_Miércoles,4_Jueves,5_Viernes,6_Sábado';
    const MESES = '1_Enero,2_Febrero,3_Marzo,4_Abril,5_Mayo,6_Junio,7_Julio,8_Agosto,9_Septiembre,10_Octubre,11_Noviembre,12_Diciembre';
    const CANTIDAD_TURNOS = '5';
    
    //URLs
    const URL_SITE = "http://localhost:8080/Bue54/web/app_dev.php";
    const URL_LOGIN = "/Main/Access/Login";
    const REDIRECT_LOGIN_CHECK = "/Main/Access/LoginCheck";
    const REDIRECT_NOT_FOUND = "/Main/Access/Login/NotFound";
    const REDIRECT_CONTROL_ACCESO = "/Main/Home/Init";
    
    //Save
    const URL_SAVE_USUARIO = "/ABM/Usuario/Save";
    const URL_SAVE_ALUMNO = "/ABM/Alumno/Save";
    const URL_SAVE_INSTRUCTOR = "/ABM/Instructor/Save";
    const URL_SAVE_DISCIPLINA = "/ABM/Disciplina/Save";
    const URL_SAVE_PROGRAMA = "/ABM/Programa/Save";
    
    //Menu
    const MENU_ACCESO = '/Acceso/Main';
    const MENU_INSCRIPCION = '/Inscripcion/Main';
    const MENU_INSTRUCTOR = '/ABM/Instructor/Main';
    const MENU_USUARIO = '/ABM/Usuario/Main';
    const MENU_ALUMNO = '/ABM/Alumno/Main';
    const MENU_DISCIPLINA = '/ABM/Disciplina/Main';
    const MENU_PROGRAMA = '/ABM/Programa/Main';
    const MENU_REPORT_ASISTENCIA = '/Report/Asistencia';
    const MENU_REPORT_VIGENTES = '/Report/Vigentes';
    const MENU_REPORT_NO_VIGENTES = '/Report/NoVigentes';
    const MENU_REPORT_PAGOS = '/Report/Pagos';
    const MENU_REPORT_ACCESOS = '/Report/Accesos';
    
    //JS CONST (Ajax)
    //Acceso
    const URL_GRID_ACCESO_ALUMNO = "/Acceso/Grid";
    const URL_SAVE_REGISTRO_ACCESO = "/Acceso/Save";
    const URL_CLASE_AVISO_ACCESO = "/Acceso/ClaseAviso";
    //Inscripcion
    const URL_GRID_INSCRIPCION_PLAN_ALUMNO = "/Inscripcion/Grid";
    const URL_DATA_PROGRAMA_INSCRIPCION = "/Inscripcion/ProgramaDataGet";
    const URL_SAVE_INSCRIPCION = "/Inscripcion/Save";
    //ABM
    const URL_ABM_USUARIO = "/ABM/Usuario/Grid";
    const URL_ABM_ALUMNO = "/ABM/Alumno/Grid";
    const URL_ABM_INSTRUCTOR = "/ABM/Instructor/Grid";
    const URL_ABM_DISCIPLINA = "/ABM/Disciplina/Grid";
    const URL_ABM_PROGRAMA = "/ABM/Programa/Grid";
    const URL_ABM_HORARIO = "/ABM/Horario/Grid";
    const URL_SAVE_HORARIO = "/ABM/Horario/Save";
    const URL_DELETE_HORARIO = "/ABM/Horario/Delete";
    //Report
    const URL_GRID_REPORT_ASISTENCIA = "/Report/AsistenciaGrid";
    const URL_GRID_REPORT_VIGENTES = "/Report/VigentesGrid";
    const URL_GRID_REPORT_NO_VIGENTES = "/Report/NoVigentesGrid";
    const URL_GRID_REPORT_PAGOS = "/Report/PagosGrid";
    const URL_GRID_REPORT_ACCESOS = "/Report/AccesosGrid";
    const URL_GRID_REPORT_ACCESOS_CMB_INSTRUCTOR_DISCIPLINA = "/Report/AccesosCmbInstructorDisciplina";
    const URL_GRID_REPORT_ACCESOS_CMB_HORARIOS = "/Report/AccesosCmbHorario";
    
}


?>

<?php
//
//namespace AppBundle\Controller\ABM;
//
//use Symfony\Bundle\FrameworkBundle\Controller\Controller;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
//use AppBundle\Constants\HeroGymConstants;
//use AppBundle\Functions\PHPFunctions;
//use AppBundle\Controller\BL\ABM\AlumnoBL;
//use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
////use Symfony\Component\HttpFoundation\Session\Session;
//
//class Alumno extends Controller
//{
//    protected $em;
//    protected $bl;
//    protected $fx;
//    
//    public function __construct()
//    {
//
//    }
//
//    /**
//     * @Route("/ABM/Alumno/{method}/{alumnoId}")
//     */
//    public function mainConstructor(Request $request, $method, $alumnoId = null)
//    {
//        $this->em = $this->getDoctrine()->getManager();
//        $this->bl = new AlumnoBL($this->em);
//        $this->fx = new PHPFunctions;
//
//        //Verificamos sesion
//        if ($this->get('session')->get('userId') == null)
//        {
//            return $this->render('error.html.twig', array('error' => 'La sesión ha finalizado.',
//                                                          'btnHref' => HeroGymConstants::URL_SITE.HeroGymConstants::URL_LOGIN,
//                                                          'btnText' => 'Volver al Login'));
//        }
//        
//        //Verificamos que usuario tenga permisos
//        if ($this->get('session')->get('userPerfil') == null) //Puede acceder cualquier perfil
//        {
//            return $this->render('error.html.twig', array('error' => 'Permisos insuficientes de usuario.',
//                                                          'btnHref' => 'javascript:history.back()',
//                                                          'btnText' => 'Volver'));
//        }
//        
//        return $this->$method($request, $alumnoId);
//    }
//    
//    public function testMethod()
//    {
//        return new Response(var_dump("TEST ABM Alumno"));
//    }
//    
//    public function Main($request)
//    {
//        $urlAlumno = HeroGymConstants::URL_SITE.HeroGymConstants::URL_ABM_ALUMNO;
//        return $this->render('ABM/alumno.html.twig', array('urlAlumno' => $urlAlumno));
//    }
//
//    public function Grid($request)
//    {
//        $dataArray = $request->request->get('value');
//        $radioValue = $dataArray["radioValue"];
//        
//        $alumnos = $this->bl->getAlumnos($radioValue);
//        
//        return $this->render('ABM/alumno_grid.ajax.html.twig', array('alumnos' => $alumnos));
//    }
//    
//    public function Add($request)
//    {
//        $arrayData = array('titulo' => 'Agregar',
//                           'nombre' => '',
//                           'rut' => '',
//                           'edad' => '',
//                           'telefono' => '',
//                           'email' => '',
//                           'objetivo' => '',
//                           'contactoEmergencia' => '',
//                           'condicionesMedicas' => '',
//                           'centroMedicoPreferencia' => '',
//                           'fechaIngreso' => '',
//                           'registroHuella' => '',
//                           'foto' => '',
//                           'chkFirma' => '',
//                           'chkActivo' => 'checked',
//                           'FxCallback' => '',
//                           'alumnoId' => '');
//        return $this->renderPopUp($arrayData);
//    }
//
//    public function Edit($request, $hashedAlumnoId)
//    {
//        $alumnoId = $this->bl->getAlumnoIdFromHashed($hashedAlumnoId);
//        $alumno = $this->bl->getAlumno($alumnoId);
//
//        list($firma, $chkFirma) = $this->fx->checkActivo($alumno->getFirma());
//        list($activo, $chkActivo) = $this->fx->checkActivo($alumno->getActivo());
//        
//        $arrayData = array('titulo' => 'Editar',
//                           'nombre' => $alumno->getNombre(),
//                           'rut' => $this->fx->formatoRut($alumno->getRut()),
//                           'edad' => $alumno->getEdad(),
//                           'telefono' => $alumno->getTelefono(),
//                           'email' => $alumno->getEmail(),
//                           'objetivo' => $alumno->getObjetivo(),
//                           'contactoEmergencia' => $alumno->getContactoEmergencia(),
//                           'condicionesMedicas' => $alumno->getCondicionesMedicas(),
//                           'centroMedicoPreferencia' => $alumno->getCentroMedicoPreferencia(),
//                           'fechaIngreso' => $alumno->getFechaIngreso()->format('Y-m-d'),
//                           'registroHuella' => $alumno->getRegistroHuella(),
//                           'foto' => $alumno->getFoto(),
//                           'chkFirma' => $chkFirma,
//                           'chkActivo' => $chkActivo,
//                           'FxCallback' => '',
//                           'alumnoId' => $alumnoId);
//        return $this->renderPopUp($arrayData);
//    }
//    
//    public function Save($request)
//    {
//        //return new response(var_dump($request));
//        $fotoAlumno = '';
//
//        $alumnoId = $request->request->get('txtAlumnoId');
//        $nombre = $request->request->get('txtNombre');
//        $rut = $request->request->get('txtRut');
//        $edad = $request->request->get('txtEdad');
//        $telefono = $request->request->get('txtTelefono');
//        $email = $request->request->get('txtEmail');
//        $objetivo = $request->request->get('txtObjetivo');
//        $contactoEmergencia = $request->request->get('txtContactoEmergencia');
//        $condicionesMedicas = $request->request->get('txtCondicionesMedicas');
//        $centroMedicoPreferencia = $request->request->get('txtCentroMedicoPreferencia');
//        $fechaIngreso = new \DateTime($this->fx->dateHTML5ToSQL($request->request->get('txtFechaIngreso')));
//        $registroHuella = $request->request->get('txtRegistroHuella');
//        //return new response(var_dump($fechaIngreso));
//
//        list($firma, $chkFirma) = $this->fx->checkActivo($request->request->get('chkFirma'));
//        list($activo, $chkActivo) = $this->fx->checkActivo($request->request->get('chkActivo'));
//        
//        //Grabamos
//        if (!$alumnoId) //Insert
//        {
//            $strTitulo = 'Agregar';
//            $response = $this->bl->insert($nombre, $rut, $edad, $telefono, $email, $objetivo, $contactoEmergencia, $condicionesMedicas, $centroMedicoPreferencia, $fechaIngreso, $firma, $registroHuella, $activo);
//            $alumnoId = $response;
//        }
//        else //Update
//        {
//            $strTitulo = 'Editar';
//            $response = $this->bl->update($alumnoId, $nombre, $rut, $edad, $telefono, $email, $objetivo, $contactoEmergencia, $condicionesMedicas, $centroMedicoPreferencia, $fechaIngreso, $firma, $registroHuella, $activo);
//        }
//        
//        if ($response)
//        {
//            //Upload File
//            $rootDir = $this->get('kernel')->getRootDir();
//            $fileObject = $request->files->get('txtFoto');
//            if ($fileObject)
//            {
//                $fotoAlumno = $this->bl->uploadFotoAlumno($alumnoId, $fileObject, $rootDir);
//            }
//        
//            $FxCallback = 'customAlert("sSuccess", "El alumno fue grabado satisfactoriamente.", 1);';
//            $FxCallback .= "window.opener.FxSetRadio('rdView', '".HeroGymConstants::URL_SITE.HeroGymConstants::URL_ABM_ALUMNO."');";
//        }
//        else
//            $FxCallback = 'customAlert("sError", "Ocurrió un error al intentar grabar el alumno.", 0);';
//
//        $arrayData = array('titulo' => 'Agregar',
//                           'nombre' => $nombre,
//                           'rut' => $rut,
//                           'edad' => $edad,
//                           'telefono' => $telefono,
//                           'email' => $email,
//                           'objetivo' => $objetivo,
//                           'contactoEmergencia' => $contactoEmergencia,
//                           'condicionesMedicas' => $condicionesMedicas,
//                           'centroMedicoPreferencia' => $centroMedicoPreferencia,
//                           'fechaIngreso' => $fechaIngreso->format('Y-m-d'),
//                           'registroHuella' => $registroHuella,
//                           'foto' => $fotoAlumno,
//                           'chkFirma' => $chkFirma,
//                           'chkActivo' => $chkActivo,
//                           'FxCallback' => $FxCallback,
//                           'alumnoId' => $alumnoId);
//        
//        return $this->renderPopUp($arrayData);
//    }
//    
//    private function renderPopUp($arrayData)
//    {
//        //return new response(var_dump($arrayData));
//        $urlAlumnoSave = HeroGymConstants::URL_SITE.HeroGymConstants::URL_SAVE_ALUMNO;
//        return $this->render('ABM/alumno_add_edit.html.twig', array('urlAlumnoSave' => $urlAlumnoSave,
//                                                                    'titulo' => $arrayData['titulo'],
//                                                                    'strNombre' => $arrayData['nombre'],
//                                                                    'strRut' => $arrayData['rut'],
//                                                                    'strEdad' => $arrayData['edad'],
//                                                                    'strTelefono' => $arrayData['telefono'],
//                                                                    'strEmail' => $arrayData['email'],
//                                                                    'strObjetivo' => $arrayData['objetivo'],
//                                                                    'strContactoEmergencia' => $arrayData['contactoEmergencia'],
//                                                                    'strCondicionesMedicas' => $arrayData['condicionesMedicas'],
//                                                                    'strCentroMedicoPreferencia' => $arrayData['centroMedicoPreferencia'],
//                                                                    'strFechaIngreso' => $arrayData['fechaIngreso'],
//                                                                    'strRegistroHuella' => $arrayData['registroHuella'],
//                                                                    'strFotoAlumno' => $arrayData['foto'],
//                                                                    'chkFirma' => $arrayData['chkFirma'],
//                                                                    'chkActivo' => $arrayData['chkActivo'],
//                                                                    'FxCallback' => $arrayData['FxCallback'],
//                                                                    'alumnoId' => $arrayData['alumnoId']));
//        
//    }
//}

<?php //
//
////src/AppBundle/Controller/Main/Home.php
//namespace AppBundle\Controller\Main;
//
//use Symfony\Bundle\FrameworkBundle\Controller\Controller;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
//use AppBundle\Controller\BL\Main\HomeBL;
//use AppBundle\Controller\BL\Inscripcion\InscripcionBL;
//use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
//use AppBundle\Constants\HeroGymConstants;
////use Symfony\Component\HttpFoundation\Session\Session;
//
//class Home extends Controller
//{
//    protected $em;
//    protected $bl;
//    
//    public function __construct()
//    {
//
//    }
//
//    /**
//     * @Route("/Main/Home/{method}")
//     */
//    public function mainConstructor(Request $request, $method)
//    {
//        $this->em = $this->getDoctrine()->getManager();
//        $this->bl = new HomeBL($this->em);
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
//        return $this->$method($request);
//    }
//    
//    public function Init($request)
//    {
//        $inscripcionBL = new InscripcionBL($this->em);
//        $inscripcionBL->setVigenciaAlumnos();
//        return $this->render('Main/home.html.twig', array());
//    }
//    
//}

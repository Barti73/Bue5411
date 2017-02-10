<?php

//namespace AppBundle\Controller;
//
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
//use Symfony\Bundle\FrameworkBundle\Controller\Controller;
//use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
//use AppBundle\Constants\Bue54Constants;
//
//class DefaultController extends Controller
//{
//    /**
//     * @Route("/", name="homepage")
//     */
//    public function indexAction(Request $request)
//    {
//        return new Response(var_dump($this->container));
////        $em = $this->getDoctrine()->getManager();
////
////        //Verificamos sesion
////        if ($this->get('session')->get('userId') == null)
////        {
////            return $this->render('error.html.twig', array('error' => 'La sesión ha finalizado.',
////                                                          'btnHref' => HeroGymConstants::URL_SITE.HeroGymConstants::URL_LOGIN,
////                                                          'btnText' => 'Volver al Login'));
////        }
////        
////        //Verificamos que usuario tenga permisos
////        if ($this->get('session')->get('userPerfil') == null) //Puede acceder cualquier perfil
////        {
////            return $this->render('error.html.twig', array('error' => 'Permisos insuficientes de usuario.',
////                                                          'btnHref' => 'javascript:history.back()',
////                                                          'btnText' => 'Volver'));
////        }
////        
////        return $this->render('Default/index.html.twig', array());
////        // replace this example code with whatever you need
////        return $this->render('default/index.html.twig', array(
////            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..'),
////        ));
//    }
//}

<?php

namespace AppBundle\Controller\BL\Common;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Noticia;
use AppBundle\Entity\NoticiaLog;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;

class NoticiaBL
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;

    const noticiaSalt = "noticiaSalt";
    protected $container;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }

    public function getNoticiaIdHashed($noticiaId)
    {
        return $this->fx->encodeHash($noticiaId, self::noticiaSalt, 10);
    }
            
    public function getNoticiaIdFromHashed($noticiaIdHashed)
    {
        return $this->fx->decodeHash($noticiaIdHashed, self::noticiaSalt, 10);
    }
    
    public function getNoticiaData($noticia)
    {
        $response = array('id' => '',
                          'hashedId' => '',
                          'fecha' => '',
                          'titulo' => '',
                          'texto' => '',
                          'textoShort' => '',
                          'posicion' => '',
                          'autor' => '',
                          'estado' => '',
                          'estadoTexto' => '');

        if ($noticia)
        {
            //Texto Short
            $textoShort = substr($noticia->getTexto(), 0, 300)."...";
            //Estado Texto
            $estadoTexto = ''; //Default
            if ($noticia->getEstado() == 1) { $estadoTexto = 'Publicado'; }
            if ($noticia->getEstado() == 2) { $estadoTexto = 'No Publicado'; }
            if ($noticia->getEstado() == 3) { $estadoTexto = 'Borrador'; }
            //Posicion
            $posicion = ($noticia->getPosicion()) ? $noticia->getPosicion() : '-';
            
            $response = array('id' => $noticia->getId(),
                              'hashedId' => $this->getNoticiaIdHashed($noticia->getId()),
                              'fecha' => $noticia->getFecha()->format('d/m/Y H:i'),
                              'titulo' => $noticia->getTitulo(),
                              'texto' => $noticia->getTexto(),
                              'textoShort' => $textoShort,
                              'posicion' => $posicion,
                              'autor' => $noticia->getIdUsuario()->getNombre(),
                              'estado' => $noticia->getEstado(),
                              'estadoTexto' => $estadoTexto);
            
        }
        return $response;
    }
    
    public function insertNoticia($arrayData)
    {
        //Entity
        $usuario = $this->em->getRepository('AppBundle:Usuario')->find($arrayData["usuarioId"]);
        //Fecha
        $newDate = new \DateTime(date("Y-m-d H:i:s"));
                
        //Insert Noticia
        $noticia = new Noticia();
        $noticia->setIdUsuario($usuario);
        $noticia->setTitulo($arrayData["titulo"]);
        $noticia->setTexto($arrayData["texto"]);
        $noticia->setPosicion($arrayData["posicion"]);
        $noticia->setFecha($newDate);
        $noticia->setImagen($arrayData["imagen"]);
        $noticia->setEstado($arrayData["estado"]);
        $this->em->persist($noticia);
        $this->em->flush();
        
        return $noticia->getId();
    }
    
    public function updateNoticia($arrayData)
    {
        //Entity
        $usuario = $this->em->getRepository('AppBundle:Usuario')->find($arrayData["usuarioId"]);
        //Fecha
        $newDate = new \DateTime(date("Y-m-d H:i:s"));

        //Update Noticia
        $noticia = $this->em->getRepository('AppBundle:Noticia')->find($arrayData["noticiaId"]);
        $noticia->setIdUsuario($usuario);
        $noticia->setTitulo($arrayData["titulo"]);
        $noticia->setTexto($arrayData["texto"]);
        $noticia->setPosicion($arrayData["posicion"]);
        $noticia->setFecha($newDate);
        $noticia->setImagen($arrayData["imagen"]);
        $noticia->setEstado($arrayData["estado"]);
        $this->em->persist($noticia);
        $this->em->flush();
        
        return $noticia->getId();
    }
    
    public function insertNoticiaLog($arrayData)
    {
        //Entity
        $noticia = $this->em->getRepository('AppBundle:Noticia')->find($arrayData["noticiaId"]);
        $usuario = $this->em->getRepository('AppBundle:Usuario')->find($arrayData["usuarioId"]);
        //Fecha
        $newDate = new \DateTime(date("Y-m-d H:i:s"));
                
        //Insert Noticia
        $noticiaLog = new NoticiaLog();
        $noticiaLog->setIdNoticia($noticia);
        $noticiaLog->setIdUsuario($usuario);
        $noticiaLog->setTitulo($arrayData["titulo"]);
        $noticiaLog->setTexto($arrayData["texto"]);
        $noticiaLog->setPosicion($arrayData["posicion"]);
        $noticiaLog->setFecha($newDate);
        $noticiaLog->setImagen($arrayData["imagen"]);
        $noticiaLog->setEstado($arrayData["estado"]);
        $noticiaLog->setOperacion($arrayData["operacion"]);
        $this->em->persist($noticiaLog);
        $this->em->flush();
        
        return $noticiaLog->getId();
    }
    
    
}
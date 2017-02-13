<?php

namespace AppBundle\Controller\BL\Common;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
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
}
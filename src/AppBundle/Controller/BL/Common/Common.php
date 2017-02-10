<?php

namespace AppBundle\Controller\BL\Common;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;

class Common
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
    }
    
    public function getValorMatricula()
    {
        return $this->em->getRepository('AppBundle:ParametrosConfiguracion')->findOneByNombre('MATRICULA_VALOR')->getValor();
    }
    
    public function getDescuentoMultiplan()
    {
        return $this->em->getRepository('AppBundle:ParametrosConfiguracion')->findOneByNombre('DESCUENTO_MULTIPLAN')->getValor();
    }

    public function getMinutosAcceso()
    {
        return $this->em->getRepository('AppBundle:ParametrosConfiguracion')->findOneByNombre('MINUTOS_PERMITE_ACCESO')->getValor();
    }
    
    public function getDiasVigencia()
    {
        return $this->em->getRepository('AppBundle:ParametrosConfiguracion')->findOneByNombre('DIAS_VIGENCIA')->getValor();
    }
    
}
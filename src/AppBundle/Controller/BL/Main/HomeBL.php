<?php

namespace AppBundle\Controller\BL\Main;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Controller\BL\Inscripcion\InscripcionBL;

class HomeBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
        
    }
    
    
}

<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Disciplina;
use AppBundle\Functions\PHPFunctions;


class DisciplinaBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_DISCIPLINA = 'SALT_DISCIPLINA';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }

    public function getDisciplinaIdHashed($disciplinaId)
    {
        return $this->fx->encodeHash($disciplinaId, self::SALT_DISCIPLINA);
    }
    
    public function getDisciplinaIdFromHashed($hashedDisciplinaId)
    {
        return $this->fx->decodeHash($hashedDisciplinaId, self::SALT_DISCIPLINA);
    }
    
    public function getDisciplina($disciplinaId)
    {
        return $this->em->getRepository('AppBundle:Disciplina')->find($disciplinaId);
    }
    
    public function getDisciplinas($radioValue)
    {
        $rep = $this->em->getRepository('AppBundle:Disciplina');
        $query = $rep->createQueryBuilder('dis')
            ->where('dis.activo = :radio or :radio = \'-1\'')
            ->orderBy('dis.nombre', 'ASC')
            ->setParameter('radio', $radioValue)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $disciplinas = array();
        foreach ($res as $disciplina)
        {
            ($disciplina->getActivo() == 1) ? $activo = 'visible' : $activo = 'hidden';
            $tmp = array('id' => $disciplina->getId(),
                         'nombre' => $disciplina->getNombre(),
                         'codigo' => $disciplina->getCodigo(),
                         'hashedId' => $this->getDisciplinaIdHashed($disciplina->getId()),
                         'activo' => $activo,
                         'extra' => 'block');
            $disciplinas[] = $tmp;
        }
        
        return $disciplinas;
    }
    
    public function insert($nombre, $codigo, $activo)
    {
        $disciplina = new Disciplina();
        $disciplina->setNombre($nombre);
        $disciplina->setCodigo($codigo);
        $disciplina->setActivo($activo);

        $this->em->persist($disciplina);
        $this->em->flush();
        return true;
    }
    
    public function update($disciplinaId, $nombre, $codigo, $activo)
    {
        $disciplina = $this->getDisciplina($disciplinaId);
        $disciplina->setNombre($nombre);
        $disciplina->setCodigo($codigo);
        $disciplina->setActivo($activo);
        $this->em->flush();
        return true;
    }
    
}

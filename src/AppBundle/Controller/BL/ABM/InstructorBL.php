<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Instructor;
use AppBundle\Entity\InstructorDisciplina;
use AppBundle\Functions\PHPFunctions;


class InstructorBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_INSTRUCTOR = 'SALT_INSTRUCTOR';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }
    
    public function getInstructorIdHashed($instructorId)
    {
        return $this->fx->encodeHash($instructorId, self::SALT_INSTRUCTOR);
    }
    
    public function getInstructorIdFromHashed($hashedInstructorId)
    {
        return $this->fx->decodeHash($hashedInstructorId, self::SALT_INSTRUCTOR);
    }
    
    public function getInstructor($instructorId)
    {
        return $this->em->getRepository('AppBundle:Instructor')->find($instructorId);
    }
    
    public function getInstructores($radioValue)
    {
        $rep = $this->em->getRepository('AppBundle:Instructor');
        $query = $rep->createQueryBuilder('inst')
            ->where('inst.activo = :radio or :radio = \'-1\'')
            ->orderBy('inst.nombre', 'ASC')
            ->setParameter('radio', $radioValue)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $instructores = array();
        foreach ($res as $instructor)
        {
            ($instructor->getActivo() == 1) ? $activo = 'visible' : $activo = 'hidden';
            $tmp = array('id' => $instructor->getId(),
                         'nombre' => $instructor->getNombre(),
                         'apellido' => $instructor->getApellido(),
                         'codigo' => $instructor->getCodigo(),
                         'hashedId' => $this->getInstructorIdHashed($instructor->getId()),
                         'activo' => $activo,
                         'extra' => 'block');
            $instructores[] = $tmp;
        }
        
        //$instructores = $this->fx->addBlankRows($instructores);
        return $instructores;
    }
    
    public function getAllDisciplinasByInstructor($instructorId)
    {
        $query = $this->em->createQueryBuilder()
            ->select('d.id, d.nombre, d.codigo, indi.id as indiId')
            ->from('AppBundle:Disciplina', 'd')
            ->leftJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'd.id = indi.idDisciplina and indi.idInstructor = :instructorId')
            ->where('d.activo = \'1\'')
            ->orderBy('d.nombre', 'ASC')
            ->setParameter('instructorId', $instructorId)
            ->getQuery();
        $res = $query->getResult();
        return $res;
    }
    
    public function insert($nombre, $apellido, $codigo, $activo)
    {
        $instructor = new Instructor();
        $instructor->setNombre($nombre);
        $instructor->setApellido($apellido);
        $instructor->setCodigo($codigo);
        $instructor->setActivo($activo);

        $this->em->persist($instructor);
        $this->em->flush();
        return $instructor;
    }
    
    public function update($instructorId, $nombre, $apellido, $codigo, $activo)
    {
        $instructor = $this->getInstructor($instructorId);
        $instructor->setNombre($nombre);
        $instructor->setApellido($apellido);
        $instructor->setCodigo($codigo);
        $instructor->setActivo($activo);
        $this->em->flush();
        return $instructor;
    }
    
    public function insertInstructorDisciplina($idInstructor, $idDisciplina)
    {
        $rep = $this->em->getRepository('AppBundle:InstructorDisciplina');
        $query = $rep->createQueryBuilder('indi')
            ->where('indi.idInstructor = :instructorId')
            ->andwhere('indi.idDisciplina = :disciplinaId')
            ->setParameter('instructorId', $idInstructor)
            ->setParameter('disciplinaId', $idDisciplina)
            ->getQuery();
        $instDis = $query->setMaxResults(1)->getOneOrNullResult();
        if (!$instDis)
        {
            $instructorDisciplina = new InstructorDisciplina;
            $instructorDisciplina->setIdInstructor($idInstructor);
            $instructorDisciplina->setIdDisciplina($idDisciplina);

            $this->em->persist($instructorDisciplina);
            $this->em->flush();
            $instructorDisciplinaId = $instructorDisciplina->getId();
        }
        else
        {
            $instructorDisciplinaId = $instDis->getId();
        }
        return $instructorDisciplinaId;
    }
    
    public function deleteInstructorDisciplina($instructorId)
    {
        $instructorDisciplinas = $this->em->getRepository('AppBundle:InstructorDisciplina')->findByIdInstructor($instructorId);
        foreach ($instructorDisciplinas as $instructorDisciplina)
        {
            $this->em->remove($instructorDisciplina);
            $this->em->flush();
        }
    }
    
    public function deleteInstructorDisciplinaByDisciplina($instructorId, $disciplinaId)
    {
        //verificamos si disciplina existe para ese instructor en algun programa
        $query = $this->em->createQueryBuilder()
            ->select('p.id')
            ->from('AppBundle:Programa', 'p')
            ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'p.idInstructorDisciplina = indi.id')
            ->where('indi.idInstructor = :instructorId')
            ->andwhere('indi.idDisciplina = :disciplinaId')
            ->setParameter('instructorId', $instructorId)
            ->setParameter('disciplinaId', $disciplinaId)
            ->getQuery();
        $res = $query->setMaxResults(1)->getOneOrNullResult();
        if (!$res)
        {
            //Delete
            $rep = $this->em->getRepository('AppBundle:InstructorDisciplina');
            $query = $rep->createQueryBuilder('indi')
                ->where('indi.idInstructor = :instructorId')
                ->andwhere('indi.idDisciplina = :disciplinaId')
                ->setParameter('instructorId', $instructorId)
                ->setParameter('disciplinaId', $disciplinaId)
                ->getQuery();
            $res = $query->getResult();
            foreach ($res as $indi)
            {
                //$instructorDisciplinas = $this->em->getRepository('AppBundle:InstructorDisciplina')->findByIdInstructor($instructorId);
                $this->em->remove($indi);
                $this->em->flush();
            }
        }
    }
    
}

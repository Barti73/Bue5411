<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Programa;
use AppBundle\Constants\HeroGymConstants;
use AppBundle\Functions\PHPFunctions;


class ProgramaBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_PROGRAMA = 'SALT_PROGRAMA';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }
    
    public function getProgramaIdHashed($programaId)
    {
        return $this->fx->encodeHash($programaId, self::SALT_PROGRAMA);
    }
    
    public function getProgramaIdFromHashed($hashedProgramaId)
    {
        return $this->fx->decodeHash($hashedProgramaId, self::SALT_PROGRAMA);
    }
    
    public function getPrograma($programaId)
    {
        return $this->em->getRepository('AppBundle:Programa')->find($programaId);
    }
    
    public function getProgramas($radioValue, $programaId = null)
    {
        $rep = $this->em->getRepository('AppBundle:Programa');
        $query = $rep->createQueryBuilder('p')
            ->where('p.activo = :radio or :radio = \'-1\'')
            ->orderBy('p.nombre', 'ASC')
            ->setParameter('radio', $radioValue)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $programas = array();
        foreach ($res as $programa)
        {
            ($programaId == $programa->getId()) ? $selected = 'selected' : $selected = '';
            ($programa->getActivo() == 1) ? $activo = 'visible' : $activo = 'hidden';
            $disciplina = $programa->getIdInstructorDisciplina()->getIdDisciplina()->getNombre();
            $instructorNombre = $programa->getIdInstructorDisciplina()->getIdInstructor()->getNombre();
            $instructorApellido = $programa->getIdInstructorDisciplina()->getIdInstructor()->getApellido();
            $tmp = array('id' => $programa->getId(),
                         'nombre' => $programa->getNombre(),
                         'codigo' => $programa->getCodigo(),
                         'codigoNombre' => $programa->getCodigo()." => ".$programa->getNombre(),
                         'disciplina' => $disciplina,
                         'instructor' => $instructorNombre." ".$instructorApellido,
                         'periodicidad' => $programa->getPeriodicidad(),
                         'duracion' => $programa->getDuracionMeses(),
                         'sesiones' => $programa->getCantidadSesiones(),
                         'valor' => $programa->getValor(),
                         'hashedId' => $this->getProgramaIdHashed($programa->getId()),
                         'activo' => $activo,
                         'selected' => $selected,
                         'extra' => 'block');
            $programas[] = $tmp;
        }
        
        return $programas;
    }
    
    public function getDisciplinasInstructores($instructorDisciplinaId)
    {
        $res = $this->em->getRepository('AppBundle:InstructorDisciplina')->findAll();
        $disciplinasInstructores = array();
        foreach ($res as $disciplinaInstructor)
        {
            $disciplinaCodigo = $disciplinaInstructor->getIdDisciplina()->getCodigo();
            $disciplinaNombre = $disciplinaInstructor->getIdDisciplina()->getNombre();
            $disciplinaActivo = $disciplinaInstructor->getIdDisciplina()->getActivo();
            $instructorCodigo = $disciplinaInstructor->getIdInstructor()->getCodigo();
            $instructorNombre = $disciplinaInstructor->getIdInstructor()->getNombre();
            $instructorApellido = $disciplinaInstructor->getIdInstructor()->getApellido();
            $instructorActivo = $disciplinaInstructor->getIdInstructor()->getActivo();
            
            //Si el instructor o la disciplina no estan activos...next...
            if (!$disciplinaActivo || !$instructorActivo) { continue; }
            
            ($instructorDisciplinaId == $disciplinaInstructor->getId()) ? $selected = 'selected' : $selected = '';
            $tmp = array('id' => $disciplinaInstructor->getId(),
                         'nombre' => $disciplinaCodigo." => ".$instructorCodigo,
                         'selected' => $selected);
            
            $disciplinasInstructores[] = $tmp;
        }
        return $disciplinasInstructores;
    }
    
    public function getPeriodicidades($periodicidadId)
    {
        $arrayPeriodicidad = explode(',', HeroGymConstants::PERIODICIDAD);
        $periodicidades = array();
        foreach ($arrayPeriodicidad as $periodicidad)
        {
            ($periodicidadId == $periodicidad) ? $selected = 'selected' : $selected = '';
            $tmp = array('id' => $periodicidad,
                         'nombre' => $periodicidad,
                         'selected' => $selected);
            $periodicidades[] = $tmp;
        }
        return $periodicidades;
    }
            
    public function insert($nombre, $codigo, $disciplinaInstructor, $periodicidad, $duracion, $valor, $cantidadSesiones, $activo)
    {
        $instructorDisciplina = $this->em->getRepository('AppBundle:InstructorDisciplina')->find($disciplinaInstructor);
        $programa = new Programa();
        $programa->setIdInstructorDisciplina($instructorDisciplina);
        $programa->setNombre($nombre);
        $programa->setCodigo($codigo);
        $programa->setPeriodicidad($periodicidad);
        $programa->setDuracionMeses($duracion);
        $programa->setValor($valor);
        $programa->setCantidadSesiones($cantidadSesiones);
        $programa->setActivo($activo);

        $this->em->persist($programa);
        $this->em->flush();
        return true;
    }
    
    public function update($programaId, $nombre, $codigo, $disciplinaInstructor, $periodicidad, $duracion, $valor, $cantidadSesiones, $activo)
    {
        $instructorDisciplina = $this->em->getRepository('AppBundle:InstructorDisciplina')->find($disciplinaInstructor);
        $programa = $this->getPrograma($programaId);
        $programa->setIdInstructorDisciplina($instructorDisciplina);
        $programa->setNombre($nombre);
        $programa->setCodigo($codigo);
        $programa->setPeriodicidad($periodicidad);
        $programa->setDuracionMeses($duracion);
        $programa->setValor($valor);
        $programa->setCantidadSesiones($cantidadSesiones);
        $programa->setActivo($activo);
        $this->em->flush();
        return true;
    }
    
}

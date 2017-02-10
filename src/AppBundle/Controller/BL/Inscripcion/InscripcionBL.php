<?php

namespace AppBundle\Controller\BL\Inscripcion;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Inscripcion;
use AppBundle\Entity\InscripcionPrograma;
use AppBundle\Controller\BL\Common\Common;
use AppBundle\Functions\PHPFunctions;


class InscripcionBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_INSCRIPCION = 'SALT_INSCRIPCION';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }

    public function getInscripcionIdHashed($inscripcionId)
    {
        return $this->fx->encodeHash($inscripcionId, self::SALT_INSCRIPCION);
    }
    
    public function getInscripcionIdFromHashed($hashedInscripcionId)
    {
        return $this->fx->decodeHash($hashedInscripcionId, self::SALT_INSCRIPCION);
    }
    
    public function getInscripcionById($inscripcionId)
    {
        $inscripcion = $this->em->getRepository('AppBundle:Inscripcion')->find($inscripcionId);
        return $this->getInscripcionPreparedData($inscripcion);
    }
    
    public function getInscripcionPreparedData($inscripcion)
    {
        if (!$inscripcion) { return false; }
        ($inscripcion->getVigencia()) ? $vigencia = '' : $vigencia = 'hidden';
        $dataInscripcion = array('inscripcionId' => $inscripcion->getId(),
                                 'matricula' => $inscripcion->getMatricula(),
                                 'fechaMatricula' => $inscripcion->getFechaMatricula()->format('d/m/Y'),
                                 'vigencia' => $vigencia,
                                 'cantidadProgramas' => $this->getCantidadProgramasByInscripcion($inscripcion->getId()),
                                 'inscripcionIdHashed' => $this->getInscripcionIdHashed($inscripcion->getId()),
                                 'extra' => ''
                                 );
        return $dataInscripcion;
    }
    
    public function getProgramaData($programa, $dataArray)
    {
        //Parametros
        $beca = $dataArray["beca"];
        $fechaInicio = $dataArray["fechaInicio"];
        
        $newDate = date_create($fechaInicio);
        date_add($newDate, date_interval_create_from_date_string($programa->getDuracionMeses()." months"));
        $fechaVigencia = date_format($newDate, "Y-m-d");
                
        $valorBeca = 0; //Default
        if ($dataArray["beca"])
        {
            $valorBeca = round($programa->getValor() * $beca / 100);
        }
        $programaData = array('programaId' => $programa->getId(),
                              'programaNombre' => $programa->getNombre(),
                              'programaCodigo' => $programa->getCodigo(),
                              'programaValor' => $programa->getValor(),
                              'programaBeca' => $valorBeca,
                              'programaDuracion' => $programa->getDuracionMeses(),
                              'programaSesiones' => $programa->getCantidadSesiones(),
                              'programaFechaInicio' => $this->fx->dateHTML5ToText($fechaInicio),
                              'programaFechaVigencia' => $this->fx->dateHTML5ToText($fechaVigencia),
                              'instructorNombre' => $programa->getIdInstructorDisciplina()->getIdInstructor()->getNombre(),
                              'instructorApellido' => $programa->getIdInstructorDisciplina()->getIdInstructor()->getApellido(),
                              'instructorCodigo' => $programa->getIdInstructorDisciplina()->getIdInstructor()->getCodigo(),
                              'disciplinaNombre' => $programa->getIdInstructorDisciplina()->getIdDisciplina()->getNombre(),
                              'disciplinaCodigo' => $programa->getIdInstructorDisciplina()->getIdDisciplina()->getCodigo());
        return json_encode($programaData);
    }
    
    public function getProgramasActualesAlumno($alumnoId)
    {
        $arrayProgramas = array();
        //$inscripcionAlumno = $this->em->getRepository('AppBundle:Inscripcion')->findOneByIdAlumno($alumnoId);
        
        $inscripcionesPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                ->where('ip.vigencia = 1')
                ->andWhere('i.idAlumno = :alumnoId')
                ->setParameter('alumnoId', $alumnoId)
                ->getQuery()
                ->getResult();
        //return $inscripcionesPrograma;
        if (!$inscripcionesPrograma) { return $arrayProgramas; }

        foreach ($inscripcionesPrograma as $inscProg)
        {
            $programa = $inscProg->getIdPrograma();
            $disciplina = $programa->getIdInstructorDisciplina()->getIdDisciplina();
            $instructor = $programa->getIdInstructorDisciplina()->getIdInstructor();
            $valorBeca = ($inscProg->getBeca()) ?  $inscProg->getBeca() : $valorBeca = 0;
            //($inscProg->getBeca()) ? $valorBeca = $inscProg->getBeca() : $valorBeca = 0;
            $tmp = array(
                            'inscripcionProgramaId' => $inscProg->getId(),
                            'programaId' => $programa->getId(),
                            'programaNombre' => $programa->getNombre(),
                            'programaCodigo' => $programa->getCodigo(),
                            'programaValor' => $programa->getValor(),
                            'programaBeca' => $valorBeca,
                            'programaDuracion' => $programa->getDuracionMeses(),
                            'programaSesiones' => $programa->getCantidadSesiones(),
                            'programaFechaInicio' => $inscProg->getFechaInicio()->format('d/m/Y'),
                            'programaFechaVigencia' => $inscProg->getFechaVigencia()->format('d/m/Y'),
                            'instructorId' => $instructor->getId(),
                            'instructorNombre' => $instructor->getNombre(),
                            'instructorApellido' => $instructor->getApellido(),
                            'instructorCodigo' => $instructor->getCodigo(),
                            'disciplinaId' => $disciplina->getId(),
                            'disciplinaNombre' => $disciplina->getNombre(),
                            'disciplinaCodigo' => $disciplina->getCodigo()
            );
            $arrayProgramas[] = $tmp;
        }
        return $arrayProgramas;
    }
    
    public function getProgramasAlumnoByInscripcion($inscripcionId)
    {
        $arrayProgramas = array();
        $inscripcion = $this->em->getRepository('AppBundle:Inscripcion')->find($inscripcionId);
        if (!$inscripcion) { return $arrayProgramas; }
        
        $inscripcionPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByIdInscripcion($inscripcion->getId());
        foreach ($inscripcionPrograma as $inscProg)
        {
            $programa = $inscProg->getIdPrograma();
            $disciplina = $programa->getIdInstructorDisciplina()->getIdDisciplina();
            $instructor = $programa->getIdInstructorDisciplina()->getIdInstructor();
            $valorBeca = ($inscProg->getBeca()) ?  $inscProg->getBeca() : $valorBeca = 0;
            //($inscProg->getBeca()) ? $valorBeca = $inscProg->getBeca() : $valorBeca = 0;
            $tmp = array(
                            'inscripcionProgramaId' => $inscProg->getId(),
                            'programaId' => $programa->getId(),
                            'programaNombre' => $programa->getNombre(),
                            'programaCodigo' => $programa->getCodigo(),
                            'programaValor' => $programa->getValor(),
                            'programaBeca' => $valorBeca,
                            'programaDuracion' => $programa->getDuracionMeses(),
                            'programaSesiones' => $programa->getCantidadSesiones(),
                            'programaFechaInicio' => $inscProg->getFechaInicio()->format('d/m/Y'),
                            'programaFechaVigencia' => $inscProg->getFechaVigencia()->format('d/m/Y'),
                            'instructorId' => $instructor->getId(),
                            'instructorNombre' => $instructor->getNombre(),
                            'instructorApellido' => $instructor->getApellido(),
                            'instructorCodigo' => $instructor->getCodigo(),
                            'disciplinaId' => $disciplina->getId(),
                            'disciplinaNombre' => $disciplina->getNombre(),
                            'disciplinaCodigo' => $disciplina->getCodigo()
            );
            $arrayProgramas[] = $tmp;
        }
        return $arrayProgramas;
    }
    
    public function getPlanesActualesAlumno($alumnoId)
    {
        $arrayPlanes = array();
        $inscripcionesAlumno = $this->em->getRepository('AppBundle:Inscripcion')->findByIdAlumno($alumnoId);
        if (!$inscripcionesAlumno) { return $arrayPlanes; }
        
        foreach ($inscripcionesAlumno as $inscripcionAlumno)
        {
            $arrayPlanes[] = $this->getInscripcionPreparedData($inscripcionAlumno);
        }
        return $arrayPlanes;
    }
    
    public function inscripcionSave($alumnoId, $inscripcionId, $dataArray)
    {
        //Alumno Id
        $alumno = $this->em->getRepository('AppBundle:Alumno')->find($alumnoId);
        //Inscripcion Id (viene solo en la edicion)
        if ($inscripcionId)
        {
            $inscripcion = $this->em->getRepository('AppBundle:Inscripcion')->find($inscripcionId);
        }
        
        $matricula = $dataArray["matricula"];
        $fechaMatricula = new \DateTime($this->fx->dateToHTML5($dataArray["fechaMatricula"]));
        $vigencia = '1';
        //Arrays Pograma
        $arrayProgramas = $dataArray["arrayProgramas"];
        $arrayProgramaId = $arrayProgramas[0]; //Ids Programas
        $arrayFechaInicio = $arrayProgramas[1]; //Fechas Inicio Programas
        $arrayBeca = $arrayProgramas[2]; //Becas Programas
        $arrayValor = $arrayProgramas[3]; // Valores Programas
        $arrayFechaVigencia = $arrayProgramas[4]; //Fechas Vigencia Programas
        
        if ($inscripcionId) //Update
        {
            $inscripcion->setMatricula($matricula);
            $inscripcion->setFechaMatricula($fechaMatricula);
            $this->em->persist($inscripcion);
            $this->em->flush();
            
//            //Delete Actual
//            $inscripciones = $this->em->getRepository('AppBundle:Inscripcion')->findByIdAlumno($alumnoId);
//            foreach ($inscripciones as $inscripcion)
//            {
//                //Eliminamos Inscripcion Programa siempre que no tenga sesiones utilizadas...si ya utilizo alguna...no se puede eliminar
//                $inscripcionesPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByIdInscripcion($inscripcion->getId());
//                foreach ($inscripcionesPrograma as $inscripcionPrograma)
//                {
//                    if (!$inscripcionPrograma->getSesionesUtilizadas()) //No tiene sesion utilizada...se puede borrar
//                    {
//                        $this->em->remove($inscripcionPrograma);
//                    }
//                }
//            }
            //Delete Actual
            //Eliminamos Inscripcion Programa siempre que no tenga sesiones utilizadas...si ya utilizo alguna...no se puede eliminar
            $inscripcionesPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByIdInscripcion($inscripcionId);
            foreach ($inscripcionesPrograma as $inscripcionPrograma)
            {
                if (!$inscripcionPrograma->getSesionesUtilizadas()) //No tiene sesion utilizada...se puede borrar
                {
                    $this->em->remove($inscripcionPrograma);
                }
            }
            $this->em->flush();
        }
        else //Insert
        {
            //Inscripcion
            $inscripcion = new Inscripcion();
            $inscripcion->setIdAlumno($alumno);
            $inscripcion->setMatricula($matricula);
            $inscripcion->setFechaMatricula($fechaMatricula);
            $inscripcion->setVigencia($vigencia);
            $this->em->persist($inscripcion);
            $this->em->flush();
        }
            

        //Inscripcion Programa
        $cantidadProgramas = count($arrayProgramaId); //Cantidad Programas
        for ($i = 0; $i < $cantidadProgramas; $i++)
        {
            $programaId = $arrayProgramaId[$i];
            $programa = $this->em->getRepository('AppBundle:Programa')->find($programaId);
            $fechaInicio = new \DateTime($this->fx->dateToHTML5($arrayFechaInicio[$i]));
            $beca = $arrayBeca[$i];
            $valor = $arrayValor[$i];
            $sesionesUtilizadas = '0';
            $claseAviso = '0';
            $fechaVigencia = new \DateTime($this->fx->dateToHTML5($arrayFechaVigencia[$i]));

            //Verificamos si programa existe para la inscripcion...
            //Si existe...update...else...insert...
            $query = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                ->where('ip.idInscripcion = :inscripcionId')
                ->andwhere('ip.idPrograma = :programaId')
                ->setParameter('inscripcionId', $inscripcionId)
                ->setParameter('programaId', $programaId)
                ->getQuery();
            $inscripcionPrograma = $query->setMaxResults(1)->getOneOrNullResult();
            if (!$inscripcionPrograma) //no existe programa...insert
            {
                $inscripcionPrograma = new InscripcionPrograma();
                $inscripcionPrograma->setIdInscripcion($inscripcion);
                $inscripcionPrograma->setIdPrograma($programa);
                $inscripcionPrograma->setSesionesUtilizadas($sesionesUtilizadas);
                $inscripcionPrograma->setClaseAviso($claseAviso);
            }
            
            $inscripcionPrograma->setFechaInicio($fechaInicio);
            $inscripcionPrograma->setBeca($beca);
            $inscripcionPrograma->setValor($valor);
            $inscripcionPrograma->setVigencia($vigencia);
            $inscripcionPrograma->setFechaVigencia($fechaVigencia);
            $this->em->persist($inscripcionPrograma);
            $this->em->flush();
        } 
        
        return $inscripcion->getId();
    }

    public function getCantidadProgramasByInscripcion($inscripcionId)
    {
        $planes = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByIdInscripcion($inscripcionId);
        $cantPlanes = ($planes) ? count($planes) : 0;
        return $cantPlanes;
    }
    
    public function getVigenciaAlumno($alumnoId)
    {
        $response = false; //Default
        //Obtenemos vigencia alumno...
        //Si alumno tiene algun plan vigente...fiesta
        //Si no esta vigente por planes...se le administra delta de dias segun parametro
        $query = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                ->where('i.idAlumno = :alumnoId')
                ->orderBy('ip.fechaVigencia', 'desc')
                ->setParameter('alumnoId', $alumnoId)
                ->getQuery();
        $inscripcionPrograma = $query->setMaxResults(1)->getOneOrNullResult();
        if ($inscripcionPrograma)
        {
            //Verificamos si esta vigente
            $vigente = $inscripcionPrograma->getVigencia();
            if ($vigente) //Esta vigente...todo bien
            {
                $response = true;
            }
            else //No esta vigente...verificamos si esta dentro del plazo
            {
                //Parametro Dias Vigencia
                $common = new Common($this->em);
                $diasVigencia = $common->getDiasVigencia();
                //Fecha Actual 
                $fechaActual = new \DateTime(date("Y-m-d"));
                //Fecha vigencia plan + dias vigencia
                $fechaVigenciaHasta = $inscripcionPrograma->getFechaVigencia()->format('Y-m-d');
                $dateVigenciaHasta = date_create($fechaVigenciaHasta);
                date_add($dateVigenciaHasta, date_interval_create_from_date_string($diasVigencia." days"));
                //Verificamos
                $vigenciaHastaInt = $dateVigenciaHasta->format('Ymd');
                $fechaActualInt = $fechaActual->format('Ymd');;
                if ($vigenciaHastaInt >= $fechaActualInt) //Todo ok
                {
                    $response = true;
                }
                else //Fuera de plazo
                {
                    $response = false;
                }
            }
        }
        else
        {
            $response = false; //No esta vigente
        }
        return $response;
    }
    
    public function setVigenciaAlumnos()
    {
        $fechaActual = date("Ymd");
        $inscripcionesPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByVigencia('1');
        foreach ($inscripcionesPrograma as $inscripcionPrograma)
        {
            //Verificamos si la inscripcion del programa esta vencida
            $fechaVigencia = $inscripcionPrograma->getFechaVigencia()->format("Ymd");
            //Si la fecha actual es superior a la de la inscripcion...esta vencida
            if ((int)$fechaVigencia < (int)$fechaActual)
            {
                $inscripcionPrograma->setVigencia(0);
            }
        }
        $this->em->flush();
        
        //Recorremos todas las inscripciones que figuren vigentes...y verificamos si sus planes estan vigentes tambien
        $inscripciones = $this->em->getRepository('AppBundle:Inscripcion')->findByVigencia('1');
        foreach ($inscripciones as $inscripcion)
        {
            //Verificamos si tiene al menos una inscripcionPrograma vigente en la inscripcion...si no...se deja no vigente
            $tieneVigente = false;
            $inscripcionesPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->findByIdInscripcion($inscripcion->getId());
            foreach ($inscripcionesPrograma as $inscripcionPrograma)
            {
                if ($inscripcionPrograma->getVigencia() == 1)
                {
                    $tieneVigente = true;
                }
            }
            if ($tieneVigente == false)
            {
                $inscripcion->setVigencia(0);
                $this->em->flush();
            }
        }
        return "OK";
    }
    
}

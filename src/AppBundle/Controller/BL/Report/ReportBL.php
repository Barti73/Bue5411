<?php

namespace AppBundle\Controller\BL\Report;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Constants\HeroGymConstants;
use AppBundle\Controller\BL\Common\Common;
use AppBundle\Functions\PHPFunctions;


class ReportBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_REPORT = 'SALT_REPORT';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }

    public function getMeses()
    {
        $monthActual = (int)date("m");
        $meses = explode(',', HeroGymConstants::MESES);
        foreach ($meses as $mes)
        {
            $arrayMes = explode('_', $mes);
            $selected = ($arrayMes[0] == $monthActual) ? 'selected' : '';
            
            $arrayMeses[] = array('id' => $arrayMes[0],
                                  'nombre' => $arrayMes[1],
                                  'selected' => $selected);
        }
        return $arrayMeses;
    }            
    
    public function getYears()
    {
        $yearActual = date("Y");
        $years = array($yearActual-1, $yearActual, $yearActual+1);
        
        foreach ($years as $year)
        {
            $selected = ($yearActual == $year) ? 'selected' : '';
            
            $arrayYears[] = array('id' => $year,
                                  'nombre' => $year,
                                  'selected' => $selected);
        }
        return $arrayYears;
    }            
    
    public function getInstructoresDisciplinas()
    {
        $arrayInstructoresDisciplinas = array();
        $instructoresDisciplinas = $this->em->getRepository('AppBundle:InstructorDisciplina')->createQueryBuilder('indi')
                        ->innerJoin('AppBundle:Instructor', 'i', 'WITH', 'indi.idInstructor = i.id')
                        ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'indi.idDisciplina = d.id')
                        ->where('i.activo = 1')
                        ->andWhere('d.activo = 1')
                        ->getQuery()
                        ->getResult();
        foreach ($instructoresDisciplinas as $instructorDisciplina)
        {
            $instructor = $instructorDisciplina->getIdInstructor();
            $instructorNombre = $instructor->getNombre()." ".$instructor->getApellido();
            $disciplina = $instructorDisciplina->getIdDisciplina();
            $disciplinaNombre = $disciplina->getNombre();
            $arrayInstructoresDisciplinas[] = array('id' => $instructorDisciplina->getId(),
                                                    'nombre' => $instructorNombre." / ".$disciplinaNombre,
                                                    'selected' => '');
        }
        return $arrayInstructoresDisciplinas;
            
    }
    
    public function getGridReportAsistencia($month, $year, $instructorDisciplinaId)
    {
        $inicio = new \DateTime($year.'-'.$month.'-01 00:00');
        $termino = new \DateTime($year.'-'.$month.'-31 23:59');
        $arrayAlumnos = array();
        
        $totalDays = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $alumnos = $this->em->getRepository('AppBundle:Alumno')->createQueryBuilder('a')
                    ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'a.id = i.idAlumno')
                    ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'i.id = ip.idInscripcion')
                    ->innerJoin('AppBundle:RegistroAcceso', 'ra', 'WITH', 'ip.id = ra.idInscripcionPrograma')
                    ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                    ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'p.idInstructorDisciplina = indi.id')
                    ->where('ra.fecha between :inicio and :termino')
                    ->andWhere('indi.id = :instructorDisciplinaId')
                    ->setParameter('inicio', $inicio)
                    ->setParameter('termino', $termino)
                    ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                    ->getQuery()
                    ->getResult();
        if ($alumnos)
        {
            //Preparamos Query de Asistencia por alumno y dia
            $query = $this->em->getRepository('AppBundle:RegistroAcceso')->createQueryBuilder('ra')
                        ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'ra.idInscripcionPrograma = ip.id')
                        ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                        ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                        ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'p.idInstructorDisciplina = indi.id')
                        ->where('ra.fecha between :inicio and :termino')
                        ->andWhere('indi.id = :instructorDisciplinaId')
                        ->andWhere('i.idAlumno = :alumnoId')
                        ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                        ->getQuery();
            
            //Por cada alumno...
            foreach ($alumnos as $alumno)
            {
                //Por cada dia
                $arrayDias = array();
                for ($i = 1; $i <= $totalDays; $i++)
                {
                    $inicio = new \DateTime($year.'-'.$month.'-'.$i.' 00:00');
                    $termino = new \DateTime($year.'-'.$month.'-'.$i.' 23:59');
                    $query->setParameter('inicio', $inicio);
                    $query->setParameter('termino', $termino);
                    $query->setParameter('alumnoId', $alumno->getId());
                    $result = $query->getResult();
                    if ($result) { $arrayDias[$i] = $result; }
                } 
                $arrayAlumnos[] = array('alumno' => $alumno->getNombre(),
                                        'dias' => $arrayDias);
            }
        }
        //Totales Diarios
        $arrayTotalesDiarios = array();
        for ($i = 1; $i <= $totalDays; $i++)
        {
            $totalDia = 0;
            foreach ($arrayAlumnos as $asistencia)
            {
                foreach ($asistencia["dias"] as $key => $value)
                {
                    if ($i == $key)
                    {
                        $totalDia++;
                    }
                }
            }
            $arrayTotalesDiarios[$i] = ($totalDia) ? $totalDia : '';
        }
        return array($arrayAlumnos, $arrayTotalesDiarios, $totalDays);
    }
    
    public function getGridReportVigentesNoVigentes($instructorDisciplinaId, $vigencia)
    {
        $arrayVigentes = array();
        $montoTotal = 0;
        
        $alumnos = $this->em->getRepository('AppBundle:Alumno')->createQueryBuilder('a')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'a.id = i.idAlumno')
                            ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'i.id = ip.idInscripcion')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                            ->where('ip.vigencia = :vigencia')
                            ->andWhere('p.idInstructorDisciplina = :instructorDisciplinaId')
                            ->orderBy('p.nombre')
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->setParameter('vigencia', $vigencia)
                            ->getQuery()
                            ->getResult();
        foreach ($alumnos as $alumno)
        {
            $plan = $this->getPlanesVigentesNoVigentesAlumno($alumno->getId(), $instructorDisciplinaId, $vigencia);
            $montoPagado = $this->getMontosPagadosPlanesVigentesNoVigentesAlumno($alumno->getId(), $instructorDisciplinaId, $vigencia);
            $montoTotal += $montoPagado;
            $arrayVigentes[] = array('nombre' => $alumno->getNombre(),
                                     'plan' => $plan,
                                     'montoPagado' => $montoPagado);
        }
        return array($arrayVigentes, $montoTotal);
    }
    
    private function getPlanesVigentesNoVigentesAlumno($alumnoId, $instructorDisciplinaId, $vigencia)
    {
        $planes = $this->em->getRepository('AppBundle:Programa')->createQueryBuilder('p')
                            ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'p.id = ip.idPrograma')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                            ->where('ip.vigencia = :vigencia')
                            ->andWhere('p.idInstructorDisciplina = :instructorDisciplinaId')
                            ->andWhere('i.idAlumno = :alumnoId')
                            ->orderBy('p.nombre')
                            ->setParameter('vigencia', $vigencia)
                            ->setParameter('alumnoId', $alumnoId)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->getQuery()
                            ->getResult();
        $planesAlumno = '';
        foreach ($planes as $plan)
        {
            $planesAlumno .= $plan->getCodigo().', ';
        }
        return substr($planesAlumno, 0, strlen($planesAlumno)-2);
    }

    private function getMontosPagadosPlanesVigentesNoVigentesAlumno($alumnoId, $instructorDisciplinaId, $vigencia)
    {
        $planes = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                            ->where('ip.vigencia = :vigencia')
                            ->andWhere('p.idInstructorDisciplina = :instructorDisciplinaId')
                            ->andWhere('i.idAlumno = :alumnoId')
                            ->orderBy('p.nombre')
                            ->setParameter('vigencia', $vigencia)
                            ->setParameter('alumnoId', $alumnoId)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->getQuery()
                            ->getResult();
        $montoAlumno = 0;
        foreach ($planes as $plan)
        {
            $montoAlumno += $plan->getValor() - $plan->getBeca();
            $matricula = $plan->getIdInscripcion()->getMatricula();
        }
        //$montoAlumno += $matricula; Deberiamos agregar la matricula ??
        return $montoAlumno;
    }

    public function getGridReportPagos($fechaInicio, $fechaTermino, $instructorDisciplinaId)
    {
        $arrayPagos = array();
        $montoTotal = 0;
        
        $alumnos = $this->em->getRepository('AppBundle:Alumno')->createQueryBuilder('a')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'a.id = i.idAlumno')
                            ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'i.id = ip.idInscripcion')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                            ->where('p.idInstructorDisciplina = :instructorDisciplinaId or :instructorDisciplinaId = \'\'')
                            ->andWhere('i.fechaMatricula between :fechaInicio and :fechaTermino')
                            ->orderBy('p.nombre')
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->setParameter('fechaInicio', $fechaInicio)
                            ->setParameter('fechaTermino', $fechaTermino)
                            ->getQuery()
                            ->getResult();
        foreach ($alumnos as $alumno)
        {
            $plan = $this->getPlanesReportPagos($alumno->getId(), $fechaInicio, $fechaTermino, $instructorDisciplinaId);
            $montoPagado = $this->getMontosPagadosReportPagos($alumno->getId(), $fechaInicio, $fechaTermino, $instructorDisciplinaId);
            $montoTotal += $montoPagado;
            $arrayPagos[] = array('nombre' => $alumno->getNombre(),
                                  'plan' => $plan,
                                  'montoPagado' => $montoPagado);
        }
        return array($arrayPagos, $montoTotal);
    }

    private function getPlanesReportPagos($alumnoId, $fechaInicio, $fechaTermino, $instructorDisciplinaId)
    {
        $planes = $this->em->getRepository('AppBundle:Programa')->createQueryBuilder('p')
                            ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'p.id = ip.idPrograma')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                            ->where('p.idInstructorDisciplina = :instructorDisciplinaId or :instructorDisciplinaId = \'\'')
                            ->andWhere('i.idAlumno = :alumnoId')
                            ->andWhere('i.fechaMatricula between :fechaInicio and :fechaTermino')
                            ->orderBy('p.nombre')
                            ->setParameter('alumnoId', $alumnoId)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->setParameter('fechaInicio', $fechaInicio)
                            ->setParameter('fechaTermino', $fechaTermino)
                            ->getQuery()
                            ->getResult();
        $planesAlumno = '';
        foreach ($planes as $plan)
        {
            $planesAlumno .= $plan->getCodigo().', ';
        }
        return substr($planesAlumno, 0, strlen($planesAlumno)-2);
    }

    private function getMontosPagadosReportPagos($alumnoId, $fechaInicio, $fechaTermino, $instructorDisciplinaId)
    {
        $planes = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                            ->where('p.idInstructorDisciplina = :instructorDisciplinaId or :instructorDisciplinaId = \'\'')
                            ->andWhere('i.idAlumno = :alumnoId')
                            ->andWhere('i.fechaMatricula between :fechaInicio and :fechaTermino')
                            ->orderBy('p.nombre')
                            ->setParameter('alumnoId', $alumnoId)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->setParameter('fechaInicio', $fechaInicio)
                            ->setParameter('fechaTermino', $fechaTermino)
                            ->getQuery()
                            ->getResult();
        $montoAlumno = 0;
        foreach ($planes as $plan)
        {
            $montoAlumno += $plan->getValor() - $plan->getBeca();
            $matricula = $plan->getIdInscripcion()->getMatricula();
        }
        $montoAlumno += $matricula; //Deberiamos agregar la matricula ??
        return $montoAlumno;
    }
    
    function getCmbInstructorDisciplinaReportAccesos($fecha)
    {
        $arrayInstructoresDisciplinas = array();
        
        //Calculamos dia de la semana de la fecha input...
        $dayWeek = date('N', strtotime($fecha));

        $instructoresDisciplinas = $this->em->getRepository('AppBundle:InstructorDisciplina')->createQueryBuilder('indi')
                            ->innerJoin('AppBundle:Instructor', 'i', 'WITH', 'indi.idInstructor = i.id')
                            ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'indi.idDisciplina = d.id')
                            ->innerJoin('AppBundle:DisciplinaHorario', 'dh', 'WITH', 'd.id = dh.idDisciplina')
                            ->innerJoin('AppBundle:Horario', 'h', 'WITH', 'dh.idHorario = h.id')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'indi.id = p.idInstructorDisciplina')
                            ->where('h.dia = :dayweek')
                            ->andWhere('d.activo = 1')
                            ->andWhere('i.activo = 1')
                            ->andWhere('p.activo = 1')
                            ->setParameter('dayweek', $dayWeek)
                            ->getQuery()
                            ->getResult();
        
        foreach ($instructoresDisciplinas as $instructorDisciplina)
        {
            $instructor = $instructorDisciplina->getIdInstructor();
            $instructorNombre = $instructor->getNombre()." ".$instructor->getApellido();
            $disciplina = $instructorDisciplina->getIdDisciplina();
            $disciplinaNombre = $disciplina->getNombre();
            $arrayInstructoresDisciplinas[] = array('id' => $instructorDisciplina->getId(),
                                                    'nombre' => $instructorNombre." / ".$disciplinaNombre);
            
        }
        return $arrayInstructoresDisciplinas;
        
    }
    
    function getCmbHorariosReportAccesos($fecha, $instructorDisciplinaId)
    {
        $arrayHorarios = array();
        
        if (!$instructorDisciplinaId) { return $arrayHorarios; }
        
        //Calculamos dia de la semana de la fecha input...
        $dayWeek = date('N', strtotime($fecha));

        $horarios = $this->em->getRepository('AppBundle:Horario')->createQueryBuilder('h')
                            ->innerJoin('AppBundle:DisciplinaHorario', 'dh', 'WITH', 'h.id = dh.idHorario')
                            ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'dh.idDisciplina = d.id')
                            ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'd.id = indi.idDisciplina')
                            ->innerJoin('AppBundle:Instructor', 'i', 'WITH', 'indi.idInstructor = i.id')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'indi.id = p.idInstructorDisciplina')
                            ->where('h.dia = :dayweek')
                            ->andWhere('indi.id = :instructorDisciplinaId')
                            ->andWhere('d.activo = 1')
                            ->andWhere('i.activo = 1')
                            ->andWhere('p.activo = 1')
                            ->orderBy('h.turno')
                            ->setParameter('dayweek', $dayWeek)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->getQuery()
                            ->getResult();
        foreach ($horarios as $horario)
        {
            $nombreHorario = $horario->getHorarioInicio()->format('H:i').' - '.$horario->getHorarioTermino()->format('H:i').' (Turno: '.$horario->getTurno().')';
            $arrayHorarios[] = array('id' => $horario->getId(),
                                     'nombre' => $nombreHorario);
        }
        return $arrayHorarios;
        
    }

    public function getGridReportAccesos($fecha, $instructorDisciplinaId, $horarioId)
    {
        $arrayAccesos = array();

        //Calculamos dia de la semana de la fecha input...
        $dayWeek = date('N', strtotime($fecha));
        //Inicio y termino de fecha de acceso
        $inicio = new \DateTime($fecha.' 00:00');
        $termino = new \DateTime($fecha.' 23:59');
        
        //$accesos = $this->em->getRepository('AppBundle:Horario')->createQueryBuilder('h')
        $accesos = $this->em->createQueryBuilder()
                            ->select('indi.id as instructorDisciplinaId')
                            ->addSelect('inst.nombre as nombreInstructor, inst.apellido as apellidoInstructor, inst.codigo as codigoInstructor')
                            ->addSelect('d.nombre as nombreDisciplina, d.codigo as codigoDisciplina')
                            ->addSelect('h.horarioInicio, h.horarioTermino, h.turno')
                            ->addSelect('a.nombre as nombreAlumno')
                            ->addSelect('ra.fecha as fechaRegistro')
                            ->from('AppBundle:RegistroAcceso', 'ra')
                            ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'ra.idInscripcionPrograma = ip.id')
                            ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                            ->innerJoin('AppBundle:Alumno', 'a', 'WITH', 'i.idAlumno = a.id')
                            ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                            ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'p.idInstructorDisciplina = indi.id')
                            ->innerJoin('AppBundle:Instructor', 'inst', 'WITH', 'indi.idInstructor = inst.id')
                            ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'indi.idDisciplina = d.id')
                            ->innerJoin('AppBundle:DisciplinaHorario', 'dh', 'WITH', 'd.id = dh.idDisciplina')
                            ->innerJoin('AppBundle:Horario', 'h', 'WITH', 'dh.idHorario = h.id')
                            ->where('h.dia = :dayweek')
                            ->andWhere('ra.fecha between :inicio and :termino')
                            ->andWhere('indi.id = :instructorDisciplinaId or :instructorDisciplinaId = \'\'')
                            ->andWhere('h.id = :horarioId or :horarioId = \'\'')
                            ->andWhere('d.activo = 1')
                            ->andWhere('inst.activo = 1')
                            ->andWhere('p.activo = 1')
                            ->andWhere('a.activo = 1')
                            ->orderBy('inst.nombre, inst.apellido')
                            ->addOrderBy('d.nombre')
                            ->addOrderBy('h.turno, h.horarioInicio, h.horarioTermino')
                            ->addOrderBy('a.nombre')
                            ->setParameter('dayweek', $dayWeek)
                            ->setParameter('inicio', $inicio)
                            ->setParameter('termino', $termino)
                            ->setParameter('instructorDisciplinaId', $instructorDisciplinaId)
                            ->setParameter('horarioId', $horarioId)
                            ->getQuery()
                            ->getResult();

        foreach ($accesos as $acceso)
        {
            $nombreInstructor = $acceso['nombreInstructor'].' '.$acceso['apellidoInstructor'];
            $arrayAccesos[] = array('instructorDisciplinaId' => $acceso['instructorDisciplinaId'],
                                    'instructor' => $nombreInstructor,
                                    'nombreInstructor' => $acceso['nombreInstructor'],
                                    'apellidoInstructor' => $acceso['apellidoInstructor'],
                                    'codigoInstructor' => $acceso['codigoInstructor'],
                                    'nombreDisciplina' => $acceso['nombreDisciplina'],
                                    'codigoDisciplina' => $acceso['codigoDisciplina'],
                                    'horarioInicio' => $acceso['horarioInicio']->format('H:i'),
                                    'horarioTermino' => $acceso['horarioTermino']->format('H:i'),
                                    'turno' => $acceso['turno'],
                                    'nombreAlumno' => $acceso['nombreAlumno'],
                                    'horaRegistro' => $acceso['fechaRegistro']->format('H:i'),
                                    );
        }
        return $arrayAccesos;
    }

    
}

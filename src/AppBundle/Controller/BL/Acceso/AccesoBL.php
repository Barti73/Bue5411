<?php

namespace AppBundle\Controller\BL\Acceso;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\RegistroAcceso;
use AppBundle\Controller\BL\Inscripcion\InscripcionBL;
use AppBundle\Controller\BL\ABM\HorarioBL;
use AppBundle\Controller\BL\ABM\DisciplinaBL;
use AppBundle\Controller\BL\ABM\InstructorBL;
use AppBundle\Controller\BL\Common\Common;
use AppBundle\Functions\PHPFunctions;

class AccesoBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_ACCESO = 'SALT_ACCESO';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }

    public function getAccesoIdHashed($registroAccesoId)
    {
        return $this->fx->encodeHash($registroAccesoId, self::SALT_ACCESO);
    }
    
    public function getAccesoIdFromHashed($hashedRegistroAccesoId)
    {
        return $this->fx->decodeHash($hashedRegistroAccesoId, self::SALT_ACCESO);
    }
    
    public function getDisciplinasAccesoByAlumno($alumnoId)
    {
        $common = new Common($this->em);
        $minutosAcceso = $common->getMinutosAcceso();

        //BL's
        $horarioBL = new HorarioBL($this->em);
        $disciplinaBL = new DisciplinaBL($this->em);
        $instructorBL = new InstructorBL($this->em);
        $inscripcionBl = new InscripcionBL($this->em);
        $programasAlumno = $inscripcionBl->getProgramasActualesAlumno($alumnoId);
        //return $programasAlumno;
        
        //Recorremos disciplinas alumno...y vemos si algunas tiene habilitado acceso (mismo dia...ParamMinutosAcceso' antes/despues de hora actual)
        $diaActual = date("N"); //1: Lunes...6: Sabado
        $horaActual = date("H:i");
        $desde = date_create($horaActual);
        $hasta = date_create($horaActual);
        //Desde...hora actual menos $minutosAcceso
        date_sub($desde, date_interval_create_from_date_string($minutosAcceso." minutes"));
        $horaDesde = date_format($desde, "H:i");
        //Hasta...hora actual mas $minutosAcceso
        date_add($hasta, date_interval_create_from_date_string($minutosAcceso." minutes"));
        $horaHasta = date_format($hasta, "H:i");
        //return $horaDesde;
        $arrayDisciplinas = array();
        foreach ($programasAlumno as $programaAlumno)
        {
            //Chequeamos si disciplina esta dentro de dia y horario
            $query = $this->em->createQueryBuilder()
                    ->select('h.id as horarioId, h.dia, h.horarioInicio, h.horarioTermino, h.turno')
                    ->addSelect('d.id as disciplinaId, d.nombre as disciplinaNombre, d.codigo as disciplinaCodigo')
                    ->addSelect('i.id as instructorId, CONCAT(i.nombre, \' \', i.apellido) as instructorNombre, i.codigo as instructorCodigo')
                    ->addSelect('ip.id as inscripcionProgramaId')
                    ->from('AppBundle:Horario', 'h')
                    ->innerJoin('AppBundle:DisciplinaHorario', 'dh', 'WITH', 'h.id = dh.idHorario')
                    ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'dh.idDisciplina = d.id')
                    ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'd.id = indi.idDisciplina')
                    ->innerJoin('AppBundle:Instructor', 'i', 'WITH', 'indi.idInstructor = i.id')
                    ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'indi.id = p.idInstructorDisciplina')
                    ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'p.id = ip.idPrograma')
                    ->where('ip.id = :inscripcionProgramaId')
                    ->andWhere('dh.idDisciplina = :disciplinaId')
                    ->andWhere('h.dia = :diaActual')
                    ->andWhere('h.horarioInicio between :horaDesde and :horaHasta')
                    ->andWhere('ip.vigencia = 1')
                    ->setParameter('inscripcionProgramaId', $programaAlumno["inscripcionProgramaId"])
                    ->setParameter('disciplinaId', $programaAlumno["disciplinaId"])
                    ->setParameter('diaActual', $diaActual)
                    ->setParameter('horaDesde', $horaDesde)
                    ->setParameter('horaHasta', $horaHasta)
                    ->getQuery();
            $horarios = $query->getResult();
            //return $horarios;

            //Recorremos disciplinas/horarios
            foreach ($horarios as $horario)
            {
                if ($this->checkAccesoRegistradoDisciplina($alumnoId,
                                                           $horario["disciplinaId"],
                                                           $horario["horarioInicio"]->format('H:i'),
                                                           $horario["horarioTermino"]->format('H:i')))
                {
                    continue;
                }
                $arrayDisciplinas[] = array('horarioId' => $horario["horarioId"],
                                            'inscripcionProgramaId' => $horario["inscripcionProgramaId"],
                                            'instructorId' => $horario["instructorId"],
                                            'disciplinaId' => $horario["disciplinaId"],
                                            'horarioIdHashed' => $horarioBL->getHorarioIdHashed($horario["horarioId"]),
                                            'inscripcionProgramaIdHashed' => $inscripcionBl->getInscripcionIdHashed($horario["inscripcionProgramaId"]),
                                            'instructorIdHashed' => $instructorBL->getInstructorIdHashed($horario["instructorId"]),
                                            'disciplinaIdHashed' => $disciplinaBL->getDisciplinaIdHashed($horario["disciplinaId"]),
                                            'horaDesde' => $horario["horarioInicio"]->format('H:i'),
                                            'horaHasta' => $horario["horarioTermino"]->format('H:i'),
                                            'dia' => $this->fx->numToDia($horario["dia"]),
                                            'turno' => $horario["turno"],
                                            'instructorNombre' => $horario["instructorNombre"],
                                            'instructorCodigo' => $horario["instructorCodigo"],
                                            'disciplinaNombre' => $horario["disciplinaNombre"],
                                            'disciplinaCodigo' => $horario["disciplinaCodigo"]);
            }
        }
        return $arrayDisciplinas;
    }
    
    public function getVigenciaAlumno($alumnoId)
    {
        $query = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                ->where('ip.vigencia = 1')
                ->andWhere('i.idAlumno = :alumnoId')
                ->setParameter('alumnoId', $alumnoId)
                ->getQuery();
        $res = $query->setMaxResults(1)->getOneOrNullResult();
        return ($res) ? true : false;
    }
    
    private function checkAccesoRegistradoDisciplina($alumnoId, $disciplinaId, $horaDesde, $horaHasta)
    {
        $fechaActual = date("Y-m-d");
        $rep = $this->em->getRepository('AppBundle:RegistroAcceso');
        $query = $rep->createQueryBuilder('ra')
                ->innerJoin('AppBundle:InscripcionPrograma', 'ip', 'WITH', 'ra.idInscripcionPrograma = ip.id')
                ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                ->innerJoin('AppBundle:Programa', 'p', 'WITH', 'ip.idPrograma = p.id')
                ->innerJoin('AppBundle:InstructorDisciplina', 'indi', 'WITH', 'p.idInstructorDisciplina = indi.id')
                ->innerJoin('AppBundle:Disciplina', 'd', 'WITH', 'indi.idDisciplina = d.id')
                ->innerJoin('AppBundle:DisciplinaHorario', 'dh', 'WITH', 'd.id = dh.idDisciplina')
                ->innerJoin('AppBundle:Horario', 'h', 'WITH', 'dh.idHorario = h.id')
                ->where('d.id = :disciplinaId')
                ->andWhere('h.horarioInicio = :horaDesde')
                ->andWhere('h.horarioTermino = :horaHasta')
                ->andWhere('ra.horaInicio = :horaDesde')
                ->andWhere('ra.horaTermino = :horaHasta')
                ->andWhere('i.idAlumno = :alumnoId')
                ->setParameter('disciplinaId', $disciplinaId)
                ->setParameter('horaDesde', $horaDesde)
                ->setParameter('horaHasta', $horaHasta)
                ->setParameter('alumnoId', $alumnoId)
                ->getQuery();
        $res = $query->getResult();
        //return $res;
        $existe = '0';
        foreach ($res as $registro)
        {
            $fechaRegistro = $registro->getFecha()->format("Y-m-d");
            if ($fechaRegistro == $fechaActual)
            {
                $existe = '1';
                break;
            }
        }
        return ($existe) ? true : false;
    }
    
    public function checkClaseAviso($alumnoId)
    {
        //Devuelve true si se le puede otorgar clase de aviso
        //Devuelve false si no se le puede otorgar clase de aviso
        $query = $this->em->getRepository('AppBundle:InscripcionPrograma')->createQueryBuilder('ip')
                ->innerJoin('AppBundle:Inscripcion', 'i', 'WITH', 'ip.idInscripcion = i.id')
                ->where('ip.vigencia = 0')
                ->andWhere('ip.claseAviso = 0')
                ->andWhere('i.idAlumno = :alumnoId')
                ->setParameter('alumnoId', $alumnoId)
                ->getQuery();
        $res = $query->setMaxResults(1)->getOneOrNullResult();
        return ($res) ? true : false;
    }
    
    public function saveRegistro($inscripcionProgramaIdHashed, $horarioIdHashed, $claseAviso)
    {
        //BL's
        $inscripcionBL = new InscripcionBL($this->em);
        $horarioBL = new HorarioBL($this->em);
        
        $inscripcionProgramaId = $inscripcionBL->getInscripcionIdFromHashed($inscripcionProgramaIdHashed);
        $horarioId = $horarioBL->getHorarioIdFromHashed($horarioIdHashed);
        
        //Data Save
        $fecha = new \DateTime(date("Y-m-d H:i:s"));
        $horario = $this->em->getRepository('AppBundle:Horario')->find($horarioId);
        $inscripcionPrograma = $this->em->getRepository('AppBundle:InscripcionPrograma')->find($inscripcionProgramaId);
        
        //Nuevo Registro Acceso
        $registroAcceso = new RegistroAcceso();
        $registroAcceso->setIdInscripcionPrograma($inscripcionPrograma);
        $registroAcceso->setFecha($fecha);
        $registroAcceso->setHoraInicio($horario->getHorarioInicio());
        $registroAcceso->setHoraTermino($horario->getHorarioTermino());
        $this->em->persist($registroAcceso);
        
        //Actualizamos Sesiones Utilizadas
        $sesionesUtilizadas = $inscripcionPrograma->getSesionesUtilizadas() + 1;
        $inscripcionPrograma->setSesionesUtilizadas($sesionesUtilizadas);
        
        //Si es una clase de aviso...se actualiza
        if ($claseAviso)
        {
            $inscripcionPrograma->setClaseAviso($claseAviso);
        }
        $this->em->flush();
        
        return $registroAcceso->getId();
    }
}

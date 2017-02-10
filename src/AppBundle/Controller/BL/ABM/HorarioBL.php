<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Horario;
use AppBundle\Entity\DisciplinaHorario;
use AppBundle\Constants\HeroGymConstants;
use AppBundle\Functions\PHPFunctions;


class HorarioBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_HORARIO = 'SALT_HORARIO';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }

    public function getHorarioIdHashed($horarioId)
    {
        return $this->fx->encodeHash($horarioId, self::SALT_HORARIO);
    }
    
    public function getHorarioIdFromHashed($hashedHorarioId)
    {
        return $this->fx->decodeHash($hashedHorarioId, self::SALT_HORARIO);
    }
    
    public function getDisciplinaHorarios($disciplinaId)
    {
        $arrayHorarios = $this->getHorarioByDisciplina($disciplinaId);
        
        $fullHorario = $this->fullHorario($arrayHorarios);

        return $fullHorario;
    }
    
    public function saveHorario($disciplinaId, $dia, $horarioInicio, $horarioTermino, $turno)
    {
        //Delete Horario
        $this->delete($disciplinaId, $dia, $turno);
        //insert Horario
        $this->insert($disciplinaId, $dia, $horarioInicio, $horarioTermino, $turno);
    }
    
    public function insert($disciplinaId, $dia, $horarioInicio, $horarioTermino, $turno)
    {
        //Insert Horario
        $inicio = new \DateTime($horarioInicio);
        $termino = new \DateTime($horarioTermino);
        
        $horario = new Horario();
        $horario->setDia($dia);
        $horario->setHorarioInicio($inicio);
        $horario->setHorarioTermino($termino);
        $horario->setTurno($turno);
        $this->em->persist($horario);
        $this->em->flush();

        //Insert Disciplina Horario
        $disciplina = new DisciplinaBL($this->em);
        $disciplinaHorario = new DisciplinaHorario();
        $disciplinaHorario->setIdHorario($horario);
        $disciplinaHorario->setIdDisciplina($disciplina->getDisciplina($disciplinaId));
        $this->em->persist($disciplinaHorario);
        $this->em->flush();
    }
    
    public function delete($disciplinaId, $dia, $turno)
    {
        //Eliminamos el horario (si existe)
        $query = $this->em->getRepository('AppBundle:DisciplinaHorario')->createQueryBuilder('ph')
                ->innerjoin('AppBundle:Horario', 'h', 'WITH', 'ph.idHorario = h.id')
                ->where('ph.idDisciplina = :disciplinaId')
                ->andwhere('h.dia = :dia')
                ->andwhere('h.turno = :turno')
                ->setParameter('disciplinaId', $disciplinaId)
                ->setParameter('dia', $dia)
                ->setParameter('turno', $turno)
                ->getQuery();
        $disciplinaHorario = $query->setMaxResults(1)->getOneOrNullResult();
        if ($disciplinaHorario)
        {
            $this->em->remove($disciplinaHorario);
            $this->em->flush();
        }
    }
    
    public function deleteByDisciplinaHorario($disciplinaHorarioId)
    {
        $disciplinaHorario = $this->em->getRepository('AppBundle:DisciplinaHorario')->find($disciplinaHorarioId);
        if ($disciplinaHorario)
        {
            $this->em->remove($disciplinaHorario);
            $this->em->flush();
        }
    }
    
    public function getDias()
    {
        //1_Lunes,2_Martes,3_Miércoles,4_Jueves,5_Viernes,6_Sábado
        $dias = explode(',', HeroGymConstants::DIAS);
        foreach ($dias as $dia)
        {
            $arrayDia = explode('_', $dia);
            
            $arrayDias[] = array('id' => $arrayDia[0],
                                 'nombre' => $arrayDia[1],
                                 'selected' => '');
        }
        return $arrayDias;
    }
    
    public function getTurnos()
    {
        $turnos = HeroGymConstants::CANTIDAD_TURNOS;
        for($i=1; $i<=$turnos; $i++)
        {
            $arrayTurnos[] = array('id' => $i,
                                   'nombre' => $i,
                                   'selected' => '');
            
        }
        return $arrayTurnos;
    }
    
    private function getHorarioByDisciplina($disciplinaId)
    {
        $disciplinaHorarios = $this->em->getRepository('AppBundle:DisciplinaHorario')->findByIdDisciplina($disciplinaId);
        $arrayHorarios = array();
        foreach ($disciplinaHorarios as $disciplinaHorario)
        {
            $horario = $disciplinaHorario->getIdHorario();
            //Armamos un array con el horario de la disciplina
            $tmp = array('disciplinaHorarioId' => $disciplinaHorario->getId(),
                         'horarioId' => $horario->getId(),
                         'dia' => $horario->getDia(),
                         'desde' => $horario->getHorarioInicio()->format('H:i'),
                         'hasta' => $horario->getHorarioTermino()->format('H:i'),
                         'turno' => $horario->getTurno());
            $arrayHorarios[] = $tmp;
        }
        return $arrayHorarios;
    }
    
    private function fullHorario($arrayHorarios)
    {
        $arrayDias = $this->getDias();

        $turnos = HeroGymConstants::CANTIDAD_TURNOS;
        $fullHorario = array();
        //Recorremos los dias y consultamos por cada turno
        foreach ($arrayDias as $arrayDia)
        {
            $diaId = $arrayDia['id'];
            $diaNombre = $arrayDia['nombre'];
            //Obtenemos cada uno de los 5 turnos
            list($id1, $desde1, $hasta1) = $this->getHorarioByDiaTurno($arrayHorarios, $diaId, 1);
            list($id2, $desde2, $hasta2) = $this->getHorarioByDiaTurno($arrayHorarios, $diaId, 2);
            list($id3, $desde3, $hasta3) = $this->getHorarioByDiaTurno($arrayHorarios, $diaId, 3);
            list($id4, $desde4, $hasta4) = $this->getHorarioByDiaTurno($arrayHorarios, $diaId, 4);
            list($id5, $desde5, $hasta5) = $this->getHorarioByDiaTurno($arrayHorarios, $diaId, 5);
            $tmp = array('diaId' => $diaId,
                         'dia' => $diaNombre,
                         'turno1Id' => '1',
                         'turno2Id' => '2',
                         'turno3Id' => '3',
                         'turno4Id' => '4',
                         'turno5Id' => '5',
                         'disciplinaHorario1Id' => $id1,
                         'disciplinaHorario2Id' => $id2,
                         'disciplinaHorario3Id' => $id3,
                         'disciplinaHorario4Id' => $id4,
                         'disciplinaHorario5Id' => $id5,
                         'desdeHorario1' => $desde1,
                         'desdeHorario2' => $desde2,
                         'desdeHorario3' => $desde3,
                         'desdeHorario4' => $desde4,
                         'desdeHorario5' => $desde5,
                         'hastaHorario1' => $hasta1,
                         'hastaHorario2' => $hasta2,
                         'hastaHorario3' => $hasta3,
                         'hastaHorario4' => $hasta4,
                         'hastaHorario5' => $hasta5);
            $fullHorario[] = $tmp;
        }
        return $fullHorario;
    }
    
    private function getHorarioByDiaTurno($arrayHorarios, $diaId, $turno)
    {
        $id = '';
        $desde = '';
        $hasta = '';
        foreach ($arrayHorarios as $arrayHorario)
        {
            if($arrayHorario['dia'] == $diaId && $arrayHorario['turno'] == $turno)
            {
                $id = $arrayHorario['disciplinaHorarioId'];
                $desde = $arrayHorario['desde'];
                $hasta = $arrayHorario['hasta'];
                break;
            }
        }
        return array($id, $desde, $hasta);
    }
}

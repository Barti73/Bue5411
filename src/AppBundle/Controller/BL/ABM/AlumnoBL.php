<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Alumno;
use AppBundle\Constants\HeroGymConstants;
use AppBundle\Functions\PHPFunctions;


class AlumnoBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_ALUMNO = 'SALT_ALUMNO';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }
    
    public function getAlumnoIdHashed($alumnoId)
    {
        return $this->fx->encodeHash($alumnoId, self::SALT_ALUMNO);
    }
    
    public function getAlumnoIdFromHashed($hashedAlumnoId)
    {
        return $this->fx->decodeHash($hashedAlumnoId, self::SALT_ALUMNO);
    }
    
    public function getAlumno($alumnoId)
    {
        return $this->em->getRepository('AppBundle:Alumno')->find($alumnoId);
    }
    
    public function getAlumnos($radioValue)
    {
        $rep = $this->em->getRepository('AppBundle:Alumno');
        $query = $rep->createQueryBuilder('p')
            ->where('p.activo = :radio or :radio = \'-1\'')
            ->orderBy('p.nombre', 'ASC')
            ->setParameter('radio', $radioValue)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $alumnos = array();
        foreach ($res as $alumno)
        {
            $tmp = $this->getAlumnoPreparedData($alumno);
            $alumnos[] = $tmp;
        }
        return $alumnos;
    }

    public function getAlumnosByName($strBuscar)
    {
        $rep = $this->em->getRepository('AppBundle:Alumno');
        $query = $rep->createQueryBuilder('p')
            ->where('p.activo = 1')
            ->andwhere('upper(p.nombre) like upper(:strBuscar) and :strBuscarPlain <> \'\'')
            ->orderBy('p.nombre', 'ASC')
            ->setParameter('strBuscar', '%'.$strBuscar.'%')
            ->setParameter('strBuscarPlain', $strBuscar)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $alumnos = array();
        foreach ($res as $alumno)
        {
            $tmp = $this->getAlumnoPreparedData($alumno);
            $alumnos[] = $tmp;
        }
        return $alumnos;
    }

    public function getAlumnoByRut($rut)
    {
        $alumno = $this->em->getRepository('AppBundle:Alumno')->findOneByRut($this->fx->onlyNumbersAndK($rut));
        return $this->getAlumnoPreparedData($alumno);
    }
    
    public function getAlumnoByRegistroHuella($registroHuella)
    {
        $alumno = $this->em->getRepository('AppBundle:Alumno')->findOneByRegistroHuella($registroHuella);
        return $this->getAlumnoPreparedData($alumno);
    }
    
    public function getAlumnoById($alumnoId)
    {
        $alumno = $this->em->getRepository('AppBundle:Alumno')->find($alumnoId);
        return $this->getAlumnoPreparedData($alumno);
    }
    
    public function getAlumnoPreparedData($alumno)
    {
        if (!$alumno) { return false; }
        $activo = ($alumno->getActivo() == 1) ? 'visible' : 'hidden';
        $dataAlumno = array('id' => $alumno->getId(),
                            'rut' => $this->fx->formatoRut($alumno->getRut()),
                            'nombre' => $alumno->getNombre(),
                            'edad' => $alumno->getEdad(),
                            'telefono' => $alumno->getTelefono(),
                            'email' => $alumno->getEmail(),
                            'objetivo' => $alumno->getObjetivo(),
                            'contactoEmergencia' => $alumno->getContactoEmergencia(),
                            'condicionesMedicas' => $alumno->getCondicionesMedicas(),
                            'centroMedicoPreferencia' => $alumno->getCentroMedicoPreferencia(),
                            'fechaIngreso' => $alumno->getFechaIngreso()->format('d/m/Y'),
                            'firma' => $alumno->getFirma(),
                            'registroHuella' => $alumno->getRegistroHuella(),
                            'foto' => $alumno->getFoto(),
                            'activo' => $alumno->getActivo(),
                            'visibleGrid' => $activo,
                            'hashedId' => $this->getAlumnoIdHashed($alumno->getId()),
                            'extra' => 'block');
        return $dataAlumno;
    }
    
    public function insert($nombre, $rut, $edad, $telefono, $email, $objetivo, $contactoEmergencia, $condicionesMedicas, $centroMedicoPreferencia, $fechaIngreso, $firma, $registroHuella, $activo)
    {
        //Validamos que no exista el rut o la huella
        $existeRut = $this->getAlumnoByRut($rut);
        $existeHuella = $this->getAlumnoByRegistroHuella($registroHuella);
        if ($existeRut || $existeHuella) { return false; }
        
        $alumno = new Alumno();
        $alumno->setNombre($nombre);
        $alumno->setRut($this->fx->onlyNumbersAndK($rut));
        $alumno->setEdad($edad);
        $alumno->setTelefono($telefono);
        $alumno->setEmail($email);
        $alumno->setObjetivo($objetivo);
        $alumno->setContactoEmergencia($contactoEmergencia);
        $alumno->setCondicionesMedicas($condicionesMedicas);
        $alumno->setCentroMedicoPreferencia($centroMedicoPreferencia);
        $alumno->setFechaIngreso($fechaIngreso);
        $alumno->setFirma($firma);
        $alumno->setRegistroHuella($registroHuella);
        $alumno->setActivo($activo);

        $this->em->persist($alumno);
        $this->em->flush();
        return $alumno->getId();
    }
    
    public function update($alumnoId, $nombre, $rut, $edad, $telefono, $email, $objetivo, $contactoEmergencia, $condicionesMedicas, $centroMedicoPreferencia, $fechaIngreso, $firma, $registroHuella, $activo)
    {
        //Validamos que no exista el rut o la huella para otro alumno
        $existeRut = $this->em->getRepository('AppBundle:Alumno')->createQueryBuilder('a')
                ->where('a.id <> :alumnoId')
                ->andwhere('a.rut = :rut')
                ->setParameter('alumnoId', $alumnoId)
                ->setParameter('rut', $rut)
                ->getQuery()
                ->setMaxResults(1)->getOneOrNullResult();
        $existeHuella = $this->em->getRepository('AppBundle:Alumno')->createQueryBuilder('a')
                ->where('a.id <> :alumnoId')
                ->andwhere('a.registroHuella = :registroHuella')
                ->setParameter('alumnoId', $alumnoId)
                ->setParameter('registroHuella', $registroHuella)
                ->getQuery()
                ->setMaxResults(1)->getOneOrNullResult();
        if ($existeRut || $existeHuella) { return false; }
        
        $alumno = $this->getAlumno($alumnoId);
        $alumno->setNombre($nombre);
        $alumno->setRut($this->fx->onlyNumbersAndK($rut));
        $alumno->setEdad($edad);
        $alumno->setTelefono($telefono);
        $alumno->setEmail($email);
        $alumno->setObjetivo($objetivo);
        $alumno->setContactoEmergencia($contactoEmergencia);
        $alumno->setCondicionesMedicas($condicionesMedicas);
        $alumno->setCentroMedicoPreferencia($centroMedicoPreferencia);
        $alumno->setFechaIngreso($fechaIngreso);
        $alumno->setFirma($firma);
        $alumno->setRegistroHuella($registroHuella);
        $alumno->setActivo($activo);
        $this->em->flush();
        return true;
    }

    public function uploadFotoAlumno($alumnoId, $fileObject, $rootDir)
    {
        //Nombre de Archivo
        $fileName = $fileObject->getClientOriginalName(); //Nombre Original del archivo...se descarta
        $arrayFile = explode(".", $fileName);
        $ext = ".".end($arrayFile);
        $hashedAlumnoId = $this->getAlumnoIdHashed($alumnoId);

        $fileName = 'foto_alumno_'.$hashedAlumnoId.$ext;

        //Mover archivo a destino
        $destinationPath = $rootDir . '/../web/bundles/public/images/foto_alumno/';
        $newFile = $fileObject->move($destinationPath, $fileName);
        
        //Almacenamos nombre foto
        $alumno = $this->getAlumno($alumnoId);
        $alumno->setFoto($fileName);
        $this->em->flush();

        return $fileName;
    }
    
}

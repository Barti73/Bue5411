<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NoticiaLog
 */
class NoticiaLog
{
    /**
     * @var string
     */
    private $titulo;

    /**
     * @var string
     */
    private $texto;

    /**
     * @var integer
     */
    private $posicion;

    /**
     * @var \DateTime
     */
    private $fecha;

    /**
     * @var integer
     */
    private $estado;

    /**
     * @var string
     */
    private $operacion;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Noticia
     */
    private $idNoticia;

    /**
     * @var \AppBundle\Entity\Usuario
     */
    private $idUsuario;


    /**
     * Set titulo
     *
     * @param string $titulo
     * @return NoticiaLog
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return string 
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set texto
     *
     * @param string $texto
     * @return NoticiaLog
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }

    /**
     * Get texto
     *
     * @return string 
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set posicion
     *
     * @param integer $posicion
     * @return NoticiaLog
     */
    public function setPosicion($posicion)
    {
        $this->posicion = $posicion;

        return $this;
    }

    /**
     * Get posicion
     *
     * @return integer 
     */
    public function getPosicion()
    {
        return $this->posicion;
    }

    /**
     * Set fecha
     *
     * @param \DateTime $fecha
     * @return NoticiaLog
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }

    /**
     * Get fecha
     *
     * @return \DateTime 
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set estado
     *
     * @param integer $estado
     * @return NoticiaLog
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return integer 
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set operacion
     *
     * @param string $operacion
     * @return NoticiaLog
     */
    public function setOperacion($operacion)
    {
        $this->operacion = $operacion;

        return $this;
    }

    /**
     * Get operacion
     *
     * @return string 
     */
    public function getOperacion()
    {
        return $this->operacion;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idNoticia
     *
     * @param \AppBundle\Entity\Noticia $idNoticia
     * @return NoticiaLog
     */
    public function setIdNoticia(\AppBundle\Entity\Noticia $idNoticia = null)
    {
        $this->idNoticia = $idNoticia;

        return $this;
    }

    /**
     * Get idNoticia
     *
     * @return \AppBundle\Entity\Noticia 
     */
    public function getIdNoticia()
    {
        return $this->idNoticia;
    }

    /**
     * Set idUsuario
     *
     * @param \AppBundle\Entity\Usuario $idUsuario
     * @return NoticiaLog
     */
    public function setIdUsuario(\AppBundle\Entity\Usuario $idUsuario = null)
    {
        $this->idUsuario = $idUsuario;

        return $this;
    }

    /**
     * Get idUsuario
     *
     * @return \AppBundle\Entity\Usuario 
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }
}

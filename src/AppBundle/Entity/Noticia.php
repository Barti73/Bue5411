<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Noticia
 */
class Noticia
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
     * @var string
     */
    private $imagen;

    /**
     * @var integer
     */
    private $estado;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Usuario
     */
    private $idUsuario;


    /**
     * Set titulo
     *
     * @param string $titulo
     * @return Noticia
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
     * @return Noticia
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
     * @return Noticia
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
     * @return Noticia
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
     * Set imagen
     *
     * @param string $imagen
     * @return Noticia
     */
    public function setImagen($imagen)
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * Get imagen
     *
     * @return string 
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * Set estado
     *
     * @param integer $estado
     * @return Noticia
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
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idUsuario
     *
     * @param \AppBundle\Entity\Usuario $idUsuario
     * @return Noticia
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

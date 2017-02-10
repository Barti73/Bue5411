<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ParametrosConfiguracion
 */
class ParametrosConfiguracion
{
    /**
     * @var string
     */
    private $nombre;

    /**
     * @var string
     */
    private $valor;

    /**
     * @var integer
     */
    private $id;


    /**
     * Set nombre
     *
     * @param string $nombre
     * @return ParametrosConfiguracion
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string 
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set valor
     *
     * @param string $valor
     * @return ParametrosConfiguracion
     */
    public function setValor($valor)
    {
        $this->valor = $valor;

        return $this;
    }

    /**
     * Get valor
     *
     * @return string 
     */
    public function getValor()
    {
        return $this->valor;
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
}

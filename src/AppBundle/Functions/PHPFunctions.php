<?php

namespace AppBundle\Functions;

class PHPFunctions 
{
    protected $con;
    
    public function __construct()
    {
    }
    
    public function FXTest($text)
    {
        return $text." (FxTest OK)";
    }
    
    public static function GetStatus($statusArray)
    {
        return array('Code' => explode('/', $statusArray)[0],
                     'Text' => explode('/', $statusArray)[1]);
    }
    
    public function encryptDataTripleDES($text, $key = null)
    {
        if (!$key) { $key = 'PICKIT'; }
        if (!$text) { return $text; }
        $text = trim($text);
        $td = mcrypt_module_open('tripledes', '', 'ecb', '');
        $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        mcrypt_generic_init($td, $key, $iv);
        $crypttext = mcrypt_generic($td, $text);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        return $this->base64_url_encode($crypttext);
    }

    public function decryptDataTripleDES($text, $key = null)
    {
        if (!$key) { $key = 'PICKIT'; }
        if (!$text) { return $text; }
        $text = $this->base64_url_decode(trim($text));
        $td = mcrypt_module_open('tripledes', '', 'ecb', '');
        $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        mcrypt_generic_init($td, $key, $iv);
        $crypttext = mdecrypt_generic($td, $text);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        return trim($crypttext);
    }

    function base64_url_encode($text)
    {
        return strtr(base64_encode($text), '+/=', '-_~');
    }
    
    function base64_url_decode($text)
    {
        return base64_decode(strtr($text, '-_~', '+/='));
    }
    
    function md5Encode($text)
    {
        if (!$text) { return $text; }
        $str = md5($this->encryptDataTripleDES($text));
        return $str;
    }
    
    function removeFinalChars($text, $cant)
    {
        //Texto a removerle caracteres
        //Cant caracteres a remover
        return substr($text, 0, strlen($text) - $cant);
    }
    
    function encodeHash($text, $salt = null, $length = null, $alphabet = null)
    {
        if (!$salt) { $salt = 'SaltHeroGym'; }
        if (!$length) { $length = 10; }
        if (!$alphabet) { $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'; }

        $hashids = new Hashids($salt, $length, $alphabet);
        return $hashids->encode($text);
    }
    
    function decodeHash($text, $salt = null, $length = null, $alphabet = null)
    {
        if (!$salt) { $salt = 'SaltHeroGym'; }
        if (!$length) { $length = 10; }
        if (!$alphabet) { $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'; }

        $hashids = new Hashids($salt, $length, $alphabet);
        return $hashids->decode($text)[0];
    }
    
    function dateToSQL($date)
    {
        //Fecha en formato dd/mm/yyyy
        return substr($date, 6, 4).substr($date, 3, 2).substr($date, 0, 2);
    }
 
    function dateHTML5ToSQL($date)
    {
        //Fecha en formato yyyy-mm-dd
        return str_replace("-", "", $date);
    }
 
    function dateHTML5ToText($date)
    {
        //Fecha en formato yyyy-mm-dd
        $date = substr($date, 8, 2)."/".substr($date, 5, 2)."/".substr($date, 0, 4);
        return str_replace("-", "/", $date);
    }
 
    function dateToHTML5($date)
    {
        //Fecha en formato dd/mm/yyyy
        return substr($date, 6, 4)."-".substr($date, 3, 2)."-".substr($date, 0, 2);
    }
 
    function numToDia($numDia)
    {
        if ($numDia == 0) return 'Domingo';
        if ($numDia == 1) return 'Lunes';
        if ($numDia == 2) return 'Martes';
        if ($numDia == 3) return 'Miércoles';
        if ($numDia == 4) return 'Jueves';
        if ($numDia == 5) return 'Viernes';
        if ($numDia == 6) return 'Sábado';
    }
    
    function numToMes($numMes)
    {
        if ($numMes == 1) return 'Enero';
        if ($numMes == 2) return 'Febrero';
        if ($numMes == 3) return 'Marzo';
        if ($numMes == 4) return 'Abril';
        if ($numMes == 5) return 'Mayo';
        if ($numMes == 6) return 'Junio';
        if ($numMes == 7) return 'Julio';
        if ($numMes == 8) return 'Agosto';
        if ($numMes == 9) return 'Septiembre';
        if ($numMes == 10) return 'Octubre';
        if ($numMes == 11) return 'Noviembre';
        if ($numMes == 12) return 'Diciembre';
    }
    
    function isValidEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            return false;
        }    
        return true;
    }

    function checkActivo($activo)
    {
        if ($activo)
        {
            $activo = "1";
            $chkActivo = "checked";
        }
        else
        {
            $activo = "0";
            $chkActivo = "";
        }
        return array($activo, $chkActivo);
    }
    
    function onlyNumbersAndK($string)
    {
        return preg_replace('/[^0-9^k]+/i', '', $string);
    }
    
    function formatoRut($rut)
    {
        return number_format(substr($rut, 0 , -1 ), 0, '', '.').'-'.substr($rut, strlen($rut) -1, 1);
    }    
}

?>

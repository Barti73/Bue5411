<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Functions\ImageResize;
use AppBundle\Constants\Codigo5411Constants;
use AppBundle\Controller\BL\Common\CommonBL;
use AppBundle\Controller\BL\Common\NoticiaBL;

class NewsBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;

    protected $container;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }

    public function getUrlLogin()
    {
        return Codigo5411Constants::URL_SITE.Codigo5411Constants::URL_LOGIN;
    }
    
    public function getUrlAjax()
    {
        $arrayUrlAjax = array('UrlAjaxPopupNewsAddEdit' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS_ADD_EDIT,
                              'UrlAjaxPopupNewsView' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS_VIEW,
                              'UrlAjaxGetGridPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_PAGE,
                              'UrlAjaxSaveNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_SAVE_NEWS,
                              'UrlAjaxPublishNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_PUBLISH_NEWS,
                              'UrlAjaxDeleteNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_DELETE_NEWS,
                              'UrlHome' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlLogin' => $this->getUrlLogin());
        return $arrayUrlAjax;
    }
    
    public function getFullNews()
    {
        $noticias =  $this->em->getRepository('AppBundle:Noticia')->findAll();
        return $noticias;
    }
    
    public function getCountNews()
    {
        $commonBL = new CommonBL($this->container);
        
        $noticias = $this->getFullNews();
        $countNews = $commonBL->getPaginatorPageCount(count($noticias));
        return $countNews;
    }
    
    public function getGridPage($arrayData)
    {
        $selectedPage = $arrayData["pageNumber"];
        //BL's
        $commonBL = new CommonBL($this->container);
        $noticiaBL = new NoticiaBL($this->container);
        
        $recordsPerPage = $commonBL->getResultsPerPage();
        $offset = ($selectedPage == 1) ? 0 : ($selectedPage - 1) * $recordsPerPage ;

        $noticias = $this->em->getRepository('AppBundle:Noticia')->createQueryBuilder('n')
                            ->innerJoin('AppBundle:Usuario', 'u', 'WITH', 'n.idUsuario = u.id')
                            ->orderBy('n.fecha', 'desc')
                            ->setFirstResult($offset)
                            ->setMaxResults($recordsPerPage)
                            ->getQuery()
                            ->getResult();
        
        $arrayResponse = array();
        foreach ($noticias as $noticia)
        {
            $arrayResponse[] = $noticiaBL->getNoticiaData($noticia);
        }
        
        return $arrayResponse;
    }
    
    public function getNoticia($arrayData)
    {
        $response = array();
        //BL
        $noticiaBL = new NoticiaBL($this->container);
        
        $noticiaIdHashed = $arrayData["noticiaIdHashed"];
        
        if (!$noticiaIdHashed) //Nueva Noticia
        {
            $noticiaData = $noticiaBL->getNoticiaData(null);
            $response = array('titulo' => 'Cargar Nueva Noticia',
                              'class' => '',
                              'noticiaData' => $noticiaData,
                              'operacion' => 'insert');
        }
        else //Editar Noticia
        {
            $noticiaId = $noticiaBL->getNoticiaIdFromHashed($noticiaIdHashed);
            $noticia = $this->em->getRepository('AppBundle:Noticia')->find($noticiaId);
            $noticiaData = $noticiaBL->getNoticiaData($noticia);

            $response = array('titulo' => 'Editar Noticia',
                              'class' => 'active',
                              'noticiaData' => $noticiaData,
                              'operacion' => 'update');
        }
        return $response;
    }

    public function saveNews($arrayData, $fileObject = null)
    {
        //Preparamos News Data
        //$arrayData contiene:
        //array('noticiaIdHashed' => $noticiaIdHashed,
        //      'titulo' => $titulo,
        //      'texto' => $texto,
        //      'posicion' => $posicion,
        //      'blackWhite' => $blackWhite);
        
        //Obtenemos el usuario
        $arrayData["usuarioId"] = $this->get('session')->get('userId');

        //Insert/update noticia
        $noticiaBL = new NoticiaBL($this->container);
        if (!$arrayData["noticiaIdHashed"])
        {
            $noticiaId = $noticiaBL->insertNoticia($arrayData);
        }
        else
        {
            $noticiaId = $noticiaBL->updateNoticia($arrayData);
        }
        
        //Agregamos imagen si existe
        if ($fileObject)
        {
            //Carpeta destino
            $imageFolder = $this->container->get('kernel')->getRootDir().Codigo5411Constants::IMAGES_FOLDER;
            //nombre archivo
            $fileNameOrig = "noticia_".$noticiaBL->getNoticiaIdHashed($noticiaId)."_original.jpg";
            $fileNameResize = "noticia_".$noticiaBL->getNoticiaIdHashed($noticiaId)."_1600x900.jpg";
            //Convertir a B/N
            $blackWhite = ($arrayData["blackWhite"]) ? true : false;
            
            $fileObject->move($imageFolder, $fileNameOrig);
            
            //Resize
            $fileOrig = $imageFolder.$fileNameOrig;
            $fileResize = $imageFolder.$fileNameResize;
            $newWidth = Codigo5411Constants::NEWS_WIDTH;
            $newHeight = Codigo5411Constants::NEWS_HEIGHT;
            
            $imageResize = new ImageResize();
            $imageResize->smartResizeImage($fileOrig, 
                                           null, 
                                           $newWidth,
                                           $newHeight,
                                           false,
                                           $fileResize,
                                           false,
                                           false,
                                           90,
                                           $blackWhite);
            
            //Actualizamos noticia[imagen]
            $arrayImagen = array('noticiaId' => $noticiaId,
                                 'imagen' => $fileNameResize);
            $noticiaBL->updateNoticiaImagen($arrayImagen);
        }
        
        return $noticiaId;
    }
    
    public function publishNews($arrayData)
    {
        $noticiaBL = new NoticiaBL($this->container);
        $noticiaIdHashed = $arrayData["noticiaIdHashed"];
        $response = $noticiaBL->publishNoticia($noticiaIdHashed);
        return $response;        
    }
    
    public function deleteNews($arrayData)
    {
        $noticiaBL = new NoticiaBL($this->container);
        $noticiaIdHashed = $arrayData["noticiaIdHashed"];
        //Delete noticia
        $response = $noticiaBL->deleteNoticia($noticiaIdHashed);
        //Delete Imagen
        //Carpeta
        $imageFolder = $this->container->get('kernel')->getRootDir().Codigo5411Constants::IMAGES_FOLDER;
        $fileNameResize = "noticia_".$noticiaIdHashed."_1600x900.jpg";
        $filename = $imageFolder.$fileNameResize;
        $fs = new Filesystem();
        if ( $fs->exists($filename) ) { $fs->remove($filename); }
        return $response;        
    }
    
}

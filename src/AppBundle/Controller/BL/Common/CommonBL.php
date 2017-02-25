<?php

namespace AppBundle\Controller\BL\Common;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;

class CommonBL
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }
    
    public function getResultsPerPage()
    {
        return Codigo5411Constants::PAGINATOR_RESULTS_PER_PAGE;
    }

    public function getPaginatorPageCount($gridCount)
    {
        $pageCount = ceil($gridCount / $this->getResultsPerPage());
        return $pageCount;
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
                              'UrlAjaxPopupEditPassOpen' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_POPUP_EDIT_PASS_OPEN,
                              'UrlAjaxPopupEditPassSave' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_POPUP_EDIT_PASS_SAVE,
                              'UrlNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlAjaxLoginCheck' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_LOGIN_CHECK,
                              'UrlLogin' => $this->getUrlLogin());
        return $arrayUrlAjax;
    }
    
}
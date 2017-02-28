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
    
    public function getFormattedDate()
    {
        //Esta fx devuelve "Ciudad de Buenos Aires, Sábado 28 Enero de 2017"
        $today = getdate(); 
        
        $weekDay = $this->fx->numToDia($today["wday"]);
        $numDay = $today["mday"];
        $month = $this->fx->numToMes($today["mon"]);
        $year = $today["year"];
        $textDate = "<b>Ciudad de Buenos Aires,</b> [weekDay] [numDay] [month] de [year]";
        
        $response = str_replace(array("[weekDay]", "[numDay]", "[month]", "[year]"), array($weekDay, $numDay, $month, $year), $textDate);
        return $response;
    }


    public function getResultsPerPage()
    {
        return Codigo5411Constants::PAGINATOR_RESULTS_PER_PAGE;
    }

    public function getResultsOtherNewsPerPage()
    {
        return Codigo5411Constants::PAGINATOR_OTHER_NEWS_RESULTS_PER_PAGE;
    }

    public function getPaginatorPageCount($gridCount)
    {
        $pageCount = ceil($gridCount / $this->getResultsPerPage());
        return $pageCount;
    }
    
    public function getPaginatorOtherNewsPageCount($gridCount)
    {
        $pageCount = ceil($gridCount / $this->getResultsOtherNewsPerPage());
        return $pageCount;
    }
    
    public function getUrlLogin()
    {
        return Codigo5411Constants::URL_SITE.Codigo5411Constants::URL_LOGIN;
    }
    
    public function getUrlOtherNews()
    {
        return Codigo5411Constants::URL_SITE.Codigo5411Constants::URL_OTHER_NEWS;
    }
    
    public function getUrlAjax()
    {
        $arrayUrlAjax = array('UrlSite' => Codigo5411Constants::URL_SITE,
                              'UrlHome' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlOtherNews' => $this->getUrlOtherNews(),
                              'UrlAjaxPopupPortalNewsView' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_PORTAL_NEWS_VIEW,
                              'UrlAjaxGetGridOtherNewsPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_OTHER_NEWS_PAGE,
                              'UrlAjaxGetGridOtherNewsPaginator' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_OTHER_NEWS_PAGINATOR,
                              'UrlNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlUsers' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_USERS,
                              'UrlAjaxLoginCheck' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_LOGIN_CHECK,
                              'UrlLogin' => $this->getUrlLogin(),
                              'UrlAjaxPopupNewsAddEdit' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS_ADD_EDIT,
                              'UrlAjaxPopupNewsView' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS_VIEW,
                              'UrlAjaxGetGridNewsPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_NEWS_PAGE,
                              'UrlAjaxSaveNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_SAVE_NEWS,
                              'UrlAjaxPublishNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_PUBLISH_NEWS,
                              'UrlAjaxDeleteNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_DELETE_NEWS,
                              'UrlAjaxPopupEditPassOpen' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_POPUP_EDIT_PASS_OPEN,
                              'UrlAjaxPopupEditPassSave' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_POPUP_EDIT_PASS_SAVE,
                              'UrlAjaxPopupUserAddEdit' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_USER_ADD_EDIT,
                              'UrlAjaxGetGridUserPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_USER_PAGE,
                              'UrlAjaxSaveUser' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_SAVE_USER);
        return $arrayUrlAjax;
    }
    
    public function getUserdata($session)
    {
        $arrayUser = array('userId' => $session->get('userId'),
                           'userNombre' => $session->get('userNombre'),
                           'userName' => $session->get('userName'),
                           'userPerfil' => $session->get('userPerfil'));
        return $arrayUser;
    }
    
}
<?php

namespace AppBundle\Constants;

class Codigo5411Constants 
{
    const PAGINATOR_RESULTS_PER_PAGE = 3;
    
    //URLs
    const URL_SITE = "http://localhost:8080/Bue5411/web/app_dev.php";
    const URL_LOGIN = "/Backend/Login";
    const REDIRECT_LOGIN_CHECK = "/Backend/LoginCheck";
    const REDIRECT_NOT_FOUND = "/Backend/Login/NotFound";
    const REDIRECT_CONTROL_ACCESO = "/Backend/Home/Init";
    
    //Save
    const URL_SAVE_USUARIO = "/ABM/Usuario/Save";
    
    //Menu
    const MENU_NEWS = '/Backend/News';
    
    //JS CONST (Ajax)
    //Login
    const AJAX_LOGIN_CHECK = "/Backend/Login/ajaxLoginCheck";
    //News
    const AJAX_POPUP_NEWS = "/Backend/News/ajaxPopupNews";
    const AJAX_GRID_PAGE = "/Backend/News/ajaxGridNewsPage";
    const AJAX_SAVE_NEWS = "/Backend/News/ajaxSaveNews";
    
    //Files
    const IMAGES_FOLDER = "/../web/bundles/public/upload/";
}


?>

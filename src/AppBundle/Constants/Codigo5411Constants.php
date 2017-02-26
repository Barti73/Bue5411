<?php

namespace AppBundle\Constants;

class Codigo5411Constants 
{
    const PAGINATOR_RESULTS_PER_PAGE = 3;
    
    const PASSWORD_NEW_USER = 'codigo5411';
    
    //URLs
    const URL_SITE = "http://localhost:8080/Bue5411/web/app_dev.php";
    const URL_LOGIN = "/Backend/Login";
    
    //Menu
    const MENU_NEWS = '/Backend/News';
    const MENU_USERS = '/Backend/User';
    const MENU_POPUP_EDIT_PASS_OPEN = '/Backend/User/ajaxPopupEditPassOpen';
    const MENU_POPUP_EDIT_PASS_SAVE = '/Backend/User/ajaxPopupEditPassSave';
    
    //JS CONST (Ajax)
    //Login
    const AJAX_LOGIN_CHECK = "/Backend/Login/ajaxLoginCheck";
    //News
    const AJAX_POPUP_NEWS_ADD_EDIT = "/Backend/News/ajaxPopupNewsAddEdit";
    const AJAX_POPUP_NEWS_VIEW = "/Backend/News/ajaxPopupNewsView";
    const AJAX_GRID_NEWS_PAGE = "/Backend/News/ajaxGridNewsPage";
    const AJAX_SAVE_NEWS = "/Backend/News/ajaxSaveNews";
    const AJAX_PUBLISH_NEWS = "/Backend/News/ajaxPublishNews";
    const AJAX_DELETE_NEWS = "/Backend/News/ajaxDeleteNews";
    //User
    const AJAX_POPUP_USER_ADD_EDIT = "/Backend/User/ajaxPopupUserAddEdit";
    const AJAX_GRID_USER_PAGE = "/Backend/User/ajaxGridUserPage";
    const AJAX_SAVE_USER = "/Backend/User/ajaxSaveUser";
    
    //Files
    const IMAGES_FOLDER = "/../web/bundles/public/upload/news/";
    
    //Image Size
    const NEWS_WIDTH = 1600;
    const NEWS_HEIGHT = 900;
}


?>

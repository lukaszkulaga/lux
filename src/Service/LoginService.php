<?php

namespace App\Service;

use App\Repository\LoginRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LoginService
{

    private $loginRepository;
    private $session;

    public function  __construct( LoginRepository $loginRepository,SessionInterface $session) {

        $this->loginRepository = $loginRepository;
        $this->session = $session;
    }

    public function loginService($login,$haslo) {

        $rezultat = $this->loginRepository->pobierzLoginHaslo( $login,$haslo );

        return $rezultat;

    }

    public function dostepUzytkownikaService() {

        $uzytkownik = $this->session->get('uzytkownik');
        $admin = $this->session->get('admin');

        if( isset($uzytkownik) || isset($admin) ){

            return true;
        } else {

            return false;
        }
    }

    public function dostepAdministratoraService() {

        $admin = $this->session->get('admin');

        if  ( isset($admin) ) {

            return true;
        } else {

            return false;
        }
    }

}
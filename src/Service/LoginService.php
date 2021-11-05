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

    public function loginService($login,$haslo){

        $rezultat = $this->loginRepository->pobierzLoginHaslo( $login,$haslo );

        return $rezultat;

    }

    public function dostepUzytkownikaService(){

        $sesja = $this->session->get('uzytkownik');

        if( isset($sesja) ){

            return true;
        } else {

            return false;
        }
    }



}
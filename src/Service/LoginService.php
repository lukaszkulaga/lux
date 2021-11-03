<?php

namespace App\Service;

use App\Repository\LoginRepository;

class LoginService
{

    private $loginRepository;

    public function  __construct( LoginRepository $loginRepository) {

        $this->loginRepository = $loginRepository;
    }

    public function loginService($login,$haslo){

        $rezultat = $this->loginRepository->pobierzLoginHaslo( $login,$haslo );

        return $rezultat;

    }


}
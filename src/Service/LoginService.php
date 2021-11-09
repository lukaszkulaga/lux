<?php

namespace App\Service;

use App\Repository\LoginRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LoginService
{

    private $loginRepository;
    private $session;
    private $logger;

    public function  __construct( LoginRepository $loginRepository,SessionInterface $session,LoggerInterface $logger) {

        $this->loginRepository = $loginRepository;
        $this->session = $session;
        $this->logger = $logger;
    }

    public function loginService($login,$haslo) {

        $rezultat = $this->loginRepository->pobierzLoginHaslo( $login,$haslo );

        return $rezultat;

    }

    public function dostepUzytkownikaService() {

        $uzytkownik = $this->session->get('uzytkownik');
        $admin = $this->session->get('admin');

        $this->logger->info('/////////////////////////////////////// uzyt    '.$uzytkownik);

        if( isset($uzytkownik) || isset($admin) ){

            $this->logger->info('/////////////////////////////////////// uzyt   true ');
            return true;
        } else {
            $this->logger->info('/////////////////////////////////////// uzyt   false ');
            return false;
        }
    }

    public function dostepAdministratoraService() {

        $admin = $this->session->get('admin');

        $this->logger->info('++++++++++++++++++++++++++ admin '.$admin);

        if  ( isset($admin) ) {
            $this->session->remove('uzytkownik');
            //$this->session->invalidate();
            $this->logger->info('++++++++++++++++++++++++++ admin   true ');

            return true;
        } else {

            return false;
        }
    }

}
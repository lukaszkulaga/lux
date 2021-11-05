<?php

namespace App\Controller;

use App\Service\DaneUzytkownikaService;
use App\Service\LoginService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class UwierzytelnienieController extends AbstractController
{


    private $daneUzytkownikaService;
    private $loginService;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService,LoginService $loginService) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
    }


    /**
     * @Route("/wyloguj", methods={"GET"})
     */
    public function wylogujGet() {

        session_start();
        session_destroy();

        return $this->redirect(parent::getParameter('baseUrl')."logowanie");
    }

    /**
     * @Route("/logowanie", methods={"GET"})
     */
    public function logowanieGet() {


        return $this->render('logowanie.html.twig', array() );

    }

    /**
     * @Route("/logowanie", methods={"POST"})
     */
    public function logowaniePost( Request $request  ) {

        $login = $request->request->get('nazwaUzytkownika');
        $haslo = $request->request->get('haslo');

        $rezultat = $this->loginService->loginService( $login,$haslo );

        if ( $rezultat ) {

            return $this->redirect(parent::getParameter('baseUrl')."stronaUzytkownika");
        } else {

            return $this->redirect(parent::getParameter('baseUrl')."logowanie");
        }
    }

    /**
     * @Route("/rejestracja", methods={"GET"})
     */
    public function rejestracjaGet() {




        return $this->render('rejestracja.html.twig', array() );

    }

    /**
     * @Route("/rejestracja", methods={"POST"})
     */
    public function rejestracjaPost( Request $request ):Response {

        $adresUriZdjecia = $request->request->get('filesDropAndDrag');
        $imie = $request->request->get('imie');
        $nazwisko = $request->request->get('nazwisko');
        $nazwaUzytkownika = $request->request->get('nazwaUzytkownika');
        $email = $request->request->get('email');
        $haslo = $request->request->get('haslo');

        $nazwaUzytkownikaService = $this->daneUzytkownikaService->sprawdzNazweUzytkownikaService($nazwaUzytkownika);
        $emailService = $this->daneUzytkownikaService->sprawdzEmailService($email);

        if ($nazwaUzytkownikaService != "") {
            //komunikat
            echo 'bledna nazwa';
        } else if ($emailService != "") {
            //komunikat
            echo 'bledna email';
        } else {

            $this->daneUzytkownikaService->daneUzytkownikaService($adresUriZdjecia,$imie,$nazwisko,$nazwaUzytkownika,$email,$haslo);
        }

        return $this->redirect(parent::getParameter('baseUrl')."logowanie");
    }

    /**
     * @Route("/przypomnijHaslo", methods={"GET"})
     */
    public function przypomnijHasloGet() {




        return $this->render('przypomnijHaslo.html.twig', array() );
    }
}
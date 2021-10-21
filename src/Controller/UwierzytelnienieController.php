<?php

namespace App\Controller;

use App\Service\DaneUzytkownikaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class UwierzytelnienieController extends AbstractController
{


    private $daneUzytkownikaService;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
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
    public function logowaniePost() {




        return $this->render('logowanie.html.twig', array() );

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
    public function rejestracjaPost() {


        $this->daneUzytkownikaService->daneUzytkownikaService('cyce');


        return $this->redirect(parent::getParameter('baseUrl')."logowanie");

    }

    /**
     * @Route("/przypomnijHaslo", methods={"GET"})
     */
    public function przypomnijHasloGet() {




        return $this->render('przypomnijHaslo.html.twig', array() );

    }

}
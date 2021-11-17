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

class StronaBudynkiController extends AbstractController
{
    private $daneUzytkownikaService;
    private $loginService;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService, LoginService $loginService) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
    }

    /**
     * @Route("/stronaBudynki", methods={"GET"})
     */
    public function stronaBudynkiGet() {

        $Id = $this->loginService->dostepUzytkownikaService();

        if ( $Id==false ) {

            return $this->redirect(parent::getParameter('baseUrl')."logowanie");
        }

        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( $Id );

        return $this->render('stronaBudynki.html.twig', array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr ) );
    }

    /**
     * @Route("/stronaBudynki", methods={"POST"})
     */
    public function stronaBudynkiPost() {




        return $this->redirect(parent::getParameter('baseUrl')."");
    }
}
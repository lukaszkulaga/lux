<?php

namespace App\Controller;
use App\Service\DaneKontrahentowService;
use App\Service\DaneUzytkownikaService;
use App\Service\LoginService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class StronaKontrahenciController extends AbstractController
{
    private $daneUzytkownikaService;
    private $loginService;
    private $daneKontrahentowService;

    public function  __construct (
        DaneUzytkownikaService $daneUzytkownikaService,
        LoginService $loginService,
        DaneKontrahentowService $daneKontrahentowService
    )
    {
        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
        $this->daneKontrahentowService = $daneKontrahentowService;
    }

    /**
     * @Route("/stronaKontrahenci", methods={"GET"})
     */
    public function stronaKontrahenciGet() {

        $Id = $this->loginService->dostepUzytkownikaService();

        if ( $Id==false ) {

            return $this->redirect(parent::getParameter('baseUrl')."logowanie");
        }

        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( $Id );

        $daneKontrahentowArr = $this->daneKontrahentowService->daneKontrahentowService();

        return $this->render('stronaKontrahenci.html.twig',
            array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr,'daneKontrahentowArr'=>$daneKontrahentowArr ) );
    }

    /**
     * @Route("/stronaKontrahenci", methods={"POST"})
     */
    public function stronaKontrahenciPost() {

        return $this->redirect(parent::getParameter('baseUrl')."");
    }

    /**
     *
     * do dodawania nowego budynku
     *
     * @Route("/stronaKontrahenci/ajax", methods={"POST"})
     */
    public function stronaKontrahenciPostAjax(Request $request) {

        $tablicaZDanymiKontrahentow = $request->request->get('tab');
        $test="z ajaks";

        return new JsonResponse($test);
    }
}
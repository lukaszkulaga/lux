<?php

namespace App\Controller;

use App\Service\DaneUzytkownikaService;
use App\Service\LoginService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class StronaUzytkownikaController extends AbstractController
{

    private $daneUzytkownikaService;
    private $loginService;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService, LoginService $loginService) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
    }

    /**
     * @Route("/stronaUzytkownika", methods={"GET"})
     */
    public function stronaUzytkownikaGet() {

        $Id = $this->loginService->dostepUzytkownikaService();

        if ( $Id==false ) {
            return $this->redirect(parent::getParameter('baseUrl')."logowanie");
        }

        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( $Id );

        return $this->render('stronaUzytkownika.html.twig', array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr ) );
    }


    /**
     * @Route("/stronaUzytkownika/ajax", methods={"POST"})
     */
    public function stronaUzytkownikaPostAjax(Request $request) {

        $tablicaZDanymi = $request->request->get('tab');

        $Id = $this->loginService->dostepUzytkownikaService();
        $edycjaDanychUzytkownikaService = $this->daneUzytkownikaService->edycjaDanychUzytkownikaService( $tablicaZDanymi, $Id );


        $daneUzytkownika = ['daneUzytkownika'=>$edycjaDanychUzytkownikaService];

        return new JsonResponse($daneUzytkownika);
    }
}


























<?php

namespace App\Controller;

use App\Service\DaneUzytkownikaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class StronaUzytkownikaController extends AbstractController
{

    private $daneUzytkownikaService;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
    }

    /**
     * @Route("/stronaUzytkownika", methods={"GET"})
     */
    public function stronaUzytkownikaGet() {


        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( 1 );

        return $this->render('stronaUzytkownika.html.twig', array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr ) );

    }

    /**
     * @Route("/stronaUzytkownika", methods={"POST"})
     */
    public function stronaUzytkownikaPost() {




        return $this->redirect(parent::getParameter('baseUrl')."");

    }
}
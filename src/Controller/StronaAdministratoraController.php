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

class StronaAdministratoraController extends AbstractController
{
    private $daneUzytkownikaService;
    private $loginService;

   public function __construct(DaneUzytkownikaService $daneUzytkownikaService, LoginService $loginService) {

       $this->daneUzytkownikaService = $daneUzytkownikaService;
       $this->loginService = $loginService;
   }

    /**
     * @Route("/stronaAdministratora", methods={"GET"})
     */
    public function stronaAdministratoraGet() {

        $dostepAdministratora = $this->loginService->dostepAdministratoraService();

        if ( $dostepAdministratora==false ) {

            return $this->redirect(parent::getParameter('baseUrl')."stronaUzytkownika");
        }

        return $this->render('administrator/stronaAdministratora.html.twig', array( ) );

    }
}
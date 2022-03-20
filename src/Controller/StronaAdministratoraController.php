<?php

namespace App\Controller;

use App\Service\AdministratorService;
use App\Service\DaneUzytkownikaService;
use App\Service\LoginService;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

//test
class StronaAdministratoraController extends AbstractController
{
    private $daneUzytkownikaService;
    private $loginService;
    private $logger;
    private $administratorService;

   public function __construct(DaneUzytkownikaService $daneUzytkownikaService, LoginService $loginService,
                               LoggerInterface $logger, AdministratorService $administratorService) {

       $this->daneUzytkownikaService = $daneUzytkownikaService;
       $this->loginService = $loginService;
       $this->logger = $logger;
       $this->administratorService = $administratorService;
   }

    /**
     * @Route("/stronaAdministratora", methods={"GET"})
     */
    public function stronaAdministratoraGet() {

        $dostepAdministratora = $this->loginService->dostepAdministratoraService();
        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( $dostepAdministratora );
        $uzytkownicyAdminArr = $this->administratorService->uzytkownicyAdminService();

        $this->logger->info('/////////////////////////////////////// strona admina '.$dostepAdministratora);

        if ( $dostepAdministratora==true ) {

            return $this->render('administrator/stronaAdministratora.html.twig',
                array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr,'uzytkownicyAdminArr'=>$uzytkownicyAdminArr) );
          //  return $this->redirect(parent::getParameter('baseUrl')."stronaAdministratora");

        } else {

            return $this->redirect(parent::getParameter('baseUrl')."stronaUzytkownika");
            //return $this->render('stronaUzytkownika.html.twig', array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr ) );
        }
    }

    /**
     * @Route("/statusKonta/ajax", methods={"POST"})
     */
    public function statusKonta(Request $request) {

        $statusKontaTab = $request->request->get('tab');

        $statusKontaArr = $this->administratorService->statusKontaService($statusKontaTab);

        $arr = ['statusKontaArr'=>$statusKontaArr];

        return new JsonResponse($arr);
    }

    /**
     * @Route("/rola/ajax", methods={"POST"})
     */
    public function rola(Request $request) {

        $rolaTab = $request->request->get('tab');

        $rolaArr = $this->administratorService->rolaService($rolaTab);

        $arr = ['rolaArr'=>$rolaArr];

        return new JsonResponse($arr);
    }

}














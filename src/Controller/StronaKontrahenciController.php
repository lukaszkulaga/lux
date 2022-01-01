<?php

namespace App\Controller;
use App\Service\DaneKontrahentowService;
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

class StronaKontrahenciController extends AbstractController
{
    private $daneUzytkownikaService;
    private $loginService;
    private $daneKontrahentowService;
    private $logger;

    public function  __construct (
        DaneUzytkownikaService $daneUzytkownikaService,
        LoginService $loginService,
        DaneKontrahentowService $daneKontrahentowService,
        LoggerInterface $logger
    )
    {
        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
        $this->daneKontrahentowService = $daneKontrahentowService;
        $this->logger = $logger;
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

        //słowniki
        $slownikPodmiot = $this->daneKontrahentowService->slownikPodmiotService();

        return $this->render('stronaKontrahenci.html.twig',
            array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr,'daneKontrahentowArr'=>$daneKontrahentowArr,'podmiotArr'=>$slownikPodmiot ) );
    }

    /**
     * @Route("/stronaKontrahenci", methods={"POST"})
     */
    public function stronaKontrahenciPost() {

        return $this->redirect(parent::getParameter('baseUrl')."");
    }

    /**
     *
     * dodaj budynek
     *
     * @Route("/zapiszDanePostawoweKontrahenta/ajax", methods={"POST"})
     */
    public function zapiszDanePostawoweKontrahenta(Request $request) {

        $danePodstawoweKontrahentaArr = $request->request->get('tab');

        $danePodstawoweKontrahenta = $this->daneKontrahentowService->danePodstawoweKontrahentaService($danePodstawoweKontrahentaArr);

        $arr = ['danePodstawoweKontrahentaArr'=>$danePodstawoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * edycja budynku
     *
     * @Route("/edytujDanePostawoweKontrahenta/ajax", methods={"POST"})
     */
    public function edytujDanePostawoweKontrahenta(Request $request) {

        $danePodstawoweEdycjaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $danePodstawoweEdycja = $this->daneKontrahentowService->edytujDanePodstawoweKontrahentaService($danePodstawoweEdycjaArr);

        $arr = ['danePodstawoweEdycjaArr'=>$danePodstawoweEdycja];

        return new JsonResponse($arr);
    }

    /**
     *
     * filtr danych
     *
     * @Route("/filtrujDanePostawoweKontrahenta/ajax", methods={"POST"})
     */
    public function filtrujDanePostawoweKontrahenta(Request $request) {

        $danePodstawoweFiltrArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $danePodstawoweFiltr = $this->daneKontrahentowService->filtrujDanePodstawoweKontrahentaService($danePodstawoweFiltrArr);

        $arr = ['danePodstawoweFiltrArr'=>$danePodstawoweFiltr];

        return new JsonResponse($arr);
    }
}
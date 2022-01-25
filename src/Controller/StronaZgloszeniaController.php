<?php

namespace App\Controller;

use App\Service\DaneUzytkownikaService;
use App\Service\LoginService;
use App\Service\ZgloszeniaService;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class StronaZgloszeniaController extends AbstractController
{

    private $daneUzytkownikaService;
    private $loginService;
    private $zgloszeniaService;
    private $logger;

    public function  __construct(DaneUzytkownikaService $daneUzytkownikaService,ZgloszeniaService $zgloszeniaService,
                                 LoginService $loginService, LoggerInterface $logger) {

        $this->daneUzytkownikaService = $daneUzytkownikaService;
        $this->loginService = $loginService;
        $this->zgloszeniaService = $zgloszeniaService;
        $this->logger = $logger;
    }

    /**
     * @Route("/stronaZgloszenia", methods={"GET"})
     */
    public function stronaZgloszeniaGet() {

        $Id = $this->loginService->dostepUzytkownikaService();

        if ( $Id==false ) {

            return $this->redirect(parent::getParameter('baseUrl')."logowanie");
        }

        $daneUzytkownikaArr = $this->daneUzytkownikaService->pobierzDaneUzytkownikaService( $Id );

        $slownikKlienci = $this->zgloszeniaService->slownikKlienciService();
        $slownikKategoria = $this->zgloszeniaService->slownikKategoriaService();
        $slownikPriorytet = $this->zgloszeniaService->slownikPriorytetService();
        $listaWykonawcow = $this->zgloszeniaService->listaWykonawcowService();
        $zgloszeniaArr = $this->zgloszeniaService->zgloszeniaService();

        return $this->render('stronaZgloszenia.html.twig',
            array( 'daneUzytkownikaArr'=>$daneUzytkownikaArr,'slownikKlienci'=>$slownikKlienci,
                'slownikKategoria'=>$slownikKategoria,'wykonawcaArr'=>$listaWykonawcow,
                'slownikPriorytet'=>$slownikPriorytet,'zgloszeniaArr'=>$zgloszeniaArr) );
    }

    /**
     * @Route("/stronaZgloszenia", methods={"POST"})
     */
    public function stronaZgloszeniaPost() {

        return $this->redirect(parent::getParameter('baseUrl')."");
    }


    /**
     *
     * dynamiczne generowanie słownika adresów
     *
     * @Route("/dynamicznyAdres/ajax", methods={"POST"})
     */
    public function klientDynamicznySlownik(Request $request) {

        $adresSlownikArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $adresSlownik = $this->zgloszeniaService->adresSlownikService($adresSlownikArr);

        $adresyDynamiczneArr = ['adresSlownik'=>$adresSlownik];

        return new JsonResponse($adresyDynamiczneArr);
    }

    /**
     *
     * zapisywanie zgłoszenia. Funkcja zwraca też aktualny stan tabeli zgłoszeń.
     *
     * @Route("/zapiszZgloszenie/ajax", methods={"POST"})
     */
    public function zapiszZgloszenie(Request $request) {

        $zgloszeniaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $zgloszenia =  $this->zgloszeniaService->zapiszZgloszenieService($zgloszeniaArr);

        $zgloszeniaTab = ['zgloszeniaArr'=>$zgloszenia];

        return new JsonResponse($zgloszeniaTab);
    }

    /**
     *
     *
     *
     * @Route("/listaZgloszen/ajax", methods={"POST"})
     */
    public function listaZgloszen(Request $request) {

        $zgloszeniaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $listaZgloszen = $this->zgloszeniaService->listaZgloszenService($zgloszeniaArr);

        $wykonawca = $this->zgloszeniaService->wykonawcaService($zgloszeniaArr);

        $zgloszeniaTab = ['zgloszeniaArr'=>$listaZgloszen,'wykonawcaArr'=>$wykonawca];

        return new JsonResponse($zgloszeniaTab);
    }

    /**
     *
     * edytowanie zgłoszenia. Funkcja zwraca też aktualny stan tabeli zgłoszeń.
     *
     * @Route("/edytujZgloszenie/ajax", methods={"POST"})
     */
    public function edytujZgloszenie(Request $request) {

        $zgloszeniaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $zgloszenia =  $this->zgloszeniaService->edytujZgloszenieService($zgloszeniaArr);

        $zgloszeniaTab = ['zgloszeniaArr'=>$zgloszenia];

        return new JsonResponse($zgloszeniaTab);
    }

}
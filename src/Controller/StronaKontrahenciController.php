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

    /**
     *
     * dane adresowe
     *
     * @Route("/daneAdresoweKontrahenta/ajax", methods={"POST"})
     */
    public function daneAdresoweKontrahenta(Request $request) {

        $daneAdresoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneAdresoweKontrahenta = $this->daneKontrahentowService->daneAdresoweKontrahentaService($daneAdresoweKontrahentaArr);

        $arr = ['daneAdresoweKontrahentaArr'=>$daneAdresoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane adresowe dodaj
     *
     * @Route("/dodajDaneAdresoweKontrahenta/ajax", methods={"POST"})
     */
    public function dodajDaneAdresoweKontrahenta(Request $request) {

        $daneAdresoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneAdresoweKontrahenta = $this->daneKontrahentowService->dodajDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr);

        $arr = ['daneAdresoweKontrahentaArr'=>$daneAdresoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane adresowe edytuj
     *
     * @Route("/edytujDaneAdresoweKontrahenta/ajax", methods={"POST"})
     */
    public function edytujDaneAdresoweKontrahenta(Request $request) {

        $daneAdresoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneAdresoweKontrahenta = $this->daneKontrahentowService->edytujDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr);

        $arr = ['daneAdresoweKontrahentaArr'=>$daneAdresoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane adresowe usuń
     *
     * @Route("/usunDaneAdresoweKontrahenta/ajax", methods={"POST"})
     */
    public function usunDaneAdresoweKontrahenta(Request $request) {

        $daneAdresoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneAdresoweKontrahenta = $this->daneKontrahentowService->usunDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr);

        $arr = ['daneAdresoweKontrahentaArr'=>$daneAdresoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane kontaktowe
     *
     * @Route("/daneKontaktoweKontrahenta/ajax", methods={"POST"})
     */
    public function daneKontaktoweKontrahenta(Request $request) {

        $daneKontaktoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneKontaktoweKontrahenta = $this->daneKontrahentowService->daneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr);

        $arr = ['daneKontaktoweKontrahentaArr'=>$daneKontaktoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane kontaktowe dodaj
     *
     * @Route("/dodajDaneKontaktoweKontrahenta/ajax", methods={"POST"})
     */
    public function dodajDaneKontaktoweKontrahenta(Request $request) {

        $daneKontaktoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneKontaktoweKontrahenta = $this->daneKontrahentowService->dodajDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr);

        $arr = ['daneKontaktoweKontrahentaArr'=>$daneKontaktoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane kontaktowe edytuj
     *
     * @Route("/edytujDaneKontaktoweKontrahenta/ajax", methods={"POST"})
     */
    public function edytujDaneKontaktoweKontrahenta(Request $request) {

        $daneKontaktoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneKontaktoweKontrahenta = $this->daneKontrahentowService->edytujDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr);

        $arr = ['daneKontaktoweKontrahentaArr'=>$daneKontaktoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane kontaktowe usuń
     *
     * @Route("/usunDaneKontaktoweKontrahenta/ajax", methods={"POST"})
     */
    public function usunDaneKontaktoweKontrahenta(Request $request) {

        $daneKontaktoweKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $daneKontaktoweKontrahenta = $this->daneKontrahentowService->usunDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr);

        $arr = ['daneKontaktoweKontrahentaArr'=>$daneKontaktoweKontrahenta];

        return new JsonResponse($arr);
    }

    /**
     *
     * dane kontrahenta usuń
     *
     * @Route("/usunKontrahenta/ajax", methods={"POST"})
     */
    public function usunKontrahenta(Request $request) {

        $usunKontrahentaArr = $request->request->get('tab');

        $this->logger->info('!!!!!!!!!!!!!!!!!!!!   kontroler');

        $usunKontrahenta = $this->daneKontrahentowService->usunKontrahentaService($usunKontrahentaArr);

        $arr = ['usunKontrahentaArr'=>$usunKontrahenta];

        return new JsonResponse($arr);
    }
}
<?php

namespace App\Service;
use App\Repository\ZgloszeniaRepository;
use App\Repository\TestRepository;
use Psr\Log\LoggerInterface;
use Symfony\Config\Twig\DateConfig;


class ZgloszeniaService
{
    private $zgloszeniaRepository;
    private $logger;

    public function __construct(ZgloszeniaRepository $zgloszeniaRepository, LoggerInterface $logger) {
        $this->zgloszeniaRepository= $zgloszeniaRepository;
        $this->logger= $logger;
    }


    public function slownikKlienciService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->slownikKlienciRepo();
    }

    public function slownikKategoriaService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->slownikKategoriaRepo();
    }

    public function slownikPriorytetService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->slownikPriorytetRepo();
    }

    public function slownikStatusService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->slownikStatusRepo();
    }

    public function adresSlownikService($adresSlownikArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->slownikAdresRepo($adresSlownikArr);
    }

    public function listaWykonawcowService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->listaWykonawcowRepo();
    }

    public function zapiszZgloszenieService($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

       return $this->zgloszeniaRepository->zapiszZgloszenieRepo($zgloszenieArr);
    }

    public function zapiszPlikService($sciezka,$IdZgloszenia) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->zapiszPlikRepo($sciezka,$IdZgloszenia);
    }

    public function zgloszeniaService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->zgloszeniaRepo();
    }

    public function listaZgloszenService($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->listaZgloszenRepo($zgloszeniaArr);
    }

    public function wykonawcaService($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->wykonawcaRepo($zgloszeniaArr);
    }

    public function edytujZgloszenieService($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->edytujZgloszenieRepo($zgloszenieArr);
    }

    public function filtrujZgloszeniaService($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->filtrujZgloszeniaRepo($zgloszenieArr);
    }

    public function historiaZgloszenEdycjaService($zgloszeniaHistoriaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->historiaZgloszenEdycjaRepo($zgloszeniaHistoriaArr);
    }

    // potrzebne jak sie wejdzie na strone ???? jest to w get :P - wykorzystywane jest tez w funkcji ponizej czyli historiaZgloszenService
    public function zgloszeniaHistService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->zgloszenHistRepo();
    }

    public function historiaZgloszenService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->historiaZgloszenRepo();
    }

    public function pokazZgloszenService() {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->pokazZgloszeniaRepo();
    }

    public function historiaZgloszenFiltrService($zgloszeniaFiltrHistoriaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->historiaZgloszenFiltrRepo($zgloszeniaFiltrHistoriaArr);
    }

    public function wyswietlKomentarzeService($wyswietlKomentarzeArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->wyswietlKomentarzeRepo($wyswietlKomentarzeArr);
    }

    public function dodawanieKomentarzaService($dodawanieKomentarzaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->dodawanieKomentarzaRepo($dodawanieKomentarzaArr);
    }

    public function wyswietlZmianyService($wyswietlZmianyArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->zgloszeniaRepository->wyswietlZmianyRepo($wyswietlZmianyArr);
    }

}
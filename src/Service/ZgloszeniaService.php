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

}
<?php

namespace App\Service;
use App\Repository\DaneKontrahentowRepository;
use App\Repository\TestRepository;
use Psr\Log\LoggerInterface;
use Symfony\Config\Twig\DateConfig;


class DaneKontrahentowService
{
    private $daneKontrahentowRepository;
    private $logger;

    public function __construct(DaneKontrahentowRepository $daneKontrahentowRepository, LoggerInterface $logger) {
        $this->daneKontrahentowRepository= $daneKontrahentowRepository;
        $this->logger= $logger;
    }

    public function daneKontrahentowService() {

        return $this->daneKontrahentowRepository->daneKontrahentowRepo();
    }

    public function danePodstawoweKontrahentaService($danePodstawoweKontrahentaArr) {

        return $this->daneKontrahentowRepository->danePodstawoweKontrahentaRepo($danePodstawoweKontrahentaArr);
    }

    public function edytujDanePodstawoweKontrahentaService($danePodstawoweEdycjaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->edytujDanePodstawoweKontrahentaRepo($danePodstawoweEdycjaArr);
    }

    public function slownikPodmiotService() {

        return $this->daneKontrahentowRepository->slownikPodmiotRepo();
    }

    public function filtrujDanePodstawoweKontrahentaService($danePodstawoweFiltrArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->filtrujDanePodstawoweKontrahentaRepo($danePodstawoweFiltrArr);
    }

    public function daneAdresoweKontrahentaService($daneAdresoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->daneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr);
    }

    public function dodajDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->dodajDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr);
    }

    public function edytujDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->edytujDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr);
    }

    public function usunDaneAdresoweKontrahentaService($daneAdresoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->usunDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr);
    }

    public function daneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->daneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr);
    }

    public function dodajDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->dodajDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr);
    }

    public function edytujDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->edytujDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr);
    }

    public function usunDaneKontaktoweKontrahentaService($daneKontaktoweKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->usunDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr);
    }

    public function usunKontrahentaService($usunKontrahentaArr) {

        $this->logger->info('???????????????????????   serwis');

        return $this->daneKontrahentowRepository->usunKontrahentaRepo($usunKontrahentaArr);
    }

    public function sprawdzNIPService($sprawdzNIPArr) {

        $this->logger->info('???????????????????????   serwis');

        $issetNIP = $this->daneKontrahentowRepository->sprawdzNIPRepo($sprawdzNIPArr);

        if( count($issetNIP ) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function edycjaSprawdzNIPService($sprawdzNIPArr) {

        $this->logger->info('???????????????????????   serwis');

        $issetNIP = $this->daneKontrahentowRepository->edycjaSprawdzNIPRepo($sprawdzNIPArr);

        if( count($issetNIP ) > 0) {
            return true;
        } else {
            return false;
        }
    }
}
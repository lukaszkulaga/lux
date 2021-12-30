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
}
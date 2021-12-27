<?php

namespace App\Service;
use App\Repository\DaneKontrahentowRepository;
use App\Repository\TestRepository;
use Symfony\Config\Twig\DateConfig;


class DaneKontrahentowService
{
    private $daneKontrahentowRepository;

    public function __construct(DaneKontrahentowRepository $daneKontrahentowRepository) {
        $this->daneKontrahentowRepository= $daneKontrahentowRepository;
    }

    public function daneKontrahentowService() {

        return $this->daneKontrahentowRepository->daneKontrahentowRepo();
    }
}
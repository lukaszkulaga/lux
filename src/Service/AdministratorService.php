<?php

namespace App\Service;

use App\Repository\AdministratorRepository;
use App\Repository\TestRepository;
use Symfony\Config\Twig\DateConfig;

class AdministratorService
{
    private $administratorRepository;

    public function  __construct( AdministratorRepository $administratorRepository) {
     $this->administratorRepository = $administratorRepository;
    }

    public function uzytkownicyAdminService() {

        return $this->administratorRepository->pobierzDaneUzytkownikaRepo();
    }

    public function statusKontaService($statusKontaTab) {

        return $this->administratorRepository->statusKontaRepo($statusKontaTab);
    }

    public function rolaService($rolaTab) {

        return $this->administratorRepository->rolaRepo($rolaTab);
    }

}



















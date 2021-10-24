<?php

namespace App\Service;

use App\Entity\DaneUzytkownikaEntity;
use App\Repository\DaneUzytkownikaRepository;
use App\Repository\TestRepository;
use Symfony\Config\Twig\DateConfig;

class DaneUzytkownikaService
{
    private $daneUzytkownikaRepository;

    public function  __construct( DaneUzytkownikaRepository $daneUzytkownikaRepository) {
     $this->daneUzytkownikaRepository = $daneUzytkownikaRepository;
    }

    public function daneUzytkownikaService( $adresUriZdjecia) {

        $daneUzytkownika = new DaneUzytkownikaEntity();
        $daneUzytkownika->setZdjecie( $adresUriZdjecia );

        $this->daneUzytkownikaRepository->daneUzytkownikaRepo( $daneUzytkownika );
    }
}
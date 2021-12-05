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

    public function daneUzytkownikaService( $adresUriZdjecia,$imie,$nazwisko,$nazwaUzytkownika,$email,$haslo ) {

        $daneUzytkownika = new DaneUzytkownikaEntity();
        $daneUzytkownika->setZdjecie( $adresUriZdjecia );
        $daneUzytkownika->setImie( $imie );
        $daneUzytkownika->setNazwisko( $nazwisko );
        $daneUzytkownika->setNazwaUzytkownika( $nazwaUzytkownika );
        $daneUzytkownika->setEmail( $email );
        $daneUzytkownika->setHaslo( $haslo );

        $this->daneUzytkownikaRepository->daneUzytkownikaRepo( $daneUzytkownika );
    }

    public function pobierzDaneUzytkownikaService( $idUzytkownika ) {

        $daneUzytkownika = $this->daneUzytkownikaRepository->pobierzDaneUzytkownikaRepo( $idUzytkownika );

        return $daneUzytkownika;
    }

    public function sprawdzNazweUzytkownikaService( $nazwaUzytkownika ) {

        $nazwaUzytkownika = $this->daneUzytkownikaRepository->sprawdzNazweUzytkownikaRepo( $nazwaUzytkownika );

        return $nazwaUzytkownika;
    }

    public function sprawdzEmailService( $email ) {

        $email = $this->daneUzytkownikaRepository->sprawdzEmailRepo( $email );

        return $email;
    }

    public function edycjaDanychUzytkownikaService( $tablicaZDanymi, $Id ) {

        $edycjaDanychUzytkownikaRepo = $this->daneUzytkownikaRepository->edycjaDanychUzytkownikaRepo( $tablicaZDanymi, $Id );

        return $edycjaDanychUzytkownikaRepo;

    }


}



















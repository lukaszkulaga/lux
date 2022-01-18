<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;


class DaneKontrahentowRepository
{

    private $conn;
    private $logger;

    public function  __construct(EntityManagerInterface $conn, LoggerInterface $logger)
    {
        $this->conn = $conn->getConnection();
        $this->logger = $logger;
    }

    public function daneKontrahentowRepo() {

        $sql = "select K.IdKlienta, K.Nazwa, K.NIP, SP.Opis,SP.IdPodmiot from klienci K
                left join slownikPodmiot SP 
                ON K.Podmiot = SP.IdPodmiot";

        return $this->conn->fetchAllAssociative($sql);
    }

    public function danePodstawoweKontrahentaRepo($danePodstawoweKontrahentaArr) {

        $nazwa = $danePodstawoweKontrahentaArr['nazwa'];
        $nip = $danePodstawoweKontrahentaArr['nip'];
        $podmiot = $danePodstawoweKontrahentaArr['podmiot'];

        $sql = "insert into [klienci](Nazwa,NIP,Podmiot) values ('$nazwa','$nip','$podmiot')";

        $this->conn->fetchAllAssociative($sql);

        return $this->daneKontrahentowRepo();
    }

    public function edytujDanePodstawoweKontrahentaRepo($danePodstawoweEdycjaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idKlienta = $danePodstawoweEdycjaArr['idKlienta'];
        $nazwa = $danePodstawoweEdycjaArr['nazwa'];
        $nip = $danePodstawoweEdycjaArr['nip'];
        $podmiot = $danePodstawoweEdycjaArr['podmiot'];

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "UPDATE klienci
                SET Nazwa = '$nazwa',NIP ='$nip',Podmiot=$podmiot
                WHERE IdKlienta=$idKlienta";

        $this->conn->fetchAllAssociative($sql);

        return $this->daneKontrahentowRepo();
    }

    public function slownikPodmiotRepo() {

        $sql = "select * from slownikPodmiot";

        return $this->conn->fetchAllAssociative($sql);
    }

    public function filtrujDanePodstawoweKontrahentaRepo($danePodstawoweFiltrArr) {

        $nazwaFiltr = $danePodstawoweFiltrArr['nazwaFiltr'];
        $nipFiltr = $danePodstawoweFiltrArr['nipFiltr'];
        $podmiotFiltr = $danePodstawoweFiltrArr['podmiotFiltr'];

        $sql = "select K.IdKlienta, K.Nazwa, K.NIP, SP.Opis,SP.IdPodmiot from klienci K
                left join slownikPodmiot SP 
                ON K.Podmiot = SP.IdPodmiot where IdKlienta is not null ";

        if (!empty($nazwaFiltr)){
            $sql = $sql." and K.Nazwa like '%$nazwaFiltr%'";
        }
        if (!empty($nipFiltr)){
            $sql = $sql." and K.NIP like '%$nipFiltr%'";
        }
        if (!empty($podmiotFiltr)){
            $sql = $sql." and SP.Opis like '%$podmiotFiltr%'";
        }

        return $this->conn->fetchAllAssociative($sql);
    }

    public function daneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr) {

        $idKlienta = $daneAdresoweKontrahentaArr['idKlienta'];

        $sql = "select KA.Miejscowosc,KA.Ulica,KA.NrBudynku,KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";

        $daneAdresoweTab= $this->conn->fetchAllAssociative($sql);

        return $daneAdresoweTab;
    }

    public function dodajDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr) {

        $IdKlienta = $daneAdresoweKontrahentaArr['idKlienta'];
        $miejscowosc = $daneAdresoweKontrahentaArr['miejscowosc'];
        $ulica = $daneAdresoweKontrahentaArr['ulica'];
        $nrBudynku = $daneAdresoweKontrahentaArr['nrBudynku'];

        $sql = "insert into [klienciAdres](IdKlienta,Miejscowosc,Ulica,NrBudynku) values ('$IdKlienta','$miejscowosc','$ulica','$nrBudynku')";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select KA.Miejscowosc,KA.Ulica,KA.NrBudynku,KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $IdKlienta ";
        $selectAdres = $this->conn->fetchAllAssociative($sql2);

        return $selectAdres;
    }

    public function edytujDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idAdres = $daneAdresoweKontrahentaArr['idAdres'];
        $idKlienta = $daneAdresoweKontrahentaArr['idKlienta'];
        $miejscowosc = $daneAdresoweKontrahentaArr['miejscowosc'];
        $ulica = $daneAdresoweKontrahentaArr['ulica'];
        $nrBudynku = $daneAdresoweKontrahentaArr['nrBudynku'];

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "UPDATE klienciAdres
                SET Miejscowosc = '$miejscowosc',Ulica ='$ulica',NrBudynku='$nrBudynku'
                WHERE IdAdres=$idAdres";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select KA.Miejscowosc,KA.Ulica,KA.NrBudynku,KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";
        $selectAdres = $this->conn->fetchAllAssociative($sql2);

        return $selectAdres;
    }

    public function usunDaneAdresoweKontrahentaRepo($daneAdresoweKontrahentaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idAdres = $daneAdresoweKontrahentaArr['idAdres'];
        $idKlienta = $daneAdresoweKontrahentaArr['idKlienta'];

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "delete from [klienciAdres] where IdAdres = $idAdres";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select KA.Miejscowosc,KA.Ulica,KA.NrBudynku,KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";
        $selectAdres = $this->conn->fetchAllAssociative($sql2);

        return $selectAdres;
    }

    public function daneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr) {

        $idKlienta = $daneKontaktoweKontrahentaArr['idKlienta'];

        $sql = "select * from klienciKontakt where IdKlienta = $idKlienta ";

        $daneKontaktoweTab= $this->conn->fetchAllAssociative($sql);

        return $daneKontaktoweTab;
    }

    public function dodajDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr) {

        $idKlienta = $daneKontaktoweKontrahentaArr['idKlienta'];
        $telefon = $daneKontaktoweKontrahentaArr['telefon'];
        $email = $daneKontaktoweKontrahentaArr['email'];

        $sql = "insert into klienciKontakt(IdKlienta,Telefon,Email) values ('$idKlienta','$telefon','$email')";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select * from klienciKontakt where IdKlienta = $idKlienta ";
        $selectKontakt = $this->conn->fetchAllAssociative($sql2);

        return $selectKontakt;
    }

    public function edytujDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idKontakt = $daneKontaktoweKontrahentaArr['idKontakt'];
        $idKlienta = $daneKontaktoweKontrahentaArr['idKlienta'];
        $telefon = $daneKontaktoweKontrahentaArr['telefon'];
        $email = $daneKontaktoweKontrahentaArr['email'];

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "UPDATE klienciKontakt
                SET Telefon = '$telefon',Email ='$email'
                WHERE IdKontakt=$idKontakt";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select * from klienciKontakt where IdKlienta = $idKlienta ";

        $selectKontakt = $this->conn->fetchAllAssociative($sql2);

        return $selectKontakt;
    }

    public function usunDaneKontaktoweKontrahentaRepo($daneKontaktoweKontrahentaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idKontakt = $daneKontaktoweKontrahentaArr['idKontakt'];
        $idKlienta = $daneKontaktoweKontrahentaArr['idKlienta'];

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "delete from klienciKontakt where IdKontakt = $idKontakt";
        $this->conn->fetchAllAssociative($sql);

        $sql2 = "select * from klienciKontakt where IdKlienta = $idKlienta ";
        $selectKontakt = $this->conn->fetchAllAssociative($sql2);

        return $selectKontakt;
    }

    public function usunKontrahentaRepo($usunKontrahentaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idKlienta = $usunKontrahentaArr['idKlienta'];

        $sql1 = "delete from klienciKontakt where IdKlienta = $idKlienta";
        $this->conn->fetchAllAssociative($sql1);
        $sql2 = "delete from klienciAdres where IdKlienta = $idKlienta";
        $this->conn->fetchAllAssociative($sql2);
        $sql3 = "delete from klienci where IdKlienta = $idKlienta";
        $this->conn->fetchAllAssociative($sql3);

        return $this->daneKontrahentowRepo();
    }

    public function sprawdzNIPRepo($sprawdzNIPArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $nip = $sprawdzNIPArr['nip'];

        $sql = "select NIP from klienci where NIP = '$nip'";
        $selectNIP = $this->conn->fetchAllAssociative($sql);

        return $selectNIP;
    }

}

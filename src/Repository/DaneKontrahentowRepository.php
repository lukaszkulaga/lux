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

        return $this->daneKontrahentowRepo();;
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

        $sql = "select KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";

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

        $sql2 = "select KA.IdAdres,IdKlienta,CONCAT(KA.Miejscowosc,', ', KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA";
        $selectAdres = $this->conn->fetchAllAssociative($sql2);

        return $selectAdres;
    }

}

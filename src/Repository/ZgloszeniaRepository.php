<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

use App\Entity\ZgloszeniaEntity;
use Doctrine\Persistence\ManagerRegistry;


use App\Entity\DaneUzytkownikaEntity;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class ZgloszeniaRepository extends ServiceEntityRepository
{

    private $conn;
    private $logger;
    private $session;

    public function  __construct(ManagerRegistry $managerRegistry,EntityManagerInterface $conn, LoggerInterface $logger, SessionInterface $session)
    {
        parent::__construct($managerRegistry, ZgloszeniaEntity::class);
        $this->conn = $conn->getConnection();
        $this->logger = $logger;
        $this->session = $session;
    }

    public function zgloszeniaRepo() {

        $this->logger->info('???????????????????????   serwis');

        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,Z.DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus,
            CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz.',Z.GodzinaOd, ' - ',Z.GodzinaDo ) AS PlanowanaRealizacja,
			CONCAT (KA.Miejscowosc, ', ',KA.Ulica,  ', ', KA.NrBudynku, ', ', Z.DokladnaLokalizacja) AS Adres,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca
              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus";
        $zloszeniaArr = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zloszeniaArr;
    }

    public function slownikKlienciRepo() {

        $this->logger->info('???????????????????????   serwis');

        $klienciSQL = "select IdKlienta,Nazwa from klienci";
        $klienciArr = $this->conn->fetchAllAssociative($klienciSQL);

        return $klienciArr;
    }

    public function slownikKategoriaRepo() {

        $this->logger->info('???????????????????????   serwis');

        $kategoriaSQL = "select IdKategoria,Opis from slownikKategoria";
        $kategoriaArr = $this->conn->fetchAllAssociative($kategoriaSQL);

        return $kategoriaArr;
    }

    public function slownikPriorytetRepo() {

        $this->logger->info('???????????????????????   serwis');

        $priorytetSQL = "select IdPriorytet,Opis from slownikPriorytet";
        $priorytetArr = $this->conn->fetchAllAssociative($priorytetSQL);

        return $priorytetArr;
    }

    public function slownikAdresRepo($adresSlownikArr) {

        $this->logger->info('???????????????????????   serwis');

        $idKlienta = $adresSlownikArr['idKlienta'];

        $adresSQL = "select KA.IdAdres,CONCAT( KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";

        $adresArr = $this->conn->fetchAllAssociative($adresSQL);

        return $adresArr;
    }

    public function listaWykonawcowRepo() {

        $this->logger->info('???????????????????????   serwis');

        $listaWykonawcowSQL = "select DU.IdUzytkownika,CONCAT( DU.Imie, ' ',DU.Nazwisko) AS Wykonawca from daneUzytkownika DU where Rola ='uzytkownik'";
        $listaWykonawcowArr = $this->conn->fetchAllAssociative($listaWykonawcowSQL);

        return $listaWykonawcowArr;
    }

    public function zapiszZgloszenieRepo($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        $idKlienta = $zgloszenieArr['idKlienta'];
        $idAdres = $zgloszenieArr['idAdres'];
        $kategoriaDodaj = $zgloszenieArr['kategoriaDodaj'];
        $nrLokaluDodaj = $zgloszenieArr['nrLokaluDodaj'];
        $terminOdDodaj = $zgloszenieArr['terminOdDodaj'];
        $terminDoDodaj = $zgloszenieArr['terminDoDodaj'];
        $godzinaOdDodaj = $zgloszenieArr['godzinaOdDodaj'];
        $godzinaDoDodaj = $zgloszenieArr['godzinaDoDodaj'];
        $opisDodaj = $zgloszenieArr['opisDodaj'];
        $priorytetDodaj = $zgloszenieArr['priorytetDodaj'];


        $zgloszenie = new ZgloszeniaEntity();

        if($idKlienta === '') {
            $zgloszenie->setIdKlienta(null);
        }else{
            $zgloszenie->setIdKlienta($idKlienta);
        }

        if($idAdres === ''){
            $zgloszenie->setIdAdres(null);
        } else {
            $zgloszenie->setIdAdres($idAdres);
        }

        if($kategoriaDodaj === ''){
            $zgloszenie->setKategoria(null);
        } else {
            $zgloszenie->setKategoria($kategoriaDodaj);
        }

        if($priorytetDodaj === ''){
            $zgloszenie->setPriorytet(null);
        } else {
            $zgloszenie->setPriorytet($priorytetDodaj);
        }

        $zgloszenie->setDokladnaLokalizacja($nrLokaluDodaj);
        $zgloszenie->setPlanowanaRealizacjaOd($terminOdDodaj);
        $zgloszenie->setPlanowanaRealizacjaDo($terminDoDodaj);
        $zgloszenie->setGodzinaOd($godzinaOdDodaj);
        $zgloszenie->setGodzinaDo($godzinaDoDodaj);
        $zgloszenie->setOpis($opisDodaj);
        $zgloszenie->setStatus(1);
        $zgloszenie->setDataDodania(new \DateTime());
        $zgloszenie->setDataModyfikacji(new \DateTime());
        $zgloszenie->setUser($this->session->get('nazwaUzytkownika'));

        $this->getEntityManager()->persist($zgloszenie);
        $this->getEntityManager()->flush();

        $idZgloszenia = $zgloszenie->getIdZgloszenia();


        $listaWykonawcowArr = $zgloszenieArr['listaWykonawcow'];

        if($listaWykonawcowArr !== ''){

            foreach($listaWykonawcowArr as $idUzytkownika){

                $sql = "insert into zgloszeniaWykonawca(IdUzytkownika,IdZgloszenia) values ($idUzytkownika,$idZgloszenia)";
                $this->conn->fetchAllAssociative($sql);
            }
        }

      return  $this->zgloszeniaRepo();
    }

    public function listaZgloszenRepo($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszeniaArr['IdZgloszeniaTab'];

        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,Z.DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus,
            CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz.',Z.GodzinaOd, ' - ',Z.GodzinaDo ) AS PlanowanaRealizacja,
			CONCAT (KA.Miejscowosc, ', ',KA.Ulica,  ', ', KA.NrBudynku, ', ', Z.DokladnaLokalizacja) AS Adres,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca
              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where Z.IdZgloszenia = $idZgloszenia";
        $zloszeniaArr = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zloszeniaArr;
    }

    public function wykonawcaRepo($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszeniaArr['IdZgloszeniaTab'];

        $listaWykonawcowSQL = "select ZW.IdZgloszeniaWykonawca, ZW.IdUzytkownika,DU.Imie,DU.Nazwisko,CONCAT( DU.Imie, ' ',DU.Nazwisko) AS Wykonawca
              from zgloszenia Z
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
			  where Z.IdZgloszenia = $idZgloszenia";
        $listaWykonawcowArr = $this->conn->fetchAllAssociative($listaWykonawcowSQL);

        return $listaWykonawcowArr;
    }

    public function edytujZgloszenieRepo($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszenieArr['idZgloszenia'];
        $idKlienta = $zgloszenieArr['idKlienta'];
        $idAdres = $zgloszenieArr['idAdres'];
        $kategoriaEdytuj = $zgloszenieArr['kategoriaEdytuj'];
        $nrLokaluEdytuj = $zgloszenieArr['nrLokaluEdytuj'];
        $terminOdEdytuj = $zgloszenieArr['terminOdEdytuj'];
        $terminDoEdytuj = $zgloszenieArr['terminDoEdytuj'];
        $godzinaOdEdytuj = $zgloszenieArr['godzinaOdEdytuj'];
        $godzinaDoEdytuj = $zgloszenieArr['godzinaDoEdytuj'];
        $opisEdytuj = $zgloszenieArr['opisEdytuj'];
        $priorytetEdytuj = $zgloszenieArr['priorytetEdytuj'];

        $zgloszenie = $this->findOneBy(array( 'idZgloszenia'=>$idZgloszenia ));

        if($idKlienta === '') {
            $zgloszenie->setIdKlienta(null);
        }else{
            $zgloszenie->setIdKlienta($idKlienta);
        }

        if($idAdres === ''){
            $zgloszenie->setIdAdres(null);
        } else {
            $zgloszenie->setIdAdres($idAdres);
        }

        if($kategoriaEdytuj === ''){
            $zgloszenie->setKategoria(null);
        } else {
            $zgloszenie->setKategoria($kategoriaEdytuj);
        }

        if($priorytetEdytuj === ''){
            $zgloszenie->setPriorytet(null);
        } else {
            $zgloszenie->setPriorytet($priorytetEdytuj);
        }

        $zgloszenie->setDokladnaLokalizacja($nrLokaluEdytuj);
        $zgloszenie->setPlanowanaRealizacjaOd($terminOdEdytuj);
        $zgloszenie->setPlanowanaRealizacjaDo($terminDoEdytuj);
        $zgloszenie->setGodzinaOd($godzinaOdEdytuj);
        $zgloszenie->setGodzinaDo($godzinaDoEdytuj);
        $zgloszenie->setOpis($opisEdytuj);
        $zgloszenie->setStatus(1);
        $zgloszenie->setDataDodania(new \DateTime());
        $zgloszenie->setDataModyfikacji(new \DateTime());
        $zgloszenie->setUser($this->session->get('nazwaUzytkownika'));

        $this->getEntityManager()->persist($zgloszenie);
        $this->getEntityManager()->flush();

        $idZgloszenia = $zgloszenie->getIdZgloszenia();

        $sql1 = "delete from zgloszeniaWykonawca where IdZgloszenia = $idZgloszenia";
        $this->conn->fetchAllAssociative($sql1);

        $listaWykonawcowArr = $zgloszenieArr['listaWykonawcow'];

        if($listaWykonawcowArr !== ''){

            foreach($listaWykonawcowArr as $idUzytkownika){

//                $sql2 = "select IdUzytkownika from zgloszeniaWykonawca where IdUzytkownika = $idUzytkownika";
//                $czyWystepujeUzytkownik =  $this->conn->fetchAllAssociative($sql2);

//                // chodzi o to żeby nie dało sie dodac dwóch takich samych uzytkowników do jednego zgłoszenia
//                if(count($czyWystepujeUzytkownik) == 0){
                    $sql3 = "insert into zgloszeniaWykonawca(IdUzytkownika,IdZgloszenia) values ($idUzytkownika,$idZgloszenia)";
                    $this->conn->fetchAllAssociative($sql3);
//                }

            }
        }

        return  $this->zgloszeniaRepo();
    }

}

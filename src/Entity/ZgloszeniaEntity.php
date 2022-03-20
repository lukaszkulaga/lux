<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table(name="zgloszenia")
 * @ORM\Entity(repositoryClass="App\Repository\ZgloszeniaRepository")
 */
class ZgloszeniaEntity
{

    /**
     * @var int
     *
     * @ORM\Column(name="IdZgloszenia", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $idZgloszenia;

    /**
     * @var int
     *
     * @ORM\Column(name="IdKlienta", type="integer")
     */
    private $idKlienta;

    /**
     * @var int
     *
     * @ORM\Column(name="IdAdres", type="integer")
     */
    private $idAdres;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataDodania", type="datetime", length=255)
     */
    private $dataDodania;

    /**
     * @var string
     *
     * @ORM\Column(name="PlanowanaRealizacjaOd", type="string", length=255)
     */
    private $planowanaRealizacjaOd;

    /**
     * @var string
     *
     * @ORM\Column(name="PlanowanaRealizacjaDo", type="string", length=255)
     */
    private $planowanaRealizacjaDo;

    /**
     * @var string
     *
     * @ORM\Column(name="GodzinaOd", type="string", length=255)
     */
    private $godzinaOd;

    /**
     * @var string
     *
     * @ORM\Column(name="GodzinaDo", type="string", length=255)
     */
    private $godzinaDo;

    /**
     * @var string
     *
     * @ORM\Column(name="DokladnaLokalizacja", type="string", length=255)
     */
    private $dokladnaLokalizacja;

    /**
     * @var int
     *
     * @ORM\Column(name="Kategoria", type="integer", length=255)
     */
    private $kategoria;

    /**
     * @var int
     *
     * @ORM\Column(name="Priorytet", type="integer", length=255)
     */
    private $priorytet;

    /**
     * @var int
     *
     * @ORM\Column(name="Status", type="integer", length=255)
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="Plik", type="string", length=255)
     */
    private $plik;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataModyfikacji", type="datetime", length=255)
     */
    private $dataModyfikacji;

    /**
     * @var string
     *
     * @ORM\Column(name="[User]", type="string", length=255)
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="Opis", type="string", length=255)
     */
    private $opis;

    /**
     * @return int
     */
    public function getIdZgloszenia(): int
    {
        return $this->idZgloszenia;
    }

    /**
     * @param int $idZgloszenia
     * @return ZgloszeniaEntity
     */
    public function setIdZgloszenia(int $idZgloszenia): ZgloszeniaEntity
    {
        $this->idZgloszenia = $idZgloszenia;
        return $this;
    }

    /**
     * @return int
     */
    public function getIdKlienta(): ?int
    {
        return $this->idKlienta;
    }

    /**
     * @param ?int $idKlienta
     * @return ZgloszeniaEntity
     */
    public function setIdKlienta( ?int $idKlienta ): ZgloszeniaEntity
    {
        $this->idKlienta = $idKlienta;
        return $this;
    }

    /**
     * @return int
     */
    public function getIdAdres(): ?int
    {
        return $this->idAdres;
    }

    /**
     * @param ?int $idAdres
     * @return ZgloszeniaEntity
     */
    public function setIdAdres( ?int $idAdres ): ZgloszeniaEntity
    {
        $this->idAdres = $idAdres;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDataDodania(): \DateTime
    {
        return $this->dataDodania;
    }

    /**
     * @param \DateTime $dataDodania
     * @return ZgloszeniaEntity
     */
    public function setDataDodania(\DateTime $dataDodania): ZgloszeniaEntity
    {
        $this->dataDodania = $dataDodania;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlanowanaRealizacjaOd(): string
    {
        return $this->planowanaRealizacjaOd;
    }

    /**
     * @param string $planowanaRealizacjaOd
     * @return ZgloszeniaEntity
     */
    public function setPlanowanaRealizacjaOd(string $planowanaRealizacjaOd): ZgloszeniaEntity
    {
        $this->planowanaRealizacjaOd = $planowanaRealizacjaOd;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlanowanaRealizacjaDo(): string
    {
        return $this->planowanaRealizacjaDo;
    }

    /**
     * @param string $planowanaRealizacjaDo
     * @return ZgloszeniaEntity
     */
    public function setPlanowanaRealizacjaDo(string $planowanaRealizacjaDo): ZgloszeniaEntity
    {
        $this->planowanaRealizacjaDo = $planowanaRealizacjaDo;
        return $this;
    }

    /**
     * @return string
     */
    public function getGodzinaOd(): string
    {
        return $this->godzinaOd;
    }

    /**
     * @param string $godzinaOd
     * @return ZgloszeniaEntity
     */
    public function setGodzinaOd(string $godzinaOd): ZgloszeniaEntity
    {
        $this->godzinaOd = $godzinaOd;
        return $this;
    }

    /**
     * @return string
     */
    public function getGodzinaDo(): string
    {
        return $this->godzinaDo;
    }

    /**
     * @param string $godzinaDo
     * @return ZgloszeniaEntity
     */
    public function setGodzinaDo(string $godzinaDo): ZgloszeniaEntity
    {
        $this->godzinaDo = $godzinaDo;
        return $this;
    }

    /**
     * @return string
     */
    public function getDokladnaLokalizacja(): string
    {
        return $this->dokladnaLokalizacja;
    }

    /**
     * @param string $dokladnaLokalizacja
     * @return ZgloszeniaEntity
     */
    public function setDokladnaLokalizacja(string $dokladnaLokalizacja): ZgloszeniaEntity
    {
        $this->dokladnaLokalizacja = $dokladnaLokalizacja;
        return $this;
    }

    /**
     * @return int
     */
    public function getKategoria(): ?int
    {
        return $this->kategoria;
    }

    /**
     * @param ?int $kategoria
     * @return ZgloszeniaEntity
     */
    public function setKategoria( ?int $kategoria ): ZgloszeniaEntity
    {
        $this->kategoria = $kategoria;
        return $this;
    }

    /**
     * @return int
     */
    public function getPriorytet(): ?int
    {
        return $this->priorytet;
    }

    /**
     * @param ?int $priorytet
     * @return ZgloszeniaEntity
     */
    public function setPriorytet( ?int $priorytet ): ZgloszeniaEntity
    {
        $this->priorytet = $priorytet;
        return $this;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     * @return ZgloszeniaEntity
     */
    public function setStatus(int $status): ZgloszeniaEntity
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlik(): string
    {
        return $this->plik;
    }

    /**
     * @param string $plik
     * @return ZgloszeniaEntity
     */
    public function setPlik(string $plik): ZgloszeniaEntity
    {
        $this->plik = $plik;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDataModyfikacji(): \DateTime
    {
        return $this->dataModyfikacji;
    }

    /**
     * @param \DateTime $dataModyfikacji
     * @return ZgloszeniaEntity
     */
    public function setDataModyfikacji(\DateTime $dataModyfikacji): ZgloszeniaEntity
    {
        $this->dataModyfikacji = $dataModyfikacji;
        return $this;
    }

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @param string $user
     * @return ZgloszeniaEntity
     */
    public function setUser(string $user): ZgloszeniaEntity
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return string
     */
    public function getOpis(): string
    {
        return $this->opis;
    }

    /**
     * @param string $opis
     * @return ZgloszeniaEntity
     */
    public function setOpis(string $opis): ZgloszeniaEntity
    {
        $this->opis = $opis;
        return $this;
    }




}